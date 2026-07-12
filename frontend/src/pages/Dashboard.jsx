import { useState, useEffect } from 'react';
import { Truck, Users, MapPin, AlertCircle, ShieldAlert } from 'lucide-react';
import api from '../utils/api.js';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ vehicles: 0, availableVehicles: 0, drivers: 0, activeTrips: 0, maintenance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => {
        setMetrics(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Assets', value: metrics.vehicles, color: 'bg-blue-500', text: 'text-blue-600', icon: Truck },
    { label: 'Available Trucks', value: metrics.availableVehicles, color: 'bg-emerald-500', text: 'text-emerald-600', icon: Truck },
    { label: 'Total Drivers', value: metrics.drivers, color: 'bg-indigo-500', text: 'text-indigo-600', icon: Users },
    { label: 'Active Trips', value: metrics.activeTrips, color: 'bg-sky-500', text: 'text-sky-600', icon: MapPin },
    { label: 'In Workshop', value: metrics.maintenance, color: 'bg-amber-500', text: 'text-amber-600', icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard Control Matrix</h1>
        <p className="text-xs text-slate-500 mt-0.5">Live real-time operational sync.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-400 block">{stat.label}</span>
                <span className="text-xl font-bold text-slate-800 tracking-tight">{loading ? '...' : stat.value}</span>
              </div>
              <div className={`p-2.5 ${stat.color}/10 rounded-lg ${stat.text}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-slate-900 text-white p-4 rounded-xl text-xs flex items-center gap-3">
        <ShieldAlert className="text-emerald-400 shrink-0" size={16} />
        <p><strong>System Status Matrix Online.</strong> Core database connections are active.</p>
      </div>
    </div>
  );
}