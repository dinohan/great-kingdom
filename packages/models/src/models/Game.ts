import { Turn } from './Turn'

export interface GameKey {
  id: string
}

export interface Game extends GameKey {
  log: string[]
  players: {
    [Turn.BLACK]?: string
    [Turn.WHITE]?: string
  }
  title: string
}
