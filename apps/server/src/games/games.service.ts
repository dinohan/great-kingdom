import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGameDTO } from './dto/create-game.dto';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 as uuidv4 } from 'uuid';
import {
  build,
  getBoardFromLog,
  getNumberFromCoordinate,
  isValidLog,
} from 'utils';
import {
  Game,
  GameKey,
  Turn,
  isHouse,
  isPiece,
  isValidCoordinate,
} from 'models';

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

  async createGame(createGameDTO: CreateGameDTO, userId: string) {
    const turn =
      createGameDTO.turn ?? (Math.random() > 0.5 ? Turn.BLACK : Turn.WHITE);

    const newGame: Game = {
      id: uuidv4(),
      log: [],
      players: {
        [turn]: userId,
      },
      title: createGameDTO.title,
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

  async addLog(gameId: string, userId: string, coordinate: string) {
    console.log('addLog', gameId, userId, coordinate);

    const game = await this.getGame(gameId);

    const players = game.players;

    if (players.black !== userId && players.white !== userId) {
      throw new ForbiddenException('You are not in this game');
    }

    if (!players.black || !players.white) {
      throw new UnprocessableEntityException('Game is not started');
    }

    const currentLog = game.log;
    const turn = currentLog.length % 2 === 0 ? Turn.BLACK : Turn.WHITE;

    if (
      (turn === Turn.BLACK && players.black !== userId) ||
      (turn === Turn.WHITE && players.white !== userId)
    ) {
      throw new UnprocessableEntityException('Not your turn');
    }

    if (!isValidCoordinate(coordinate)) {
      throw new UnprocessableEntityException('Invalid Coordinate');
    }

    if (!isValidLog(currentLog)) {
      throw new UnprocessableEntityException('Invalid game log');
    }

    const board = build(getBoardFromLog(currentLog));
    const [y, x] = getNumberFromCoordinate(coordinate);
    const target = board[y][x];

    if (isPiece(target)) {
      throw new UnprocessableEntityException('You cannot land on a piece');
    }

    if (isHouse(target)) {
      throw new UnprocessableEntityException('You cannot land in a house');
    }

    game.log.push(coordinate);

    const updatedGame = await this.gameModel.update(
      { id: gameId },
      { log: game.log },
    );

    return updatedGame;
  }
}
