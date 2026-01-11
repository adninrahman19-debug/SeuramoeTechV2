
import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { ICONS } from '../../constants';
import AuthService from '../../auth/AuthService';
import GlobalSearch from '../Shared/GlobalSearch';
import Logo from '../Shared/Logo';

interface ShellProps {
  children: React.ReactNode;
  onLogout: () => void;
  activeTab: string;
  onNavigate: (path: string) => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

// Add comment: Fix missing default export and complete component implementation
const Shell: React.FC<ShellProps> = ({ children, onLogout, activeTab, onNavigate }) => {
  const user = AuthService.getCurrentUser();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const isImpersonating = AuthService.isImpersonating();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!user) return <>{children}</>;

  const getSuperAdminNav = (): NavGroup[] => [
    {
      groupName: "Intelligence",
      items: [
        { label: 'Overview', path: 'overview', icon: <ICONS.Dashboard className="w-5 h-5" /> },
        { label: 'Analytics (BI)', path: 'analytics', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
      ]
    },
    {
      groupName: "Core Management",
      items: [
        { label: 'Directory', path: 'users', icon: <ICONS.Users className="w-5 h-5" /> },
        { label: 'Stores', path: 'stores', icon: <ICONS.Store className="w-5 h-5" /> },
        { label: 'Roles & Perms', path: 'roles', icon: <ICONS.Settings className="w-5 h-5" /> },
        { label: 'Sub Plans', path: 'plans', icon: <ICONS.Package className="w-5 h-5" /> },
      ]
    },
    {
      groupName: "Financials",
      items: [
        { label: 'Transactions', path: 'transactions', icon: <ICONS.Ticket className="w-5 h-5" /> },
        { label: 'Billing & Rev', path: 'billing', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 7.5v.75m3-10.5v.75m0 7.5v.75m3-10.5v.75m0 7.5v.75m3-10.5v.75m0 7.5v.75m3-10.5v.75m0 7.5v.75m-9-6h9m-9 0v-1.5m0 1.5v1.5m9-1.5v-1.5m0 1.5v1.5" /></svg> },
      ]
    },
    {
      groupName: "Ecosystem Control",
      items: [
        { label: 'Moderation', path: 'moderation', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg> },
        { label: 'Curation', path: 'curation', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 013.21-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
        { label: 'Communication', path: 'communication', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.357.205c-.466.269-1.052.134-1.332-.301-1.391-2.154-2.333-4.559-2.731-7.113m5.865 3.11c.332-.115.64-.285.91-.508a3.99 3.99 0 000-6.154c-.27-.223-.578-.393-.91-.508m0 7.172a9.956 9.956 0 014.243-3.085 9.956 9.956 0 014.244 3.085" /></svg> },
        { label: 'Support Ops', path: 'support', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg> },
      ]
    },
    {
      groupName: "Infrastructure",
      items: [
        { label: 'Security & Audit', path: 'security', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.74c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" /></svg> },
        { label: 'DevTools', path: 'devtools', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m3.75-3l4.5 16.5" /></svg> },
        { label: 'Activity Logs', path: 'logs', icon: <ICONS.Ticket className="w-5 h-5" /> },
      ]
    },
    {
      groupName: "God Mode",
      items: [
        { label: 'God Powers', path: 'powers', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-rose-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg> },
        { label: 'God Settings', path: 'settings', icon: <ICONS.Settings className="w-5 h-5 text-indigo-400" /> },
      ]
    }
  ];

  const getStoreOwnerNav = (): NavGroup[] => [
    {
      groupName: "Monitoring",
      items: [
        { label: 'Overview', path: 'overview', icon: <ICONS.Dashboard className="w-5 h-5" /> },
        { label: 'Business Analytics', path: 'reports', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
        { label: 'SaaS Billing', path: 'billing', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-1.5 3.375l3 3 6-6M2.25 12a4.5 4.5 0 014.5-4.5h10.5a4.5 4.5 0 014.5 4.5v6a4.5 4.5 0 01-4.5 4.5H6.75a4.5 4.5 0 01-4.5-4.5v-6z" /></svg> },
        { label: 'Payments', path: 'financials', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
      ]
    },
    {
      groupName: "Operational",
      items: [
        { label: 'Fulfillment', path: 'orders', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h1.125m17.25-4.5h-17.25" /></svg> },
        { label: 'Inventory', path: 'inventory', icon: <ICONS.Package className="w-5 h-5" /> },
        { label: 'Service Hub', path: 'tickets', icon: <ICONS.Ticket className="w-5 h-5" /> },
        { label: 'Feedback', path: 'feedback', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125l-.81 2.43a.375.375 0 00.514.474l2.43-.81a3.75 3.75 0 011.612-.165l7.15.894a.75.75 0 00.817-.63l1.103-8.82a.75.75 0 00-.704-.837l-13.15-1.643a.75.75 0 00-.838.704l-1.103 8.82a.75.75 0 00.63.817l7.15.894a3.75 3.75 0 011.613.166z" /></svg> },
      ]
    },
    {
      groupName: "Growth",
      items: [
        { label: 'Promos', path: 'promo', icon: <ICONS.Ticket className="w-5 h-5" /> },
        { label: 'Marketing', path: 'marketing', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.357.205c-.466.269-1.052.134-1.332-.301-1.391-2.154-2.333-4.559-2.731-7.113m5.865 3.11c.332-.115.64-.285.91-.508a3.99 3.99 0 000-6.154c-.27-.223-.578-.393-.91-.508m0 7.172a9.956 9.956 0 014.243-3.085 9.956 9.956 0 014.244 3.085" /></svg> },
      ]
    },
    {
      groupName: "Human Capital",
      items: [
        { label: 'Staff Directory', path: 'staff', icon: <ICONS.Users className="w-5 h-5" /> },
      ]
    },
    {
      groupName: "Configurations",
      items: [
        { label: 'Store Settings', path: 'settings', icon: <ICONS.Settings className="w-5 h-5" /> },
      ]
    }
  ];

  // Add comment: Select navigation items based on user role
  const navGroups = user.role === UserRole.SUPER_ADMIN ? getSuperAdminNav() : getStoreOwnerNav();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex">
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-950 border-r border-slate-900 transition-all duration-300 flex flex-col sticky top-0 h-screen z-40`}>
        <div className="p-6 flex items-center justify-between">
          <Logo size="sm" showText={isSidebarOpen} />
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-500">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
             </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.groupName} className="space-y-2">
              {isSidebarOpen && <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-2">{group.groupName}</p>}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                      activeTab === item.path ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="shrink-0">{item.icon}</div>
                    {isSidebarOpen && <span className="text-sm font-bold truncate">{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-900 space-y-2">
           <button 
             onClick={() => setSearchOpen(true)}
             className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-white hover:bg-slate-900 rounded-xl transition-all"
           >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {isSidebarOpen && <span className="text-sm font-bold">Search (⌘K)</span>}
           </button>
           <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
              <ICONS.Logout className="w-5 h-5" />
              {isSidebarOpen && <span className="text-sm font-bold">Sign Out</span>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-900 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
             {isImpersonating && (
               <div className="flex items-center gap-3 px-3 py-1.5 bg-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Impersonating: {user.fullName}
                  <button onClick={() => AuthService.stopImpersonating()} className="ml-2 hover:underline bg-white/20 px-2 py-0.5 rounded">STOP</button>
               </div>
             )}
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <p className="text-xs font-bold text-white leading-none">{user.fullName}</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{user.role.replace('_', ' ')}</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shadow-lg">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
             </div>
          </div>
        </header>

        <section className="flex-1 p-8 overflow-y-auto custom-scrollbar">
           {children}
        </section>
      </main>
    </div>
  );
};

// Add comment: Default export required by App.tsx
export default Shell;
