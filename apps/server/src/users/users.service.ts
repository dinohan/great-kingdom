import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { isValidEmail, omitCredentials } from './users.utils';
import { User, UserKey } from 'models';
import { compare, hash } from 'bcrypt';

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

    const createdUser = await this.userModel.create({
      ...user,
      password: await hash(user.password, 10),
    });

    return omitCredentials(createdUser);
  }

  async findOneByEmail(email: string) {
    return this.userModel.query('email').eq(email).exec();
  }

  async findOne(
    id: string,
  ): Promise<Omit<User, 'password' | 'currentHashedRefreshToken'> | null>;
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

    return omitCredentials(user);
  }

  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.userModel.update({ id }, { currentHashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.findOne(id, true);

    if (!user?.currentHashedRefreshToken) {
      return null;
    }

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (!isRefreshTokenMatching) {
      return null;
    }

    return omitCredentials(user);
  }

  async removeRefreshToken(id: string) {
    return omitCredentials(
      await this.userModel.update({ id }, { currentHashedRefreshToken: null }),
    );
  }
}
