import { Coordinate } from 'models'
import { create } from 'zustand'

export type State = {
  temporaryCoordinate: Coordinate | null
}

export type Actions = {
  select: (coordinate: Coordinate) => void
  reset: () => void
}

export const useGameStore = create<State & Actions>((set) => ({
  temporaryCoordinate: null,
  select: (coordinate) => {
    set({ temporaryCoordinate: coordinate })
  },
  reset: () => {
    set({ temporaryCoordinate: null })
  },
}))
