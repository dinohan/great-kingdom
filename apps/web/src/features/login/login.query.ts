import { Res, SignInDTO } from 'dtos'

import client from '@/apis/Client'

export function requestSignIn(signInDTO: SignInDTO) {
  return client.post<Res['/auth/sign-in']>('/auth/sign-in', signInDTO)
}
