import chalk from 'chalk'
export type chalkType =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'black'

const chalkLog = (message: string, color?: chalkType) => {
  return chalk[color || 'white'](message)
}

export { chalkLog }
