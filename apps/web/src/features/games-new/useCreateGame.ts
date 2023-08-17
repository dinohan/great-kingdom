import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateGameDTO } from 'dtos'
import { useNavigate } from 'react-router-dom'

import { requestPostGames } from './games-new.query'

function useCreateGame() {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (data: CreateGameDTO) => requestPostGames(data).run(),
    onSuccess: (data) => {
      queryClient.setQueryData(['games', data.id], data)
      navigate(`/games/${data.id}`)
    },
  })

  return mutate
}

export default useCreateGame
