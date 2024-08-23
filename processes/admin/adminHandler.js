require("dotenv").config();
const manageRequests = require("../../features/admin/manageRequests");
const logger = require("../../app/logger");
const texts = require("../../shared/texts");

module.exports.init = (bot) => {
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
      const customMessage = `
🎉 Поздравляем! Вы на шаг ближе к свободному интернету! Вот ваш индивидуальный ключ для подключения:
\`${uniqueKey}\`

Теперь следуйте этим простым шагам:
1️⃣ Скачайте и установите приложение Outline на ваше устройство: 
   - iOS: [Здесь](https://itunes.apple.com/app/outline-app/id1356177741)
   - MacOS: [Здесь](https://itunes.apple.com/app/outline-app/id1356178125)
   - Windows: [Здесь](https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe)
   - Linux: [Здесь](https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage)
   - Android: [Здесь](https://play.google.com/store/apps/details?id=org.outline.android.client)
   - Android альтернативная ссылка: [Здесь](https://s3.amazonaws.com/outline-releases/client/android/stable/Outline-Client.apk)

2️⃣ Запустите приложение Outline и вставьте ключ в поле, затем нажмите "Подключиться". Если ключ доступа определился автоматически — смело жмите "Подключиться" и вперёд!

3️⃣ Если что-то пошло не так и вы чувствуете, что ваше терпение заканчивается, не стесняйтесь заглянуть в наш [чат поддержки](https://t.me/your_chat_support_link). Мы вас не бросим!

И вот вы в мире без границ! Наслаждайтесь свободой интернета! 🎊`;

      if (userId && uniqueKey) {
        bot
          .sendMessage(userId, customMessage, {
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
