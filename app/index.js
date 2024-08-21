const logger = require("./logger"); // Путь до логгера

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const clientHandler = require("../processes/client/clientHandler");
const adminHandler = require("../processes/admin/adminHandler");
const selectTariff = require("../features/client/selectTariff"); // Подключаем selectTariff.js
const texts = require("../shared/texts");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (error) => {
  console.log("Ошибка опроса:", error);
  logger.error(`Ошибка опроса: ${error.message}`);
});

// Логируем нажатие на /start команду
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "друг";
  logger.info(`Пользователь ${firstName} (${chatId}) выполнил команду /start`);

  // Отправляем приветственное сообщение с кнопками
  bot.sendMessage(chatId, texts.startMessage(firstName), {
    parse_mode: "Markdown", // Убедимся, что указан режим Markdown
    reply_markup: {
      inline_keyboard: [
        [{ text: "Купить VPN", callback_data: "buy_vpn" }],
        [{ text: "Как подключиться", callback_data: "how_to_connect" }],
        [{ text: "Оплата", callback_data: "payment" }],
        [{ text: "Прайс", callback_data: "price" }],
      ],
    },
  });
});

// Логируем нажатие на любую кнопку и обрабатываем нажатия
bot.on("callback_query", (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const username = msg.chat.username;
  logger.info(
    `Пользователь ${username} (${msg.chat.id}) нажал на кнопку: ${action}`
  );

  // Обработка нажатий на кнопки тарифов
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
    selectTariff.handleTariffSelection(bot, msg.chat.id, "semi_annual_tariffs");
  // } else if (action === "payment") {
  //   bot.sendMessage(msg.chat.id, texts.paymentMessage);
  // } else if (action === "price") {
  //   bot.sendMessage(msg.chat.id, texts.priceMessage);
  }
  // Добавляем обработку других нажатий...
});

clientHandler.init(bot);
adminHandler.init(bot);

// Пример использования console.log для обычных сообщений
console.log("Бот успешно запущен и ожидает команд.");
