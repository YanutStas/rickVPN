const texts = require("../../shared/texts");
const manageRequests = require("../../features/admin/manageRequests");

module.exports.init = (bot) => {
  bot.on("message", (msg) => manageRequests.handle(bot, msg));
};

// const texts = require("../../shared/texts");
// const manageRequests = require("../../features/admin/manageRequests");

// module.exports.init = (bot) => {
//   bot.on("message", (msg) => manageRequests.handle(bot, msg));
// };
