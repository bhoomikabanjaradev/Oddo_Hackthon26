import { useState, useEffect } from 'react';
import { Wrench, Plus, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function Maintenance() {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [issue, setIssue] = useState('');

  const refreshData = () => {
    axios.get('http://localhost:5000/vehicles').then(res => setVehicles(res.data.filter(v => v.status === 'Available')));
    axios.get('http://localhost:5000/maintenance').then(res => setLogs(res.data));
  };

  useEffect(() => { refreshData(); }, []);

  const handleOpenMaintenance = async (e) => {
    e.preventDefault();
    if (!selectedVehicle || !issue) return;

    try {
      await axios.post('http://localhost:5000/maintenance', { vehicle: selectedVehicle, issue });
      setSelectedVehicle('');
      setIssue('');
      refreshData();
    } catch (err) { alert('Failed opening shop ticket.'); }
  };

  const handleCloseMaintenance = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/maintenance/${id}/close`);
      refreshData();
    } catch (err) { alert('Error releasing vehicle.'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Maintenance Bay</h1>
        <p className="text-xs text-slate-500 mt-0.5">Lock assets into garage blocks dynamically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2"><Wrench size={16}/> Drop into Shop</h2>
          <form onSubmit={handleOpenMaintenance} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Select Vehicle</label>
              <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800">
                <option value="">-- Choose Unit --</option>
                {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleName} [{v.registrationNumber}]</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Reported Issue Description</label>
              <input type="text" required placeholder="Engine oil replacement or tire fault" value={issue} onChange={e => setIssue(e.target.value)} className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl text-sm shadow-sm">Ground Asset to Shop</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h2 className="text-sm font-semibold text-slate-800">Shop Order Queues</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-3">Vehicle</th>
                  <th className="px-6 py-3">Issue Fault</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {logs.map((l) => (
                  <tr key={l._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-slate-800">{l.vehicle?.registrationNumber || 'Grounded Unit'}</td>
                    <td className="px-6 py-3.5 text-slate-600">{l.issue}</td>
                    <td className="px-6 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${l.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{l.status}</span></td>
                    <td className="px-6 py-3.5">
                      {l.status === 'Open' && (
                        <button onClick={() => handleCloseMaintenance(l._id)} className="flex items-center gap-1 text-xs text-emerald-600 border border-emerald-200 px-2 py-1 rounded hover:bg-emerald-50 font-semibold"><CheckCircle size={12}/> Release to Fleet</button>
                      )}
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