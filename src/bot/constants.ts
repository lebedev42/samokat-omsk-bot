export const APP_BASE_URL = `${process.env.BOT_API_URL}/`;
export const API_BASE_URL = `http://localhost:1337/`;
export const S3_BASE_URL =
  "https://s3.timeweb.com/1c0bdec3-800f68a6-871b-482a-becc-2ed21b03fd6b/";

export const API_AUTH_TOKEN =
  "Bearer 91b22b119b5dd002764d42c87983a597c5a7c6b6705d8459db7566e392fd6f20ceb0d815a5b33e593c9452c74f5390bce995da88ca516b1506fa0f58c9011a5ce84770980890335358bebf167895c67a33f5f3a523b4cef2169edc459323f83591a4d287525e1150522639d419a9f6b9dff8334e491ff7fc5a32b34fdbc6d533";

export const GAME_START_TIME = 0; // 1692721043000 09 in milliseconds
export const OFD_URL = "https://lk.platformaofd.ru/web/noauth/cheque/id";
export const OFD_URL_FIELDS = ["id", "date", "fp"];

export const HELLO_RESPONSE_1 =
  "Привет! Самокат вместе с ХК Авангард разыгрывают билеты на хоккей и джерси с автографами игроков команды.";
export const HELLO_RESPONSE_2 =
  "Чтобы принять участие, достаточно делать покупки в нашем онлайн-магазине и присылать чеки в этот бот.";

export const MENU_RULES = "Правила розыгрыша";
export const MENU_RULES_RESPONSE_1 =
  "Перейдём к правилам. Чтобы выиграть билеты на хоккей или джерси, нужно копить баллы за заказы в приложении Самоката. Один балл — это один чек на сумму 600 ₽. Два балла — чек на 1200 ₽ и так далее. Обязательно введите промокод АВАНГАРД600 перед покупкой. Загружайте ссылку на чек в бот. Мы пополним ваш индивидуальный счёт в течение нескольких часов.";
export const MENU_RULES_RESPONSE_2 =
  "Где найти чек? В приложении Самоката зайдите в личный кабинет. В разделе «Заказы» выберите тот, что подходит под условия конкурса. Нажмите кнопку «Чеки заказа» под суммой покупки. Перейдите по ссылке, введите защитный код и скопируйте ссылку на чек.";

export const MENU_TABLE = "Рейтинг";

export const MENU_SEND = "Отправить чек";
export const MENU_SEND_RESPONSE =
  "Начнём турнир! Загрузите ссылку на чек в ответ на это сообщение.";

export const ERROR_TEXT =
  "Какая-то ошибка… Кажется, ваш чек не соответствует условиям акции. Проверьте их <a href='${S3_BASE_URL}/sm-error.png'>тут</a> и попробуйте снова.";
export const SUCCESS_1_TEXT = "Спасибо! Забираем чек на модерацию.";
export const SUCCESS_2_TEXT =
  "Вы в игре! Количество баллов обновилось. Если хотите узнать, на каком вы месте, переходите в турнирную таблицу через главное меню или команду /table";
export const RULES_TEXT_LINK = `Остались вопросы? Подробнее о правилах розыгрыша можно узнать <a href='${S3_BASE_URL}/sm-error.png'>тут</a>`;
