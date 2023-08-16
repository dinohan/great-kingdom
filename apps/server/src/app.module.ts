import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { GamesModule } from './games/games.module';
import { DynamooseConfigService } from './dynamoose-config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    GamesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DynamooseModule.forRootAsync({ useClass: DynamooseConfigService }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
