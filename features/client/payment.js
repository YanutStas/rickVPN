const texts = require("../../shared/texts");
const utils = require("../../shared/utils");

module.exports.handle = (bot, chatId) => {
  bot.sendMessage(chatId, texts.paymentMessage, {
    parse_mode: "Markdown",
    disable_web_page_preview: true, // Отключаем предпросмотр ссылок
  });

  bot.sendPhoto(chatId, utils.getQrPath(), {
    parse_mode: "Markdown",
  });
};

