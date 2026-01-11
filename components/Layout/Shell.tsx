
import React, { useState, useEffect } from 'react';
import { UserRole, NavItem } from '../../types';
import { ICONS } from '../../constants';
import AuthService from '../../auth/AuthService';

interface ShellProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Shell: React.FC<ShellProps> = ({ children, onLogout }) => {
  const user = AuthService.getCurrentUser();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const isImpersonating = AuthService.isImpersonating();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchFocused(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!user) return <>{children}</>;

  const navItems: NavItem[] = [
    { label: 'Overview', path: 'dashboard', icon: <ICONS.Dashboard />, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_OWNER, UserRole.STAFF_ADMIN, UserRole.TECHNICIAN, UserRole.MARKETING, UserRole.CUSTOMER] },
    { label: 'Stores & Partners', path: 'stores', icon: <ICONS.Store />, roles: [UserRole.SUPER_ADMIN] },
    { label: 'Staff Management', path: 'staff', icon: <ICONS.Users />, roles: [UserRole.STORE_OWNER] },
    { label: 'Global Subscriptions', path: 'billing', icon: <ICONS.Package />, roles: [UserRole.SUPER_ADMIN] },
    { label: 'Service Hub', path: 'tickets', icon: <ICONS.Ticket />, roles: [UserRole.STORE_OWNER, UserRole.STAFF_ADMIN, UserRole.TECHNICIAN, UserRole.CUSTOMER] },
    { label: 'System Settings', path: 'settings', icon: <ICONS.Settings />, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_OWNER] },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 overflow-hidden selection:bg-indigo-500/30">
      {/* Impersonation Banner */}
      {isImpersonating && (
        <div className="fixed top-0 left-0 right-0 h-10 bg-amber-600 z-50 flex items-center justify-center gap-4 text-white font-bold text-xs shadow-lg">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
          Platform sedang dalam mode Impersonasi: {user.fullName}
          <button 
            onClick={() => AuthService.stopImpersonating()}
            className="px-3 py-1 bg-white text-amber-700 rounded-md hover:bg-amber-50 transition-colors"
          >
            Keluar Mode Admin
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#020617] border-r border-slate-800/60 flex flex-col z-30 pt-${isImpersonating ? '10' : '0'}`}>
        <div className="h-16 flex items-center px-6 gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]">ST</div>
          {isSidebarOpen && <span className="brand-font font-bold text-lg tracking-tight text-white animate-in fade-in zoom-in-95 duration-300">SeuramoeTech</span>}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1">
          {filteredNav.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative ${item.label === 'Overview' ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'}`}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>}
              {!isSidebarOpen && (
                 <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                 </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/60">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-900/40 border border-slate-800/50 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-xs shrink-0">
              {user.fullName.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.fullName}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.role.toLowerCase()}</p>
              </div>
            )}
          </div>
          <button onClick={onLogout} className="mt-4 w-full flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-rose-500/10 text-rose-400 transition-all">
            <ICONS.Logout className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-semibold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pt-${isImpersonating ? '10' : '0'}">
        <header className="h-16 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-md flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-6 flex-1">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800/50 rounded-lg text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
            
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>Platform</span>
              <span>/</span>
              <span className="text-slate-300">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]"></span>
            </button>
            <div className="h-6 w-px bg-slate-800"></div>
            <button className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Shell;
