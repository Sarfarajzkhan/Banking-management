import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Transactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [transferData, setTransferData] = useState({ account_id: '', title: '', amount: '', type: 'Debit' });

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    const accRes = await fetch('/api/accounts', { headers: { Authorization: `Bearer ${token}` } });
    const accData = await accRes.json();
    setAccounts(accData);
    if (accData.length > 0) {
      setTransferData(prev => ({ ...prev, account_id: accData[0].id }));
    }

    const txRes = await fetch('/api/transactions', { headers: { Authorization: `Bearer ${token}` } });
    const txData = await txRes.json();
    setTransactions(txData);
    
    setLoading(false);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!transferData.account_id || !transferData.amount || !transferData.title) return;

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ...transferData,
        amount: parseFloat(transferData.amount)
      })
    });
    
    setTransferData({ ...transferData, title: '', amount: '' });
    fetchData(); // refresh lists
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Transfer Form */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Transfer Money</h2>
        <form onSubmit={handleTransfer} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm text-slate-500 mb-1">From Account</label>
            <select 
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
              value={transferData.account_id}
              onChange={e => setTransferData({ ...transferData, account_id: e.target.value })}
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.type} (...{acc.account_number.slice(-4)}) - ₹{acc.balance}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">Amount</label>
            <input 
              type="number" min="1" step="0.01" required
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
              value={transferData.amount}
              onChange={e => setTransferData({ ...transferData, amount: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">Description</label>
            <input 
              type="text" required
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
              value={transferData.title}
              onChange={e => setTransferData({ ...transferData, title: e.target.value })}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-5 rounded-xl hover:bg-blue-700 transition-all">
            Send Money
          </button>
        </form>
      </section>

      {/* Transactions List */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold">Transaction History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Type</th>
                <th className="text-right p-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr><td colSpan="4" className="p-4 text-center text-slate-500">No transactions found.</td></tr>
              ) : transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-slate-100 hover:bg-slate-50 transition-all">
                  <td className="p-4 font-medium">{tx.title}</td>
                  <td className="p-4 text-slate-500">{new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tx.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`p-4 text-right font-bold ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'Credit' ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
