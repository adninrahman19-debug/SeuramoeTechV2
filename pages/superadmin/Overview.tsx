
import React from 'react';
import StatCard from '../../components/Shared/StatCard';
import { ICONS } from '../../constants';
import { User, Store } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OverviewProps {
  owners: User[];
  stores: Store[];
  pendingApprovals: User[];
  totalMRR: number;
  revenueConfig: any;
  onApprove: (id: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ owners, stores, pendingApprovals, totalMRR, revenueConfig, onApprove }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`Rp ${(totalMRR/1000000).toFixed(1)}M`} trend="+14%" icon={<ICONS.Package />} colorClass="indigo" />
        <StatCard label="Active Stores" value={stores.length} trend="+2" icon={<ICONS.Store />} colorClass="emerald" />
        <StatCard label="Pending Owners" value={pendingApprovals.length} trend={pendingApprovals.length > 0 ? "URGENT" : "CLEAN"} icon={<ICONS.Users />} colorClass="amber" />
        <StatCard label="Commision" value={`${revenueConfig?.platformCommission}%`} icon={<ICONS.Settings />} colorClass="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border-slate-800 shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
              Financial Performance (Sumatra Region)
            </h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{n: 'Jan', v: 400}, {n: 'Feb', v: 700}, {n: 'Mar', v: 600}, {n: 'Apr', v: 1200}]}>
                <defs>
                  <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="n" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorV)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border-slate-800 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6">Approval Queue</h3>
          {pendingApprovals.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
              <ICONS.Users className="w-12 h-12 mb-4 opacity-10" />
              <p className="text-xs font-bold uppercase tracking-widest">No pending applications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map(o => (
                <div key={o.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-indigo-500/30 transition-all">
                  <div>
                    <p className="text-sm font-bold text-white">{o.fullName}</p>
                    <p className="text-[10px] text-slate-500">@{o.username}</p>
                  </div>
                  <button onClick={() => onApprove(o.id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black rounded-lg transition-all">APPROVE</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
