const texts = require("../../shared/texts");
const startPage = require("../../pages/client/start");
const selectTariff = require("../../features/client/selectTariff");
const logger = require("../../app/logger");

module.exports.init = (bot) => {
  bot.onText(/\/start/, (msg) => startPage.render(bot, msg));

  bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const userName = callbackQuery.from.first_name || "друг";
    const action = callbackQuery.data;

    // Логируем нажатие на кнопку
    logger.info(
      `Пользователь ${userName} (${chatId}) нажал на кнопку: ${action}`
    );

    switch (action) {
      case "buy_vpn":
        bot.sendMessage(
          chatId,
          "Молодец, а теперь почитай сначала инструкцию, а потом выбери тариф, если всё понятно",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Инструкция", callback_data: "instruction" }],
                [{ text: "Выбор тарифа", callback_data: "choose_tariff" }],
              ],
            },
          }
        );
        break;

      case "instruction":
        bot.sendMessage(chatId, texts.instructionMessage, {
          parse_mode: "Markdown",
        });
        break;

      case "choose_tariff":
        selectTariff.handle(bot, chatId, action);
        break;

      case "price":
        bot.sendMessage(chatId, texts.priceMessage, { parse_mode: "Markdown" });
        break;

      default:
        selectTariff.handle(bot, chatId, action); // Обработка выбора тарифа перенесена в selectTariff.js
        break;
    }
  });
};

// const texts = require("../../shared/texts");
// const selectTariff = require("../../features/client/selectTariff");
// const payment = require("../../features/client/payment");
// const startPage = require("../../pages/client/start");
// const logger = require("../../app/logger"); // Подключаем логгер

// module.exports.init = (bot) => {
//   bot.onText(/\/start/, (msg) => startPage.render(bot, msg));

//   bot.on("callback_query", (callbackQuery) => {
//     const chatId = callbackQuery.message.chat.id;
//     const userName = callbackQuery.from.first_name || "друг";
//     const action = callbackQuery.data;

//     // Логируем нажатие на кнопку
//     logger.info(`Пользователь ${userName} (${chatId}) нажал на кнопку: ${action}`);

//     switch (action) {
//       case "buy_vpn":
//         bot.sendMessage(
//           chatId,
//           "Молодец, а теперь почитай сначала инструкцию, а потом выбери тариф, если всё понятно",
//           {
//             reply_markup: {
//               inline_keyboard: [
//                 [{ text: "Инструкция", callback_data: "instruction" }],
//                 [{ text: "Выбор тарифа", callback_data: "choose_tariff" }],
//               ],
//             },
//           }
//         );
//         break;

//       case "instruction":
//         bot.sendMessage(chatId, texts.instructionMessage, {
//           parse_mode: "Markdown",
//         });
//         break;

//       case "choose_tariff":
//         bot.sendMessage(
//           chatId,
//           "Жмякай на кнопки и не тормози(а то вдруг всё закончится?):",
//           {
//             reply_markup: {
//               inline_keyboard: [
//                 [{ text: "Тариф на 1 месяц", callback_data: "monthly_tariff" }],
//                 [
//                   {
//                     text: "Тариф на 6 месяцев",
//                     callback_data: "semiannual_tariff",
//                   },
//                 ],
//               ],
//             },
//           }
//         );
//         break;

//       case "monthly_tariff":
//         bot.sendMessage(chatId, "Выберите тариф на 1 месяц:", {
//           reply_markup: {
//             inline_keyboard: [
//               [{ text: "310 рублей/мес", callback_data: "tariff_310_monthly" }],
//               [{ text: "350 рублей/мес", callback_data: "tariff_350_monthly" }],
//               [{ text: "600 рублей/мес", callback_data: "tariff_600_monthly" }],
//             ],
//           },
//         });
//         break;

//       case "semiannual_tariff":
//         bot.sendMessage(chatId, "Выберите тариф на 6 месяцев:", {
//           reply_markup: {
//             inline_keyboard: [
//               [
//                 {
//                   text: "1550 руб./6 мес.",
//                   callback_data: "tariff_1550_semiannual",
//                 },
//               ],
//               [
//                 {
//                   text: "1750 руб./6 мес.",
//                   callback_data: "tariff_1750_semiannual",
//                 },
//               ],
//               [
//                 {
//                   text: "3000 руб./6 мес.",
//                   callback_data: "tariff_3000_semiannual",
//                 },
//               ],
//             ],
//           },
//         });
//         break;

//       // Обработка тарифов на 1 месяц
//       case "tariff_310_monthly":
//       case "tariff_350_monthly":
//       case "tariff_600_monthly":
//         bot.sendMessage(chatId, texts.paymentMessage, {
//           parse_mode: "Markdown",
//         });
//         break;

//       // Обработка тарифов на 6 месяцев
//       case "tariff_1550_semiannual":
//       case "tariff_1750_semiannual":
//       case "tariff_3000_semiannual":
//         bot.sendMessage(chatId, texts.paymentMessage, {
//           parse_mode: "Markdown",
//         });
//         break;

//       case "price":
//         bot.sendMessage(chatId, texts.priceMessage, { parse_mode: "Markdown" });
//         break;

//       default:
//         break;
//     }
//   });
// };
