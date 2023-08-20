import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithJWT } from './jwt.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ResponseDTO } from 'dtos';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-up')
  async signUp(
    @Body() signUpDTO: SignUpDTO,
  ): Promise<ResponseDTO['POST/auth/sign-up']> {
    const id = signUpDTO.email;

    return this.usersService.create({
      id,
      ...signUpDTO,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(
    @Body() signInDTO: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseDTO['POST/auth/sign-in']> {
    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(signInDTO.email);

    await this.usersService.setCurrentRefreshToken(
      refreshToken,
      signInDTO.email,
    );

    res.cookie('refresh_token', refreshToken, refreshOption);

    return this.authService.signIn(signInDTO);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async refresh(
    @Req() req: RequestWithJWT,
  ): Promise<ResponseDTO['GET/auth/refresh']> {
    const userId = req.user.id;
    const accessToken = this.authService.getAccessToken(userId);

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      access_token: accessToken,
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Req() req: RequestWithJWT): Promise<ResponseDTO['GET/auth/me']> {
    const userId = req.user.id;

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
