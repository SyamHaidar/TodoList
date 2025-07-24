import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoAPI from '../../service/TodoAPI'

export default function TodoCreatePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('You must be logged in to create a todo.')
      return
    }

    try {
      await TodoAPI.create(
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Todo created successfully!')
      setName('')
      navigate('/todo-list')
    } catch (error) {
      console.error('Error creating todo:', error)
      alert('Failed to create todo.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter todo name"
          className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Create
        </button>
      </form>
    </div>
  )
}
