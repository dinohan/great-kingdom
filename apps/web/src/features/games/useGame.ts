import { useQuery } from '@tanstack/react-query'

import { useGameQuery } from './games.query'
import useGameId from './useGameId'

function useGame() {
  const id = useGameId()

  if (!id) {
    throw new Error('Missing game id')
  }

  return useQuery(...useGameQuery(id))
}

export default useGame
