import { Board } from "../models/Board"
import Space from "./Space"

function Grid({
  board,
}: {
  board: Board
}) {
  return (
  <>
  {
    board.map((row, i) => (
      row.map((entity, j) => (
        <Space key={`${i}-${j}`} entity={entity} />
      ))
    ))
  }
  </>
  )
}

export default Grid
