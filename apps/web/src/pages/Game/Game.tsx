import Grid from '@/components/Grid'
import { useGameStore } from '@/store/game/useGameStore'
import selectors from '@/store/selectors'
import styles from './Game.module.scss'

function Game() {
  return (
    <div className={styles.wrapper}>
      <Grid board={useGameStore(selectors.gameStoreSelectors.getBoard)} />
    </div>
  )
}

export default Game
