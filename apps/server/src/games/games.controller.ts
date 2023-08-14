import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './games.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { AddLogDTO } from './dto/add-log.dto';
import { AddPlayerDTO } from './dto/add-player.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getAll(): Game[] {
    return this.gamesService.getAllGames();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Game {
    return this.gamesService.getGame(id);
  }

  @Post(':id/land')
  addLog(@Param('id') id: number, @Body() { log }: AddLogDTO): Game {
    return this.gamesService.addLog(id, log);
  }

  @Post(':id/join')
  addPlayer(@Param('id') id: number, @Body() { playerId }: AddPlayerDTO): Game {
    return this.gamesService.addPlayer(id, playerId);
  }

  @Post()
  create(@Body() game: CreateGameDto): Game {
    return this.gamesService.createGame(game);
  }
}
