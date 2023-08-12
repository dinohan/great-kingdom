export enum Piece {
  Black = 'B',
  White = 'W',
  Neutral = 'N',
}

export enum House {
  Black = 'b',
  White = 'w',
}

export const EntityAlias = {
  _: null,
  B: Piece.Black,
  W: Piece.White,
  N: Piece.Neutral,
  b: House.Black,
  w: House.White,
} as const