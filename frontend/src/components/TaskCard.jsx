export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <article className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {task.status} · {task.priority}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => onEdit(task)} className="btn-secondary px-3 py-1 text-xs">
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="rounded-lg bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
          >
            Delete
          </button>
        </div>
      </div>
      {task.description && <p className="mt-3 text-sm text-slate-600">{task.description}</p>}
      <p className="mt-3 text-xs text-slate-400">
        {task.dueDate ? `Due ${task.dueDate}` : 'No due date'}
      </p>
    </article>
  );
}
