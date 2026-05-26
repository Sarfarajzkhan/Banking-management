import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    const usersRes = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
    const accRes = await fetch('/api/admin/accounts', { headers: { Authorization: `Bearer ${token}` } });
    
    if (usersRes.ok && accRes.ok) {
      setUsers(await usersRes.json());
      setAccounts(await accRes.json());
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user and all their accounts/transactions?')) {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchData();
      else alert('Failed to delete user');
    }
  };

  if (loading) return <div>Loading admin panel...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Admin Panel</h2>

      {/* Users Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-2xl font-bold">Manage Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50 transition-all">
                  <td className="p-4">{u.id}</td>
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {u.id !== user.id && (
                      <button onClick={() => deleteUser(u.id)} className="text-red-600 hover:underline text-sm font-semibold">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accounts Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-2xl font-bold">All Accounts Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="text-left p-4">Owner</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Account No</th>
                <th className="text-right p-4">Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50 transition-all">
                  <td className="p-4 font-medium">{a.user_name}</td>
                  <td className="p-4">{a.type}</td>
                  <td className="p-4 font-mono text-sm">{a.account_number}</td>
                  <td className="p-4 text-right font-bold">₹{a.balance.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
