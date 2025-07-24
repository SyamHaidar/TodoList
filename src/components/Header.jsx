import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-semibold text-white hover:underline">
            Todo List
          </Link>
          <Link to="/" className="text-white hover:underline ml-5">
            Home
          </Link>
        </div>
        <nav className="flex space-x-4">
          {!isLoggedIn && (
            <>
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/todo-list" className="text-white hover:underline">
                Todo
              </Link>
              <span>Halo</span>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
