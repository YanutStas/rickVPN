require("dotenv").config();
const notifications = require("../../widgets/admin/notifications");
const selectTariff = require("../../features/client/selectTariff");

module.exports.handle = (bot, msg) => {
  const adminChatId = process.env.ADMIN_CHAT_ID;

  const userName = msg.from.first_name || "Неизвестный пользователь";
  const userId = msg.from.id;
  const dateTime = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const selectedTariff = selectTariff.getSelectedTariff() || "Не выбран";

  const message = `📅 ${dateTime}\n👤 Пользователь: ${userName} (ID: ${userId})\n📦 Оформил заказ на:\n ${selectedTariff}`;

  notifications.notifyAdmin(bot, adminChatId, message);

  // Отправляем фото чека админу, если оно есть
  if (msg.photo && msg.photo.length > 0) {
    const fileId = msg.photo[msg.photo.length - 1].file_id; // Берем наибольшее изображение
    bot
      .sendPhoto(adminChatId, fileId, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Подтвердить",
                callback_data: `confirm_${userId}`,
              },
              {
                text: "❌ Не подтвердить",
                callback_data: `decline_${userId}`,
              },
            ],
          ],
        },
      })
      .catch((error) => {
        console.error(`Ошибка при пересылке фото админу: ${error.message}`);
      });
  } else if (msg.document) {
    const fileId = msg.document.file_id;
    bot
      .sendDocument(adminChatId, fileId, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Подтвердить оплату",
                callback_data: `confirm_${userId}`,
              },
              {
                text: "❌ Не подтвердить оплату",
                callback_data: `decline_${userId}`,
              },
            ],
          ],
        },
      })
      .catch((error) => {
        console.error(
          `Ошибка при пересылке документа админу: ${error.message}`
        );
      });
  }
};