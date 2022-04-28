import { Authentiacte, Controller, Get } from '@commons/decorators'
import { PREFIX } from '@constant/index'
import { Request } from 'express'
import { RootService } from './root.service'
@Controller(PREFIX.ROOT)
class RootController {
  @Get('/')
  @Authentiacte()
  public async healthCheck(req: Request) {
    return RootService.healthCheck(req)
  }

  @Get('/error')
  public async throwError() {
    return RootService.throwError()
  }

  @Get('/delay')
  public async delay() {
    return RootService.delay()
  }
}

export { RootController }
