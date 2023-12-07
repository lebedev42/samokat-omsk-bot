import { Composer, InlineKeyboard, Keyboard } from "grammy";

import { APP_BASE_URL } from "../constants";
import { Context } from "../context";
import Jimp from "jimp";
import path from "node:path";
import QrCode from "qrcode-reader";
import queryString from "query-string";
import dayjs from "dayjs";
import qs from "qs";

import got from "got";
import { JSDOM } from "jsdom";

const magicButton = (keyboard: any, ctx: any): Keyboard | InlineKeyboard => {
  console.error("ctx.update.message.from.id", ctx.update.message.from.id);

  return new keyboard().webApp(
    "💫 Посмотреть",
    `${APP_BASE_URL}index.html?user=${ctx.update.message.from.id}`
  );
};

const composer = new Composer<Context>();

composer.command("table", async (ctx) => {
  const keyboard = magicButton(InlineKeyboard, ctx);

  await ctx.reply("Турнирная таблцица", {
    reply_markup: keyboard
  });
});

async function getPlayer(id) {
  const query = qs.stringify({
    filters: {
      ["tgId"]: {
        $eq: id
      }
    }
  });

  return fetch(`http://localhost:1337/api/players?${query}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 91b22b119b5dd002764d42c87983a597c5a7c6b6705d8459db7566e392fd6f20ceb0d815a5b33e593c9452c74f5390bce995da88ca516b1506fa0f58c9011a5ce84770980890335358bebf167895c67a33f5f3a523b4cef2169edc459323f83591a4d287525e1150522639d419a9f6b9dff8334e491ff7fc5a32b34fdbc6d533`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data.data) && data?.error) {
        throw new Error("FIND PLAYER ERROR");
      }
      return data.data[0];
    })
    .catch(() => {
      throw new Error("FIND PLAYER ERROR");
    });
}

async function createPlayer(data) {
  const player = {
    name: data.username,
    tgId: data.id.toString()
  };

  return fetch("http://localhost:1337/api/players", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 91b22b119b5dd002764d42c87983a597c5a7c6b6705d8459db7566e392fd6f20ceb0d815a5b33e593c9452c74f5390bce995da88ca516b1506fa0f58c9011a5ce84770980890335358bebf167895c67a33f5f3a523b4cef2169edc459323f83591a4d287525e1150522639d419a9f6b9dff8334e491ff7fc5a32b34fdbc6d533`
    },
    body: JSON.stringify({ data: { ...player } })
  }).catch(() => {
    throw new Error("CREATE PLAYER ERROR");
  });
}

composer.command("start", async (ctx) => {
  let msg =
    "Привет! В этом боте Самокат вместе с ХК Авангард разыгрывают билеты на хоккей и несколько джерси с автографами игроков команды!\nЧтобы принять участие в соревновании за призы достаточно делать покупки в Самокате и присылать чеки нашему боту!";

  const user = await getPlayer(ctx.update.message.from.id);

  if (!user?.id) {
    createPlayer(ctx.update.message.from);
  } else {
    msg = "Вы уже зарегистрированы";
  }

  await ctx.reply(msg, {
    parse_mode: "HTML"
  });
});

const ALLOWED_FILE_TYPES = new Set(["jpeg", "jpg", "png"]);
const ALLOWED_FILE_SIZE = 2000000; // - 2 мб

const OFD_FIELDS = ["fn", "fp", "i", "n", "s", "t"];
const GAME_START_TIME = 1692721043000; // 09 in milliseconds

const OFD_URL = "https://lk.platformaofd.ru/web/noauth/cheque/id";
const OFD_URL_FIELDS = ["id", "date", "fp"];

function isImage(filePath) {
  return ALLOWED_FILE_TYPES.has(path.extname(filePath).slice(1).toLowerCase());
}

function isOFD(params, check) {
  const paramsFields = new Set(Object.keys(params));
  return check.filter((i) => paramsFields.has(i)).length === check.length;
}

function sendFileFormatErrorMessage(ctx) {
  ctx.reply("Допускается только фото формата png, jpg, jpeg не более 2мб");
}

function sendFileCommonErrorMessage(ctx) {
  ctx.reply(
    "Какая-то ошибка! Кажется ваш чек не относится к сегодняшним покупкам или не соответствует условиям акции."
  );
}

function sendConfirmMessage(ctx) {
  ctx.reply("Отлично! Забираем ваш чек на модерацию.");
}

async function uploadImage(image) {
  return await image.getBufferAsync("image/png").then((buff) => {
    const blob = new Blob([buff], { type: "image/png" });
    const formData = new FormData();

    formData.append("files", blob, "ofd");
    formData.append("type", "image/png");

    return fetch("http://localhost:1337/api/upload", {
      method: "post",
      headers: {
        Authorization: `Bearer 91b22b119b5dd002764d42c87983a597c5a7c6b6705d8459db7566e392fd6f20ceb0d815a5b33e593c9452c74f5390bce995da88ca516b1506fa0f58c9011a5ce84770980890335358bebf167895c67a33f5f3a523b4cef2169edc459323f83591a4d287525e1150522639d419a9f6b9dff8334e491ff7fc5a32b34fdbc6d533`
      },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) && data?.error) {
          console.error("data?.error", data);
          throw new Error("UPLOAD IMAGE ERROR");
        }
        return data[0];
      })
      .catch((error) => {
        console.error("error", error);
        throw new Error("UPLOAD IMAGE ERROR");
      });
  });
}

async function saveTransaction(data, ctx) {
  const user = await getPlayer(ctx.update.message.from.id);

  if (!user?.id) {
    return false;
  }

  const transaction = {
    ofd_url: ctx.update.message.text,
    ofd_date: data.date,
    ofd_id: data.id,
    ofd_fp: data.fp,
    player: user.id
  };

  return fetch("http://localhost:1337/api/transactions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 91b22b119b5dd002764d42c87983a597c5a7c6b6705d8459db7566e392fd6f20ceb0d815a5b33e593c9452c74f5390bce995da88ca516b1506fa0f58c9011a5ce84770980890335358bebf167895c67a33f5f3a523b4cef2169edc459323f83591a4d287525e1150522639d419a9f6b9dff8334e491ff7fc5a32b34fdbc6d533`
    },
    body: JSON.stringify({ data: { ...transaction } })
  })
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) && data?.error) {
        throw new Error("CREATE TRANSACTION ERROR");
      }
    })
    .catch((error) => {
      throw new Error("CREATE TRANSACTION ERROR");
    });
}

async function saveTransactionData(image, data, ctx) {
  console.error("saveTransactionData", image, data);

  try {
    // Загрузка картинки и получение ее адреса
    const responseUpload = await uploadImage(image);

    ctx.reply("Отлично! Забираем ваш чек на модерацию.");

    // Сохранение Транзакции
    console.error("responseUpload", responseUpload);
  } catch (error) {
    sendFileCommonErrorMessage(ctx);
    console.error(error);
  }
}

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
        // распарсить ссылку
        console.error("url", url);

        got(url.href)
          .then((response) => {
            const dom = new JSDOM(response.body);
            console.log(dom.window.document.querySelector("title").textContent);
          })
          .catch((err) => {
            console.log(err);
          });

        if (parseInt(parsedData.date) > GAME_START_TIME) {
          await saveTransaction(parsedData, ctx);
          sendConfirmMessage(ctx);
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

composer.on("message:photo", async (ctx) => {
  const photo = ctx.msg.photo[ctx.msg.photo.length - 1]; // последний самый большой
  const file = await ctx.api.getFile(photo.file_id); // valid for at least 1 hour
  const path = file.file_path; // file path on Bot API server

  // Проверка на тип файла, размер файла
  if (isImage(path) && file.file_size < ALLOWED_FILE_SIZE) {
    // Получение файла из тг
    await Jimp.read(
      `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${path}`
    )
      .then((image) => {
        const qr = new QrCode();
        qr.callback = (err, value) => {
          if (err) {
            sendFileCommonErrorMessage(ctx);
            return false;
          }

          // Проверка qr на дату и данные
          try {
            const parsedData = queryString.parse(value.result);

            if (
              isOFD(parsedData, OFD_FIELDS) &&
              typeof parsedData.t === "string"
            ) {
              const ofdDate = dayjs(parsedData.t).valueOf();

              if (ofdDate > GAME_START_TIME) {
                saveTransactionData(image, parsedData, ctx);
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
        };
        qr.decode(image.bitmap);
      })
      .catch((error) => {
        sendFileCommonErrorMessage(ctx);
        return false;
      });
  } else {
    sendFileFormatErrorMessage(ctx);
    return false;
  }
});

// composer.command('simple', async (ctx) => {
//   const keyboard = magicButton(Keyboard) as Keyboard;

//   await ctx.reply('Simple mode', {
//     reply_markup: {
//       keyboard: keyboard.build(),
//       resize_keyboard: true,
//     },
//   });
// });

// composer.command('inline', async (ctx) => {
//   const keyboard = magicButton(InlineKeyboard);

//   await ctx.reply('Inline mode', {
//     reply_markup: keyboard,
//   });
// });

export default composer;
