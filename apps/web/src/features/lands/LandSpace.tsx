import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import classNames from 'classnames'
import { House, Piece, Turn, isPiece } from 'models'
import { getCoordinateFromNumber } from 'utils'

import { useGame } from '@/features/games'
import { useGameStore } from '@/store/game/useGameStore'

import styles from './LandSpace.module.scss'

function LandSpace({
  x,
  y,
  entity,
}: {
  x: number
  y: number
  entity: Piece | House | null
}) {
  const { game, isUserTurn, isGameEnded, isGameStarted } = useGame()

  const turn = (game?.log.length ?? 0) % 2 === 0 ? Turn.BLACK : Turn.WHITE

  const coordinate = getCoordinateFromNumber(y, x)

  const disabled =
    entity !== null || isGameEnded || !isUserTurn || !isGameStarted

  const tmp = useGameStore((state) => state.temporaryCoordinate)
  const reset = useGameStore((state) => state.reset)

  const isLastLand = game?.log.at(-1) === coordinate

  const selected = tmp === coordinate

  const select = useGameStore((state) => state.select)

  const handleClick = () => {
    if (disabled) {
      return
    }
    if (selected) {
      reset()
      return
    }
    select(coordinate)
  }

  const PieceComponent = isPiece(entity) && (
    <div className={styles.pieceWrapper}>
      <div
        className={classNames(styles.piece, {
          [styles.white]: entity === Piece.White,
          [styles.black]: entity === Piece.Black,
          [styles.neutral]: entity === Piece.Neutral,
        })}
      >
        {isLastLand && <ArrowDropDownIcon />}
      </div>
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

  const SelectedPiece = selected && isUserTurn && (
    <div className={styles.pieceWrapper}>
      <div
        className={classNames(styles.piece, styles.selectedPiece, {
          [styles.white]: turn === Turn.WHITE,
          [styles.black]: turn === Turn.BLACK,
        })}
      >
        <ArrowDropDownIcon />
      </div>
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
      {SelectedPiece}
    </button>
  )
}

export default LandSpace
