import { ITimeStamp } from './TimeStamp'
import { User } from './User'

interface AccessToeknResponse {
  access_token: string
  user: Omit<User, 'password' | 'currentHashedRefreshToken'> & ITimeStamp
}

export type ResponseDTO = {
  '/auth/sign-in': AccessToeknResponse
  '/auth/refresh': AccessToeknResponse
}
