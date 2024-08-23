require("dotenv").config(); // Подключаем dotenv для использования переменных из .env
const manageRequests = require("../../features/admin/manageRequests");
const logger = require("../../app/logger");

module.exports.init = (bot) => {
  let userOrders = {};

  // Обрабатываем callback_query для сохранения информации о тарифе
  bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const action = callbackQuery.data;

    // Если выбран тариф
    if (action.startsWith("tariff_")) {
      userOrders[chatId] = {
        ...userOrders[chatId],
        tariff: action.replace("tariff_", ""),
        date: new Date().toLocaleString(),
        userName: callbackQuery.from.first_name || "друг"
      };
      logger.info(`Тариф ${userOrders[chatId].tariff} выбран пользователем ${userOrders[chatId].userName} (${chatId})`);
    }
  });

  // Обрабатываем сообщения с чеками
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // Проверяем, отправил ли пользователь чек (фото или документ)
    if (msg.photo || msg.document) {
      userOrders[chatId] = {
        ...userOrders[chatId],
        paymentInfo: "Фото чека",
        comment: msg.caption || "Комментарий отсутствует"
      };

      // Передаём информацию для обработки и уведомления админа
      manageRequests.handle(bot, msg, userOrders[chatId]);

      // Очищаем данные заказа после отправки админу
      delete userOrders[chatId];
    }
  });
};


// const manageRequests = require("../../features/admin/manageRequests");

// module.exports.init = (bot) => {
//   let selectedTariff = ""; // Добавляем переменную для хранения тарифа

//   bot.on("callback_query", (callbackQuery) => {
//     const action = callbackQuery.data;
//     if (action.startsWith("tariff_")) {
//       selectedTariff = action.replace("tariff_", ""); // Сохраняем выбранный тариф
//     }
//   });

//   bot.on("message", (msg) => {
//     if (msg.photo || msg.document) {
//       manageRequests.handle(bot, msg, selectedTariff); // Передаем выбранный тариф в manageRequests
//     }
//   });
// };
