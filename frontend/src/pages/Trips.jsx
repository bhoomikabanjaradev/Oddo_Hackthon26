import { useState, useEffect } from 'react';
import { Plus, Play, CheckCircle, AlertCircle } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-bold text-slate-900">Trip Dispatch Matrix</h1></div>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2"><AlertCircle size={16}/><span>{error}</span></div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border shadow-sm h-fit">
          <h2 className="text-sm font-semibold mb-3">Create Trip</h2>
          <form onSubmit={handleCreateTrip} className="space-y-3">
            <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm">
              <option value="">-- Choose Vehicle --</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleName}</option>)}
            </select>
            <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm">
              <option value="">-- Choose Driver --</option>
              {drivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
            </select>
            <input type="text" required placeholder="Route (e.g. Mum-Del)" value={route} onChange={e => setRoute(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <input type="number" required placeholder="Cargo (Tons)" value={cargoWeight} onChange={e => setCargoWeight(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white text-sm rounded-xl font-medium">Save Manifest</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 text-xs border-b">
              <tr><th className="px-6 py-3">Route Path</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Action Gate</th></tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {trips.map(t => (
                <tr key={t._id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold">{t.route} <span className="block text-xs font-normal text-slate-400">{t.cargoWeight} Tons</span></td>
                  <td className="px-6 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{t.status}</span></td>
                  <td className="px-6 py-3">
                    {t.status === 'Created' && <button onClick={() => handleDispatch(t._id)} className="flex items-center gap-1 text-xs text-blue-600 font-semibold border px-2 py-1 rounded"><Play size={12}/> Dispatch</button>}
                    {t.status === 'Dispatched' && <button onClick={() => handleComplete(t._id)} className="flex items-center gap-1 text-xs text-emerald-600 font-semibold border px-2 py-1 rounded"><CheckCircle size={12}/> Complete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}