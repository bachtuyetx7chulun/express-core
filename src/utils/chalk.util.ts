import { chalkLog } from '@commons/index'

const infoLog = (request_id: string, endpoint: string, startTime: number) => {
  return `${chalkLog('Request', 'yellow')} ${chalkLog(
    request_id,
    'blue'
  )} ${chalkLog('Endpoint', 'green')} ${chalkLog(
    endpoint,
    'magenta'
  )} ${chalkLog(`${new Date().getTime() - startTime}ms`, 'green')}`
}

export { infoLog }
