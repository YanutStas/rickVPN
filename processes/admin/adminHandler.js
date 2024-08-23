require("dotenv").config();
const manageRequests = require("../../features/admin/manageRequests");
const logger = require("../../app/logger");

let selectedTariff = null;

module.exports.init = (bot) => {
  bot.on("callback_query", (callbackQuery) => {
    const action = callbackQuery.data;

    // Определяем выбранный тариф
    if (action.startsWith("tariff_")) {
      selectedTariff = action.includes("monthly")
        ? {
            duration: "1 месяц",
            label: "",
            price: action.split("_")[1].replace("monthly", ""),
          }
        : {
            duration: "6 месяцев",
            label: "",
            price: action.split("_")[1].replace("semiannual", ""),
          };
    }
  });

  // Обрабатываем сообщения с чеками
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    if (msg.photo || msg.document) {
      logger.info(
        `Получен чек от пользователя: ${msg.from.first_name} (${chatId})`
      );

      // Передаем выбранный тариф
      manageRequests.handle(bot, msg, selectedTariff);

      // Сбрасываем тариф после отправки сообщения, чтобы при следующем заказе не использовать предыдущий тариф
      selectedTariff = null;
    }
  });
};

// require("dotenv").config(); // Подключаем dotenv для использования переменных из .env
// const manageRequests = require("../../features/admin/manageRequests");
// const logger = require("../../app/logger");

// module.exports.init = (bot) => {
//   // Обрабатываем сообщения с чеками
//   bot.on("message", (msg) => {
//     const chatId = msg.chat.id;

//     // Проверяем, отправил ли пользователь чек (фото или документ)
//     if (msg.photo || msg.document) {
//       logger.info(
//         `Получен чек от пользователя: ${msg.from.first_name} (${chatId})`
//       );

//       // Просто передаём обработку в manageRequests
//       manageRequests.handle(bot, msg);
//     }
//   });
// };
