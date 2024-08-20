const logger = require("./logger"); // Путь до логгера

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const clientHandler = require("../processes/client/clientHandler");
const adminHandler = require("../processes/admin/adminHandler");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (error) => {
  console.log("Ошибка опроса:", error);
  logger.error(`Ошибка опроса: ${error.message}`);
});

// Логируем нажатие на /start команду
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  logger.info(`Пользователь ${username} (${chatId}) выполнил команду /start`);
  bot.sendMessage(chatId, "Добро пожаловать в RickVPN!");
});

// Логируем нажатие на любую кнопку
bot.on("callback_query", (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const username = msg.chat.username;
  logger.info(
    `Пользователь ${username} (${msg.chat.id}) нажал на кнопку: ${action}`
  );
  // Твой код для обработки нажатия кнопки...
});

clientHandler.init(bot);
adminHandler.init(bot);

// Пример использования console.log для обычных сообщений
console.log("Бот успешно запущен и ожидает команд.");
