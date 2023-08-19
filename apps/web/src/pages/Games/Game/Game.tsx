import { build, getBoardFromLog } from 'utils'

import Grid from '@/components/Grid'
import { useGame } from '@/features/games'
import useJoin from '@/features/games/useJoin'

import styles from './Game.module.scss'

function Game() {
  const { data: game } = useGame()

  useJoin()

  if (!game) {
    return <div>Loading...</div>
  }

  const board = build(getBoardFromLog(game.log))

  return (
    <div className={styles.wrapper}>
      <Grid board={board} />
      <section className={styles.meat}>
        <h1>{game.title}</h1>
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
    </div>
  )
}

export default Game
