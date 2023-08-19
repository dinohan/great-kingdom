import { Route, Routes } from 'react-router-dom'

import Games from './pages/Games'
import Game from './pages/Games/Game/Game'
import GamesNew from './pages/Games/New'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/games/new"
        element={<GamesNew />}
      />
      <Route
        path="/games/:id"
        element={<Game />}
      />
      <Route
        path="/games"
        element={<Games />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
    </Routes>
  )
}
