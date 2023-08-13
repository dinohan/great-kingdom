import classNames from 'classnames'
import { House, Piece, Turn, isPiece } from 'models'
import { getCoordinateFromNumber } from 'utils'
import { useGameStore } from '../store/game/useGameStore'
import selectors from '../store/selectors'
import styles from './Space.module.scss'

function Space({
  x,
  y,
  entity,
}: {
  x: number
  y: number
  entity: Piece | House | null
}) {
  const addLog = useGameStore((state) => state.addLog)
  const turn = useGameStore(selectors.gameStoreSelectors.getTurn)

  const disabled = entity !== null

  const handleClick = () => {
    if (disabled) {
      return
    }
    const coordinate = getCoordinateFromNumber(y, x)
    addLog(coordinate)
  }

  const PieceComponent = isPiece(entity) && (
    <div className={styles.pieceWrapper}>
      <div
        className={classNames(styles.piece, {
          [styles.white]: entity === Piece.White,
          [styles.black]: entity === Piece.Black,
          [styles.neutral]: entity === Piece.Neutral,
        })}
      />
    </div>
  )

  const Empty = !isPiece(entity) && (
    <div className={styles.emptyWrapper}>
      <div className={styles.empty} />
    </div>
  )

  const HoverPiece = !disabled && (
    <div className={styles.pieceWrapper}>
      <div
        className={classNames(styles.piece, styles.hoverPiece, {
          [styles.white]: turn === Turn.WHITE,
          [styles.black]: turn === Turn.BLACK,
        })}
      />
    </div>
  )

  return (
    <button
      className={classNames(styles.wrapper, {
        [styles.white]: entity === House.White || entity === Piece.White,
        [styles.black]: entity === House.Black || entity === Piece.Black,
        [styles.neutral]: entity === Piece.Neutral,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      {HoverPiece}
      {PieceComponent}
      {Empty}
    </button>
  )
}

export default Space
