const log4js = require('log4js')

log4js.configure({
  appenders: {
    app: { type: 'console'},
    file: { type: 'file', filename: './logs/log4js.app.log'}
  },
  categories: {
    app: { appenders: ['app', 'file'], level: 'debug' },
    default: { appenders: ['app'], level: 'error'}
  }
})

module.exports = log4js