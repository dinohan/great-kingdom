import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/games/new">New Game</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home
