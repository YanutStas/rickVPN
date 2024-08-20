const texts = require("../../shared/texts");

module.exports.handle = (bot, chatId, userName) => {
  const options = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Месячные тарифы", callback_data: "monthly_tariffs" },
          { text: "Тарифы на 6 мес.", callback_data: "semi_annual_tariffs" },
        ],
        [{ text: "Оставить комментарий", callback_data: "leave_comment" }],
      ],
    },
  };

  bot.sendMessage(chatId, "Выберите нужный тарифный план", options);
};

module.exports.handleTariffSelection = (bot, chatId, tariffType) => {
  let message;
  const options = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [],
    },
  };

  if (tariffType === "monthly_tariffs") {
    message = texts.tariffSelectionMessage;
    options.reply_markup.inline_keyboard = [
      [{ text: "310 руб./мес.", callback_data: "tariff_310" }],
      [{ text: "350 руб./мес.", callback_data: "tariff_350" }],
      [{ text: "600 руб./мес.", callback_data: "tariff_600" }],
    ];
  } else if (tariffType === "semi_annual_tariffs") {
    message = texts.semiAnnualTariffMessage;
    options.reply_markup.inline_keyboard = [
      [{ text: "1550 руб./6 мес.", callback_data: "tariff_1550" }],
      [{ text: "1750 руб./6 мес.", callback_data: "tariff_1750" }],
      [{ text: "3000 руб./6 мес.", callback_data: "tariff_3000" }],
    ];
  }

  bot.sendMessage(chatId, message, options);
};
