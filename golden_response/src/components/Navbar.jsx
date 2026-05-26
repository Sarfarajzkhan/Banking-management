import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div>
        <h1 className="text-2xl font-bold text-blue-700">SecureBank</h1>
        <p className="text-sm text-slate-500">Personal Banking Management System</p>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/transactions')}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          Transfer Money
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
          {initials}
        </div>
        
        <button 
          onClick={handleLogout}
          className="text-sm font-medium text-slate-500 hover:text-red-600 ml-2"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
