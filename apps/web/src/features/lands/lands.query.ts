import { LandDTO, ResponseDTO } from 'dtos'
import { Coordinate } from 'models'

import client from '@/apis/Client'

interface RequestPostLands {
  gameId: string
  coordinate: Coordinate
}

export function requestPostLands({ gameId, coordinate }: RequestPostLands) {
  return client
    .post<ResponseDTO['POST/games/:id/land'], LandDTO>(
      `/games/${gameId}/land`,
      {
        coordinate,
      }
    )
    .withToken()
}
