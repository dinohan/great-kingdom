import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './users.schema';

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
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
