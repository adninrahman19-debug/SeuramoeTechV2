
import React from 'react';
import StatCard from '../../components/Shared/StatCard';
import { ICONS } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 12 }, { name: 'Tue', sales: 19 }, { name: 'Wed', sales: 3 },
  { name: 'Thu', sales: 5 }, { name: 'Fri', sales: 2 }, { name: 'Sat', sales: 3 },
];

const OwnerOverview: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Monthly Sales" value="Rp 128.4M" trend="+5.2%" icon={<ICONS.Package />} colorClass="indigo" />
        <StatCard label="Total Staff" value="8 / 10" icon={<ICONS.Users />} colorClass="violet" />
        <StatCard label="Inventory Level" value="156 Items" icon={<ICONS.Store />} colorClass="emerald" />
        <StatCard label="Service Queue" value="14 Tickets" trend="+2" icon={<ICONS.Ticket />} colorClass="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Daily Sales Volume</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-left flex items-center gap-3 transition-all border border-slate-700">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><ICONS.Plus className="w-5 h-5" /></div>
              <span className="font-semibold text-sm">Add New Product</span>
            </button>
            <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-left flex items-center gap-3 transition-all border border-slate-700">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><ICONS.Users className="w-5 h-5" /></div>
              <span className="font-semibold text-sm">Add Staff Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerOverview;
