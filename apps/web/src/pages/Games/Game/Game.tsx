import { build, getBoardFromLog } from 'utils'

import Grid from '@/components/Grid'
import { GameButton, useGame, useGameSocket, useJoin } from '@/features/games'

import styles from './Game.module.scss'

function Game() {
  const { game } = useGame()

  useJoin()
  useGameSocket(game?.id)

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
          <GameButton />
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
