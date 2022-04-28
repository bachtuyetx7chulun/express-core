import { Controller, Get, Post } from '@commons/decorators'
import { PREFIX } from '@constant/index'
import { AuthService } from './auth.service'

@Controller(PREFIX.AUTH)
class AuthController {
  @Get('/refresh-token')
  public refreshToken() {
    return AuthService.refreshToken()
  }

  @Post('/refresh-token')
  public login() {
    return AuthService.login()
  }
}

export default AuthController
