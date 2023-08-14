import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Game, GameKey } from './games.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel('Game')
    private gameModel: Model<Game, GameKey>,
  ) {}

  getAllGames() {
    return this.gameModel.scan().exec();
  }

  async getGame(id: string) {
    const game = await this.gameModel.get({ id });

    if (!game) {
      throw new NotFoundException(`Game not found with id: ${id}`);
    }

    return game;
  }

  async createGame(game: CreateGameDto) {
    const newGame: Game = {
      id: uuidv4(),
      log: [],
      players: {},
      ...game,
    };

    const created = await this.gameModel.create(newGame);

    return created;
  }

  async addPlayer(gameId: string, playerId: string) {
    const game = await this.getGame(gameId);

    const players = game.players;

    if (players.black && players.white) {
      throw new UnprocessableEntityException('Game is full');
    }

    if (players.black === playerId || players.white === playerId) {
      throw new UnprocessableEntityException('Player already in game');
    }

    if (!players.black) {
      players.black = playerId;
    } else if (!players.white) {
      players.white = playerId;
    }

    const updatedGame = await this.gameModel.update(
      { id: gameId },
      { players },
    );

    return updatedGame;
  }

  async addLog(gameId: string, log: string) {
    const game = await this.getGame(gameId);

    game.log.push(log);

    const updatedGame = await this.gameModel.update(
      { id: gameId },
      { log: game.log },
    );

    return updatedGame;
  }
}
