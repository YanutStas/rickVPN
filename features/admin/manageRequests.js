require("dotenv").config(); // Подключаем dotenv для использования переменных из .env
const texts = require("../../shared/texts");
const logger = require("../../app/logger");

module.exports.handle = (bot, msg, orderDetails) => {
  const adminChatId = process.env.ADMIN_CHAT_ID; // Используем ADMIN_CHAT_ID из .env

  // Формируем уведомление для админа
  const adminNotification = texts.adminNotificationMessage(
    orderDetails.userName,
    orderDetails.tariff || "Тариф не указан",
    orderDetails.paymentInfo,
    orderDetails.comment
  );

  // Отправляем сообщение админу с полной информацией о заказе
  bot
    .sendMessage(adminChatId, adminNotification, { parse_mode: "Markdown" })
    .then(() => {
      // Пересылаем чек админу после отправки уведомления
      bot.forwardMessage(adminChatId, msg.chat.id, msg.message_id);
    })
    .catch((error) => {
      logger.error(`Ошибка при отправке сообщения админу: ${error.message}`);
    });
};

// require("dotenv").config(); // Подключаем dotenv
// const texts = require("../../shared/texts");

// module.exports.handle = (bot, msg, selectedTariff) => {
//   const chatId = msg.chat.id;
//   const adminChatId = process.env.ADMIN_CHAT_ID; // Используем переменную из .env
//   const userName = msg.from.first_name || "Неизвестный пользователь";
//   const paymentInfo = msg.photo
//     ? "Фото чека"
//     : msg.document
//     ? "Файл с чеком"
//     : "Неизвестно";
//   const comment = msg.caption || "Комментарий отсутствует"; // Если пользователь добавил подпись к чеку, используем её как комментарий

//   // Отправляем уведомление админу с информацией о заказе только при получении чека
//   if (msg.photo || msg.document) {
//     // Отправляем информацию о заказе админу
//     const adminNotification = texts.adminNotificationMessage(
//       userName,
//       selectedTariff,
//       paymentInfo,
//       comment
//     );
//     bot
//       .sendMessage(adminChatId, adminNotification, { parse_mode: "Markdown" })
//       .then(() => {
//         // Пересылаем чек или документ администратору после отправки текста
//         bot.forwardMessage(adminChatId, chatId, msg.message_id);
//       });
//   }
// };
