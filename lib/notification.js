/**
 * @format
 */

const ENV = process.env
const telegramBot = require('node-telegram-bot-api')
const bot = new telegramBot(ENV.TELEGRAM_BOT_TOKEN)

module.exports = {
  sendTelegramCM(data) {
    bot.sendMessage(ENV.TELEGRAM_CHANNEL_ID, data)
  },

  sendTelegramLogsCM(data) {
    bot.sendMessage(ENV.TELEGRAM_LOGS_CHANNEL_ID, data)
  },

  sendTelegramMyCM(data) {
    bot.sendMessage(ENV.MY_TELEGRAM_CHANNEL_ID, data)
  },
}
