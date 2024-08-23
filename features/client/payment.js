const texts = require("../../shared/texts");
const utils = require("../../shared/utils");

module.exports.handle = (bot, chatId) => {
  // Сначала отправляем сообщение с методами оплаты
  bot
    .sendMessage(chatId, texts.paymentMessage, {
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    })
    .then(() => {
      // Затем отправляем QR-код, а после него текст с инструкцией
      bot.sendPhoto(chatId, utils.getQrPath()).then(() => {
        bot.sendMessage(
          chatId,
          "После оплаты обязательно отправь сюда чек, чтобы я знал, что ты не халявщик. Без чека ничего не произойдёт, дружок.",
          { parse_mode: "Markdown" }
        );
      });
    });
};

