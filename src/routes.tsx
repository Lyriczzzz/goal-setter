import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './pages/layout'
import { SignIn } from './pages/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />
      }
    ]
  }
])
