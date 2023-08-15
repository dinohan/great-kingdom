import React from 'react'

import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Game from './pages/Game/Game.tsx'
import New from './pages/Game/New/New.tsx'
import Home from './pages/Home/Home.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/games/new',
    element: <New />,
  },
  {
    path: '/game',
    element: <Game />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
