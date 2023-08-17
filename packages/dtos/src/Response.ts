import { User } from 'models'

export type Res = {
  '/auth/sign-in': {
    access_token: string
    user: Omit<User, 'password'>
  }
}
