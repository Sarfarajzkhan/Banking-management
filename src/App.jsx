import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import Security from './pages/Security';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route element={<ProtectedRoute />}>
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-slate-100 text-slate-800">
              <Navbar />
              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
                <Sidebar />
                <main className="p-6 space-y-8">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/admin" element={<AdminPanel />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
