import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.wrapper}>
      <h1>
        <Link to="/">Great Kingdom</Link>
      </h1>

      <AccountCircleIcon />
    </header>
  )
}

export default Header
