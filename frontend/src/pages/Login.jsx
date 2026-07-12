import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Lock, User, AlertCircle } from 'lucide-react';
import api from '../utils/api.js';

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', { username, password });
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (err) {
      // Hackathon Bypass Fail-Safe
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('token', 'mock-jwt-hackathon-token');
        setIsAuthenticated(true);
        navigate('/dashboard');
        return;
      }
      setError(err.response?.data?.message || 'Authentication Engine offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Truck size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">TransitOps</h2>
          <p className="text-sm text-slate-500">Sign in to dispatcher terminal</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Username</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800" placeholder="admin" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl text-sm hover:bg-blue-700 transition-all">
            {loading ? 'Authenticating...' : 'Access Control Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}