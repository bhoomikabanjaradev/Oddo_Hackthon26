import { User, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-slate-200 h-14 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Platform Title Indicator */}
      <div className="flex items-center gap-2">
        <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-100">
          Terminal Node
        </span>
      </div>

      {/* Operator Session Profiler */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-800 block">System Administrator</span>
          <span className="text-[10px] text-slate-400 font-medium block">Role: Chief Dispatcher</span>
        </div>
        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 border border-slate-200">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}