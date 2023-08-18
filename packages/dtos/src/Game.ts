import { Land, Turn } from 'models'

export interface GameKey {
  id: string
}

export interface Game extends GameKey {
  log: Land[]
  players: {
    [Turn.BLACK]?: string
    [Turn.WHITE]?: string
  }
  title: string
  endedAt?: string
}
