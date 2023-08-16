import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Coordinate } from 'models'

import { requestPostLands } from './lands.query'

function useLand(gameId?: string) {
  if (!gameId) {
    throw new Error('Missing game id')
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (coordinate: Coordinate) =>
      requestPostLands({ gameId, coordinate }).run(),

    onSuccess: (data) => {
      queryClient.setQueryData(['games', gameId], data)
    },
  })

  return mutate
}

export default useLand
