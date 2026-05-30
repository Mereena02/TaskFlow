import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold text-brand-700">TaskFlow</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">{user?.fullName}</span>
          <button type="button" onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
