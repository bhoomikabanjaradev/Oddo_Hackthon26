import { useState, useEffect } from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import api from '../utils/api.js';

export default function Maintenance() {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [issue, setIssue] = useState('');

  const refreshWorkshop = () => {
    api.get('/vehicles').then(res => setVehicles(res.data.filter(v => v.status === 'Available')));
    api.get('/maintenance').then(res => setLogs(res.data));
  };

  useEffect(() => { refreshWorkshop(); }, []);

  const handleOpenMaintenance = async (e) => {
    e.preventDefault();
    if (!selectedVehicle || !issue) return;
    await api.post('/maintenance', { vehicle: selectedVehicle, issue });
    setSelectedVehicle(''); setIssue('');
    refreshWorkshop();
  };

  const handleCloseMaintenance = async (id) => {
    await api.patch(`/maintenance/${id}/close`);
    refreshWorkshop();
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-bold text-slate-900">Maintenance Depot</h1></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border shadow-sm h-fit">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"><Plus size={16}/> Ground Asset</h2>
          <form onSubmit={handleOpenMaintenance} className="space-y-3">
            <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm">
              <option value="">-- Choose Asset --</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.registrationNumber}</option>)}
            </select>
            <input type="text" required placeholder="Issue Description" value={issue} onChange={e => setIssue(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm" />
            <button type="submit" className="w-full py-2 bg-amber-600 text-white text-sm rounded-xl font-medium">Send to Workshop</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 text-xs border-b">
              <tr><th className="px-6 py-3">Vehicle</th><th className="px-6 py-3">Issue</th><th className="px-6 py-3">State</th><th className="px-6 py-3">Action</th></tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {logs.map(l => (
                <tr key={l._id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-xs">{l.vehicle?.registrationNumber || 'Asset Log'}</td>
                  <td className="px-6 py-3 text-slate-600">{l.issue}</td>
                  <td className="px-6 py-3"><span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800">{l.status}</span></td>
                  <td className="px-6 py-3">
                    {l.status === 'Open' && <button onClick={() => handleCloseMaintenance(l._id)} className="flex items-center gap-1 text-xs text-emerald-600 border px-2 py-1 rounded font-semibold"><CheckCircle size={12}/> Release</button>}
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