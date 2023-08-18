import { CreateGameDTO, ResponseDTO } from 'dtos'

import client from '@/apis/Client'

export function requestPostGames(data: CreateGameDTO) {
  return client.post<ResponseDTO['POST/games']>('/games', data).withToken()
}
