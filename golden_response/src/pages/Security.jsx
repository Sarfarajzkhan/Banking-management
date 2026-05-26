import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Security() {
  const { user, token, login } = useAuth();
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const res = await fetch('/api/security/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(passwords)
    });

    if (res.ok) {
      setMessage('Password updated successfully');
      setPasswords({ currentPassword: '', newPassword: '' });
    } else {
      const data = await res.json();
      setMessage(data.error || 'Failed to update password');
    }
  };

  const toggle2FA = async () => {
    const newEnabledState = !user.two_factor_enabled;
    const res = await fetch('/api/security/2fa', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ enabled: newEnabledState })
    });
    if (res.ok) {
      login(token, { ...user, two_factor_enabled: newEnabledState });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Security Center</h2>
      {message && <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-xl text-sm">{message}</div>}

      <div className="space-y-5">
        <div className="flex items-center justify-between border border-slate-200 rounded-2xl p-4">
          <div>
            <h3 className="font-semibold">Two Factor Authentication</h3>
            <p className="text-sm text-slate-500">Add extra protection to your account.</p>
          </div>
          <button 
            onClick={toggle2FA}
            className={`px-4 py-2 rounded-xl font-semibold ${user?.two_factor_enabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {user?.two_factor_enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <form onSubmit={handlePasswordChange} className="border border-slate-200 rounded-2xl p-4">
          <h3 className="font-semibold mb-1">Change Password</h3>
          <p className="text-sm text-slate-500 mb-4">Update your account password securely.</p>
          
          <div className="space-y-3 mb-4">
            <input 
              type="password" required placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="password" required placeholder="New Password"
              value={passwords.newPassword}
              onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
