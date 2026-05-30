import { STATUS_LABELS } from '../utils/constants';

const styles = {
  TODO: 'bg-slate-100 text-slate-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-800',
  DONE: 'bg-emerald-100 text-emerald-800',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}
