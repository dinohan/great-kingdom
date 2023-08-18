import { ResponseDTO } from 'dtos'

import client from '@/apis/Client'

function requestGetGames() {
  return client.get<ResponseDTO['GET/games']>('/games').withToken()
}

function requestGetGame(id: string) {
  return client.get<ResponseDTO['GET/games/:id']>(`/games/${id}`).withToken()
}

export function reqeustPostJoinGame(id: string) {
  return client
    .post<ResponseDTO['POST/games/:id/join']>(`/games/${id}/join`)
    .withToken()
}

export function makeGamesQuery() {
  return ['games', () => requestGetGames().run()] as const
}

export function makeGameQuery(id: string) {
  return [['games', id], () => requestGetGame(id).run()] as const
}
