import { LandDTO } from 'dtos'
import { Coordinate } from 'models'

import client from '@/apis/Client'
import { Game } from '@/features/games/games.entity'

interface RequestPostLands {
  gameId: string
  coordinate: Coordinate
}

export function requestPostLands({ gameId, coordinate }: RequestPostLands) {
  return client.post<Game, LandDTO>(`/games/${gameId}/land`, {
    coordinate,
  })
}
