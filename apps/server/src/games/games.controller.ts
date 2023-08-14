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
  async getAll(): Promise<Game[]> {
    return this.gamesService.getAllGames();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Game> {
    return await this.gamesService.getGame(id);
  }

  @Post(':id/land')
  async addLog(
    @Param('id') id: string,
    @Body() { log }: AddLogDTO,
  ): Promise<Game> {
    return this.gamesService.addLog(id, log);
  }

  @Post(':id/join')
  async addPlayer(
    @Param('id') id: string,
    @Body() { playerId }: AddPlayerDTO,
  ): Promise<Game> {
    return await this.gamesService.addPlayer(id, playerId);
  }

  @Post()
  async create(@Body() game: CreateGameDto): Promise<Game> {
    return await this.gamesService.createGame(game);
  }
}
