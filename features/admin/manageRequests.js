require("dotenv").config();
const notifications = require("../../widgets/admin/notifications");

module.exports.handle = (bot, msg, tariff) => {
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

  // Преобразуем тариф в читаемый формат
  let tariffDescription = "";
  switch (tariff) {
    case "tariff_310_monthly":
      tariffDescription = "на 1 месяц тариф 310 рублей";
      break;
    case "tariff_350_monthly":
      tariffDescription = "на 1 месяц тариф 350 рублей";
      break;
    case "tariff_600_monthly":
      tariffDescription = "на 1 месяц тариф 600 рублей";
      break;
    case "tariff_1550_semiannual":
      tariffDescription = "на 6 месяцев тариф 1550 рублей";
      break;
    case "tariff_1750_semiannual":
      tariffDescription = "на 6 месяцев тариф 1750 рублей";
      break;
    case "tariff_3000_semiannual":
      tariffDescription = "на 6 месяцев тариф 3000 рублей";
      break;
    default:
      tariffDescription = "тариф не выбран";
  }

  const message = `${dateTime} Пользователь ${userName} (${userId}) оформил заказ ${tariffDescription}`;

  notifications.notifyAdmin(bot, adminChatId, message);
};

// require("dotenv").config();
// const notifications = require("../../widgets/admin/notifications");

// module.exports.handle = (bot, msg) => {
//   const adminChatId = process.env.ADMIN_CHAT_ID;

//   const userName = msg.from.first_name || "Неизвестный пользователь";
//   const userId = msg.from.id;
//   const dateTime = new Date().toLocaleString('ru-RU', {
//     timeZone: 'Europe/Moscow',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric'
//   });

//   const message = `${dateTime} Пользователь ${userName} (${userId}) оформил заказ`;

//   notifications.notifyAdmin(bot, adminChatId, message);
// };
