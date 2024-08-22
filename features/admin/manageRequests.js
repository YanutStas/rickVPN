require("dotenv").config(); // Подключаем dotenv
const texts = require("../../shared/texts");

module.exports.handle = (bot, msg) => {
  const chatId = msg.chat.id;
  const adminChatId = process.env.ADMIN_CHAT_ID; // Используем переменную из .env

  // Извлекаем данные пользователя и тариф
  const userName = msg.from.first_name || "Пользователь";
  const tariff = msg.tariff || "Не указан"; // Убедитесь, что при выборе тарифа вы устанавливаете его в объект msg
  const paymentInfo = msg.photo ? "Фото чека" : "Документ с чеком";
  const comment = msg.text || "";

  // Формируем сообщение для админа
  const adminMessage = texts.adminNotificationMessage(
    userName,
    tariff,
    paymentInfo,
    comment
  );

  // Отправляем админское уведомление
  bot.sendMessage(adminChatId, adminMessage, { parse_mode: "Markdown" });

  // Пересылаем чек администратору
  if (msg.photo || msg.document) {
    bot.forwardMessage(adminChatId, chatId, msg.message_id);
  }

  // Дополнительная логика обработки чека и комментариев
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
