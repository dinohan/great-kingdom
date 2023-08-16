import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { User, UserKey } from './users.entity';
import { isValidEmail } from './users.utils';

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

  async findOne(id: string) {
    return this.userModel.get({ id });
  }

  // async findByNickname(nickname: string) {
  //   return this.userModel.query('nickname').eq(nickname).exec();
  // }
}
