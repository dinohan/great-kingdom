import { Coordinate, isCoordinate } from './Coordinate'

export type Pass = 'PS'

export type Land = Coordinate | Pass

export function isLand(land: string): land is Land {
  return isCoordinate(land) || land === 'PS'
}
