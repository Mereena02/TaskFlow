export default function LoadingSpinner({ size = 'md' }) {
  const cls = size === 'sm' ? 'h-5 w-5 border-2' : 'h-8 w-8 border-[3px]';
  return (
    <div className={`${cls} animate-spin rounded-full border-brand-200 border-t-brand-600`} />
  );
}
