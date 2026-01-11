
import React from 'react';
import StatCard from '../../components/Shared/StatCard';
import { ICONS } from '../../constants';

const CustomerDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">My Tech Hub</h1>
          <p className="text-slate-400 mt-1">Track your repairs and explore premium accessories.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
          <ICONS.Plus className="w-5 h-5" /> Request New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Current Repairs</h3>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">1 Active</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-white">Asus ROG Zephyrus G14</h4>
                <p className="text-xs text-slate-500">Ticket #ST-8821 • Status: Repairing</p>
              </div>
              <div className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase rounded">In Progress</div>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[65%]"></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-right">Estimated Ready: Tomorrow</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center"><ICONS.Package className="text-slate-500" /></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white">Logitech MX Master 3S</h4>
                  <p className="text-xs text-slate-500">Ordered on Oct 12, 2023</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">Rp 1.4M</p>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase">Delivered</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 text-sm font-semibold text-slate-400 hover:text-white transition-colors">View Order History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
