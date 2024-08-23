require("dotenv").config();
const manageRequests = require("../../features/admin/manageRequests");
const logger = require("../../app/logger");
const texts = require("../../shared/texts");

module.exports.init = (bot) => {
  // Обрабатываем сообщения с чеками
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // Проверяем, отправил ли пользователь чек (фото или документ)
    if (msg.photo || msg.document) {
      logger.info(
        `Получен чек от пользователя: ${msg.from.first_name} (${chatId})`
      );

      // Просто передаём обработку в manageRequests
      manageRequests.handle(bot, msg);
    }
  });

  // Обрабатываем нажатия на кнопки от администратора
  bot.on("callback_query", (callbackQuery) => {
    const action = callbackQuery.data;
    const adminChatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;

    if (action.startsWith("confirm_")) {
      const userId = action.replace("confirm_", "");
      bot
        .sendMessage(
          userId,
          "Ваша оплата подтверждена, ожидайте получение ключа в течение 24 часов."
        )
        .then(() => {
          bot.sendMessage(
            adminChatId,
            "Оплата подтверждена. Выберите следующее действие:",
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Отправить инструкцию",
                      callback_data: `send_instructions_${userId}`,
                    },
                    {
                      text: "Связаться с поддержкой",
                      callback_data: `contact_support_${userId}`,
                    },
                  ],
                ],
              },
            }
          );
        });
    } else if (action.startsWith("decline_")) {
      const userId = action.replace("decline_", "");
      bot
        .sendMessage(
          userId,
          "Ваша оплата не подтверждена, подождите в течение 24 часов или напишите в наш чат."
        )
        .then(() => {
          bot.sendMessage(adminChatId, "Оплата не подтверждена.");
        });
    }

    // Обработка нажатий на кнопки для отправки инструкций и поддержки
    if (action.startsWith("send_instructions_")) {
      const userId = action.replace("send_instructions_", "");
      const uniqueKey = generateUniqueKey(); // Функция генерации уникального ключа

      const message = `Ваш индивидуальный код для подключения: ${uniqueKey}\n\n${texts.connectMessage}`;
      bot.sendMessage(userId, message, { parse_mode: "Markdown" }).then(() => {
        bot.sendMessage(adminChatId, "Инструкция отправлена пользователю.");
      });
    } else if (action.startsWith("contact_support_")) {
      const userId = action.replace("contact_support_", "");
      const supportLink = "https://t.me/your_support_chat"; // Ссылка на чат поддержки

      bot
        .sendMessage(
          userId,
          `Для связи с поддержкой, пожалуйста, перейдите по следующей ссылке: [Чат поддержки](${supportLink})`,
          { parse_mode: "Markdown" }
        )
        .then(() => {
          bot.sendMessage(
            adminChatId,
            "Ссылка на чат поддержки отправлена пользователю."
          );
        });
    }
  });
};

// Функция генерации уникального ключа
function generateUniqueKey() {
  // Здесь можно использовать любой метод генерации ключей
  return `ss://${Math.random().toString(36).substr(2, 8)}`;
}

// require("dotenv").config();
// const manageRequests = require("../../features/admin/manageRequests");
// const logger = require("../../app/logger");

// module.exports.init = (bot) => {
//   // Обрабатываем сообщения с чеками
//   bot.on("message", (msg) => {
//     const chatId = msg.chat.id;

//     // Проверяем, отправил ли пользователь чек (фото или документ)
//     if (msg.photo || msg.document) {
//       logger.info(
//         `Получен чек от пользователя: ${msg.from.first_name} (${chatId})`
//       );

//       // Просто передаём обработку в manageRequests
//       manageRequests.handle(bot, msg);
//     }
//   });

//   // Обрабатываем нажатия на кнопки от администратора
//   bot.on("callback_query", (callbackQuery) => {
//     const action = callbackQuery.data;
//     const adminChatId = callbackQuery.message.chat.id;

//     // Проверяем действие
//     if (action.startsWith("confirm_")) {
//       const userId = action.replace("confirm_", "");
//       bot
//         .sendMessage(
//           userId,
//           "Ваша оплата подтверждена, ожидайте получение ключа в течение 24 часов."
//         )
//         .then(() => {
//           bot.sendMessage(adminChatId, "Оплата подтверждена.");
//         });
//     } else if (action.startsWith("decline_")) {
//       const userId = action.replace("decline_", "");
//       bot
//         .sendMessage(
//           userId,
//           "Ваша оплата не подтверждена, подождите в течение 24 часов или напишите в наш чат."
//         )
//         .then(() => {
//           bot.sendMessage(adminChatId, "Оплата не подтверждена.");
//         });
//     }
//   });
// };
