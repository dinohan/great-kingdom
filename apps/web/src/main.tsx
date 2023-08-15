import React from 'react'

import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Games from './pages/Games'
import GamesNew from './pages/Games/New'
import Home from './pages/Home'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/games/new',
    element: <GamesNew />,
  },
  {
    path: '/game',
    element: <Games />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
