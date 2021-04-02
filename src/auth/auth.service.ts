import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from "./user.repository"
import { InjectRepository } from "@nestjs/typeorm"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import { JwtService } from "@nestjs/jwt"
import { JwtPayload } from "./jwt-payload-interface"

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)
    if (!username) {
      throw new UnauthorizedException('認証エラー')
    }

    const payload: JwtPayload = { username }
    const accessToken = await this.jwtService.sign(payload)
    this.logger.debug(`JWT payload ${ JSON.stringify((payload)) }`)

    return { accessToken }
  }
}
