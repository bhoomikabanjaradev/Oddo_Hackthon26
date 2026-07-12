import { useState, useEffect } from 'react';
import { Users, Plus, AlertCircle, Search } from 'lucide-react';
import api from '../utils/api.js';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [error, setError] = useState('');

  const fetchDrivers = async () => {
    try {
      const res = await api.get('/drivers');
      setDrivers(res.data);
    } catch (err) { setError('Failed to fetch operators pool.'); }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { name, licenseNumber, licenseExpiry };
      const res = await api.post('/drivers', payload);
      setDrivers([...drivers, res.data]);
      setName('');
      setLicenseNumber('');
      setLicenseExpiry('');
    } catch (err) { setError(err.response?.data?.message || 'Driver profile collision.'); }
  };

  const getStatusBadge = (status) => {
    if (status === 'Available') return <span className="status-badge status-available">Available</span>;
    if (status === 'On Trip') return <span className="status-badge status-ontrip">On Trip</span>;
    if (status === 'Suspended') return <span className="status-badge status-inshop">Suspended</span>;
    return <span className="status-badge bg-slate-100 text-slate-700">{status}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Driver Registry</h1>
        <p className="text-sm text-slate-500 mt-1">Manage transport operators and license validity.</p>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm flex items-center gap-3 border border-rose-100">
          <AlertCircle size={18} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Plus size={20} />
            </div>
            <h2 className="text-base font-bold text-slate-900">Authorize Driver</h2>
          </div>
          <form onSubmit={handleAddDriver} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Full Name</label>
              <input type="text" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">License Number</label>
              <input type="text" required placeholder="DL-987654321" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">License Expiry</label>
              <input type="date" required value={licenseExpiry} onChange={e => setLicenseExpiry(e.target.value)} className="input-field" />
            </div>
            <button type="submit" className="btn-primary mt-2">
              Register Operator
            </button>
          </form>
        </div>

        <div className="lg:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/50">
            <h3 className="font-semibold text-slate-900">Active Operators Directory</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search drivers..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Operator</th>
                  <th className="px-6 py-4">License Info</th>
                  <th className="px-6 py-4">Expiry Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {drivers.map(d => (
                  <tr key={d._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          <Users size={14} />
                        </div>
                        <span className="font-semibold text-slate-900">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{d.licenseNumber}</td>
                    <td className="px-6 py-4 font-medium">{new Date(d.licenseExpiry).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(d.status)}</td>
                  </tr>
                ))}
                {drivers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-sm">
                      No drivers found. Register your first operator.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}