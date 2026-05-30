const styles = {
  HIGH: 'bg-red-100 text-red-800',
  MEDIUM: 'bg-orange-100 text-orange-800',
  LOW: 'bg-green-100 text-green-800',
};

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}