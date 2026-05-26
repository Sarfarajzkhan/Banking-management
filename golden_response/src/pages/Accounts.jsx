import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Accounts() {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, [token]);

  const fetchAccounts = async () => {
    const res = await fetch('/api/accounts', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setAccounts(data);
    setLoading(false);
  };

  const createAccount = async () => {
    await fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ type: 'Savings Account', balance: 0 })
    });
    fetchAccounts();
  };

  const deleteAccount = async (id) => {
    if (confirm('Are you sure you want to delete this account?')) {
      await fetch(`/api/accounts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAccounts();
    }
  };

  if (loading) return <div>Loading accounts...</div>;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">Your Accounts</h2>
        <button 
          onClick={createAccount}
          className="bg-slate-900 text-white px-5 py-2 rounded-xl hover:bg-black transition-all"
        >
          + Create Account
        </button>
      </div>

      {accounts.length === 0 ? (
        <p className="text-slate-500">No accounts found. Create one to get started.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-sm">{account.type}</p>
                  <h3 className="text-xl font-bold mt-1">
                    ₹{account.balance.toLocaleString('en-IN')}
                  </h3>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${account.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {account.status}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-slate-500 text-sm">Account Number</p>
                <h4 className="font-semibold tracking-widest mt-1">{account.account_number}</h4>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all">
                  View Details
                </button>
                <button 
                  onClick={() => deleteAccount(account.id)}
                  className="flex-1 border border-red-300 text-red-600 py-2 rounded-xl hover:bg-red-50 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
