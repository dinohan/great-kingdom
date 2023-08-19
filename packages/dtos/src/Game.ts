import { Land, Turn } from 'models'
import { ITimeStamp } from './TimeStamp'

export interface GameKey {
  id: string
}

export interface Game extends GameKey, ITimeStamp {
  log: Land[]
  players: {
    [Turn.BLACK]?: string
    [Turn.WHITE]?: string
  }
  endedAt?: string
  winner?: Turn
  score: {
    [Turn.BLACK]: number
    [Turn.WHITE]: number
  }
}
