import { NavLink, useNavigate } from 'react-router-dom';
import { Truck, Users, LayoutDashboard, MapPin, Wrench, LogOut } from 'lucide-react';

export default function Sidebar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/vehicles', icon: Truck },
    { name: 'Drivers', path: '/drivers', icon: Users },
    { name: 'Trips', path: '/trips', icon: MapPin },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 fixed h-full flex flex-col justify-between py-6 z-20 shadow-sm">
      <div className="space-y-8">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6">
          <div className="p-2 bg-brand-600 rounded-xl text-white shadow-md shadow-brand-500/20">
            <Truck size={20} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">TransitOps</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="px-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-600 font-medium hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all duration-200 group"
        >
          <LogOut size={18} className="group-hover:text-rose-500 transition-colors" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}