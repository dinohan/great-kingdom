import { Game } from './Game'
import { ITimeStamp } from './TimeStamp'
import { User, UserWithoutCredentials } from './User'

interface AccessToeknResponse {
  access_token: string
  user: Omit<User, 'password' | 'currentHashedRefreshToken'> & ITimeStamp
}

export type ResponseDTO = {
  'POST/auth/sign-up': UserWithoutCredentials
  'POST/auth/sign-in': AccessToeknResponse
  'GET/auth/refresh': AccessToeknResponse
  'GET/games': Game[]
  'GET/games/:id': Game
  'POST/games': Game
  'POST/games/:id/land': Game
  'POST/games/:id/join': Game
}
