import { Game } from './Game'

export type SocketDTO = {
  'join-game': {
    gameId: string
  }
  'update-game': {
    game: Game
  }
}
