import { useState, type FormEvent } from 'react'
import type { Task, TaskStatus } from '../types'

const STATUSES: TaskStatus[] = ['Pending', 'In Progress', 'Completed']

interface Props {
  onSubmit: (task: Omit<Task, 'id'>) => Promise<void>
}

export function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('Pending')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    await onSubmit({ title: title.trim(), description: description.trim(), status })
    setTitle('')
    setDescription('')
    setStatus('Pending')
    setSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-slate-500">Tiêu đề</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ví dụ: Hoàn thành báo cáo"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-slate-500">Mô tả</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Chi tiết công việc (không bắt buộc)"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">Trạng thái</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-40"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Đang thêm...' : '+ Thêm task'}
      </button>
    </form>
  )
}
