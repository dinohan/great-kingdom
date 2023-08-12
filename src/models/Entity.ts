export enum Piece {
  Black = 'B',
  White = 'W',
  Neutral = 'N',
}

export enum House {
  Black = 'b',
  White = 'w',
}

export function isPiece(entity: unknown): entity is Piece {
  return Object.values(Piece).includes(entity as Piece)
}

export function isHouse(entity: unknown): entity is House {
  return Object.values(House).includes(entity as House)
}

export const EntityAlias = {
  _: null,
  B: Piece.Black,
  W: Piece.White,
  N: Piece.Neutral,
  b: House.Black,
  w: House.White,
} as const