import { Turn } from "../../models/Turn";
import { build, getBoardFromLog } from "../../utils/gameUtils";
import { State } from "./useGameStore";

export const getBoard = (state: State) => {
  const log = state.log
  const boardWithoutHouse = getBoardFromLog(log)
  const board = build(boardWithoutHouse);
  return board;
}

export const getTurn = (state: State) => state.log.length % 2 === 0 ? Turn.BLACK : Turn.WHITE;
