import { Piece, House, isPiece } from "../models/Entity"
import classNames from 'classnames'
import styles from './Space.module.scss'
import { Turn } from "../models/Turn"

const currentTurn: Turn = Turn.BLACK

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

  const disabled = entity !== null

  const HoverPiece = !disabled && (
    <div className={styles.pieceWrapper}>
      <div
        className={classNames(
          styles.piece,
          styles.hoverPiece,
          {
            [styles.white]: currentTurn === Turn.WHITE,
            [styles.black]: currentTurn === Turn.BLACK,
          }
        )}
      />
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
      disabled={disabled}
    >
      { HoverPiece }
      { PieceComponent }
      { Empty }
    </button>
  )
}

export default Space
