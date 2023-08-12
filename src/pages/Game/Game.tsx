import Grid from '../../components/Grid'
import { InitialBoard } from '../../utils/gameUtils'
import styles from './Game.module.scss'

function Game() {
  return (
    <div className={styles.wrapper}>
      <Grid board={InitialBoard} />
    </div>
  )
}

export default Game
