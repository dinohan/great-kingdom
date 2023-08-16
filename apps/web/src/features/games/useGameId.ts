import { useMatch } from 'react-router-dom'

export default function useGameId() {
  const match = useMatch('/games/:id')

  return match?.params.id
}
