import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import TodoAPI from '../../service/TodoAPI'

export default function TodoPage() {
  const [todos, setTodos] = useState([])

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await TodoAPI.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('Failed to delete todo.')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const response = await TodoAPI.getAll({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTodos(response.data.data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <Link to="/todo-create" className="text-blue-600 hover:underline">
            Add new todo
          </Link>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              {/* <Link to={`/todo-list/${todo.id}`} className="text-blue-600 hover:underline">
                {todo.name}
              </Link> */}
              <span>{todo.name}</span>
              <button onClick={() => handleDelete(todo.id)} className="text-red-600 hover:underline">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 max-w-3xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">Todo List Items</h1>
        </div>
        <ul className="space-y-2">
          {todos.flatMap((checklist) =>
            (checklist.items ?? []).map((todo) => (
              <li key={todo.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={checklist.checklistCompletionStatus} readOnly />
                  <Link to={`/todo-item/${checklist.id}`} className="hover:underline">
                    {todo.name}
                  </Link>
                </label>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  )
}
