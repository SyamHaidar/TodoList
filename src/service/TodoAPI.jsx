import ClientAPI from '../configs/clientAPI'

const TodoAPI = {
  getAll(config) {
    return ClientAPI.get('/checklist', config)
  },

  getById(id, config) {
    return ClientAPI.get(`/checklist/${id}`, config)
  },

  create(props, config) {
    const formData = new FormData()

    formData.append('name', props.name)

    return ClientAPI.post('/checklist', formData, config)
  },

  delete(id, config) {
    return ClientAPI.delete(`/checklist/${id}`, config)
  },

  getItemById(id, config) {
    return ClientAPI.get(`/checklist/${id}/item`, config)
  },

  updateItem(id, itemId, status, config) {
    const formData = new FormData()
    formData.append('itemCompletionStatus', status)
    return ClientAPI.post(`/checklist/${id}/item/${itemId}`, formData, config)
  },
}

export default TodoAPI
