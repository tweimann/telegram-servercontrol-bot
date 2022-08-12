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

function msgFilter(strength, msg) {
    if (strength >= 1) {if (msg.from.is_bot) {return false}}
    if (strength >= 2) {if (!settings.chatID.includes(String(msg.chat.id))) {return false}}
    if (strength >= 3) {if (!settings.adminAccounts.includes(msg.from.username)) {return false}}
}

// debug commands
if (settings.debug) {
    // ping command
    bot.onText(/\/scping/, (msg, match) => {
        if (msgFilter(3, msg) == false) {return false}
        log.console('debug', 'message recieved: ping')
        bot.sendMessage(msg.chat.id, 'Pong! @' + msg.from.username)
    })

    // echo command
    bot.onText(/\/scecho (.+)/, (msg, match) => {
        if (msgFilter(3, msg) == false) {return false}
        log.console('debug', 'message recieved: echo')
        bot.sendMessage(msg.chat.id, 'echo: ' + match[1])
    })

    // msg command
    bot.onText(/\/scmsg (.+)/, (msg, match) => {
        if (msgFilter(3, msg) == false) {return false}
        log.console('debug',
            'message recieved: msg' + '\n' +
            'User:  ' + msg.from.username + '\n' +
            'Group: ' + msg.chat.id + '\n' +
            'Text:  ' + msg.text + '\n' +
            'Match: ' + match[1]
        )
    })

    //bot.sendMessage(settings.chatID[0], 'Debug: Bot started')
}

// static commands