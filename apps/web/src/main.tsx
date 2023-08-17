import './index.css'
import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Games from './pages/Games'
import Game from './pages/Games/Game/Game'
import GamesNew from './pages/Games/New'
import Home from './pages/Home'
import Login from './pages/Login'

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
    path: '/games/:id',
    element: <Game />,
  },
  {
    path: '/games',
    element: <Games />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
