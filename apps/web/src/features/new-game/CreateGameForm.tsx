import { useRef } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

function CreateGameForm() {
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: ({ title }: { title?: string }) => {
      return new Promise<{
        id: string
      }>((resolve) => {
        console.log(title)
        resolve({ id: 'abcd' })
      })
    },
    onSuccess: (data) => {
      console.log(data)
      false && navigate(`/games/${data.id}`)
    },
  })

  const titleRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = titleRef.current?.value
    mutate({ title })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        <span>Game name</span>
      </label>
      <input
        ref={titleRef}
        id="title"
        type="text"
        placeholder="Game name"
      />
      <button type="submit">Create game</button>
    </form>
  )
}

export default CreateGameForm
