import { useRef } from 'react'

import { Turn } from 'models'

import styles from './CreateGameForm.module.scss'
import useCreateGame from './useCreateGame'

interface FormData {
  turn: { value: Turn | 'random' }
}

function CreateGameForm() {
  const mutate = useCreateGame()

  const turnRef = useRef<HTMLFieldSetElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as typeof e.target & FormData

    const turn = target.turn.value === 'random' ? null : target.turn.value

    mutate({ turn })
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <fieldset
        ref={turnRef}
        className={styles.radioGroup}
      >
        <div className={styles.radio}>
          <input
            type="radio"
            id="turn-black"
            name="turn"
            value={Turn.BLACK}
          />
          <label htmlFor="turn-black">
            <span>Black</span>
          </label>
        </div>

        <div className={styles.radio}>
          <input
            type="radio"
            id="turn-white"
            name="turn"
            value={Turn.WHITE}
          />
          <label htmlFor="turn-white">
            <span>White</span>
          </label>
        </div>

        <div className={styles.radio}>
          <input
            type="radio"
            id="turn-random"
            name="turn"
            value="random"
            defaultChecked
          />
          <label htmlFor="turn-random">
            <span>Random</span>
          </label>
        </div>
      </fieldset>

      <button
        className={styles.submit}
        type="submit"
      >
        Create game
      </button>
    </form>
  )
}

export default CreateGameForm
