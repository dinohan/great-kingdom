import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    const id = signUpDTO.email;
    const email = signUpDTO.email;
    const nickname = signUpDTO.nickname;

    return this.usersService.create({
      id,
      email,
      nickname,
    });
  }
}
