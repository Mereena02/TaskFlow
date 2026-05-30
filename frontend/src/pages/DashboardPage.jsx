import { useCallback, useEffect, useState } from 'react';
import * as taskApi from '../api/taskApi';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { TASK_STATUSES, getErrorMessage } from '../utils/constants';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await taskApi.getTasks(statusFilter || undefined);
      setTasks(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await taskApi.deleteTask(task.id);
      await loadTasks();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Your tasks</h2>
        <button type="button" onClick={() => setModal({ mode: 'create' })} className="btn-primary">
          + New task
        </button>
      </div>

      <select
        className="input-field mb-6 max-w-xs"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All statuses</option>
        {TASK_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {error && <div className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : tasks.length === 0 ? (
        <div className="card text-center text-slate-600">No tasks yet.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(t) => setModal({ mode: 'edit', task: t })}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modal?.mode === 'create' && (
        <TaskModal
          title="Create task"
          submitLabel="Create"
          initialValues={{ status: 'TODO', priority: 'MEDIUM' }}
          onClose={() => setModal(null)}
          onSubmit={async (payload) => {
            await taskApi.createTask(payload);
            setModal(null);
            await loadTasks();
          }}
        />
      )}

      {modal?.mode === 'edit' && (
        <TaskModal
          title="Edit task"
          submitLabel="Save"
          initialValues={modal.task}
          onClose={() => setModal(null)}
          onSubmit={async (payload) => {
            await taskApi.updateTask(modal.task.id, payload);
            setModal(null);
            await loadTasks();
          }}
        />
      )}
    </Layout>
  );
}
