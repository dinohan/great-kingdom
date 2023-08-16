import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './users.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        options: {
          tableName: 'greate-kingdom-users',
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
