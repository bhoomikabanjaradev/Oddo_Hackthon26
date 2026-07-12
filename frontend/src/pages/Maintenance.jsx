import { useState, useEffect } from 'react';
import { Plus, CheckCircle, Wrench, Search } from 'lucide-react';
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

  const getStatusBadge = (status) => {
    if (status === 'Open') return <span className="status-badge status-inshop">In Maintenance</span>;
    if (status === 'Closed') return <span className="status-badge bg-slate-100 text-slate-700">Resolved</span>;
    return <span className="status-badge bg-slate-100 text-slate-700">{status}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Maintenance Depot</h1>
        <p className="text-sm text-slate-500 mt-1">Ground assets for workshop repairs and track maintenance logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Plus size={20} />
            </div>
            <h2 className="text-base font-bold text-slate-900">Ground Asset</h2>
          </div>
          <form onSubmit={handleOpenMaintenance} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Select Vehicle</label>
              <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} className="input-field">
                <option value="">-- Choose Asset --</option>
                {vehicles.map(v => <option key={v._id} value={v._id}>{v.registrationNumber} ({v.vehicleName})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5 ml-1">Issue Description</label>
              <input type="text" required placeholder="e.g. Engine Oil Leak" value={issue} onChange={e => setIssue(e.target.value)} className="input-field" />
            </div>
            <button type="submit" className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-sm shadow-rose-500/20 active:scale-[0.98] mt-2 flex justify-center items-center gap-2">
              Send to Workshop
            </button>
          </form>
        </div>

        <div className="lg:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/50">
            <h3 className="font-semibold text-slate-900">Active Service Directory</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-48 focus:outline-none focus:ring-2 focus:ring-rose-500/20" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Vehicle Reg</th>
                  <th className="px-6 py-4">Reported Issue</th>
                  <th className="px-6 py-4">State</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {logs.map(l => (
                  <tr key={l._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                          <Wrench size={14} />
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-700">{l.vehicle?.registrationNumber || 'Asset Log'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate" title={l.issue}>{l.issue}</td>
                    <td className="px-6 py-4">{getStatusBadge(l.status)}</td>
                    <td className="px-6 py-4 text-right">
                      {l.status === 'Open' ? (
                        <button onClick={() => handleCloseMaintenance(l._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg font-medium hover:bg-emerald-100 transition-colors shadow-sm">
                          <CheckCircle size={14}/> Release Asset
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium px-3 py-1.5">Cleared</span>
                      )}
                    </td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-sm">
                      No maintenance logs found.
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