const logger = require("../logger");
const texts = require("../shared/texts");

module.exports = function (bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || "друг";
    logger.info(
      `Пользователь ${firstName} (${chatId}) выполнил команду /start`
    );

    bot.sendMessage(chatId, texts.startMessage(firstName), {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Купить VPN", callback_data: "buy_vpn" }],
          [{ text: "Как подключиться", callback_data: "how_to_connect" }],
          [{ text: "Оплата", callback_data: "payment" }],
          [{ text: "Прайс", callback_data: "price" }],
        ],
      },
    });
  });
};
