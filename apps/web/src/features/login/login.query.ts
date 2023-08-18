import { ResponseDTO, SignInDTO } from 'dtos'

import client from '@/apis/Client'

export function requestSignIn(signInDTO: SignInDTO) {
  return client.post<ResponseDTO['POST/auth/sign-in']>(
    '/auth/sign-in',
    signInDTO
  )
}
