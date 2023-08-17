import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { isValidEmail } from './users.utils';
import { User, UserKey } from 'models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User, UserKey>,
  ) {}

  async create(user: User) {
    if (!isValidEmail(user.email)) {
      throw new BadRequestException('Invalid email');
    }

    const userFound = await this.findOne(user.id);

    if (userFound) {
      throw new ConflictException('User already exists');
    }

    const users = await this.findOneByEmail(user.email);

    if (users.length > 0) {
      throw new ConflictException('User already exists');
    }

    const { password, ...createdUser } = await this.userModel.create(user);

    return createdUser;
  }

  async findOneByEmail(email: string) {
    return this.userModel.query('email').eq(email).exec();
  }

  async findOne(id: string): Promise<Omit<User, 'password'> | null>;
  async findOne(id: string, withPassword: true): Promise<User | null>;
  async findOne(
    id: string,
    withPassword?: boolean,
  ): Promise<User | Omit<User, 'password'> | null> {
    const user = await this.userModel.get({ id });

    if (!user) {
      return null;
    }

    if (withPassword) {
      return user;
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  // async findByNickname(nickname: string) {
  //   return this.userModel.query('nickname').eq(nickname).exec();
  // }
}
