
import React from 'react';
import StatCard from '../../components/Shared/StatCard';
import { ICONS } from '../../constants';
import AuthService from '../../auth/AuthService';
import { UserRole } from '../../types';

const StaffDashboard: React.FC = () => {
  const user = AuthService.getCurrentUser();
  const isTechnician = user?.role === UserRole.TECHNICIAN;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-white">Operational Desk</h1>
        <p className="text-slate-400 mt-1">Hello {user?.fullName}, here are your assignments for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label={isTechnician ? "Pending Repairs" : "Pending Orders"} 
          value="12" 
          icon={<ICONS.Ticket />} 
          colorClass="amber" 
        />
        <StatCard 
          label="Completed Today" 
          value="5" 
          trend="+2" 
          icon={<ICONS.Dashboard />} 
          colorClass="emerald" 
        />
        <StatCard 
          label="Customer Rating" 
          value="4.9/5" 
          icon={<ICONS.Users />} 
          colorClass="indigo" 
        />
      </div>

      <div className="glass-panel rounded-2xl border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">Active Task Queue</h3>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((task) => (
            <div key={task} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-indigo-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${task === 1 ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`}></div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {isTechnician ? `Repair: MacBook Air M2 Logic Board (#T-10${task})` : `Order Fulfillment: Lenovo Legion 5 (#O-50${task})`}
                  </h4>
                  <p className="text-xs text-slate-500">Due: Today, 5:00 PM</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors">
                Update Status
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
