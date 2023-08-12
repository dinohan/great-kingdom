import Grid from '../../components/Grid'
import { Board } from '../../models/Board'
import { EntityAlias } from '../../models/Entity'
import styles from './Game.module.scss'

const {
  _,
  B,
  W,
  N,
  b,
  w,
} = EntityAlias

const ExampleBoard: Board = [
  [w, W, _, _, B, b, B, _, _],
  [W, W, _, _, _, B, _, _, _],
  [w, w, W, _, _, _, B, B, B],
  [w, w, W, _, _, B, _, _, _],
  [w, w, W, _, N, b, B, _, _],
  [W, W, W, _, _, B, _, W, W],
  [_, _, _, _, _, _, W, B, _],
  [_, _, _, _, _, _, W, _, _],
  [_, _, _, _, _, _, W, _, _],
]

function Game() {
  return (
    <div className={styles.wrapper}>
      <Grid board={ExampleBoard} />
    </div>
  )
}

export default Game
