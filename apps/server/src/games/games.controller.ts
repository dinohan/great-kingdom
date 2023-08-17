import {
  Body,
  Controller,
  Req,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { LandDTO } from './dto/land.dto';
import { JoinDTO } from './dto/add-player.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Game } from 'models';
import { RequestWithUser } from 'src/auth/jwt.entity';

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

  @UseGuards(JwtAuthGuard)
  @Post(':id/land')
  async land(
    @Param('id') gameId: string,
    @Body() { coordinate }: LandDTO,
    @Req() req: RequestWithUser,
  ): Promise<Game> {
    return this.gamesService.addLog(gameId, req.user.id, coordinate);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  async addPlayer(
    @Param('id') id: string,
    @Body() { playerId }: JoinDTO,
  ): Promise<Game> {
    return await this.gamesService.addPlayer(id, playerId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createGameDTO: CreateGameDTO,
    @Req() req: RequestWithUser,
  ): Promise<Game> {
    return await this.gamesService.createGame(createGameDTO, req.user.id);
  }
}
