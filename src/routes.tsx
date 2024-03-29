import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './pages/layout'
import { Home } from './pages/home'
import { CreateGoal } from './pages/create-goal/create-goal'
import { SignIn } from './pages/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/create-goal',
        element: <CreateGoal />
      },
      {
        path: '/sign-in',
        element: <SignIn />
      }
    ]
  }
])
