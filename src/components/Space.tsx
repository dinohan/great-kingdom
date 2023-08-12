import { Piece, House } from "../models/Entity"
import styles from './Space.module.scss'

function Space({
  entity,
}:{
  entity: Piece | House | null,
}) {
  return (
    <div className={styles.wrapper}>
      { entity }
    </div>
  )
}

export default Space
