const texts = require("../../shared/texts");
const manageRequests = require("../../features/admin/manageRequests");

module.exports.init = (bot) => {
  let selectedTariff = "";

  bot.on("callback_query", (callbackQuery) => {
    const action = callbackQuery.data;
    if (action.startsWith("tariff_")) {
      selectedTariff = action.replace("tariff_", ""); // Сохраняем выбранный тариф
    }
  });

  bot.on("message", (msg) => {
    manageRequests.handle(bot, msg, selectedTariff); // Передаем выбранный тариф в manageRequests
  });
};

// const texts = require("../../shared/texts");
// const manageRequests = require("../../features/admin/manageRequests");

// module.exports.init = (bot) => {
//   let selectedTariff = ""; // Добавляем переменную для хранения тарифа

//   bot.on("callback_query", (callbackQuery) => {
//     const action = callbackQuery.data;
//     if (action.startsWith("tariff_")) {
//       selectedTariff = action.replace("tariff_", ""); // Сохраняем выбранный тариф
//     }
//   });

//   bot.on("message", (msg) => {
//     manageRequests.handle(bot, msg, selectedTariff); // Передаем выбранный тариф в manageRequests
//   });
// };
