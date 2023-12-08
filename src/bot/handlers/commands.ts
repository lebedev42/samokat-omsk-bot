import { Composer, InlineKeyboard, Keyboard, InputMediaBuilder } from "grammy";

import { Context } from "../context";
import queryString from "query-string";
import dayjs from "dayjs";
import qs from "qs";
import got from "got";
import { JSDOM } from "jsdom";

// https://lk.platformaofd.ru/web/noauth/cheque/id?id=102537638726&date=1700750969000&fp=3182612905
// https://lk.platformaofd.ru/web/noauth/cheque/id?id=102537638726&date=1700750969000&fp=3182612905

import {
  API_AUTH_TOKEN,
  API_URL,
  WEBAPP_URL,
  ERROR_TEXT,
  GAME_START_TIME,
  HELLO_RESPONSE_1,
  HELLO_RESPONSE_2,
  MENU_RULES,
  MENU_RULES_RESPONSE_1,
  MENU_RULES_RESPONSE_2,
  MENU_SEND,
  MENU_TABLE,
  OFD_URL,
  OFD_URL_FIELDS,
  RULES_TEXT_LINK,
  S3_BASE_URL,
  SUCCESS_1_TEXT,
  SUCCESS_2_TEXT
} from "../constants";

const magicButton = (keyboard: any, ctx: any): Keyboard | InlineKeyboard => {
  return new keyboard().webApp(
    MENU_TABLE,
    `${WEBAPP_URL}index.html?user=${ctx.update.message.from.id}`
  );
};

const composer = new Composer<Context>();

composer.command("table", async (ctx) => {
  const keyboard = magicButton(InlineKeyboard, ctx);

  await ctx.reply(MENU_TABLE, {
    reply_markup: keyboard
  });
});

composer.command("start", async (ctx) => {
  const keyboards = new Keyboard()
    .text(MENU_RULES)
    .row()
    .text(MENU_SEND)
    .row()
    .webApp(
      MENU_TABLE,
      `${WEBAPP_URL}/index.html?user=${ctx.update.message.from.id}`
    )
    .resized();

  const user = await getPlayer(ctx.update.message.from.id);

  if (!user?.id) {
    await createPlayer(ctx.update.message.from);

    ctx.replyWithPhoto(`${S3_BASE_URL}/sm-hello.png`, {
      caption: HELLO_RESPONSE_1
    });
  } else {
    ctx.reply("Вы уже зарегистрированы");
  }
  await ctx.reply(HELLO_RESPONSE_2, {
    reply_markup: keyboards
  });
});

composer.hears(MENU_RULES, async (ctx) => {
  const stp1 = InputMediaBuilder.photo(`${S3_BASE_URL}/stp-1.jpg`);
  const stp2 = InputMediaBuilder.photo(`${S3_BASE_URL}/stp-2.jpg`);
  const stp3 = InputMediaBuilder.photo(`${S3_BASE_URL}/stp-3.jpg`);
  const stp4 = InputMediaBuilder.photo(`${S3_BASE_URL}/stp-4.jpg`);
  const stp5 = InputMediaBuilder.photo(`${S3_BASE_URL}/stp-5.jpg`);
  const stp6 = InputMediaBuilder.photo(`${S3_BASE_URL}/stp-6.jpg`);
  const stp7 = InputMediaBuilder.photo(`${S3_BASE_URL}/stp-7.jpg`);

  ctx.reply(MENU_RULES_RESPONSE_1);
  ctx.replyWithMediaGroup([stp1, stp2, stp3, stp4, stp5, stp6, stp7]);
  ctx.reply(`${MENU_RULES_RESPONSE_2} ${RULES_TEXT_LINK}`, {
    parse_mode: "HTML",
    disable_web_page_preview: true
  });
});

composer.hears(MENU_SEND, async (ctx) => {
  ctx.reply("Начнем соревнования! Отправьте сюда ваш чек из приложения");
});

// получение ссылки на чек
composer.on("message:text", async (ctx) => {
  if (ctx.msg.text.includes(OFD_URL)) {
    try {
      const url = new URL(ctx.msg.text);
      const parsedData = queryString.parse(url.search);

      if (
        isOFD(parsedData, OFD_URL_FIELDS) &&
        typeof parsedData.date === "string"
      ) {
        if (parseInt(parsedData.date) > GAME_START_TIME) {
          const checkSum = await parseCheckURL(url.href);
          await saveTransaction(parsedData, checkSum, ctx);
          sendConfirmMessage(ctx);

          await savePlayerPoints(checkSum, ctx);

          sendSuccessMessage(ctx);
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      sendFileCommonErrorMessage(ctx);
      return false;
    }
  } else {
    sendFileCommonErrorMessage(ctx);
  }
});

function isOFD(params, check) {
  const paramsFields = new Set(Object.keys(params));
  return check.filter((i) => paramsFields.has(i)).length === check.length;
}

async function sendFileCommonErrorMessage(ctx) {
  ctx.replyWithPhoto(`${S3_BASE_URL}/sm-error.png`, {
    caption: ERROR_TEXT,
    parse_mode: "HTML",
    disable_web_page_preview: true
  });
}

async function sendConfirmMessage(ctx) {
  ctx.replyWithPhoto(`${S3_BASE_URL}/sm-success.png`, {
    caption: SUCCESS_1_TEXT
  });
}

async function sendSuccessMessage(ctx) {
  ctx.reply(SUCCESS_2_TEXT);
}

async function parseCheckURL(url) {
  return got(url)
    .then((response) => {
      const { document } = new JSDOM(response.body).window;

      const textContent = document
        .getElementById("fido_cheque_container")
        .textContent.replace(/\s+/g, "");

      const isSamokat = textContent.includes("www.samokat.ru");

      if (!isSamokat) {
        throw new Error();
      }

      const match = textContent.match(/(<b>=<span>([]*.*)<\/span><\/b>)/gi);

      const el = document.createElement("div");
      el.innerHTML = match[0];
      const checkSum = el.children[0].textContent.slice(1);

      return parseInt(checkSum);
    })
    .catch((err) => {
      throw new Error();
    });
}

async function getPlayer(id) {
  const query = qs.stringify({
    filters: {
      ["tgId"]: {
        $eq: id
      }
    }
  });

  console.error("API_URL", API_URL);

  return fetch(`${API_URL}/api/players?${query}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_AUTH_TOKEN
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data.data) && data?.error) {
        console.error(data?.error);
        throw new Error("FIND PLAYER ERROR");
      }
      return data.data[0];
    })
    .catch((error) => {
      console.error("error", error);
      throw new Error("FIND PLAYER ERROR");
    });
}

async function createPlayer(data) {
  const player = {
    name: data.username,
    firstName: data.first_name,
    lastName: data.last_name,
    tgId: data.id.toString()
  };

  return fetch(`${API_URL}/api/players`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_AUTH_TOKEN
    },
    body: JSON.stringify({ data: { ...player } })
  }).catch(() => {
    throw new Error("CREATE PLAYER ERROR");
  });
}

async function saveTransaction(data, checkSum, ctx) {
  const user = await getPlayer(ctx.update.message.from.id);

  if (!user?.id) {
    return false;
  }

  const transaction = {
    ofd_url: ctx.update.message.text,
    ofd_date: data.date,
    ofd_id: data.id,
    ofd_fp: data.fp,
    sum: checkSum,
    player: user.id
  };

  return fetch(`${API_URL}/api/transactions`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_AUTH_TOKEN
    },
    body: JSON.stringify({ data: { ...transaction } })
  })
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) && data?.error) {
        throw new Error("CREATE TRANSACTION ERROR");
      }
      return data.data[0];
    })
    .catch((error) => {
      throw new Error("CREATE TRANSACTION ERROR");
    });
}

async function savePlayerPoints(checkSum, ctx) {
  const user = await getPlayer(ctx.update.message.from.id);

  if (!user?.id) {
    return false;
  }

  const newPoints = user.attributes.points + (checkSum / 600).toFixed(2);

  const updatedData = {
    points: newPoints
  };

  return fetch(`${API_URL}/api/players/${user.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_AUTH_TOKEN
    },
    body: JSON.stringify({ data: { ...updatedData } })
  })
    .then((res) => res.json())
    .then((data) => {
      console.error("data", data);
      if (!Array.isArray(data) && data?.error) {
        throw new Error("SAVE PLAYER POINTS ERROR");
      }
    })
    .catch((error) => {
      throw new Error("SAVE PLAYER POINTS ERROR");
    });
}

export default composer;
