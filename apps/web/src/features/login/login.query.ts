import { SignInDTO } from 'dtos'

import client from '@/apis/Client'

export function requestSignIn(signInDTO: SignInDTO) {
  return client.post<{
    access_token: string
  }>('/auth/sign-in', signInDTO)
}
