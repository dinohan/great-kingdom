import { Coordinate } from 'models'

export interface GameKey {
  id: string
}

export interface Game extends GameKey {
  log: Coordinate[]
  players: {
    black?: string
    white?: string
  }
  title: string
}
