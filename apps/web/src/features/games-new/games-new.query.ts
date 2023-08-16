import { CreateGameDTO } from 'dtos'

import client from '@/apis/Client'
import { Game } from '@/features/games/games.entity'

export function requestPostGames(data: CreateGameDTO) {
  return client.post<Game>('/games', data).withToken()
}
