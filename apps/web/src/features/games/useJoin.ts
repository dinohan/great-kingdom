import { useEffect } from 'react'

import { useMutation } from '@tanstack/react-query'

import { reqeustPostJoinGame } from './games.query'

import { useGame } from '.'

export default function useJoin() {
  const { data: game } = useGame()

  const { mutate } = useMutation({
    mutationFn: (gameId: string) => {
      return reqeustPostJoinGame(gameId).run()
    },
  })

  useEffect(() => {
    if (!game) {
      return
    }

    if (game.players.white && game.players.black) {
      return
    }

    mutate(game.id)
  }, [game, mutate])
}
