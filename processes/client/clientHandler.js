const texts = require("../../shared/texts");
const selectTariff = require("../../features/client/selectTariff");
const startPage = require("../../pages/client/start");
const logger = require("../../app/logger");

module.exports.init = (bot) => {
  bot.onText(/\/start/, (msg) => {
    startPage.handle(bot, msg); 
  });

  bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const userName = callbackQuery.from.first_name || "друг";
    const action = callbackQuery.data;

    logger.info(
      `Пользователь ${userName} (${chatId}) нажал на кнопку: ${action}`
    );

    switch (action) {
      case "buy_vpn":
        bot.sendMessage(
          chatId,
          "Молодец, а теперь почитай сначала инструкцию, а потом выбери тариф, если всё понятно.",
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
        bot.sendMessage(
          chatId,
          "Жмякай на кнопки и не тормози (а то вдруг всё закончится?):",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Тариф на 1 месяц", callback_data: "monthly_tariff" }],
                [
                  {
                    text: "Тариф на 6 месяцев",
                    callback_data: "semiannual_tariff",
                  },
                ],
              ],
            },
          }
        );
        break;

      case "monthly_tariff":
      case "semiannual_tariff":
      case "tariff_310_monthly":
      case "tariff_350_monthly":
      case "tariff_600_monthly":
      case "tariff_1550_semiannual":
      case "tariff_1750_semiannual":
      case "tariff_3000_semiannual":
        selectTariff.handle(bot, chatId, action);
        break;

      case "price":
        bot.sendMessage(chatId, texts.priceMessage, { parse_mode: "Markdown" });
        break;

      default:
        logger.error(`Неизвестное действие: ${action}`);
        bot.sendMessage(
          chatId,
          "Извините, произошла ошибка. Попробуйте снова."
        );
        break;
    }
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    if (msg.photo || msg.document) {
      bot.sendMessage(chatId, texts.userCompletionMessage, {
        parse_mode: "Markdown",
      });
      logger.info(
        `Получен чек от пользователя: ${msg.from.first_name} (${chatId})`
      );
    }
  });
};

// const texts = require("../../shared/texts");
// const selectTariff = require("../../features/client/selectTariff");
// const startPage = require("../../pages/client/start");
// const logger = require("../../app/logger");

// module.exports.init = (bot) => {
//   bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     const userName = msg.from.first_name || "друг";
//     logger.info(`Пользователь ${userName} (${chatId}) выполнил команду /start`);
//     startPage.render(bot, msg);
//   });

//   bot.on("callback_query", (callbackQuery) => {
//     const chatId = callbackQuery.message.chat.id;
//     const userName = callbackQuery.from.first_name || "друг";
//     const action = callbackQuery.data;

//     // Проверка, чтобы логгер вызывался только один раз
//     logger.info(
//       `Пользователь ${userName} (${chatId}) нажал на кнопку: ${action}`
//     );

//     switch (action) {
//       case "buy_vpn":
//         bot.sendMessage(
//           chatId,
//           "Молодец, а теперь почитай сначала инструкцию, а потом выбери тариф, если всё понятно.",
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
//           "Жмякай на кнопки и не тормози (а то вдруг всё закончится?):",
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

//       // Передаем обработку тарифов в selectTariff.js
//       case "monthly_tariff":
//       case "semiannual_tariff":
//       case "tariff_310_monthly":
//       case "tariff_350_monthly":
//       case "tariff_600_monthly":
//       case "tariff_1550_semiannual":
//       case "tariff_1750_semiannual":
//       case "tariff_3000_semiannual":
//         selectTariff.handle(bot, chatId, action);
//         break;

//       case "price":
//         bot.sendMessage(chatId, texts.priceMessage, { parse_mode: "Markdown" });
//         break;

//       default:
//         logger.error(`Неизвестное действие: ${action}`);
//         bot.sendMessage(
//           chatId,
//           "Извините, произошла ошибка. Попробуйте снова."
//         );
//         break;
//     }
//   });

//   bot.on("message", (msg) => {
//     const chatId = msg.chat.id;

//     // Проверяем, отправил ли пользователь чек
//     if (msg.photo || msg.document) {
//       bot.sendMessage(chatId, texts.userCompletionMessage, {
//         parse_mode: "Markdown",
//       });
//       logger.info(
//         `Получен чек от пользователя: ${msg.from.first_name} (${chatId})`
//       );
//     }
//   });
// };

// const texts = require("../../shared/texts");
// const selectTariff = require("../../features/client/selectTariff");
// const startPage = require("../../pages/client/start");
// const logger = require("../../app/logger");

// module.exports.init = (bot) => {
//   bot.onText(/\/start/, (msg) => startPage.render(bot, msg));

//   bot.on("callback_query", (callbackQuery) => {
//     const chatId = callbackQuery.message.chat.id;
//     const userName = callbackQuery.from.first_name || "друг";
//     const action = callbackQuery.data;

//     // Логируем нажатие на кнопку
//     logger.info(
//       `Пользователь ${userName} (${chatId}) нажал на кнопку: ${action}`
//     );

//     switch (action) {
//       case "buy_vpn":
//         bot.sendMessage(
//           chatId,
//           "Молодец, а теперь почитай сначала инструкцию, а потом выбери тариф, если всё понятно.",
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
//           "Жмякай на кнопки и не тормози (а то вдруг всё закончится?):",
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

//       // Передаем обработку тарифов в selectTariff.js
//       case "monthly_tariff":
//       case "semiannual_tariff":
//       case "tariff_310_monthly":
//       case "tariff_350_monthly":
//       case "tariff_600_monthly":
//       case "tariff_1550_semiannual":
//       case "tariff_1750_semiannual":
//       case "tariff_3000_semiannual":
//         selectTariff.handle(bot, chatId, action);
//         break;

//       case "price":
//         bot.sendMessage(chatId, texts.priceMessage, { parse_mode: "Markdown" });
//         break;

//       default:
//         logger.error(`Неизвестное действие: ${action}`);
//         bot.sendMessage(
//           chatId,
//           "Извините, произошла ошибка. Попробуйте снова."
//         );
//         break;
//     }
//   });

//   bot.on("message", (msg) => {
//     const chatId = msg.chat.id;

//     // Проверяем, отправил ли пользователь чек
//     if (msg.photo || msg.document) {
//       bot.sendMessage(chatId, texts.userCompletionMessage, {
//         parse_mode: "Markdown",
//       });
//       logger.info(
//         `Пользователь ${msg.from.first_name} (${chatId}) отправил чек.`
//       );
//     }
//   });
// };
