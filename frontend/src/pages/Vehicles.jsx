import { useState, useEffect } from 'react';
import { Truck, Plus, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/vehicles'; 

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('Truck');
  const [maxLoadCapacity, setMaxLoadCapacity] = useState('');
  const [error, setError] = useState('');

  // 1. Fetch Dynamic Data from Database
  const fetchVehicles = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setVehicles(res.data);
    } catch (err) {
      setError('Failed to fetch fleet logs from Mongo instance.');
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // 2. Add New Vehicle to Database via API
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setError('');
    if (!registrationNumber || !vehicleName || !maxLoadCapacity) return;

    try {
      const payload = {
        registrationNumber,
        vehicleName,
        vehicleType,
        maxLoadCapacity: Number(maxLoadCapacity)
      };
      
      const res = await axios.post(API_BASE_URL, payload);
      setVehicles([...vehicles, res.data]);
      
      // Reset Form fields
      setRegistrationNumber('');
      setVehicleName('');
      setMaxLoadCapacity('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unique verification failure: Reg Number duplicate.');
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'Available') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'On Trip') return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Vehicle Management</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real DB operations mapping live configurations.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2.5 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form Module */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Plus size={16} className="text-blue-600" /> Add New Vehicle
          </h2>
          <form onSubmit={handleAddVehicle} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Registration Number</label>
              <input
                type="text"
                required
                placeholder="e.g. MH12HE4321"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Model Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Tata Prima 2825"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Truck">Truck</option>
                  <option value="Trailer">Trailer</option>
                  <option value="Container">Container</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Capacity (Tons)</label>
                <input
                  type="number"
                  required
                  placeholder="25"
                  value={maxLoadCapacity}
                  onChange={(e) => setMaxLoadCapacity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm shadow-sm transition-all">
              Save to Database
            </button>
          </form>
        </div>

        {/* Database List Data Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Active Records</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">{vehicles.length} Units</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-3">Vehicle</th>
                  <th className="px-6 py-3">Reg Number</th>
                  <th className="px-6 py-3">Capacity</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {vehicles.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-slate-400" />
                        <div>
                          {v.vehicleName} 
                          <span className="text-[11px] text-slate-400 font-normal block">{v.vehicleType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-600 font-semibold">{v.registrationNumber}</td>
                    <td className="px-6 py-3.5">{v.maxLoadCapacity} Ton</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 text-xs border rounded-md font-medium ${getStatusStyle(v.status)}`}>
                        {v.status}
                      </span>
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