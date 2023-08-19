import { useEffect } from 'react'

import useLand from '@/features/lands/useLand'
import { useGameStore } from '@/store/game/useGameStore'

import useGame from '../useGame'

function GameButton() {
  const { game, isUserTurn } = useGame()

  const temporaryCoordinate = useGameStore((state) => state.temporaryCoordinate)
  const resetTmp = useGameStore((state) => state.reset)

  const land = useLand(game?.id)

  useEffect(() => () => resetTmp(), [resetTmp])

  const handleSubmit = () => {
    if (!temporaryCoordinate) {
      return
    }

    land(temporaryCoordinate)
  }

  const handlePass = () => {
    land('PS')
  }

  return (
    <>
      <button
        disabled={!isUserTurn}
        onClick={handleSubmit}
      >
        착수
      </button>
      <button
        disabled={!isUserTurn}
        onClick={handlePass}
      >
        건너뛰기
      </button>
      <button>기권</button>
    </>
  )
}

export default GameButton
