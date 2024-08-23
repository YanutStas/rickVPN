require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const clientHandler = require("../processes/client/clientHandler");
const adminHandler = require("../processes/admin/adminHandler");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

clientHandler.init(bot);
adminHandler.init(bot);
