import { User, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Platform Title Indicator */}
      <div className="flex items-center gap-2">
        <span className="text-xs bg-brand-50 text-brand-700 font-semibold px-2.5 py-1 rounded-full border border-brand-100">
          Terminal Node Active
        </span>
      </div>

      {/* Operator Session Profiler */}
      <div className="flex items-center gap-5">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={18} />
        </button>
        <div className="w-px h-6 bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-sm font-semibold text-slate-800 block leading-tight">Admin System</span>
            <span className="text-xs text-slate-500 font-medium block">Chief Dispatcher</span>
          </div>
          <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 border border-brand-100 shadow-sm">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}