import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { GameSchema } from './games.schema';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    EventsModule,
    DynamooseModule.forFeature([
      {
        name: 'Game',
        schema: GameSchema,
        options: {
          tableName: 'greate-kingdom-game',
        },
      },
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
