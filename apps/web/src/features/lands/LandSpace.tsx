import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import classNames from 'classnames'
import { House, Piece, Turn, isPiece } from 'models'
import { getCoordinateFromNumber } from 'utils'

import { useGame } from '@/features/games'
import { useGameStore } from '@/store/game/useGameStore'
import { useUserStore } from '@/store/user/useUserStore'
import { getUser } from '@/store/user/userSelectors'

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
  const { data: game } = useGame()
  const user = useUserStore(getUser)

  const turn = (game?.log.length ?? 0) % 2 === 0 ? Turn.BLACK : Turn.WHITE

  const isGameStarted = game?.players.black && game?.players.white

  const playerTurn = (() => {
    if (game?.players.black === user?.id) {
      return Turn.BLACK
    }
    if (game?.players.white === user?.id) {
      return Turn.WHITE
    }
    return null
  })()

  const coordinate = getCoordinateFromNumber(y, x)
  const isMyTurn = turn === playerTurn

  const disabled =
    entity !== null ||
    !!game?.winner ||
    !!game?.endedAt ||
    !isMyTurn ||
    !isGameStarted

  const tmp = useGameStore((state) => state.temporaryCoordinate)

  const selected = tmp === coordinate

  const select = useGameStore((state) => state.select)

  const handleClick = () => {
    if (disabled) {
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

  const SelectedPiece = selected && isMyTurn && (
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
