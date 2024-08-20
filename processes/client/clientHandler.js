const texts = require("../../shared/texts");
const selectTariff = require("../../features/client/selectTariff");
const payment = require("../../features/client/payment");
const startPage = require("../../pages/client/start");

module.exports.init = (bot) => {
  bot.onText(/\/start/, (msg) => startPage.render(bot, msg));

  bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const userName = callbackQuery.from.first_name || "лузер";

    switch (callbackQuery.data) {
      case "buy_vpn":
        selectTariff.handle(bot, chatId, userName);
        break;
      case "view_price":
        bot.sendMessage(chatId, texts.priceMessage, { parse_mode: "Markdown" });
        break;
      case "how_to_pay":
        payment.handle(bot, chatId);
        break;
      case "how_to_connect":
        bot.sendMessage(chatId, texts.connectMessage, {
          parse_mode: "Markdown",
        });
        break;
      case "tariff_310": // Добавляем обработчики для тарифов
      case "tariff_350":
      case "tariff_600":
        bot.sendMessage(
          chatId,
          `Вы выбрали тариф: *${callbackQuery.data.replace(
            "tariff_",
            ""
          )} рублей/месяц*. Теперь отправьте чек об оплате.`
        );
        break;
      case "leave_comment":
        bot.sendMessage(chatId, "Напишите ваш комментарий:");
        bot.once("message", (msg) => {
          const comment = msg.text;
          bot.sendMessage(chatId, "Спасибо за ваш комментарий!");
          // Тут можно сохранить комментарий или обработать его
        });
        break;
      default:
        break;
    }
  });
};
