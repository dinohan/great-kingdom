import { ITimeStamp } from './TimeStamp'

export interface UserKey {
  id: string
}

export interface User extends UserKey, ITimeStamp {
  email: string
  nickname: string
  password: string
  currentHashedRefreshToken?: string | null
}

export type UserWithoutCredentials = Omit<
  User,
  'password' | 'currentHashedRefreshToken'
>
