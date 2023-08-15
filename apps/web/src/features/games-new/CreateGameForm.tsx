import { useRef } from 'react'

import useCreateGame from './useCreateGame'

function CreateGameForm() {
  const mutate = useCreateGame()

  const titleRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = titleRef.current?.value

    if (!title) return
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
