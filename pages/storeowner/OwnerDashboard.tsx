
import React, { useState } from 'react';
import OwnerOverview from './OwnerOverview';
import StaffControl from './StaffControl';

const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'inventory'>('overview');

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white">Store Command Center</h1>
          <p className="text-slate-400 mt-1">Aceh Tech Center • Operational Management</p>
        </div>
        
        <div className="glass-panel p-1 rounded-2xl flex gap-1 shadow-2xl border-slate-800">
          {(['overview', 'staff', 'inventory'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && <OwnerOverview />}
      {activeTab === 'staff' && <StaffControl />}
      {activeTab === 'inventory' && (
        <div className="flex items-center justify-center p-20 glass-panel rounded-3xl border-slate-800 text-slate-500 italic">
          Inventory Control Module coming soon in next update.
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
