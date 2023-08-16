import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    const id = signUpDTO.email;

    return this.usersService.create({
      id,
      ...signUpDTO,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }
}
