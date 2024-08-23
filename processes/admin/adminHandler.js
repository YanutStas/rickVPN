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

      // Передаём обработку в manageRequests
      manageRequests.handle(bot, msg);
    }

    // Проверяем, если сообщение от администратора для ввода ключа
    if (msg.text && msg.text.startsWith("key_")) {
      const [_, userId, uniqueKey] = msg.text.split("_");
      // const message = `Ваш индивидуальный код для подключения: ${uniqueKey}\n\n${texts.connectMessage}`;
      const message = `Ваш индивидуальный код для подключения: ${uniqueKey}\n\n${texts.connectMessage}`;
      if (userId && uniqueKey) {
        bot
          .sendMessage(userId, message, {
            parse_mode: "Markdown",
            disable_web_page_preview: true,
          })
          .then(() => {
            bot.sendMessage(
              chatId,
              "Инструкция с ключом отправлена пользователю."
            );
            logger.info(`Ключ ${uniqueKey} отправлен пользователю ${userId}`);
          })
          .catch((error) => {
            logger.error(`Ошибка при отправке инструкции: ${error.message}`);
            bot.sendMessage(
              chatId,
              "Ошибка при отправке инструкции пользователю."
            );
          });
      } else {
        logger.error("Неправильный формат команды ключа.");
        bot.sendMessage(
          chatId,
          "Неправильный формат команды. Используйте 'key_USERID_ВАШКЛЮЧ'."
        );
      }
    }
  });

  // Обрабатываем нажатия на кнопки от администратора
  bot.on("callback_query", (callbackQuery) => {
    const action = callbackQuery.data;
    const adminChatId = callbackQuery.message.chat.id;

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
            "Оплата подтверждена. Введите уникальный ключ в формате 'key_USERID_ВАШКЛЮЧ'."
          );
          logger.info(`Оплата пользователя ${userId} подтверждена.`);
        })
        .catch((error) => {
          logger.error(`Ошибка при подтверждении оплаты: ${error.message}`);
          bot.sendMessage(adminChatId, "Ошибка при подтверждении оплаты.");
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
          logger.info(`Оплата пользователя ${userId} не подтверждена.`);
        })
        .catch((error) => {
          logger.error(`Ошибка при отклонении оплаты: ${error.message}`);
          bot.sendMessage(adminChatId, "Ошибка при отклонении оплаты.");
        });
    }
  });
};

// require("dotenv").config();
// const manageRequests = require("../../features/admin/manageRequests");
// const logger = require("../../app/logger");
// const texts = require("../../shared/texts");

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

//     // Проверяем, если сообщение от администратора для ввода ключа
//     if (msg.text && msg.text.startsWith("key_")) {
//       const [_, userId, uniqueKey] = msg.text.split("_");
//       const message = `Ваш индивидуальный код для подключения: ${uniqueKey}\n\n${texts.connectMessage}`;
//       bot
//         .sendMessage(userId, message, { parse_mode: "Markdown" })
//         .then(() => {
//           bot.sendMessage(
//             chatId,
//             "Инструкция с ключом отправлена пользователю."
//           );
//         })
//         .catch((error) => {
//           logger.error(`Ошибка при отправке инструкции: ${error.message}`);
//           bot.sendMessage(
//             chatId,
//             "Ошибка при отправке инструкции пользователю."
//           );
//         });
//     }
//   });

//   // Обрабатываем нажатия на кнопки от администратора
//   bot.on("callback_query", (callbackQuery) => {
//     const action = callbackQuery.data;
//     const adminChatId = callbackQuery.message.chat.id;
//     const messageId = callbackQuery.message.message_id;

//     if (action.startsWith("confirm_")) {
//       const userId = action.replace("confirm_", "");
//       bot
//         .sendMessage(
//           userId,
//           "Ваша оплата подтверждена, ожидайте получение ключа в течение 24 часов."
//         )
//         .then(() => {
//           bot.sendMessage(
//             adminChatId,
//             "Оплата подтверждена. Введите уникальный ключ в формате 'key_USERID_ВАШКЛЮЧ'."
//           );
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
