import { useEffect, useState } from 'react'
import type { Task, TaskStatus } from './types'
import { getTasks, createTask, deleteTask } from './api/tasks'
import { TaskForm } from './components/TaskForm'
import { TaskColumn } from './components/TaskColumn'

const STATUSES: TaskStatus[] = ['Pending', 'In Progress', 'Completed']

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = async () => {
    try {
      setError(null)
      const data = await getTasks()
      setTasks(data)
    } catch {
      setError('Không thể tải danh sách công việc. Kiểm tra backend đã chạy chưa.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleAdd = async (task: Omit<Task, 'id'>) => {
    await createTask(task)
    await loadTasks()
  }

  const handleDelete = async (id: number) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
          <p className="mt-1 text-slate-500">Theo dõi công việc theo trạng thái</p>
        </header>

        <TaskForm onSubmit={handleAdd} />

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
        )}

        {loading ? (
          <p className="mt-8 text-center text-slate-400">Đang tải...</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STATUSES.map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={tasks.filter((t) => t.status === status)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
