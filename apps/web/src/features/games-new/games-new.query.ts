import client from '@/apis/Client'
import { Game } from '@/features/games/games.entity'

export interface PostGameDTO {
  title: string
}

export function requestPostGames(data: PostGameDTO) {
  return client.post<Game>('/games', data).withToken()
}
