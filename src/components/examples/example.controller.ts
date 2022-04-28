import { Response, Request } from 'express'

const example = (_: Request, res: Response) => {
  return res.send('<h1>Hello world!</h1>')
}

export { example }
