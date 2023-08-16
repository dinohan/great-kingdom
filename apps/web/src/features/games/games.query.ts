import client from '@/apis/Client'

import { Game } from './games.entity'

function requestGetGames() {
  return client.get<Game[]>('/games').withToken()
}

function requestGetGame(id: string) {
  return client.get<Game>(`/games/${id}`).withToken()
}

export function useGamesQuery() {
  return ['games', () => requestGetGames().run()] as const
}

export function useGameQuery(id: string) {
  return [['games', id], () => requestGetGame(id).run()] as const
}
