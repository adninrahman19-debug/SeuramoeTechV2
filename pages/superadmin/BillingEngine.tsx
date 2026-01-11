
import React from 'react';
import { ICONS } from '../../constants';
import { SubscriptionPlan, RevenueConfig } from '../../types';

interface BillingEngineProps {
  plans: SubscriptionPlan[];
  revConfig: RevenueConfig | null;
  onUpdateRevConfig: (config: RevenueConfig) => void;
}

const BillingEngine: React.FC<BillingEngineProps> = ({ plans, revConfig, onUpdateRevConfig }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-500">
      <div className="lg:col-span-2 space-y-8">
        <div className="glass-panel p-8 rounded-3xl border-slate-800 shadow-xl">
           <h3 className="text-xl font-bold text-white mb-8">Revenue Logic Center</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Commission (%)</label>
                 <div className="flex items-center gap-6">
                    <input 
                      type="range" 
                      className="flex-1 accent-indigo-600" 
                      value={revConfig?.platformCommission} 
                      onChange={e => revConfig && onUpdateRevConfig({...revConfig, platformCommission: parseInt(e.target.value)})} 
                    />
                    <span className="text-2xl font-black text-white">{revConfig?.platformCommission}%</span>
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tax (VAT/PPN) Rate (%)</label>
                 <div className="flex items-center gap-6">
                    <input 
                      type="number" 
                      className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white font-black w-24 outline-none" 
                      value={revConfig?.taxRate} 
                      onChange={e => revConfig && onUpdateRevConfig({...revConfig, taxRate: parseInt(e.target.value)})} 
                    />
                    <span className="text-2xl font-black text-white">%</span>
                 </div>
              </div>
           </div>
           <button className="mt-10 px-8 py-3 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all">SAVE FINANCIAL CONFIG</button>
        </div>

        <div className="glass-panel rounded-3xl border-slate-800 overflow-hidden">
           <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <h3 className="font-bold text-white text-xs uppercase tracking-widest">Global Subscription Plans</h3>
              <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all"><ICONS.Plus className="w-4 h-4" /></button>
           </div>
           <div className="p-0">
              <table className="w-full text-left">
                 <tbody className="divide-y divide-slate-800">
                    {plans.map(p => (
                       <tr key={p.id} className="hover:bg-slate-800/10">
                          <td className="px-6 py-4">
                             <p className="text-sm font-bold text-white">{p.name}</p>
                             <p className="text-[10px] text-slate-500">Tier: {p.tier}</p>
                          </td>
                          <td className="px-6 py-4">
                             <p className="text-xs font-black text-indigo-400">Rp {p.priceMonthly.toLocaleString()}/mo</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-slate-500 hover:text-white transition-colors"><ICONS.Settings className="w-4 h-4" /></button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      <div className="space-y-8">
         <div className="glass-panel p-8 rounded-3xl border-slate-800 bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Total MRR (Net)</p>
            <h4 className="text-4xl font-black mb-1">Rp 128.4M</h4>
            <p className="text-[10px] font-medium opacity-60 italic">* After platform commission & tax</p>
            <button className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">DOWNLOAD FINANCIAL EXCEL</button>
         </div>

         <div className="glass-panel p-8 rounded-3xl border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Payment Hub</h3>
            <div className="space-y-4">
               {['Midtrans Aceh', 'Xendit Sumatra', 'Stripe SG'].map(gw => (
                  <div key={gw} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl group cursor-pointer hover:border-indigo-500/50 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-xs font-bold text-white">{gw}</span>
                     </div>
                     <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth={2} /></svg>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default BillingEngine;
