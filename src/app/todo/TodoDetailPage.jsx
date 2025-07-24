import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TodoAPI from '../../service/TodoAPI'

export default function TodoDetailPage() {
  const { id } = useParams()
  const [todo, setTodo] = useState(null)

  useEffect(() => {
    const fetchDetail = async () => {
      const token = localStorage.getItem('token')
      if (!token || !id) return

      try {
        const response = await TodoAPI.getById(id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTodo(response.data.data)
      } catch (error) {
        console.error('Failed to fetch detail:', error)
      }
    }

    fetchDetail()
  }, [id])

  if (!todo) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{todo.name}</h1>
      <ul className="list-disc list-inside space-y-2">
        {Array.isArray(todo.items) &&
          todo.items.filter(Boolean).map((item) => (
            <li key={item.id} className="text-gray-800">
              {item.name} {item.itemCompletionStatus ? '(Done)' : ''}
            </li>
          ))}
      </ul>
    </div>
  )
}
