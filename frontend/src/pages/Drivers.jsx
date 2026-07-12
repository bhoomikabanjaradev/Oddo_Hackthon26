import { useState, useEffect } from 'react';
import { Users, Plus, AlertCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/drivers';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [error, setError] = useState('');

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setDrivers(res.data);
    } catch (err) {
      setError('Failed to fetch drivers pool from database.');
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !licenseNumber || !licenseExpiry) return;

    try {
      const payload = { name, licenseNumber, licenseExpiry };
      const res = await axios.post(API_BASE_URL, payload);
      setDrivers([...drivers, res.data]);
      setName('');
      setLicenseNumber('');
      setLicenseExpiry('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating driver account.');
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'Available') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'On Trip') return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Driver Registry</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage operator profiles and compliance status.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2.5 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Plus size={16} className="text-blue-600" /> Register Driver
          </h2>
          <form onSubmit={handleAddDriver} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-800"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">License Number</label>
              <input
                type="text"
                required
                placeholder="e.g. DL14201800987"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-800"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">License Expiry Date</label>
              <input
                type="date"
                required
                value={licenseExpiry}
                onChange={(e) => setLicenseExpiry(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-800"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm shadow-sm transition-all">
              Authorize Driver
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Operator Records</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">{drivers.length} Drivers</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-3">Operator</th>
                  <th className="px-6 py-3">License Number</th>
                  <th className="px-6 py-3">Expiry Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {drivers.map((d) => {
                  const isExpired = new Date(d.licenseExpiry) < new Date();
                  return (
                    <tr key={d._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-slate-800">{d.name}</td>
                      <td className="px-6 py-3.5 font-mono text-xs text-slate-500">{d.licenseNumber}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className={isExpired ? 'text-red-600 font-semibold' : 'text-slate-600'}>
                            {new Date(d.licenseExpiry).toLocaleDateString()}
                          </span>
                          {isExpired && <AlertTriangle size={14} className="text-red-500" />}
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-1 text-xs border rounded-md font-medium ${getStatusStyle(d.status)}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}