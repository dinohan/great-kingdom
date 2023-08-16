import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useGameQuery } from './games.query'

function useGame() {
  const { id } = useParams()

  if (!id) {
    throw new Error('Missing game id')
  }

  return useQuery(...useGameQuery(id))
}

export default useGame
