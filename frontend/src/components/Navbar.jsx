import { LogOut, User, Bell, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 min-h-[64px]">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md font-medium border border-emerald-200">
          <Radio size={12} className="animate-ping" />
          <span>System Live</span>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="relative p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="text-xs font-semibold text-slate-700 leading-tight">Bhoomika Panel</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Fleet Lead</span>
          </div>
          <div className="h-9 w-9 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 font-semibold text-sm shadow-sm">
            B
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}