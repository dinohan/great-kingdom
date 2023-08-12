export enum Entity {
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
  B: Entity.Black,
  W: Entity.White,
  N: Entity.Neutral,
  b: House.Black,
  w: House.White,
} as const