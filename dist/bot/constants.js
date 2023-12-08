"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES_TEXT_LINK =
  exports.SUCCESS_2_TEXT =
  exports.SUCCESS_1_TEXT =
  exports.ERROR_TEXT =
  exports.MENU_SEND_RESPONSE =
  exports.MENU_SEND =
  exports.MENU_TABLE =
  exports.MENU_RULES_RESPONSE_2 =
  exports.MENU_RULES_RESPONSE_1 =
  exports.MENU_RULES =
  exports.HELLO_RESPONSE_2 =
  exports.HELLO_RESPONSE_1 =
  exports.OFD_URL_FIELDS =
  exports.OFD_URL =
  exports.GAME_START_TIME =
  exports.API_AUTH_TOKEN =
  exports.S3_BASE_URL =
  exports.API_BASE_URL =
  exports.WEBAPP_URL =
    void 0;
exports.WEBAPP_URL = `${process.env.BOT_API_URL}/`;
exports.API_BASE_URL = `http://localhost:1337/`;
exports.S3_BASE_URL =
  "https://s3.timeweb.com/1c0bdec3-800f68a6-871b-482a-becc-2ed21b03fd6b/";
exports.API_AUTH_TOKEN =
  "Bearer 91b22b119b5dd002764d42c87983a597c5a7c6b6705d8459db7566e392fd6f20ceb0d815a5b33e593c9452c74f5390bce995da88ca516b1506fa0f58c9011a5ce84770980890335358bebf167895c67a33f5f3a523b4cef2169edc459323f83591a4d287525e1150522639d419a9f6b9dff8334e491ff7fc5a32b34fdbc6d533";
exports.GAME_START_TIME = 0; // 1692721043000 09 in milliseconds
exports.OFD_URL = "https://lk.platformaofd.ru/web/noauth/cheque/id";
exports.OFD_URL_FIELDS = ["id", "date", "fp"];
exports.HELLO_RESPONSE_1 =
  "Привет! Самокат вместе с ХК Авангард разыгрывают билеты на хоккей и джерси с автографами игроков команды.";
exports.HELLO_RESPONSE_2 =
  "Чтобы принять участие, достаточно делать покупки в нашем онлайн-магазине и присылать чеки в этот бот.";
exports.MENU_RULES = "Правила розыгрыша";
exports.MENU_RULES_RESPONSE_1 =
  "Перейдём к правилам. Чтобы выиграть билеты на хоккей или джерси, нужно копить баллы за заказы в приложении Самоката. Один балл — это один чек на сумму 600 ₽. Два балла — чек на 1200 ₽ и так далее. Обязательно введите промокод АВАНГАРД600 перед покупкой. Загружайте ссылку на чек в бот. Мы пополним ваш индивидуальный счёт в течение нескольких часов.";
exports.MENU_RULES_RESPONSE_2 =
  "Где найти чек? В приложении Самоката зайдите в личный кабинет. В разделе «Заказы» выберите тот, что подходит под условия конкурса. Нажмите кнопку «Чеки заказа» под суммой покупки. Перейдите по ссылке, введите защитный код и скопируйте ссылку на чек.";
exports.MENU_TABLE = "Рейтинг";
exports.MENU_SEND = "Отправить чек";
exports.MENU_SEND_RESPONSE =
  "Начнём турнир! Загрузите ссылку на чек в ответ на это сообщение.";
exports.ERROR_TEXT =
  "Какая-то ошибка… Кажется, ваш чек не соответствует условиям акции. Проверьте их <a href='${S3_BASE_URL}/sm-error.png'>тут</a> и попробуйте снова.";
exports.SUCCESS_1_TEXT = "Спасибо! Забираем чек на модерацию.";
exports.SUCCESS_2_TEXT =
  "Вы в игре! Количество баллов обновилось. Если хотите узнать, на каком вы месте, переходите в турнирную таблицу через главное меню или команду /table";
exports.RULES_TEXT_LINK = `Остались вопросы? Подробнее о правилах розыгрыша можно узнать <a href='${exports.S3_BASE_URL}/sm-error.png'>тут</a>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxZQUFZLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDO0FBQzdDLFFBQUEsWUFBWSxHQUFHLHdCQUF3QixDQUFDO0FBQ3hDLFFBQUEsV0FBVyxHQUN0Qix1RUFBdUUsQ0FBQztBQUU3RCxRQUFBLGNBQWMsR0FDekIseVFBQXlRLENBQUM7QUFFL1AsUUFBQSxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO0FBQ3hELFFBQUEsT0FBTyxHQUFHLGlEQUFpRCxDQUFDO0FBQzVELFFBQUEsY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUV0QyxRQUFBLGdCQUFnQixHQUMzQiwyR0FBMkcsQ0FBQztBQUNqRyxRQUFBLGdCQUFnQixHQUMzQix1R0FBdUcsQ0FBQztBQUU3RixRQUFBLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztBQUNqQyxRQUFBLHFCQUFxQixHQUNoQywrVkFBK1YsQ0FBQztBQUNyVixRQUFBLHFCQUFxQixHQUNoQywyUEFBMlAsQ0FBQztBQUVqUCxRQUFBLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFFdkIsUUFBQSxTQUFTLEdBQUcsZUFBZSxDQUFDO0FBQzVCLFFBQUEsa0JBQWtCLEdBQzdCLGtFQUFrRSxDQUFDO0FBRXhELFFBQUEsVUFBVSxHQUNyQixtSkFBbUosQ0FBQztBQUN6SSxRQUFBLGNBQWMsR0FBRyxxQ0FBcUMsQ0FBQztBQUN2RCxRQUFBLGNBQWMsR0FDekIsc0pBQXNKLENBQUM7QUFDNUksUUFBQSxlQUFlLEdBQUcsMEVBQTBFLG1CQUFXLHdCQUF3QixDQUFDIn0=
