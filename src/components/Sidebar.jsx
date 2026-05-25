import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Accounts', path: '/accounts' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Profile', path: '/profile' },
    { name: 'Security', path: '/security' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Panel', path: '/admin' });
  }

  return (
    <aside className="bg-white border-r border-slate-200 min-h-screen p-6 hidden lg:block">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-3 rounded-xl cursor-pointer transition-all font-medium ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-blue-50 text-slate-700'
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
