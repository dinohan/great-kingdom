export enum Entity {
  Black = 'B',
  White = 'W',
  Neutral = 'N',
  BlackHouse = 'BH',
  WhiteHouse = 'WH',
}

export const EntityAlias = {
  _: null,
  B: Entity.Black,
  W: Entity.White,
  N: Entity.Neutral,
  b: Entity.BlackHouse,
  w: Entity.WhiteHouse,
} as const