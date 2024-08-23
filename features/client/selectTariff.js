const texts = require("../../shared/texts");
const payment = require("../../features/client/payment");
const logger = require("../../app/logger");

let selectedTariff = ""; // Глобальная переменная для хранения выбранного тарифа

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
      selectedTariff = "1 месяц тариф 310 рублей";
      payment.handle(bot, chatId);
      break;
    case "tariff_350_monthly":
      selectedTariff = "1 месяц тариф 350 рублей";
      payment.handle(bot, chatId);
      break;
    case "tariff_600_monthly":
      selectedTariff = "1 месяц тариф 600 рублей";
      payment.handle(bot, chatId);
      break;

    // Обработка тарифов на 6 месяцев
    case "tariff_1550_semiannual":
      selectedTariff = "6 месяцев тариф 1550 рублей";
      payment.handle(bot, chatId);
      break;
    case "tariff_1750_semiannual":
      selectedTariff = "6 месяцев тариф 1750 рублей";
      payment.handle(bot, chatId);
      break;
    case "tariff_3000_semiannual":
      selectedTariff = "6 месяцев тариф 3000 рублей";
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

module.exports.getSelectedTariff = () => selectedTariff;

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
//       payment.handle(bot, chatId);
//       break;

//     // Обработка тарифов на 6 месяцев
//     case "tariff_1550_semiannual":
//     case "tariff_1750_semiannual":
//     case "tariff_3000_semiannual":
//       payment.handle(bot, chatId);
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
