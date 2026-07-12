import { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-bold text-slate-900">Driver Registry</h1></div>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2"><AlertCircle size={16}/><span>{error}</span></div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border shadow-sm h-fit">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"><Plus size={16}/> Register Driver</h2>
          <form onSubmit={handleAddDriver} className="space-y-3">
            <input type="text" required placeholder="Operator Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <input type="text" required placeholder="License Number" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <input type="date" required value={licenseExpiry} onChange={e => setLicenseExpiry(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white text-sm rounded-xl font-medium">Authorize Driver</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 text-xs border-b">
              <tr><th className="px-6 py-3">Operator</th><th className="px-6 py-3">License Info</th><th className="px-6 py-3">Expiry Date</th><th className="px-6 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {drivers.map(d => (
                <tr key={d._id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold">{d.name}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-500">{d.licenseNumber}</td>
                  <td className="px-6 py-3">{new Date(d.licenseExpiry).toLocaleDateString()}</td>
                  <td className="px-6 py-3"><span className="text-xs px-2 py-0.5 border rounded bg-slate-50">{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}