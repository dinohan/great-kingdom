import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Game } from 'dtos'
import { Land } from 'models'

import { requestPostLands } from './lands.query'

function useLand(gameId?: string) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (land: Land) => {
      if (!gameId) {
        return Promise.reject(new Error('Missing game id'))
      }
      return requestPostLands({ gameId, land }).run()
    },
    onMutate: (land) => {
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
