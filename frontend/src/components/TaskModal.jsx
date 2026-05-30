import TaskForm from './TaskForm';

export default function TaskModal({ title, initialValues, onSubmit, onClose, submitLabel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-800">✕</button>
        </div>
        <TaskForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onClose} submitLabel={submitLabel} />
      </div>
    </div>
  );
}
