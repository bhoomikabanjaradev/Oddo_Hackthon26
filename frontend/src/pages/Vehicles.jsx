import { useState, useEffect } from 'react';
import { Truck, Plus, AlertCircle } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Vehicle Operations</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2"><AlertCircle size={16}/><span>{error}</span></div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border shadow-sm h-fit">
          <h2 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2"><Plus size={16}/> Add Vehicle</h2>
          <form onSubmit={handleAddVehicle} className="space-y-3">
            <input type="text" required placeholder="Registration Number" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <input type="text" required placeholder="Model Name" value={vehicleName} onChange={e => setVehicleName(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <div className="grid grid-cols-2 gap-2">
              <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm">
                <option value="Truck">Truck</option>
                <option value="Trailer">Trailer</option>
              </select>
              <input type="number" required placeholder="Capacity (Tons)" value={maxLoadCapacity} onChange={e => setMaxLoadCapacity(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white text-sm rounded-xl font-medium">Save Asset</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 text-xs uppercase border-b">
              <tr><th className="px-6 py-3">Vehicle</th><th className="px-6 py-3">Reg Number</th><th className="px-6 py-3">Capacity</th><th className="px-6 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {vehicles.map(v => (
                <tr key={v._id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold">{v.vehicleName}</td>
                  <td className="px-6 py-3 font-mono text-xs">{v.registrationNumber}</td>
                  <td className="px-6 py-3">{v.maxLoadCapacity} Ton</td>
                  <td className="px-6 py-3"><span className="text-xs px-2 py-0.5 border rounded bg-slate-50">{v.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}