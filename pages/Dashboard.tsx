
import React from 'react';
import { UserRole } from '../types';
import AuthService from '../auth/AuthService';
import SuperAdminDashboard from './superadmin/SuperAdminDashboard';
import OwnerDashboard from './storeowner/OwnerDashboard';
import StaffDashboard from './staff/StaffDashboard';
import CustomerDashboard from './customer/CustomerDashboard';

const Dashboard: React.FC = () => {
  const user = AuthService.getCurrentUser();

  if (!user) return null;

  // Dispatcher logic based on role
  switch (user.role) {
    case UserRole.SUPER_ADMIN:
      return <SuperAdminDashboard />;
    
    case UserRole.STORE_OWNER:
      return <OwnerDashboard />;
    
    case UserRole.STAFF_ADMIN:
    case UserRole.TECHNICIAN:
    case UserRole.MARKETING:
      return <StaffDashboard />;
    
    case UserRole.CUSTOMER:
      return <CustomerDashboard />;
    
    default:
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-500">Invalid user role. Please contact support.</p>
        </div>
      );
  }
};

export default Dashboard;
