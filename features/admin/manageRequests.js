require("dotenv").config(); // Подключаем dotenv
const texts = require("../../shared/texts");

module.exports.handle = (bot, msg) => {
  const chatId = msg.chat.id;
  const adminChatId = process.env.ADMIN_CHAT_ID; // Используем переменную из .env
  const userName = msg.from.first_name || "Неизвестный пользователь";
  const tariff = msg.text || "Не указан"; // Здесь нужно как-то получать выбранный тариф. Можно передать его в тексте или сохранить в сессии.
  const paymentInfo = msg.photo ? "Фото чека" : "Файл с чеком";
  const comment = msg.caption || ""; // Если пользователь добавил подпись к чеку, используем её как комментарий

  // Отправляем уведомление админу с информацией о заказе
  const adminNotification = texts.adminNotificationMessage(
    userName,
    tariff,
    paymentInfo,
    comment
  );
  bot.sendMessage(adminChatId, adminNotification, { parse_mode: "Markdown" });

  // Пересылаем чек или документ администратору
  if (msg.photo || msg.document) {
    bot.forwardMessage(adminChatId, chatId, msg.message_id);
  }

  // Дополнительная логика обработки чека и комментариев, если нужно
};

// require("dotenv").config(); // Подключаем dotenv
// const texts = require("../../shared/texts");

// module.exports.handle = (bot, msg) => {
//   const chatId = msg.chat.id;
//   const adminChatId = process.env.ADMIN_CHAT_ID; // Используем переменную из .env

//   if (msg.photo || msg.document) {
//     bot.forwardMessage(adminChatId, chatId, msg.message_id);
//   }

//   // Дополнительная логика обработки чека и комментариев
// };
