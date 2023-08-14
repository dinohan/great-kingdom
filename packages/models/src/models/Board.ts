import { Piece, House, EntityAlias } from './Entity'

export type Board<E = Piece | House | null> = Array<Array<E>>

export type BoardWithoutHouse = Board<Piece | null>

const { _, N } = EntityAlias

export const InitialBoard = [
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, N, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
]
