import type { Task, TaskStatus } from '../types'
import { TaskCard } from './TaskCard'

const columnStyles: Record<TaskStatus, string> = {
  Pending: 'border-t-amber-400',
  'In Progress': 'border-t-blue-400',
  Completed: 'border-t-emerald-400',
}

interface Props {
  status: TaskStatus
  tasks: Task[]
  onDelete: (id: number) => void
}

export function TaskColumn({ status, tasks, onDelete }: Props) {
  return (
    <div className={`flex flex-col rounded-xl border-t-4 bg-slate-50 ${columnStyles[status]}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-semibold text-slate-700">{status}</h2>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-3 px-3 pb-4">
        {tasks.length === 0 ? (
          <p className="px-1 text-sm text-slate-400">Chưa có công việc nào</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} onDelete={onDelete} />)
        )}
      </div>
    </div>
  )
}
