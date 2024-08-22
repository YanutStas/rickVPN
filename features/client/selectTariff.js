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
      bot.sendMessage(
        chatId,
        `Вы выбрали тариф на 1 месяц: *${texts.getTariffDescription(action)}*`,
        {
          parse_mode: "Markdown",
        }
      );
      payment.handle(bot, chatId);
      break;

    // Обработка тарифов на 6 месяцев
    case "tariff_1550_semiannual":
    case "tariff_1750_semiannual":
    case "tariff_3000_semiannual":
      bot.sendMessage(
        chatId,
        `Вы выбрали тариф на 6 месяцев: *${texts.getTariffDescription(
          action
        )}*`,
        {
          parse_mode: "Markdown",
        }
      );
      payment.handle(bot, chatId);
      break;

    default:
      logger.error(`Неизвестное действие в selectTariff: ${action}`);
      bot.sendMessage(
        chatId,
        "Извините, произошла ошибка при выборе тарифа. Попробуйте снова."
      );
      break;
  }
};

// const texts = require("../../shared/texts");
// const payment = require("../../features/client/payment");
// const logger = require("../../app/logger");

// module.exports.handle = (bot, chatId, action) => {
//   logger.info(`Пользователь выбрал действие: ${action}`);

//   switch (action) {
//     case "monthly_tariff":
//       bot.sendMessage(chatId, "Выберите тариф на 1 месяц:", {
//         reply_markup: {
//           inline_keyboard: [
//             [{ text: "310 рублей/мес", callback_data: "tariff_310_monthly" }],
//             [{ text: "350 рублей/мес", callback_data: "tariff_350_monthly" }],
//             [{ text: "600 рублей/мес", callback_data: "tariff_600_monthly" }],
//           ],
//         },
//       });
//       break;

//     case "semiannual_tariff":
//       bot.sendMessage(chatId, "Выберите тариф на 6 месяцев:", {
//         reply_markup: {
//           inline_keyboard: [
//             [
//               {
//                 text: "1550 руб./6 мес.",
//                 callback_data: "tariff_1550_semiannual",
//               },
//             ],
//             [
//               {
//                 text: "1750 руб./6 мес.",
//                 callback_data: "tariff_1750_semiannual",
//               },
//             ],
//             [
//               {
//                 text: "3000 руб./6 мес.",
//                 callback_data: "tariff_3000_semiannual",
//               },
//             ],
//           ],
//         },
//       });
//       break;

//     // Обработка тарифов на 1 месяц
//     case "tariff_310_monthly":
//     case "tariff_350_monthly":
//     case "tariff_600_monthly":
//       bot.sendMessage(chatId, texts.paymentMessage, {
//         parse_mode: "Markdown",
//       });
//       break;

//     // Обработка тарифов на 6 месяцев
//     case "tariff_1550_semiannual":
//     case "tariff_1750_semiannual":
//     case "tariff_3000_semiannual":
//       bot.sendMessage(chatId, texts.paymentMessage, {
//         parse_mode: "Markdown",
//       });
//       break;

//     default:
//       logger.error(`Неизвестное действие в selectTariff: ${action}`);
//       bot.sendMessage(
//         chatId,
//         "Извините, произошла ошибка при выборе тарифа. Попробуйте снова."
//       );
//       break;
//   }
// };
