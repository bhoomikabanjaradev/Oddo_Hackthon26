import { useState, useEffect } from 'react';
import { Plus, Play, CheckCircle, AlertCircle, MapPin, Truck, Search } from 'lucide-react';
import api from '../utils/api.js';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [route, setRoute] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [error, setError] = useState('');

  const refreshOptions = () => {
    api.get('/vehicles').then(res => setVehicles(res.data.filter(v => v.status === 'Available')));
    api.get('/drivers').then(res => setDrivers(res.data.filter(d => d.status === 'Available')));
    api.get('/trips').then(res => setTrips(res.data));
  };

  useEffect(() => { refreshOptions(); }, []);

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/trips', { vehicle: selectedVehicle, driver: selectedDriver, route, cargoWeight: Number(cargoWeight) });
      setSelectedVehicle(''); setSelectedDriver(''); setRoute(''); setCargoWeight('');
      refreshOptions();
    } catch (err) { setError(err.response?.data?.message || 'Business logic validation failure.'); }
  };

  const handleDispatch = async (id) => {
    await api.patch(`/trips/${id}/dispatch`);
    refreshOptions();
  };

  const handleComplete = async (id) => {
    await api.patch(`/trips/${id}/complete`);
    refreshOptions();
  };

  const getStatusBadge = (status) => {
    if (status === 'Created') return <span className="status-badge bg-slate-100 text-slate-700">Pending Dispatch</span>;
    if (status === 'Dispatched') return <span className="status-badge status-ontrip">En Route</span>;
    if (status === 'Completed') return <span className="status-badge status-available">Delivered</span>;
    return <span className="status-badge bg-slate-100 text-slate-700">{status}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Dispatches</h1>
        <p className="text-sm text-slate-500 mt-1">Assign drivers to vehicles and manage trip lifecycles.</p>
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
            <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
              <Plus size={20} />
            </div>
            <h2 className="text-base font-bold text-slate-900">Create Manifest</h2>
          </div>
          <form onSubmit={handleCreateTrip} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Available Vehicle</label>
              <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} className="input-field">
                <option value="">-- Select --</option>
                {vehicles.map(v => <option key={v._id} value={v._id}>{v.registrationNumber} ({v.vehicleName})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Available Operator</label>
              <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} className="input-field">
                <option value="">-- Select --</option>
                {drivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Route Designation</label>
              <input type="text" required placeholder="e.g. NY to BOS" value={route} onChange={e => setRoute(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Cargo Load (Tons)</label>
              <input type="number" required placeholder="20" value={cargoWeight} onChange={e => setCargoWeight(e.target.value)} className="input-field" />
            </div>
            <button type="submit" className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-sm shadow-sky-500/20 active:scale-[0.98] mt-2">
              Save Manifest
            </button>
          </form>
        </div>

        <div className="lg:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/50">
            <h3 className="font-semibold text-slate-900">Trip Directory</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search routes..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-48 focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Route Path</th>
                  <th className="px-6 py-4">Assigned Assets</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Gate Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {trips.map(t => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                          <MapPin size={14} />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block">{t.route}</span>
                          <span className="text-xs text-slate-500">{t.cargoWeight} Tons Cargo</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                         <span className="text-xs font-mono text-slate-600 flex items-center gap-1.5"><Truck size={12}/> {t.vehicle?.registrationNumber || 'Pending'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(t.status)}</td>
                    <td className="px-6 py-4 text-right">
                      {t.status === 'Created' && (
                        <button onClick={() => handleDispatch(t._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-brand-700 bg-brand-50 border border-brand-200 rounded-lg font-medium hover:bg-brand-100 transition-colors shadow-sm">
                          <Play size={12}/> Dispatch
                        </button>
                      )}
                      {t.status === 'Dispatched' && (
                        <button onClick={() => handleComplete(t._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg font-medium hover:bg-emerald-100 transition-colors shadow-sm">
                          <CheckCircle size={12}/> Complete
                        </button>
                      )}
                      {t.status === 'Completed' && (
                        <span className="text-xs text-slate-400 font-medium px-3 py-1.5">Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
                {trips.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-sm">
                      No trips scheduled. Create a manifest to begin.
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