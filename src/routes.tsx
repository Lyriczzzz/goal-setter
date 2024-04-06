import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './pages/layout'
import { Home } from './pages/home'
import { CreateGoal } from './pages/create-goal/create-goal'
import { YourGoals } from './pages/your-goals/your-goals'
import { LoginForm } from './pages/login-form'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/create-goal',
        element: <CreateGoal />,
      },
      {
        path: '/your-goals',
        element: <YourGoals />,
      },
      {
        path: '/login-form',
        element: <LoginForm />,
      },
    ],
  },
])
