import { compare } from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Res } from 'dtos';
import { User } from 'models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(id, true);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (await compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signIn({
    email: id,
  }: {
    email: string;
  }): Promise<Res['/auth/sign-in']> {
    const payload = { id };
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
