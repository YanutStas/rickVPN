const logger = require("../logger");
const texts = require("../shared/texts");
const selectTariff = require("../features/client/selectTariff");

module.exports = function (bot) {
  bot.on("callback_query", (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const username = msg.chat.username;
    logger.info(
      `Пользователь ${username} (${msg.chat.id}) нажал на кнопку: ${action}`
    );

    if (action === "buy_vpn") {
      bot.sendMessage(msg.chat.id, "Выбери нужный тарифный план:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Тарифы на 1 месяц", callback_data: "monthly_tariffs" }],
            [
              {
                text: "Тарифы на 6 месяцев",
                callback_data: "semi_annual_tariffs",
              },
            ],
            [{ text: "Оставить комментарий", callback_data: "leave_comment" }],
          ],
        },
      });
    } else if (action === "monthly_tariffs") {
      selectTariff.handleTariffSelection(bot, msg.chat.id, "monthly_tariffs");
    } else if (action === "semi_annual_tariffs") {
      selectTariff.handleTariffSelection(
        bot,
        msg.chat.id,
        "semi_annual_tariffs"
      );
    } else if (action === "payment") {
      bot.sendMessage(msg.chat.id, texts.paymentMessage);
    } else if (action === "price") {
      bot.sendMessage(msg.chat.id, texts.priceMessage);
    }
    // Добавляем обработку других нажатий...
  });
};
