import { Game } from './Game'
import { UserWithoutCredentials } from './User'

interface AccessToeknResponse {
  access_token: string
  user: UserWithoutCredentials
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
