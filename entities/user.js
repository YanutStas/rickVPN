// entities/userStates.js

const userOrderStates = {};

module.exports = {
  // Проверяем, находится ли пользователь в процессе заказа
  isUserOrdering: (userId) => {
    return userOrderStates[userId] === "ordering";
  },

  // Устанавливаем пользователя в процесс заказа
  startOrder: (userId) => {
    userOrderStates[userId] = "ordering";
  },

  // Завершаем процесс заказа пользователя
  completeOrder: (userId) => {
    delete userOrderStates[userId];
  },
};
