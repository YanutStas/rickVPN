require("dotenv").config();
const manageRequests = require("../../features/admin/manageRequests");
const logger = require("../../app/logger");

module.exports.init = (bot) => {
  // Обрабатываем сообщения с чеками
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // Проверяем, отправил ли пользователь чек (фото или документ)
    if (msg.photo || msg.document) {
      logger.info(
        `Получен чек от пользователя: ${msg.from.first_name} (${chatId})`
      );

      // Просто передаём обработку в manageRequests
      manageRequests.handle(bot, msg);
    }
  });

  // Обрабатываем нажатия на кнопки от администратора
  bot.on("callback_query", (callbackQuery) => {
    const action = callbackQuery.data;
    const adminChatId = callbackQuery.message.chat.id;

    // Проверяем действие
    if (action.startsWith("confirm_")) {
      const userId = action.replace("confirm_", "");
      bot
        .sendMessage(
          userId,
          "Ваша оплата подтверждена, ожидайте получение ключа в течение 24 часов."
        )
        .then(() => {
          bot.sendMessage(adminChatId, "Оплата подтверждена.");
        });
    } else if (action.startsWith("decline_")) {
      const userId = action.replace("decline_", "");
      bot
        .sendMessage(
          userId,
          "Ваша оплата не подтверждена, подождите в течение 24 часов или напишите в наш чат."
        )
        .then(() => {
          bot.sendMessage(adminChatId, "Оплата не подтверждена.");
        });
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
