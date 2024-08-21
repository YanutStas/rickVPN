const texts = require("../../shared/texts");
const utils = require("../../shared/utils");

module.exports.handle = (bot, chatId) => {
  // Отправляем сообщение с инструкциями по оплате
  bot.sendMessage(chatId, texts.paymentMessage, { parse_mode: "Markdown" });

  // Отправляем QR-код для оплаты
  bot.sendPhoto(chatId, utils.getQrPath(), {
    caption: "*Способ 3: Сканируй этот QR-код и плати!*",
    parse_mode: "Markdown",
  });
};

// const texts = require("../../shared/texts");
// const utils = require("../../shared/utils");

// module.exports.handle = (bot, chatId) => {
//   bot.sendMessage(chatId, texts.paymentMessage, { parse_mode: "Markdown" });
//   bot.sendPhoto(chatId, utils.getQrPath(), { caption: "Сканируй и оплати!" });
// };
