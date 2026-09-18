import axios from 'axios'
import type { Task } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'
const API_URL = `${BASE_URL}/tasks`

export const getTasks = () => axios.get<Task[]>(API_URL).then((res) => res.data)

export const createTask = (task: Omit<Task, 'id'>) =>
  axios.post<Task>(API_URL, task).then((res) => res.data)

export const deleteTask = (id: number) => axios.delete(`${API_URL}/${id}`)
