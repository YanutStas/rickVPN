const texts = require("../../shared/texts");

module.exports.handle = (bot, msg) => {
  const chatId = msg.chat.id;
  const adminChatId = "630763354"; // Ваш Chat ID

  if (msg.photo || msg.document) {
    bot.forwardMessage(adminChatId, chatId, msg.message_id);
  }

  // Дополнительная логика обработки чека и комментариев
};
