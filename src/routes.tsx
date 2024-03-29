import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './pages/layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />
  }
])
