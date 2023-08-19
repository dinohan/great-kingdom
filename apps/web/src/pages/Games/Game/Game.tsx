import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { build, getBoardFromLog } from 'utils'

import Grid from '@/components/Grid'
import socket from '@/features/effects/socket'
import { useGame, useJoin } from '@/features/games'

import styles from './Game.module.scss'

function Game() {
  const { data: game } = useGame()

  const queryClient = useQueryClient()

  useJoin()

  useEffect(() => {
    if (!game?.id) {
      return
    }

    socket.emit('join-game', {
      gameId: game.id,
    })

    socket.on('update-game', (data) => {
      if (!data.game.id) {
        return
      }

      queryClient.setQueryData(['games', data.game.id], data.game)
    })
  }, [game?.id, queryClient])

  if (!game) {
    return <div>Loading...</div>
  }

  const board = build(getBoardFromLog(game.log))

  return (
    <div className={styles.wrapper}>
      <main className={styles.gameSection}>
        <Grid board={board} />
      </main>
      <aside>
        <section>
          <button>착수</button>
          <button>건너뛰기</button>
          <button>기권</button>
        </section>
        <section className={styles.metaSection}>
          <div>
            {game.players.black} vs {game.players.white}
            {game.score.black} - {game.score.white}
          </div>
          <ol>
            {game.log.map((land, index) => (
              <li key={index}>{land}</li>
            ))}
          </ol>
        </section>
      </aside>
    </div>
  )
}

export default Game
