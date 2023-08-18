import { useQuery } from '@tanstack/react-query'

import { makeGameQuery } from './games.query'
import useGameId from './useGameId'

function useGame() {
  const id = useGameId()

  if (!id) {
    throw new Error('Missing game id')
  }

  return useQuery(...makeGameQuery(id), {
    staleTime: 1000,
  })
}

export default useGame
