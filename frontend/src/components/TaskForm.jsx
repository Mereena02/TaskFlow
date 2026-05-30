import { useState } from 'react';
import { generateDescription } from '../api/aiApi';
import { TASK_PRIORITIES, TASK_STATUSES, getErrorMessage } from '../utils/constants';
import LoadingSpinner from './LoadingSpinner';

const defaults = { title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '', context: '' };

export default function TaskForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState({ ...defaults, ...initialValues });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleGenerate = async () => {
    if (!form.title.trim()) return setError('Enter a title first.');
    setGenerating(true);
    setError('');
    try {
      const { data } = await generateDescription({ title: form.title, context: form.context || undefined });
      setForm((p) => ({ ...p, description: data.description }));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await onSubmit({
        title: form.title,
        description: form.description || null,
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate || null,
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}

      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input name="title" className="input-field" value={form.title} onChange={handleChange} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">AI context (optional)</label>
        <input name="context" className="input-field" value={form.context} onChange={handleChange} />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium">Description</label>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {generating ? <LoadingSpinner size="sm" /> : 'Generate with Gemini AI'}
          </button>
        </div>
        <textarea name="description" className="input-field min-h-[120px]" value={form.description} onChange={handleChange} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select name="status" className="input-field" value={form.status} onChange={handleChange}>
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Priority</label>
          <select name="priority" className="input-field" value={form.priority} onChange={handleChange}>
            {TASK_PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Due date</label>
          <input name="dueDate" type="date" className="input-field" value={form.dueDate || ''} onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
