require("dotenv").config(); // Подключаем dotenv
const texts = require("../../shared/texts");

module.exports.handle = (bot, msg, selectedTariff) => {
  // Добавляем selectedTariff
  const chatId = msg.chat.id;
  const adminChatId = process.env.ADMIN_CHAT_ID; // Используем переменную из .env
  const userName = msg.from.first_name || "Неизвестный пользователь";
  const paymentInfo = msg.photo
    ? "Фото чека"
    : msg.document
    ? "Файл с чеком"
    : "Неизвестно";
  const comment = msg.caption || "Комментарий отсутствует"; // Если пользователь добавил подпись к чеку, используем её как комментарий

  // Отправляем уведомление админу с информацией о заказе только при получении чека
  if (msg.photo || msg.document) {
    const adminNotification = texts.adminNotificationMessage(
      userName,
      selectedTariff,
      paymentInfo,
      comment
    );
    bot.sendMessage(adminChatId, adminNotification, { parse_mode: "Markdown" });

    // Пересылаем чек или документ администратору
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
