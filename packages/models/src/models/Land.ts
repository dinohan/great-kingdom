import { Coordinate, isCoordinate } from './Coordinate'

export type Pass = 'PS'

export type Land = Coordinate | Pass

export function isPass(land: string): land is Pass {
  return land === 'PS'
}

export function isLand(land: string): land is Land {
  return isCoordinate(land) || isPass(land)
}
