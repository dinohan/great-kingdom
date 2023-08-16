import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { PostGameDTO, requestPostGames } from './games-new.query'

function useCreateGame() {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (data: PostGameDTO) => requestPostGames(data).run(),
    onSuccess: (data) => {
      queryClient.setQueryData(['games', data.id], data)
      navigate(`/games/${data.id}`)
    },
  })

  return mutate
}

export default useCreateGame
