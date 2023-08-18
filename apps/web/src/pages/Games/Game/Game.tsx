import { build, getBoardFromLog } from 'utils'

import Grid from '@/components/Grid'
import { useGame } from '@/features/games'
import useJoin from '@/features/games/useJoin'

function Game() {
  const { data } = useGame()

  useJoin()

  if (!data) {
    return <div>Loading...</div>
  }

  const board = build(getBoardFromLog(data.log))

  return (
    <div>
      <Grid board={board} />
    </div>
  )
}

export default Game
