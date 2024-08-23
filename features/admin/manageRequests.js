require("dotenv").config(); 

module.exports.handle = (bot, msg) => {
  const adminChatId = process.env.ADMIN_CHAT_ID; 

  // Отправляем тестовое сообщение админу
  bot.sendMessage(adminChatId, "Бугагашенька").catch((error) => {
    console.log(`Ошибка при отправке сообщения админу: ${error.message}`);
  });
};
