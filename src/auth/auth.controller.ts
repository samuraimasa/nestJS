import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import { AuthService } from "./auth.service"
import { AuthGuard } from "@nestjs/passport"
import { GetUser } from "./get-user.decorator"
import { User } from "./user.entity"

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto)
  }

  @Post(['/:userId/test/:id', '/test2/:userId/:id', 'test/:id'])
  test(
    @Param('userId') userId: string,
    @Param('id') id: string
  ) {
    console.log(userId)
    console.log(id)
  }
}
