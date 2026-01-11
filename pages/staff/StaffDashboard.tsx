
import React from 'react';
import AuthService from '../../auth/AuthService';
import { UserRole } from '../../types';
import PerformanceStats from './PerformanceStats';
import TaskQueue from './TaskQueue';

interface StaffDashboardProps {
  activeTab: string;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ activeTab }) => {
  const user = AuthService.getCurrentUser();
  const isTechnician = user?.role === UserRole.TECHNICIAN;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-white">Operational Desk</h1>
        <p className="text-slate-400 mt-1">Hello {user?.fullName}, here are your assignments for today.</p>
      </div>

      <div className="animate-in fade-in duration-500">
        <PerformanceStats isTechnician={isTechnician} />
      </div>

      <div className="animate-in slide-in-from-bottom-6 duration-700">
        <TaskQueue isTechnician={isTechnician} />
      </div>
    </div>
  );
};

export default StaffDashboard;
