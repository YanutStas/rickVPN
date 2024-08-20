const texts = require("../../shared/texts");

module.exports.handle = (bot, chatId, userName) => {
  const options = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "310 рублей/месяц", callback_data: "tariff_310" }],
        [{ text: "350 рублей/месяц", callback_data: "tariff_350" }],
        [{ text: "600 рублей/месяц", callback_data: "tariff_600" }],
        [{ text: "Оставить комментарий", callback_data: "leave_comment" }],
      ],
    },
  };

  bot.sendMessage(chatId, texts.tariffSelectionMessage, options);
};
