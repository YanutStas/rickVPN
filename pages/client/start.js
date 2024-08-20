const texts = require("../../shared/texts");

module.exports.render = (bot, msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || "лузер";

  const options = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Купить VPN", callback_data: "buy_vpn" }],
        [{ text: "Как подключиться", callback_data: "how_to_connect" }],
      ],
    },
  };

  bot.sendMessage(chatId, texts.startMessage(userName), options);
};
