import { UserWithoutCredentials } from 'dtos'
import { create } from 'zustand'

export type State = {
  user: UserWithoutCredentials | null
}

export type Actions = {
  updateUser: (user: UserWithoutCredentials) => void
}

const initialState: State = {
  user: null,
}

export const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  updateUser: (user: UserWithoutCredentials) => {
    set({ user })
  },
}))
