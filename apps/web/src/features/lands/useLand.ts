import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Land } from 'models'

import { useGame } from '../games'

import { requestPostLands } from './lands.query'

function useLand(gameId?: string) {
  const queryClient = useQueryClient()

  const { data: oldGame } = useGame()

  const { mutate } = useMutation({
    mutationFn: (land: Land) => {
      if (!gameId) {
        return Promise.reject(new Error('Missing game id'))
      }
      return requestPostLands({ gameId, land }).run()
    },
    onMutate: (coordinate) => {
      if (!oldGame) {
        return
      }
      queryClient.setQueryData(['games', gameId], {
        ...oldGame,
        log: [...oldGame.log, coordinate],
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['games', gameId], data)
    },
    onError: () => {
      queryClient.setQueryData(['games', gameId], oldGame)
    },
  })

  return mutate
}

export default useLand
