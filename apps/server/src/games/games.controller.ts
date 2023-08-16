import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './games.entity';
import { CreateGameDTO } from './dto/create-game.dto';
import { LandDTO } from './dto/land.dto';
import { JoinDTO } from './dto/add-player.dto';

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
  async land(
    @Param('id') id: string,
    @Body() { coordinate }: LandDTO,
  ): Promise<Game> {
    return this.gamesService.addLog(id, coordinate);
  }

  @Post(':id/join')
  async addPlayer(
    @Param('id') id: string,
    @Body() { playerId }: JoinDTO,
  ): Promise<Game> {
    return await this.gamesService.addPlayer(id, playerId);
  }

  @Post()
  async create(@Body() game: CreateGameDTO): Promise<Game> {
    return await this.gamesService.createGame(game);
  }
}
