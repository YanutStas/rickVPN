const { createLogger, format, transports } = require("winston");
const { combine, printf } = format;
const moment = require("moment-timezone");

// Создаем формат вывода сообщений на русском
const myFormat = printf(({ level, message }) => {
  // Получаем текущее время по Москве в нужном формате
  const timestamp = moment().tz("Europe/Moscow").format("HH:mm DD.MM.YYYY");
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Настраиваем логгер
const logger = createLogger({
  format: combine(myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = logger;
