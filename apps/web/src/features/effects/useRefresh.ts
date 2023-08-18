import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ResponseDTO } from 'dtos'

import client from '@/apis/Client'
import authService from '@/services/AuthService'

function reqeustGetRefresh() {
  return client.get<ResponseDTO['GET/auth/refresh']>('/auth/refresh')
}

export default function useRefresh() {
  const { data } = useQuery(['refresh'], () => reqeustGetRefresh().run(), {
    refetchInterval: 30 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
    retry: 3,
    retryDelay: 30 * 60 * 1000,
  })

  useEffect(() => {
    authService.saveAccessToken(data?.access_token)
  }, [data?.access_token])
}
