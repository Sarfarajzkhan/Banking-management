import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ balance: 0, accounts: 0, transactions: 0 });

  useEffect(() => {
    async function fetchData() {
      const accRes = await fetch('/api/accounts', { headers: { Authorization: `Bearer ${token}` } });
      const accounts = await accRes.json();
      
      const txRes = await fetch('/api/transactions', { headers: { Authorization: `Bearer ${token}` } });
      const transactions = await txRes.json();

      const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
      const txThisMonth = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        const now = new Date();
        return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
      }).length;

      setStats({
        balance: totalBalance,
        accounts: accounts.length,
        transactions: txThisMonth
      });
    }
    fetchData();
  }, [token]);

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-3xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-2">
        Welcome back, {user?.name.split(' ')[0]} 👋
      </h2>
      <p className="text-blue-100">
        Manage your banking accounts securely and track your financial activities in real time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <p className="text-sm text-blue-100">Total Balance</p>
          <h3 className="text-3xl font-bold mt-2">
            ₹{stats.balance.toLocaleString('en-IN')}
          </h3>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <p className="text-sm text-blue-100">Active Accounts</p>
          <h3 className="text-3xl font-bold mt-2">{stats.accounts}</h3>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <p className="text-sm text-blue-100">Transactions This Month</p>
          <h3 className="text-3xl font-bold mt-2">{stats.transactions}</h3>
        </div>
      </div>
    </section>
  );
}
