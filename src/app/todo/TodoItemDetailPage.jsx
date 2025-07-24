import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TodoAPI from '../../service/TodoAPI'

export default function TodoDetailItemPage() {
  const { id } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token')
      if (!token || !id) return

      try {
        const response = await TodoAPI.getItemById(id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setItems(response.data.data)
      } catch (error) {
        console.error('Failed to fetch items:', error)
      }
    }

    fetchItems()
  }, [id])

  const handleToggle = async (item) => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (!token) return

    try {
      const updatedStatus = !item.itemCompletionStatus
      await TodoAPI.updateItem(id, item.id, updatedStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, itemCompletionStatus: updatedStatus } : i)))
    } catch (error) {
      console.error('Failed to update item:', error)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checklist Items</h1>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="p-4 bg-white rounded shadow flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.itemCompletionStatus}
              onChange={() => handleToggle(item)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
