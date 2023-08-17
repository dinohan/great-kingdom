import {
  Body,
  Controller,
  Req,
  Request,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './games.entity';
import { CreateGameDTO } from './dto/create-game.dto';
import { LandDTO } from './dto/land.dto';
import { JoinDTO } from './dto/add-player.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JWTUser } from 'src/auth/jwt.entity';

interface Request {
  user: JWTUser;
}

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
    @Req() req: Request,
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

  @Post()
  async create(@Body() game: CreateGameDTO): Promise<Game> {
    return await this.gamesService.createGame(game);
  }
}
