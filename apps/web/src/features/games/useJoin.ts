import { useEffect } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useUserStore } from '@/store/user/useUserStore'
import { getUser } from '@/store/user/userSelectors'

import { reqeustPostJoinGame } from './games.query'

import { useGame } from '.'

export default function useJoin() {
  const { data: game } = useGame()

  const user = useUserStore(getUser)

  const { mutate } = useMutation({
    mutationFn: (gameId: string) => {
      return reqeustPostJoinGame(gameId).run()
    },
  })

  useEffect(() => {
    if (!game) {
      return
    }

    if (!user?.id) {
      return
    }

    if (game.players.white && game.players.black) {
      return
    }

    if (game.players.white === user?.id || game.players.black === user?.id) {
      return
    }

    mutate(game.id)
  }, [game, mutate, user?.id])
}
