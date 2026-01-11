
import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import StoreService from '../../services/StoreService';
import BillingService from '../../services/BillingService';
import { User, UserRole, Store, SubscriptionPlan, RevenueConfig } from '../../types';

// Modular Components
import Overview from './Overview';
import OwnerManagement from './OwnerManagement';
import StoreManagement from './StoreManagement';
import BillingEngine from './BillingEngine';

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'owners' | 'stores' | 'billing'>('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [revConfig, setRevConfig] = useState<RevenueConfig | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setUsers(AuthService.getAllUsers());
    setStores(StoreService.getAllStores());
    setPlans(BillingService.getPlans());
    setRevConfig(BillingService.getRevenueConfig());
  };

  const owners = users.filter(u => u.role === UserRole.STORE_OWNER);
  const pendingApprovals = owners.filter(o => o.status === 'pending');

  // --- Handlers ---
  const handleApprove = (id: string) => { 
    AuthService.updateUserStatus(id, 'active'); 
    refreshData();
  };

  const handleLockStatus = (id: string, current: string) => { 
    const newStatus = current === 'active' ? 'suspended' : 'active';
    AuthService.updateUserStatus(id, newStatus); 
    refreshData();
  };

  const handleStoreStatus = (id: string, current: string) => {
    const newStatus = current === 'active' ? 'suspended' : 'active';
    StoreService.updateStoreStatus(id, newStatus);
    refreshData();
  };

  const handleImpersonate = (id: string) => { 
    AuthService.impersonate(id); 
  };

  const handlePolicyViolation = (sid: string) => { 
    StoreService.addViolation(sid); 
    refreshData();
  };

  const handleUpdateRevConfig = (config: RevenueConfig) => {
    setRevConfig(config);
    BillingService.updateRevenueConfig(config);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Platform Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Platform Command Center</p>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">System HQ</h1>
        </div>

        <div className="glass-panel p-1 rounded-2xl flex gap-1 shadow-2xl border-slate-800">
          {(['overview', 'owners', 'stores', 'billing'] as const).map(tab => (
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

      {/* Conditional Rendering of Components */}
      {activeTab === 'overview' && (
        <Overview 
          owners={owners}
          stores={stores}
          pendingApprovals={pendingApprovals}
          totalMRR={128400000} // Demo value
          revenueConfig={revConfig}
          onApprove={handleApprove}
        />
      )}

      {activeTab === 'owners' && (
        <OwnerManagement 
          owners={owners}
          onImpersonate={handleImpersonate}
          onLock={handleLockStatus}
        />
      )}

      {activeTab === 'stores' && (
        <StoreManagement 
          stores={stores}
          onToggleStatus={handleStoreStatus}
          onViolation={handlePolicyViolation}
        />
      )}

      {activeTab === 'billing' && (
        <BillingEngine 
          plans={plans}
          revConfig={revConfig}
          onUpdateRevConfig={handleUpdateRevConfig}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
