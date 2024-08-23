require("dotenv").config(); 
const notifications = require("../../widgets/admin/notifications");

module.exports.handle = (bot, msg) => {
  const adminChatId = process.env.ADMIN_CHAT_ID; 
  notifications.notifyAdmin(bot, adminChatId, "Бугагашенька");
};



// require("dotenv").config(); 

// module.exports.handle = (bot, msg) => {
//   const adminChatId = process.env.ADMIN_CHAT_ID; 

//   // Отправляем тестовое сообщение админу
//   bot.sendMessage(adminChatId, "Бугагашенька").catch((error) => {
//     console.log(`Ошибка при отправке сообщения админу: ${error.message}`);
//   });
// };
