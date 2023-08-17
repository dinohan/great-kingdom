import { CreateGameDTO } from 'dtos'
import { Game } from 'models'

import client from '@/apis/Client'

export function requestPostGames(data: CreateGameDTO) {
  return client.post<Game>('/games', data).withToken()
}
