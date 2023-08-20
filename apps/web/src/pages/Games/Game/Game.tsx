import { build, getBoardFromLog } from 'utils'

import Grid from '@/components/Grid'
import {
  GameButton,
  Log,
  useGame,
  useGameSocket,
  useJoin,
} from '@/features/games'

import styles from './Game.module.scss'

function Game() {
  const { game, isUserPlayer } = useGame()

  useJoin()
  useGameSocket(game?.id)

  if (!game) {
    return <div>Loading...</div>
  }

  const board = build(getBoardFromLog(game.log))

  return (
    <div>
      <div className={styles.wrapper}>
        <main>
          <Grid board={board} />
        </main>
        <aside>
          {isUserPlayer && (
            <section className={styles.buttonSection}>
              <GameButton />
            </section>
          )}
          <section className={styles.metaSection}>
            <Log log={game.log} />
          </section>
        </aside>
      </div>
    </div>
  )
}

export default Game
