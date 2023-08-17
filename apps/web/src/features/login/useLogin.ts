import { useMutation } from '@tanstack/react-query'
import { SignInDTO } from 'dtos'
import { useNavigate } from 'react-router-dom'

import authService from '@/services/AuthService'

import { requestSignIn } from './login.query'

export default function useLogin() {
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: (siginInDTO: SignInDTO) => requestSignIn(siginInDTO).run(),
    onSuccess: (data) => {
      authService.saveAccessToken(data.access_token)
      navigate('/')
    },
  })

  return mutate
}
