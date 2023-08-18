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
  bothPlayerPassed,
  build,
  cantLandMoreOnBoard,
  getBoardFromLog,
  getNumberFromCoordinate,
  getScore,
  isValidLog,
  winByDestroy,
  winByScore,
} from 'utils';
import { Turn, isHouse, isPiece, isCoordinate, isLand } from 'models';
import { Game, GameKey } from 'dtos';

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
      score: {
        [Turn.BLACK]: 0,
        [Turn.WHITE]: 0,
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

  async addLog(gameId: string, userId: string, land: string) {
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
      throw new ForbiddenException('Not your turn');
    }

    if (!isLand(land)) {
      throw new UnprocessableEntityException('Invalid Coordinate');
    }

    if (!isValidLog(currentLog)) {
      throw new UnprocessableEntityException('Invalid game log');
    }

    const board = build(getBoardFromLog(currentLog));

    if (isCoordinate(land)) {
      const [y, x] = getNumberFromCoordinate(land);
      const target = board[y][x];

      if (isPiece(target)) {
        throw new UnprocessableEntityException('You cannot land on a piece');
      }

      if (isHouse(target)) {
        throw new UnprocessableEntityException('You cannot land in a house');
      }
    }

    game.log.push(land);

    const newBoard = build(getBoardFromLog(game.log));
    const [blackScore, whiteScore] = getScore(newBoard);

    let winner: Turn | undefined;

    const endedWithLand =
      bothPlayerPassed(game.log) || cantLandMoreOnBoard(newBoard);

    if (endedWithLand) {
      winner = winByScore(blackScore, whiteScore);
    } else {
      winner = winByDestroy(newBoard);
    }

    const updatedGame = await this.gameModel.update(
      { id: gameId },
      {
        log: game.log,
        score: {
          [Turn.BLACK]: blackScore,
          [Turn.WHITE]: whiteScore,
        },
        winner,
        endedAt: winner ? new Date().toISOString() : undefined,
      },
    );

    return updatedGame;
  }
}
