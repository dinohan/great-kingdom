import { Coordinate } from 'models'
import { create } from 'zustand'

export type State = {
  log: Coordinate[]
}

export type Actions = {
  addLog: (coordinate: Coordinate) => void
}

export const useGameStore = create<State & Actions>((set, get) => ({
  log: [],
  addLog: (coordinate: Coordinate) => {
    set({ log: [...get().log, coordinate] })
  },
}))
