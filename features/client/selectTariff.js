const texts = require("../../shared/texts");
const payment = require("../../features/client/payment");
const logger = require("../../app/logger");

module.exports.handle = (bot, chatId, action) => {
  logger.info(`Пользователь выбрал действие: ${action}`);

  switch (action) {
    case "monthly_tariff":
      bot.sendMessage(chatId, "Выберите тариф на 1 месяц:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "310 рублей/мес", callback_data: "tariff_310_monthly" }],
            [{ text: "350 рублей/мес", callback_data: "tariff_350_monthly" }],
            [{ text: "600 рублей/мес", callback_data: "tariff_600_monthly" }],
          ],
        },
      });
      break;

    case "semiannual_tariff":
      bot.sendMessage(chatId, "Выберите тариф на 6 месяцев:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "1550 руб./6 мес.",
                callback_data: "tariff_1550_semiannual",
              },
            ],
            [
              {
                text: "1750 руб./6 мес.",
                callback_data: "tariff_1750_semiannual",
              },
            ],
            [
              {
                text: "3000 руб./6 мес.",
                callback_data: "tariff_3000_semiannual",
              },
            ],
          ],
        },
      });
      break;

    // Обработка тарифов на 1 месяц
    case "tariff_310_monthly":
    case "tariff_350_monthly":
    case "tariff_600_monthly":
      bot.sendMessage(chatId, texts.paymentMessage, {
        parse_mode: "Markdown",
      });
      break;

    // Обработка тарифов на 6 месяцев
    case "tariff_1550_semiannual":
    case "tariff_1750_semiannual":
    case "tariff_3000_semiannual":
      bot.sendMessage(chatId, texts.paymentMessage, {
        parse_mode: "Markdown",
      });
      break;

    default:
      bot.sendMessage(chatId, "Извините, произошла ошибка. Попробуйте снова.");
      logger.error(`Неизвестное действие: ${action}`);
      break;
  }
};



// const texts = require("../../shared/texts");

// module.exports.handle = (bot, chatId, userName) => {
//   const options = {
//     parse_mode: "Markdown",
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: "Тарифы 1 мес.", callback_data: "monthly_tariffs" },
//           { text: "Тарифы 6 мес.", callback_data: "semi_annual_tariffs" },
//         ],
//         [{ text: "Оставить комментарий", callback_data: "leave_comment" }],
//       ],
//     },
//   };

//   bot.sendMessage(chatId, `Выберите нужный тарифный план`, options);
// };

// // Обработчик для выбора тарифов
// module.exports.handleTariffSelection = (bot, chatId, tariffType) => {
//   let message;
//   const options = {
//     parse_mode: "Markdown",
//     reply_markup: {
//       inline_keyboard: [],
//     },
//   };

//   if (tariffType === "monthly_tariffs") {
//     message = texts.tariffSelectionMessage;
//     options.reply_markup.inline_keyboard = [
//       [{ text: "310 рублей/мес.", callback_data: "tariff_310" }],
//       [{ text: "350 рублей/мес.", callback_data: "tariff_350" }],
//       [{ text: "600 рублей/мес.", callback_data: "tariff_600" }],
//     ];
//   } else if (tariffType === "semi_annual_tariffs") {
//     message = texts.semiAnnualTariffMessage;
//     options.reply_markup.inline_keyboard = [
//       [{ text: "1550 руб./6 мес.", callback_data: "tariff_1550" }],
//       [{ text: "1750 руб./6 мес.", callback_data: "tariff_1750" }],
//       [{ text: "3000 руб./6 мес.", callback_data: "tariff_3000" }],
//     ];
//   }

//   bot.sendMessage(chatId, message, options);
// };
