import { Piece, House, isPiece } from "../models/Entity"
import classNames from 'classnames'
import styles from './Space.module.scss'

function Space({
  entity,
}:{
  entity: Piece | House | null,
}) {
  const PieceComponent = isPiece(entity) && (
    <div className={styles.pieceWrapper}>
      <div
        className={classNames(
          styles.piece,
          {
            [styles.white]: entity === Piece.White,
            [styles.black]: entity === Piece.Black,
            [styles.neutral]: entity === Piece.Neutral,
          }
        )}
      />
    </div>
  )

  const Empty = !isPiece(entity) && (
    <div className={styles.emptyWrapper}>
      <div className={styles.empty} />
    </div>
  )

  return (
    <button
      className={classNames(
        styles.wrapper,
        {
          [styles.white]: entity === House.White || entity === Piece.White,
          [styles.black]: entity === House.Black || entity === Piece.Black,
          [styles.neutral]: entity === Piece.Neutral,
        },
      )}
    >
      { PieceComponent }
      { Empty }
    </button>
  )
}

export default Space
