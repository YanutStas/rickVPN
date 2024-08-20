const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

// Создаем формат вывода сообщений на русском
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Настраиваем логгер
const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = logger;
