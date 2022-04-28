import winston from 'winston'
import 'winston-daily-rotate-file'
import { chalkLog } from '@commons/index'
import { LOG_PATH } from '@constant/index'

const { combine, timestamp, printf } = winston.format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${chalkLog(timestamp, 'green')} ${chalkLog(
    level.toUpperCase(),
    'red'
  )}: ${chalkLog(message, 'yellow')}`
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  defaultMeta: { service: 'popbox-service' },
  transports: [
    new winston.transports.DailyRotateFile({
      datePattern: 'DD-MM-YYYY',
      filename: LOG_PATH.ERROR,
      level: 'error',
      format: winston.format.json(),
    }),
    new winston.transports.DailyRotateFile({
      datePattern: 'DD-MM-YYYY',
      filename: LOG_PATH.DEBUG,
      level: 'debug',
      format: winston.format.json(),
    }),
  ],
})

logger.add(
  new winston.transports.Console({
    format: winston.format.timestamp(),
  })
)

export { logger }
