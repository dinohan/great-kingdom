import { build, getBoardFromLog } from 'utils'

import Grid from '@/components/Grid'
import { useGame } from '@/features/games'

function Game() {
  const { data } = useGame()

  if (!data) {
    return <div>Loading...</div>
  }

  const boardWithoutHouse = getBoardFromLog(data.log)
  const board = build(boardWithoutHouse)

  return (
    <div>
      <Grid board={board} />
    </div>
  )
}

export default Game
