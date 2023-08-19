import { useEffect } from 'react'

import { build, getBoardFromLog } from 'utils'

import Grid from '@/components/Grid'
import { useGame, useGameSocket, useJoin } from '@/features/games'
import useLand from '@/features/lands/useLand'
import { useGameStore } from '@/store/game/useGameStore'

import styles from './Game.module.scss'

function Game() {
  const { game, isUserTurn } = useGame()

  const temporaryCoordinate = useGameStore((state) => state.temporaryCoordinate)
  const resetTmp = useGameStore((state) => state.reset)

  useJoin()
  useGameSocket(game?.id)

  const land = useLand(game?.id)

  useEffect(() => () => resetTmp(), [resetTmp])

  if (!game) {
    return <div>Loading...</div>
  }

  const handleSubmit = () => {
    if (!temporaryCoordinate) {
      return
    }

    land(temporaryCoordinate)
  }

  const handlePass = () => {
    land('PS')
  }

  const board = build(getBoardFromLog(game.log))

  return (
    <div className={styles.wrapper}>
      <main className={styles.gameSection}>
        <Grid board={board} />
      </main>
      <aside>
        <section>
          <button
            disabled={!isUserTurn}
            onClick={handleSubmit}
          >
            착수
          </button>
          <button
            disabled={!isUserTurn}
            onClick={handlePass}
          >
            건너뛰기
          </button>
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
