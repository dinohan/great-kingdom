import { Game } from './Game'
import { ITimeStamp } from './TimeStamp'
import { UserWithoutCredentials } from './User'

interface AccessToeknResponse {
  access_token: string
  user: UserWithoutCredentials & ITimeStamp
}

export type ResponseDTO = {
  'POST/auth/sign-up': UserWithoutCredentials
  'POST/auth/sign-in': AccessToeknResponse
  'GET/auth/refresh': AccessToeknResponse
  'GET/games': (Game & ITimeStamp)[]
  'GET/games/:id': Game & ITimeStamp
  'POST/games': Game & ITimeStamp
  'POST/games/:id/land': Game & ITimeStamp
  'POST/games/:id/join': Game & ITimeStamp
}
