
import React from 'react';
import { ICONS } from '../../constants';
import { Store } from '../../types';

interface StoreManagementProps {
  stores: Store[];
  onToggleStatus: (id: string, currentStatus: string) => void;
  onViolation: (id: string) => void;
}

const StoreManagement: React.FC<StoreManagementProps> = ({ stores, onToggleStatus, onViolation }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-500">
      {stores.map(store => (
        <div key={store.id} className="glass-panel p-6 rounded-3xl border-slate-800 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <ICONS.Store />
            </div>
            <div className="text-right">
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${store.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                {store.status}
              </span>
              {store.violationCount && store.violationCount > 0 && <p className="text-[10px] text-rose-500 font-bold mt-1 animate-pulse">!! Policy Violation</p>}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-1">{store.name}</h3>
          <p className="text-xs text-slate-500 mb-6">{store.location}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Product Limit</p>
                <p className="text-sm font-black text-white">{store.productLimit}</p>
             </div>
             <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Staff Seats</p>
                <p className="text-sm font-black text-white">{store.staffLimit}</p>
             </div>
          </div>

          <div className="flex gap-2">
             <button onClick={() => onToggleStatus(store.id, store.status)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold rounded-xl transition-all border border-slate-700">TOGGLE STATUS</button>
             <button onClick={() => onViolation(store.id)} className="px-4 py-2 bg-rose-600/10 text-rose-500 border border-rose-600/20 hover:bg-rose-600 hover:text-white rounded-xl text-[10px] font-black transition-all">VIOLATION</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreManagement;
