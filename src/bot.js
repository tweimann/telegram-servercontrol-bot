// packages
const TelegramBot = require('node-telegram-bot-api')
const { config } = require('dotenv')
config()

// imports
const log = require('./log.js')

// define vars
const auth = {
    "telegramAPIKey": process.env.TELEGRAM_API_KEY,
}
const settings = {
    "debug": process.env.DEBUG,
    "adminAccounts": process.env.ADMINS.split(','),
    "chatID": process.env.CHATID.split(','),
    "probeInterval": process.env.PROBE_INTERVAL
}

// define bot
let bot
bot = new TelegramBot(auth.telegramAPIKey, { polling: true })

// debug commands
if (settings.debug) {
    // ping command
    bot.onText(/\/scping/, (msg, match) => {
        if (!settings.chatID.includes(String(msg.chat.id))) {return false}
        if (!settings.adminAccounts.includes(msg.from.username) && !msg.from.is_bot) {return false}
        log.console('debug', 'message recieved: ping')
        bot.sendMessage(msg.chat.id, 'Pong! @' + msg.from.username)
    })

    // echo command
    bot.onText(/\/scecho (.+)/, (msg, match) => {
        if (!settings.chatID.includes(String(msg.chat.id))) {return false}
        if (!settings.adminAccounts.includes(msg.from.username) && !msg.from.is_bot) {return false}
        log.console('debug', 'message recieved: echo')
        bot.sendMessage(msg.chat.id, 'echo: ' + match[1])
    })

    //bot.sendMessage(settings.chatID[0], 'Debug: Bot started')
    bot.onText(/\/scmsg (.+)/, (msg) => {
        log.console('debug', msg)
    })
}