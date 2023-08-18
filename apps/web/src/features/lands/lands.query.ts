import { LandDTO, ResponseDTO } from 'dtos'
import { Land } from 'models'

import client from '@/apis/Client'

interface RequestPostLands {
  gameId: string
  land: Land
}

export function requestPostLands({ gameId, land }: RequestPostLands) {
  return client
    .post<ResponseDTO['POST/games/:id/land'], LandDTO>(
      `/games/${gameId}/land`,
      {
        land,
      }
    )
    .withToken()
}
