const chalk = require('chalk')

const errorLog = (msg) => { 
    console.log(chalk.red(msg))
}

const successLog = (msg) => { 
    console.log(chalk.green(msg))
}

const warningLog = (msg) => {
    console.log(chalk.yellow(msg))
}

module.exports = {
    errorLog,
    successLog,
    warningLog
}