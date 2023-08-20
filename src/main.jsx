import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Root from './routes/root.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import Index from './routes/Index'
import NotePage from './routes/NotePage'
import SignupPage from './routes/SignupPage'
import GroupsPage from './routes/GroupsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/groups',
        element: <GroupsPage />
      },
      {
        path: '/notes/:groupId',
        element: <NotePage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
