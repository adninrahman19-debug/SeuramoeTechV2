
import React from 'react';
import { User } from '../../types';

interface OwnerManagementProps {
  owners: User[];
  onImpersonate: (id: string) => void;
  onLock: (id: string, currentStatus: string) => void;
}

const OwnerManagement: React.FC<OwnerManagementProps> = ({ owners, onImpersonate, onLock }) => {
  return (
    <div className="glass-panel rounded-3xl border-slate-800 overflow-hidden shadow-2xl animate-in slide-in-from-right-4 duration-500">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <th className="px-6 py-4">Owner Profile</th>
            <th className="px-6 py-4">Subscription Status</th>
            <th className="px-6 py-4">Support Agent</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {owners.map(user => (
            <tr key={user.id} className="hover:bg-slate-800/20 group transition-all">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.fullName}</p>
                    <p className="text-[10px] text-slate-500">@{user.username}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                  {user.status}
                </span>
                <p className="text-[10px] text-slate-600 mt-1">{user.subscriptionTier || 'TRIAL'}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-xs text-slate-400 font-bold">{user.accountManager || 'Unassigned'}</p>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                   <button onClick={() => onImpersonate(user.id)} className="p-2 bg-indigo-600/10 text-indigo-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-all" title="Impersonate Dashboard">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                   </button>
                   <button onClick={() => onLock(user.id, user.status)} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-rose-600 hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                   </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerManagement;
