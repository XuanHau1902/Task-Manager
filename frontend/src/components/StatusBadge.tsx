import type { TaskStatus } from '../types'

const styles: Record<TaskStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700 ring-amber-600/20',
  'In Progress': 'bg-blue-100 text-blue-700 ring-blue-600/20',
  Completed: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  )
}
