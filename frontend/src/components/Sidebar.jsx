import { NavLink, useNavigate } from 'react-router-dom';
import { Truck, Users, LayoutDashboard, MapPin, Wrench, LogOut } from 'lucide-react';

export default function Sidebar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Purge tokens out of storage matrix on termination
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/vehicles', icon: Truck },
    { name: 'Drivers Pool', path: '/drivers', icon: Users },
    { name: 'Trip Matrix', path: '/trips', icon: MapPin },
    { name: 'Workshop Bay', path: '/maintenance', icon: Wrench },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-400 fixed h-full flex flex-col justify-between p-4 z-20">
      <div className="space-y-6">
        {/* Brand Terminal Identification Tag */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800">
          <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-500/20">
            <Truck size={18} />
          </div>
          <span className="font-bold text-white tracking-wide text-md">TransitOps</span>
        </div>

        {/* Primary Interactive Map Links */}
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Disconnection Gateway */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-3 py-2.5 text-xs text-rose-400 font-semibold hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
      >
        <LogOut size={16} />
        <span>Terminate Session</span>
      </button>
    </aside>
  );
}