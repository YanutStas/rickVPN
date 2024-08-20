const texts = require("../../shared/texts");
const utils = require("../../shared/utils");

module.exports.handle = (bot, chatId) => {
  bot.sendMessage(chatId, texts.paymentMessage, { parse_mode: "Markdown" });
  bot.sendPhoto(chatId, utils.getQrPath(), { caption: "Сканируй и оплати!" });
};
