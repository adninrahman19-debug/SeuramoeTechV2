
import React, { useState, useEffect } from 'react';
import StatCard from '../../components/Shared/StatCard';
import { ICONS } from '../../constants';
import AuthService from '../../auth/AuthService';
import StoreService from '../../services/StoreService';
import BillingService from '../../services/BillingService';
import { User, UserRole, Store, SubscriptionPlan, BillingRecord, RevenueConfig } from '../../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'owners' | 'stores' | 'plans' | 'billing'>('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([]);
  const [revenueConfig, setRevenueConfig] = useState<RevenueConfig | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setUsers(AuthService.getAllUsers());
    setStores(StoreService.getAllStores());
    setPlans(BillingService.getPlans());
    setBillingHistory(BillingService.getBillingHistory());
    setRevenueConfig(BillingService.getRevenueConfig());
  };

  const owners = users.filter(u => u.role === UserRole.STORE_OWNER);
  const pendingOwners = users.filter(u => u.role === UserRole.STORE_OWNER && u.status === 'pending');

  const totalMRR = billingHistory.reduce((acc, curr) => acc + (curr.status === 'paid' ? curr.amount : 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded">SaaS Core Engine</span>
            <span className="text-slate-600 text-sm font-medium">Platform HQ Gateway</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight capitalize">
            {activeTab === 'overview' ? 'Global Command' : activeTab.replace('_', ' ')}
          </h1>
        </div>
        
        <div className="glass-panel p-1 rounded-2xl flex flex-wrap gap-1 shadow-2xl border-slate-800">
          {['overview', 'owners', 'stores', 'plans', 'billing'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard label="Total Owners" value={owners.length} trend="+3" icon={<ICONS.Users />} colorClass="indigo" />
            <StatCard label="Live Stores" value={stores.length} trend="+2" icon={<ICONS.Store />} colorClass="emerald" />
            <StatCard label="Monthly MRR" value={`Rp ${(totalMRR/1000000).toFixed(1)}M`} trend="+12%" icon={<ICONS.Package />} colorClass="violet" />
            <StatCard label="Revenue Split" value={`${revenueConfig?.platformCommission}%`} trend="Fixed" icon={<ICONS.Dashboard />} colorClass="blue" />
            <StatCard label="Pending Approval" value={pendingOwners.length} trend={pendingOwners.length > 0 ? "ACTION" : "CLEAR"} icon={<ICONS.Settings />} colorClass="amber" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                Monthly Revenue Stream
              </h3>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{n: 'Mon', v: 45}, {n: 'Tue', v: 72}, {n: 'Wed', v: 58}, {n: 'Thu', v: 88}, {n: 'Fri', v: 95}, {n: 'Sat', v: 110}, {n: 'Sun', v: 85}]}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="n" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border-slate-800 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-6">Market Distribution</h3>
              <div className="h-full flex flex-col justify-around">
                {plans.map(plan => (
                   <div key={plan.id} className="space-y-2">
                      <div className="flex justify-between items-end">
                         <span className="text-xs font-bold text-slate-400">{plan.name}</span>
                         <span className="text-[10px] font-black text-indigo-400">{(Math.random()*100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-indigo-600 h-full" style={{ width: `${Math.random()*100}%` }}></div>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-white">Subscription Architecture</h2>
            <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2">
              <ICONS.Plus className="w-4 h-4" /> CREATE NEW PLAN
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map(plan => (
              <div key={plan.id} className="glass-panel p-8 rounded-3xl border-slate-800 hover:border-indigo-500/40 transition-all group flex flex-col h-full relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-colors"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>

                <div className="mb-8 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                   <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">Base Pricing</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">Rp {(plan.priceMonthly/1000).toFixed(0)}K</span>
                      <span className="text-xs text-slate-500 font-bold">/mo</span>
                   </div>
                   <p className="text-[10px] text-emerald-400 font-bold mt-1">Rp {(plan.priceYearly/1000000).toFixed(1)}M /yr</p>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mb-4">Quota Matrix</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Store Limit</p>
                      <p className="text-sm font-black text-white">{plan.limits.stores}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Staff Seats</p>
                      <p className="text-sm font-black text-white">{plan.limits.staff}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Prod Quota</p>
                      <p className="text-sm font-black text-white">{plan.limits.products}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Svc Support</p>
                      <p className="text-sm font-black text-white">{plan.limits.tickets}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mb-4">Core Features</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Custom Branding</span>
                      <span className={`font-bold ${plan.features.branding ? 'text-emerald-400' : 'text-slate-600'}`}>{plan.features.branding ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Advanced AI Analytics</span>
                      <span className={`font-bold ${plan.features.advancedAnalytics ? 'text-emerald-400' : 'text-slate-600'}`}>{plan.features.advancedAnalytics ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Report Depth</span>
                      <span className="font-bold text-white uppercase">{plan.features.reportingDepth}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel p-8 rounded-3xl border-slate-800 shadow-xl">
                 <h3 className="text-xl font-bold text-white mb-8">Revenue Engine Control</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                       <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 block">Platform Commission (%)</label>
                       <div className="flex items-center gap-4">
                          <input type="range" className="flex-1 accent-indigo-600" value={revenueConfig?.platformCommission} onChange={(e) => setRevenueConfig({...revenueConfig!, platformCommission: parseInt(e.target.value)})} />
                          <span className="text-xl font-black text-white">{revenueConfig?.platformCommission}%</span>
                       </div>
                    </div>
                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                       <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 block">Tax / VAT Rules (PPN)</label>
                       <div className="flex items-center gap-4">
                          <input type="number" className="flex-1 bg-transparent border-b border-slate-700 text-white font-black text-xl outline-none" value={revenueConfig?.taxRate} onChange={(e) => setRevenueConfig({...revenueConfig!, taxRate: parseInt(e.target.value)})} />
                          <span className="text-xl font-black text-white">%</span>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => revenueConfig && BillingService.updateRevenueConfig(revenueConfig)} className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
                   SAVE REVENUE CONFIG
                 </button>
              </div>

              <div className="glass-panel rounded-3xl border-slate-800 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                   <h3 className="font-bold text-white uppercase tracking-widest text-xs">Recent Billing Lifecycle</h3>
                   <div className="flex gap-2">
                      <button className="px-3 py-1 bg-slate-800 rounded-md text-[10px] font-bold hover:text-white">Export CSV</button>
                   </div>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/50">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Invoice</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Plan</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {billingHistory.map(record => (
                      <tr key={record.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-white">{record.invoiceNumber}</p>
                          <p className="text-[10px] text-slate-500">Owner ID: {record.ownerId}</p>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">{record.planName}</td>
                        <td className="px-6 py-4 text-xs font-black text-white">Rp {record.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${record.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                             {record.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-[10px] text-slate-500">{new Date(record.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-8">
               <div className="glass-panel p-8 rounded-3xl border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-6">Owner Lifecycle</h3>
                  <div className="space-y-6">
                     <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-4">Force Management</p>
                        <select className="w-full bg-slate-800 border-none rounded-xl text-xs font-bold text-white mb-4 outline-none p-3">
                           <option>Select Owner</option>
                           {owners.map(o => <option key={o.id} value={o.id}>{o.fullName}</option>)}
                        </select>
                        <div className="grid grid-cols-2 gap-2">
                           <button onClick={() => BillingService.forceRenew('u2')} className="py-2.5 bg-indigo-600/10 text-indigo-400 text-[10px] font-black uppercase rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Force Renew</button>
                           <button onClick={() => BillingService.cancelSubscription('u2')} className="py-2.5 bg-rose-600/10 text-rose-400 text-[10px] font-black uppercase rounded-xl hover:bg-rose-600 hover:text-white transition-all">Terminate</button>
                        </div>
                     </div>
                     
                     <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-600/30">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Platform Revenue</p>
                        <h4 className="text-3xl font-black mb-1">Rp 1.42B</h4>
                        <p className="text-[10px] font-medium opacity-60">Calculated from life-to-date transactions</p>
                        <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition-all">VIEW FINANCIAL REPORT</button>
                     </div>
                  </div>
               </div>
               
               <div className="glass-panel p-8 rounded-3xl border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-6">Payment Gateway</h3>
                  <div className="space-y-4">
                     {['Midtrans', 'Xendit', 'Stripe Global'].map(gw => (
                        <div key={gw} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 group cursor-pointer hover:border-indigo-500/50 transition-all">
                           <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                              <span className="text-xs font-bold text-white">{gw}</span>
                           </div>
                           <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Owners Tab (from previous iterations) */}
      {activeTab === 'owners' && (
        <div className="animate-in slide-in-from-right-4 duration-500">
          <div className="glass-panel rounded-3xl border-slate-800 overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Owner</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Plan & Expiry</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {owners.map(user => (
                  <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{user.fullName}</p>
                          <p className="text-[10px] text-slate-500">@{user.username}</p>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-xs font-bold text-indigo-400">{user.subscriptionTier || 'TRIAL'}</p>
                       <p className="text-[10px] text-slate-500">Expires: {user.subscriptionExpiry || '2024-12-31'}</p>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>{user.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => AuthService.impersonate(user.id)} className="p-2 bg-indigo-600/10 text-indigo-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
