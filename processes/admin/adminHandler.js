require("dotenv").config(); // Подключаем dotenv для использования переменных из .env
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
};
