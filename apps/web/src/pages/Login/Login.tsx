import { useRef } from 'react'

import { useLogin } from '@/features/login'

function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const login = useLogin()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    console.log({ email, password })

    if (!email || !password) {
      return
    }

    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        ref={emailRef}
        required
        type="email"
        id="email"
        name="email"
      />
      <label htmlFor="password">Password</label>
      <input
        ref={passwordRef}
        required
        type="password"
        id="password"
        name="password"
      />

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
