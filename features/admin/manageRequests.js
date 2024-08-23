require("dotenv").config();
const notifications = require("../../widgets/admin/notifications");

module.exports.handle = (bot, msg) => {
  const adminChatId = process.env.ADMIN_CHAT_ID;

  const userName = msg.from.first_name || "Неизвестный пользователь";
  const userId = msg.from.id;
  const dateTime = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const message = `${dateTime} Пользователь ${userName} (${userId}) оформил заказ`;

  notifications.notifyAdmin(bot, adminChatId, message);
};



// require("dotenv").config(); 
// const notifications = require("../../widgets/admin/notifications");

// module.exports.handle = (bot, msg) => {
//   const adminChatId = process.env.ADMIN_CHAT_ID; 
//   notifications.notifyAdmin(bot, adminChatId, "Бугагашенька");
// };