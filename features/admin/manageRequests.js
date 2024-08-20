require("dotenv").config(); // Подключаем dotenv
const texts = require("../../shared/texts");

module.exports.handle = (bot, msg) => {
  const chatId = msg.chat.id;
  const adminChatId = process.env.ADMIN_CHAT_ID; // Используем переменную из .env

  if (msg.photo || msg.document) {
    bot.forwardMessage(adminChatId, chatId, msg.message_id);
  }

  // Дополнительная логика обработки чека и комментариев
};
