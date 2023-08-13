import { build, getBoardFromLog } from "../../utils/gameUtils";
import { useGameStore } from "./useGameStore";

export function useBoard() {
  const log =  useGameStore(state => state.log);
  const boardWithoutHouse = getBoardFromLog(log)
  const board = build(boardWithoutHouse);

  return board;
}
