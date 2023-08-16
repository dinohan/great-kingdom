import { Coordinate } from 'models'

export interface CreateGameDTO {
  title: string
}

export interface LandDTO {
  readonly coordinate: Coordinate
}

export interface JoinDTO {
  readonly playerId: string
}
