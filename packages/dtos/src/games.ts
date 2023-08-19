import { Land, Turn } from 'models'

export interface CreateGameDTO {
  /**
   * @default null
   * @description
   * null으로 설정하면 랜덤으로 플레이어가 선택됩니다.
   */
  turn?: Turn.BLACK | Turn.WHITE | null
}

export interface LandDTO {
  readonly land: Land
}

export interface JoinDTO {
  readonly playerId: string
}
