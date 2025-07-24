import { useRoutes } from 'react-router-dom'
import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'
import HomePage from './HomePage'
import TodoCreatePage from './todo/TodoCreatePage'
import TodoDetailPage from './todo/TodoDetailPage'
import TodoDetailItemPage from './todo/TodoItemDetailPage'
import TodoPage from './todo/TodoPage'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/todo-list',
      element: <TodoPage />,
    },
    {
      path: '/todo-create',
      element: <TodoCreatePage />,
    },
    {
      path: '/todo-list/:id',
      element: <TodoDetailPage />,
    },
    {
      path: '/todo-item/:id',
      element: <TodoDetailItemPage />,
    },
  ])
}
