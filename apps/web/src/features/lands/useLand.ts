import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Game } from 'dtos'
import { Land } from 'models'

import { useGameStore } from '@/store/game/useGameStore'

import { requestPostLands } from './lands.query'

function useLand(gameId?: string) {
  const reset = useGameStore((state) => state.reset)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (land: Land) => {
      if (!gameId) {
        return Promise.reject(new Error('Missing game id'))
      }
      return requestPostLands({ gameId, land }).run()
    },
    onMutate: (land) => {
      reset()
      queryClient.setQueryData<Game>(
        ['games', gameId],
        (old: Game | undefined) => {
          if (!old) {
            return old
          }

          return {
            ...old,
            log: [...old.log, land],
          }
        }
      )
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['games', gameId], data)
    },
    onError: () => {
      queryClient.setQueryData(['games', gameId], (old: Game | undefined) => {
        if (!old) {
          return old
        }

        return {
          ...old,
          log: old.log.slice(0, -1),
        }
      })
    },
  })

  return mutate
}

export default useLand
