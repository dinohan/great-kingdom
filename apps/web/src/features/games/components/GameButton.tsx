import { useEffect } from 'react'

import classNames from 'classnames'

import useLand from '@/features/lands/useLand'
import { useGameStore } from '@/store/game/useGameStore'

import useGame from '../hooks/useGame'

import styles from './GameButton.module.scss'

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
    <div className={styles.wrapper}>
      <button
        className={classNames(styles.submit, {
          [styles.notReady]: !isUserTurn,
        })}
        disabled={!isUserTurn || !temporaryCoordinate}
        onClick={handleSubmit}
      >
        {isUserTurn ? '착수' : '상대 턴'}
      </button>

      <div className={styles.subActions}>
        <button
          disabled={!isUserTurn}
          onClick={handlePass}
        >
          건너뛰기
        </button>
      </div>
    </div>
  )
}

export default GameButton
