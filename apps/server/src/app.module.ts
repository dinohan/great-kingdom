import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { GamesModule } from './games/games.module';
import { DynamooseConfigService } from './dynamoose-config.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    GamesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DynamooseModule.forRootAsync({ useClass: DynamooseConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
