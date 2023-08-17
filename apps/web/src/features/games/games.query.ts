import { Game } from 'models'

import client from '@/apis/Client'

function requestGetGames() {
  return client.get<Game[]>('/games').withToken()
}

function requestGetGame(id: string) {
  return client.get<Game>(`/games/${id}`).withToken()
}

export function makeGamesQuery() {
  return ['games', () => requestGetGames().run()] as const
}

export function makeGameQuery(id: string) {
  return [['games', id], () => requestGetGame(id).run()] as const
}
