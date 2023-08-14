import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { GamesModule } from './games/games.module';
import { DynamooseConfigService } from './dynamoose-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
