import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ResponseDTO } from 'dtos'

import client from '@/apis/Client'
import { useUserStore } from '@/store/user/useUserStore'

function reqeustGetMe() {
  return client.get<ResponseDTO['GET/auth/me']>('/auth/me').withToken()
}

export default function useMe() {
  const { data } = useQuery(['me'], () => reqeustGetMe().run(), {
    refetchInterval: 30 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
    retry: 3,
    retryDelay: 30 * 60 * 1000,
  })

  const updateUser = useUserStore((store) => store.updateUser)

  useEffect(() => {
    if (!data) {
      return
    }

    updateUser(data)
  }, [data, updateUser])
}
