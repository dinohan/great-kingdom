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

  async create({
    id,
    email,
    nickname,
  }: {
    id: string;
    email: string;
    nickname: string;
  }) {
    if (!isValidEmail(email)) {
      throw new BadRequestException('Invalid email');
    }

    const user = await this.findOneById(id);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const users = await this.findOneByEmail(email);

    if (users.length > 0) {
      throw new ConflictException('User already exists');
    }

    return this.userModel.create({
      id,
      email,
      nickname,
    });
  }

  async findOneByEmail(email: string) {
    return this.userModel.query('email').eq(email).exec();
  }

  async findOneById(id: string) {
    console.log('findOneById', id);
    return this.userModel.get({ id });
  }

  // async findByNickname(nickname: string) {
  //   return this.userModel.query('nickname').eq(nickname).exec();
  // }
}
