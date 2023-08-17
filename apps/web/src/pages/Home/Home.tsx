import { Link } from 'react-router-dom'

import styles from './Home.module.scss'

function Home() {
  return (
    <div className={styles.wrapper}>
      <Link to="/games/new">New Game</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home
