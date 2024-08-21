const logger = require("./app/logger");
const clientHandler = require("./processes/client/clientHandler");
const adminHandler = require("./processes/admin/adminHandler");
const commandHandler = require("./handlers/commandHandler");
const callbackHandler = require("./handlers/callbackHandler");

function initBot(bot) {
  bot.on("polling_error", (error) => {
    console.log("Ошибка опросам:", error);
    logger.error(`Ошибка опроса: ${error.message}`);
  });

  commandHandler(bot); // Подключаем обработчик команд
  callbackHandler(bot); // Подключаем обработчик нажатий кнопок

  clientHandler.init(bot);
  adminHandler.init(bot);
}

module.exports = {
  initBot,
};
