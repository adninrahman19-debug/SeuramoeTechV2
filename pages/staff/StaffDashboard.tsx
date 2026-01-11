
import React from 'react';
import AuthService from '../../auth/AuthService';
import { UserRole } from '../../types';
import PerformanceStats from './PerformanceStats';
import TaskQueue from './TaskQueue';

const StaffDashboard: React.FC = () => {
  const user = AuthService.getCurrentUser();
  const isTechnician = user?.role === UserRole.TECHNICIAN;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-white">Operational Desk</h1>
        <p className="text-slate-400 mt-1">Hello {user?.fullName}, here are your assignments for today.</p>
      </div>

      <PerformanceStats isTechnician={isTechnician} />
      <TaskQueue isTechnician={isTechnician} />
    </div>
  );
};

export default StaffDashboard;
