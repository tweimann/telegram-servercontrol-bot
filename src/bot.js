const settings = require('./settings.json')
const auth = require('./auth.json')

const TelegramBot = require('node-telegram-bot-api')

let bot
bot = new TelegramBot(auth.telegramAPIKey, { polling: true })

bot.onText(/\/scping/, (msg, match) => {
    if (!settings.chatID.includes(String(msg.chat.id))) {return false}
    if (!settings.adminAccounts.includes(msg.from.username) && !msg.from.is_bot) {return false}
    bot.sendMessage(msg.chat.id, 'Pong! @' + msg.from.username)
})

bot.onText(/\/scecho (.+)/, (msg, match) => {
    if (!settings.chatID.includes(String(msg.chat.id))) {return false}
    if (!settings.adminAccounts.includes(msg.from.username) && !msg.from.is_bot) {return false}
    console.log('message recieved: echo')
    bot.sendMessage(msg.chat.id, 'echo: ' + match[1])
})