import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, MapPin, Wrench, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/vehicles', icon: Truck },
    { name: 'Drivers', path: '/drivers', icon: Users },
    { name: 'Trips', path: '/trips', icon: MapPin },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench },
  ];

  return (
    <div className="w-64 bg-[#0f172a] text-slate-200 flex flex-col h-full border-r border-slate-800">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="p-2 bg-blue-600/10 rounded-lg text-blue-400">
          <Truck size={20} className="animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight text-base leading-none">TransitOps</h1>
          <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Control Center</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-150 text-sm group ${
                isActive 
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/10' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} />
                <span>{item.name}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-[#0b111e]">
        <div className="flex items-center gap-2.5 px-2 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Secure Hackathon Node</span>
        </div>
      </div>
    </div>
  );
}