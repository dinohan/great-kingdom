import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import socket from '@/features/effects/socket'

export default function useGameSocket(gameId?: string) {
  const queryClient = useQueryClient()
  useEffect(() => {
    if (!gameId) {
      return
    }

    socket.emit('join-game', {
      gameId,
    })

    socket.on('update-game', (data) => {
      if (!data.game.id) {
        return
      }

      queryClient.setQueryData(['games', data.game.id], data.game)
    })
  }, [gameId, queryClient])
}
