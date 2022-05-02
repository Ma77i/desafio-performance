const log4js = require('./log4')
const logger = log4js.getLogger('app')

// winston
// const logger = require('./winston')

// pino
//const logger = require('./pino')


module.exports = {
  log: (msg, level = 'info') => logger.info(msg),
  warn: (msg) => logger.warn(msg),
  error: (msg, e) => logger.error(msg),
  info: (msg) => logger.info(msg)
}

