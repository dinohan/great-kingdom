import { useMutation } from '@tanstack/react-query'
import { SignInDTO } from 'dtos'
import { useNavigate } from 'react-router-dom'

import authService from '@/services/AuthService'
import { useUserStore } from '@/store/user/useUserStore'

import { requestSignIn } from './login.query'

export default function useLogin() {
  const navigate = useNavigate()

  const updateUser = useUserStore((store) => store.updateUser)

  const { mutate } = useMutation({
    mutationFn: (siginInDTO: SignInDTO) => requestSignIn(siginInDTO).run(),
    onSuccess: (data) => {
      authService.saveAccessToken(data.access_token)
      updateUser(data.user)
      navigate('/')
    },
  })

  return mutate
}
