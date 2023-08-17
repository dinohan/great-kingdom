import { LandDTO } from 'dtos'
import { Coordinate, Game } from 'models'

import client from '@/apis/Client'

interface RequestPostLands {
  gameId: string
  coordinate: Coordinate
}

export function requestPostLands({ gameId, coordinate }: RequestPostLands) {
  return client
    .post<Game, LandDTO>(`/games/${gameId}/land`, {
      coordinate,
    })
    .withToken()
}
