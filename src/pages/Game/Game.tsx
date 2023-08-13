import Grid from '../../components/Grid'
import { useBoard } from '../../store/gameStore/useBoard'
import styles from './Game.module.scss'

function Game() {
  return (
    <div className={styles.wrapper}>
      <Grid board={useBoard()} />
    </div>
  )
}

export default Game
