const texts = require("../../shared/texts");

module.exports.handle = (bot, chatId) => {
  const options = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Купить VPN", callback_data: "buy_vpn" }],
        [{ text: "Как подключиться", callback_data: "how_to_connect" }],
        [{ text: "Оплата", callback_data: "payment" }],
        [{ text: "Прайс", callback_data: "price" }],
      ],
    },
  };

  bot.sendMessage(chatId, texts.startMessage, options);
};
