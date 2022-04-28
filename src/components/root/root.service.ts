import { MyRequest } from '@commons/definitions'
import createHttpError from 'http-errors'
import delay from 'delay'

class RootService {
  public static healthCheck(req: MyRequest) {
    return {
      ...req.headers,
    }
  }

  public static throwError() {
    throw new createHttpError.BadRequest()
  }

  public static async delay() {
    await delay(1000)
    return {
      message: 'Delayed',
    }
  }
}

export { RootService }
