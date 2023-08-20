import { useQuery } from '@tanstack/react-query'
import { Turn } from 'models'

import { useUserStore } from '@/store/user/useUserStore'
import { getUser } from '@/store/user/userSelectors'

import { makeGameQuery } from '../games.query'

import useGameId from './useGameId'

function useGame() {
  const id = useGameId()
  const user = useUserStore(getUser)

  if (!id) {
    throw new Error('Missing game id')
  }

  const { data: game } = useQuery(...makeGameQuery(id), {
    staleTime: 10 * 1000,
  })

  const turn = (game?.log.length ?? 0) % 2 === 0 ? Turn.BLACK : Turn.WHITE

  const playerTurn = (() => {
    if (game?.players.black === user?.id) {
      return Turn.BLACK
    }
    if (game?.players.white === user?.id) {
      return Turn.WHITE
    }
    return null
  })()

  const isUserTurn = turn === playerTurn

  const isUserPlayer =
    game?.players.black === user?.id || game?.players.white === user?.id

  return {
    game,
    isUserTurn,
    isUserPlayer,
    isGameEnded: !!game?.winner || !!game?.endedAt,
    isGameStarted: game?.players.black && game?.players.white,
  }
}

export default useGame
