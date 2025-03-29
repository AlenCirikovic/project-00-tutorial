import { ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from 'decorators/public.decorator'
import { User } from 'entities/user.entity'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body)
  }
}
