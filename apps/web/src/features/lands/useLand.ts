import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Coordinate } from 'models'

import { requestPostLands } from './lands.query'

function useLand(gameId?: string) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (coordinate: Coordinate) => {
      if (!gameId) {
        return Promise.reject(new Error('Missing game id'))
      }
      return requestPostLands({ gameId, coordinate }).run()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['games', gameId], data)
    },
  })

  return mutate
}

export default useLand
