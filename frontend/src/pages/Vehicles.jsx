import { useState, useEffect } from 'react';
import { Truck, Plus, AlertCircle, Search } from 'lucide-react';
import api from '../utils/api.js';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('Truck');
  const [maxLoadCapacity, setMaxLoadCapacity] = useState('');
  const [error, setError] = useState('');

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      setVehicles(res.data);
    } catch (err) { setError('Failed to fetch fleet logs.'); }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { registrationNumber, vehicleName, vehicleType, maxLoadCapacity: Number(maxLoadCapacity) };
      const res = await api.post('/vehicles', payload);
      setVehicles([...vehicles, res.data]);
      setRegistrationNumber('');
      setVehicleName('');
      setMaxLoadCapacity('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unique constraint failure.');
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Available') return <span className="status-badge status-available">Available</span>;
    if (status === 'On Trip') return <span className="status-badge status-ontrip">On Trip</span>;
    if (status === 'In Shop') return <span className="status-badge status-inshop">In Shop</span>;
    return <span className="status-badge bg-slate-100 text-slate-700">{status}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vehicle Fleet</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and monitor all transport assets in the system.</p>
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
            <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
              <Plus size={20} />
            </div>
            <h2 className="text-base font-bold text-slate-900">Add New Vehicle</h2>
          </div>
          <form onSubmit={handleAddVehicle} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Reg Number</label>
              <input type="text" required placeholder="e.g. TX-1234" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Model Name</label>
              <input type="text" required placeholder="Volvo FH16" value={vehicleName} onChange={e => setVehicleName(e.target.value)} className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Type</label>
                <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="input-field">
                  <option value="Truck">Truck</option>
                  <option value="Trailer">Trailer</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Cap (Tons)</label>
                <input type="number" required placeholder="25" value={maxLoadCapacity} onChange={e => setMaxLoadCapacity(e.target.value)} className="input-field" />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-2">
              Register Asset
            </button>
          </form>
        </div>

        <div className="lg:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/50">
            <h3 className="font-semibold text-slate-900">Active Fleet Directory</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search vehicles..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-48 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Vehicle Model</th>
                  <th className="px-6 py-4">Reg Number</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {vehicles.map(v => (
                  <tr key={v._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                          <Truck size={14} />
                        </div>
                        <span className="font-semibold text-slate-900">{v.vehicleName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{v.registrationNumber}</td>
                    <td className="px-6 py-4 font-medium">{v.maxLoadCapacity} Tons</td>
                    <td className="px-6 py-4">{getStatusBadge(v.status)}</td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-sm">
                      No vehicles found. Add your first asset.
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