import axios from 'axios'

const ClientAPI = axios.create({
  baseURL: 'http://94.74.86.174:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default ClientAPI
