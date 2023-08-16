import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
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
    const user = await this.usersService.findOne(id);

    if (!user) {
      return null;
    }

    if (user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signIn({ email }: { email: string }) {
    const payload = { id: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
