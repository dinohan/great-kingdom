import { create } from "zustand";
import Coordinate from "../../models/Coordinate";

type State = {
  log: Coordinate[];
}

type Actions = {
  addLog: (coordinate: Coordinate) => void;
}

export const useGameStore = create<State & Actions>((set, get) => ({
  log: [],
  addLog: (coordinate: Coordinate) => {
    set({ log: [...get().log, coordinate] });
  }
}))
