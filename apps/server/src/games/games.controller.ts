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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithJWT } from 'src/auth/jwt.entity';
import { ResponseDTO } from 'dtos';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getAll(): Promise<ResponseDTO['GET/games']> {
    return this.gamesService.getAllGames();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ResponseDTO['GET/games/:id']> {
    return await this.gamesService.getGame(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/land')
  async land(
    @Param('id') gameId: string,
    @Body() { land }: LandDTO,
    @Req() req: RequestWithJWT,
  ): Promise<ResponseDTO['POST/games/:id/land']> {
    return this.gamesService.addLog(gameId, req.user.id, land);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  async addPlayer(
    @Req() req: RequestWithJWT,
    @Param('id') id: string,
  ): Promise<ResponseDTO['POST/games/:id/join']> {
    return await this.gamesService.addPlayer(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createGameDTO: CreateGameDTO,
    @Req() req: RequestWithJWT,
  ): Promise<ResponseDTO['POST/games']> {
    return await this.gamesService.createGame(createGameDTO, req.user.id);
  }
}
