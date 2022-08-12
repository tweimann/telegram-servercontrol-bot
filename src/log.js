// packages
const colors = require('colors')

// set prefixes
const prefixes = {
    "debug": "[ " + colors.white('DEBUG') + "] ",
    "test": "[ " + colors.grey('TEST') + " ] ",
    "info": "[ " + colors.green('INFO') + " ] ",
    "warn": "[ " + colors.yellow('WARN') + " ] ",
    "fail": "[ " + colors.red('FAIL') + " ] "
}

module.exports = {
    console: function (type, msg) {
        if (type == "debug") {var prefix = prefixes.debug}
        if (type == "test") {var prefix = prefixes.test}
        if (type == "debug") {var prefix = prefixes.debug}
        if (type == "debug") {var prefix = prefixes.debug}
        else {var prefix = prefixes.info}

        msg.split('\n').forEach( (e) => {
            console.log(prefix + e)
        });
    }
}