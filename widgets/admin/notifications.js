const logger = require("../../app/logger");

module.exports.notifyAdmin = (bot, adminChatId, message) => {
  bot.sendMessage(adminChatId, message).catch((error) => {
    logger.error(`Ошибка при отправке сообщения админу: ${error.message}`);
  });
};
