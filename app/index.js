const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const clientHandler = require("../processes/client/clientHandler");
const adminHandler = require("../processes/admin/adminHandler");

const token = "7467111905:AAFykJCshfozhNjIoKyFoiZR5DPhR1jI2Bc";
const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (error) => {
  console.log("Polling error:", error);
});

clientHandler.init(bot); // Инициализация клиентских обработчиков
adminHandler.init(bot); // Инициализация админских обработчиков
