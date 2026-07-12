import { useState, useEffect } from 'react';
import { Truck, Users, MapPin, AlertCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';
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
    { label: 'Total Fleet', value: metrics.vehicles, color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-100', icon: Truck },
    { label: 'Available Units', value: metrics.availableVehicles, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: Truck },
    { label: 'Active Drivers', value: metrics.drivers, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: Users },
    { label: 'Trips in Transit', value: metrics.activeTrips, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100', icon: MapPin },
    { label: 'Maintenance Bay', value: metrics.maintenance, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', icon: AlertCircle },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Operations Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time status of your transport fleet and active dispatch operations.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:shadow-floating transition-all duration-300 cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
              </div>
              <div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight block mb-1">
                  {loading ? (
                    <div className="h-9 w-12 bg-slate-100 rounded animate-pulse"></div>
                  ) : stat.value}
                </span>
                <span className="text-xs font-medium text-slate-500">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-start gap-4 shadow-sm max-w-2xl">
        <div className="mt-0.5 bg-emerald-100 text-emerald-600 p-2 rounded-lg">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Data Matrix Synchronized</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            All core databases are connected. Vehicle telematics, driver rosters, and trip dispatches are running seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}