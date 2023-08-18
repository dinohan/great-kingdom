import classNames from 'classnames'
import { House, Piece, Turn, isPiece } from 'models'
import { getCoordinateFromNumber } from 'utils'

import { useGame } from '@/features/games'

import styles from './LandSpace.module.scss'
import useLand from './useLand'

function LandSpace({
  x,
  y,
  entity,
}: {
  x: number
  y: number
  entity: Piece | House | null
}) {
  const { data: game } = useGame()

  const turn = (game?.log.length ?? 0) % 2 === 0 ? Turn.BLACK : Turn.WHITE

  const disabled = entity !== null || !!game?.winner || !!game?.endedAt

  const mutate = useLand(game?.id)

  const handleClick = () => {
    if (disabled) {
      return
    }
    const coordinate = getCoordinateFromNumber(y, x)
    mutate(coordinate)
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

export default LandSpace
