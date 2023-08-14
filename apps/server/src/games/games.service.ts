import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Game, GameKey } from './games.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { InjectModel, Model } from 'nestjs-dynamoose';

@Injectable()
export class GamesService {
  private games: Map<number, Game> = new Map();

  private id = 0;

  constructor(
    @InjectModel('Game')
    private gameModel: Model<Game, GameKey>,
  ) {}

  getAllGames() {
    return Array.from(this.games.values());
  }

  getGame(id: number) {
    const game = this.games.get(id);
    if (!game) {
      throw new NotFoundException(`Game not found with id: ${id}`);
    }
    return game;
  }

  createGame(game: CreateGameDto) {
    const newGame: Game = {
      id: `${this.id++}`,
      log: [],
      players: {},
      ...game,
    };

    this.games.set(+newGame.id, newGame);

    return newGame;
  }

  addPlayer(gameId: number, playerId: string) {
    const game = this.getGame(gameId);

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

    return game;
  }

  addLog(gameId: number, log: string) {
    const game = this.getGame(gameId);

    // TODO: validate log

    game.log.push(log);

    return game;
  }
}
