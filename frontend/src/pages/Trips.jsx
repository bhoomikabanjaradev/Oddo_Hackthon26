import { useState, useEffect } from 'react';
import { MapPin, Plus, Play, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [route, setRoute] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Dropdowns populating rules: Only available entities
    axios.get('http://localhost:5000/vehicles').then(res => setVehicles(res.data.filter(v => v.status === 'Available')));
    axios.get('http://localhost:5000/drivers').then(res => setDrivers(res.data.filter(d => d.status === 'Available')));
    axios.get('http://localhost:5000/trips').then(res => setTrips(res.data));
  }, []);

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setError('');
    if (!selectedVehicle || !selectedDriver || !route || !cargoWeight) return;

    try {
      const res = await axios.post('http://localhost:5000/trips', {
        vehicle: selectedVehicle,
        driver: selectedDriver,
        route,
        cargoWeight: Number(cargoWeight)
      });
      setTrips([...trips, res.data]);
      
      // Refresh options arrays
      setSelectedVehicle('');
      setSelectedDriver('');
      setRoute('');
      setCargoWeight('');
    } catch (err) {
      setError(err.response?.data?.message || 'Business Rule Error: Cargo exceeding maximum limits.');
    }
  };

  const handleDispatch = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/trips/${id}/dispatch`);
      setTrips(trips.map(t => t._id === id ? res.data : t));
    } catch (err) { alert('Dispatch action rejected by backend validation.'); }
  };

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/trips/${id}/complete`);
      setTrips(trips.map(t => t._id === id ? res.data : t));
    } catch (err) { alert('Complete action rejected.'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Trip Despatcher Matrix</h1>
        <p className="text-xs text-slate-500 mt-0.5">Core hackathon pipeline validating business limits.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2.5 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Request */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2"><Plus size={16} /> Create Trip</h2>
          <form onSubmit={handleCreateTrip} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Select Available Vehicle</label>
              <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800">
                <option value="">-- Choose Truck --</option>
                {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleName} ({v.registrationNumber})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Select Available Driver</label>
              <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800">
                <option value="">-- Choose Driver --</option>
                {drivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Route Path</label>
              <input type="text" required placeholder="Mumbai to Delhi" value={route} onChange={e => setRoute(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Cargo Weight (Tons)</label>
              <input type="number" required placeholder="20" value={cargoWeight} onChange={e => setCargoWeight(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm shadow-sm">Save Trip Intent</button>
          </form>
        </div>

        {/* Trips Table list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h2 className="text-sm font-semibold text-slate-800">Live Manifest logs</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-3">Route</th>
                  <th className="px-6 py-3">Assigned Asset</th>
                  <th className="px-6 py-3">State</th>
                  <th className="px-6 py-3">Actions Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {trips.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-slate-800">{t.route} <span className="text-xs font-normal text-slate-400 block">{t.cargoWeight} Tons</span></td>
                    <td className="px-6 py-3.5 text-xs text-slate-600 font-medium">
                      <div>V: {t.vehicle?.registrationNumber || 'Assigned'}</div>
                      <div>D: {t.driver?.name || 'Assigned'}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium border ${t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : t.status === 'Dispatched' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-100 text-slate-600'}`}>{t.status}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      {t.status === 'Created' && (
                        <button onClick={() => handleDispatch(t._id)} className="flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md font-semibold border border-blue-200"><Play size={12}/> Dispatch</button>
                      )}
                      {t.status === 'Dispatched' && (
                        <button onClick={() => handleComplete(t._id)} className="flex items-center gap-1 text-xs text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-md font-semibold border border-emerald-200"><CheckCircle size={12}/> Complete</button>
                      )}
                      {t.status === 'Completed' && <span className="text-xs text-slate-400 font-medium">Archived Node</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}