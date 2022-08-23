// packages
const TelegramBot = require('node-telegram-bot-api')
const soap = require('soap')
const { config } = require('dotenv')
config()

// imports
const log = require('./log.js')

// define vars
const auth = {
    "telegramAPIKey": process.env.TELEGRAM_API_KEY,
    "scpLoginName": process.env.SCP_LOGIN,
    "scpPassword": process.env.SCP_PASS
}
const settings = {
    "debug": process.env.DEBUG,
    "adminAccounts": process.env.ADMINS.split(','),
    "chatID": process.env.CHATID.split(','),
    "probeInterval": process.env.PROBE_INTERVAL,
    "scpURL": "https://www.servercontrolpanel.de:443/WSEndUser?wsdl"
}

// define bot
let bot
bot = new TelegramBot(auth.telegramAPIKey, { polling: true })

function msgFilter(strength, msg) {
    if (strength >= 1) {if (msg.from.is_bot) {
        log.console('warn', 'message blocked from @' + msg.from.username + ' reason: user is a bot')
        return false
    }}
    if (strength >= 2) {if (!settings.chatID.includes(String(msg.chat.id))) {
        log.console('warn', 'message blocked from @' + msg.from.username + ' reason: chatid not in whitelist')
        return false
    }}
    if (strength >= 3) {if (!settings.adminAccounts.includes(msg.from.username)) {
        log.console('warn', 'message blocked from @' + msg.from.username + ' reason: user is not whitelisted')
        return false
    }}
    log.console('info', 'message accepted: "' + msg.text + '" from @' + msg.from.username + ' in ' + msg.chat.id)
}

// debug commands
if (settings.debug) {
    // ping command
    bot.onText(/\/scping/, (msg, match) => {
        if (msgFilter(3, msg) == false) {return false}
        bot.sendMessage(msg.chat.id, 'Pong! @' + msg.from.username)
    })

    // echo command
    bot.onText(/\/scecho (.+)/, (msg, match) => {
        if (msgFilter(3, msg) == false) {return false}
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
// request server status
bot.onText(/\/scstatus/, (msg, match) => {
    if (msgFilter(3, msg) == false) {return false}
})

soap.createClient(settings.scpURL, {}, function(err, client) {
    client.getVServers({
        'loginName': auth.scpLoginName,
        'password': auth.scpPassword
    }, function(err, result) {
        return result.data
    });
})