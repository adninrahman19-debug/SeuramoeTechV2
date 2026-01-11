
import React, { useState, useEffect } from 'react';
import AuthService from './auth/AuthService';
import { User, UserRole, SubscriptionTier } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubscriptionPlan from './pages/SubscriptionPlan';
import Shell from './components/Layout/Shell';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(AuthService.getCurrentUser());
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  const handlePlanSelection = (tier: SubscriptionTier) => {
    const updatedUser = AuthService.updateSubscription(tier);
    if (updatedUser) {
      setUser({ ...updatedUser });
    }
  };

  // If not logged in, show login page
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // If Store Owner logged in but no active subscription, force plan selection
  if (user.role === UserRole.STORE_OWNER && !user.isSubscriptionActive) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center">
        <header className="w-full py-6 px-12 border-b border-slate-900 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0">ST</div>
            <span className="brand-font font-bold text-xl tracking-tight text-white">SeuramoeTech</span>
          </div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white font-medium">Logout</button>
        </header>
        <SubscriptionPlan onPlanSelected={handlePlanSelection} />
      </div>
    );
  }

  // Main Dashboard Shell
  return (
    <Shell onLogout={handleLogout}>
      <Dashboard />
    </Shell>
  );
};

export default App;
