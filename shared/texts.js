module.exports = {
  startMessage: (firstName) =>
    `Привет, *${firstName}*! Я rickVPN, и я помогу тебе получить доступ к свободному интернету. Заблокирован Instagram, Facebook или ещё что-то? Забей! Со мной ты забудешь об этих жалких ограничениях. Хватит ждать, подключайся и будь свободен!`,

  priceMessage: `*Прайс*\n\n💰 *До 3 подключенных устройств с одной учетки*: *310 рублей* в месяц.\n\n💸 *Больше 3 устройств, но не больше 10*: *350 рублей* в месяц.\n\n💼 *Более 10 устройств*: *600 рублей* в месяц.\n\n📅 *Тариф на 6 месяцев*: \n- *До 3 устройств*: *1550 рублей*.\n- *Больше 3 устройств, но не больше 10*: *1750 рублей*.\n- *Более 10 устройств*: *3000 рублей*.\n\nСчитай это защитой от тормозов. Если не хочешь, чтобы всё лагало, как старый Android, лучше заплати за нормальный сервер.`,

  paymentMessage: `
  *Способ 1: Через Т-Банк*
  [Кликни сюда](https://www.tinkoff.ru/rm/yanut.stanislav1/D8c0h68396) и следуй инструкциям.\n
  *Способ 2: Через Сбер*
  [Нажми сюда](https://www.sberbank.com/sms/pbpn?requisiteNumber=79517019281) и плати быстро и легко.\n
  *Способ 3: Сканируй этот QR-код и плати!*
  После оплаты обязательно отправь сюда чек, чтобы я знал, что ты не халявщик. Без чека ничего не произойдёт, дружок.`,

  connectMessage: `*Используй этот сервер, чтобы безопасно выходить в открытый интернет:*\n
  1) Скачай и установи приложение Outline на своё устройство:\n
  - iOS: [Здесь](https://itunes.apple.com/app/outline-app/id1356177741)
  - MacOS: [Здесь](https://itunes.apple.com/app/outline-app/id1356178125)
  - Windows: [Здесь](https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe)
  - Linux: [Здесь](https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage)
  - Android: [Здесь](https://play.google.com/store/apps/details?id=org.outline.android.client)
  - Android альтернативная ссылка: [Здесь](https://s3.amazonaws.com/outline-releases/client/android/stable/Outline-Client.apk)\n
  2) После того как админ-сан проверит твою оплату, ты получишь ключ доступа, который начинается с *ss://*. Как только получишь его, скопируй этот ключ.\n
  3) Открой приложение Outline. Если ключ доступа определился автоматически, нажми "Подключиться" и продолжай. Если ключ не определился автоматически, вставь его в поле, затем нажми "Подключиться" и продолжай.\n
  Теперь ты готов использовать открытый интернет!`,

  buyVpnMessage: (userName) =>
    `Окей, *${userName}*, ты решил заполучить себе VPN от rickVPN. Выбери, что хочешь узнать:`,

  // tariffSelectionMessage: `Выбери свой тарифный план:\n
  //   - *310 рублей* за до 3 устройств на месяц.
  //   - *350 рублей* за до 10 устройств на месяц.
  //   - *600 рублей* за более 10 устройств на месяц.`,

  tariffSelectionMessage: `Выбери свой тарифный план:\n
    - *310 рублей* до 3 устройств на месяц.
    - *350 рублей* до 10 устройств на месяц.
    - *600 рублей* за более 10 устройств на месяц.`,

  semiAnnualTariffMessage: `Выбери свой тарифный план на 6 месяцев:\n
    - *1550 рублей* до 3 устройств.
    - *1750 рублей* до 10 устройств.
    - *3000 рублей* за более 10 устройств.`,

  adminNotificationMessage: (userName, tariff, paymentInfo, comment) =>
    `*Дата и время обращения:* ${new Date().toLocaleString()}\n*Пользователь:* ${userName}\n*Тариф:* ${tariff}\n*Отправленный чек:* ${paymentInfo}\n*Комментарий пользователя:* ${
      comment || "Комментарий отсутствует"
    }`,

  userCompletionMessage: `Спасибо за оформление заявки! Админ работает с 9:00 до 21:00, так что ожидай проверки и выдачи доступа в это время. А пока можешь расслабиться и представить, как ты уже гуляешь по открытому интернету!`,
};
