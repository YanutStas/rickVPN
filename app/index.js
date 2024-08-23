const logger = require("./logger");

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const clientHandler = require("../processes/client/clientHandler");
const adminHandler = require("../processes/admin/adminHandler");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (error) => {
  console.log("Ошибка опроса:", error);
  logger.error(`Ошибка опроса: ${error.message}`);
});

// Логируем нажатие на любую кнопку и обрабатываем нажатия
bot.on("callback_query", (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const username = msg.chat.username;
});

clientHandler.init(bot);
adminHandler.init(bot);

// Пример использования console.log для обычных сообщений
console.log("Бот успешно запущен и ожидает команд.");



// const logger = require("./logger");

// require("dotenv").config();
// const TelegramBot = require("node-telegram-bot-api");
// const clientHandler = require("../processes/client/clientHandler");
// const adminHandler = require("../processes/admin/adminHandler");
// const texts = require("../shared/texts");

// const token = process.env.TELEGRAM_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// bot.on("polling_error", (error) => {
//   console.log("Ошибка опроса:", error);
//   logger.error(`Ошибка опроса: ${error.message}`);
// });

// // Логируем нажатие на /start команду
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const firstName = msg.from.first_name || "друг";
//   logger.info(`Пользователь ${firstName} (${chatId}) выполнил команду /start`);

//   // Отправляем приветственное сообщение с кнопками
//   bot.sendMessage(chatId, texts.startMessage(firstName), {
//     parse_mode: "Markdown",
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: "Купить VPN", callback_data: "buy_vpn" }],
//         [{ text: "Прайс", callback_data: "price" }],
//       ],
//     },
//   });
// });

// // Логируем нажатие на любую кнопку и обрабатываем нажатия
// bot.on("callback_query", (callbackQuery) => {
//   const action = callbackQuery.data;
//   const msg = callbackQuery.message;
//   const username = msg.chat.username;
// });

// clientHandler.init(bot);
// adminHandler.init(bot);

// // Пример использования console.log для обычных сообщений
// console.log("Бот успешно запущен и ожидает команд.");
