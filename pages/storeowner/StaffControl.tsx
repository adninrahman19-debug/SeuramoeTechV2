
import React from 'react';
import { ICONS } from '../../constants';

const StaffControl: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Staff Management</h3>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2">
          <ICONS.Plus className="w-4 h-4" /> Recruit New Staff
        </button>
      </div>

      <div className="glass-panel rounded-3xl border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-400">Name</th>
              <th className="px-6 py-4 font-bold text-slate-400">Role</th>
              <th className="px-6 py-4 font-bold text-slate-400">Performance</th>
              <th className="px-6 py-4 text-right font-bold text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-800/20 transition-all">
                <td className="px-6 py-4 font-medium text-white">Staff Member {i}</td>
                <td className="px-6 py-4 text-slate-400">Technician</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[85%]"></div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">85%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 hover:text-white transition-colors">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffControl;
