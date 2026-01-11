
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STORE_OWNER = 'STORE_OWNER',
  STAFF_ADMIN = 'STAFF_ADMIN',
  TECHNICIAN = 'TECHNICIAN',
  MARKETING = 'MARKETING',
  CUSTOMER = 'CUSTOMER'
}

export enum SubscriptionTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  storeId?: string;
  subscriptionTier?: SubscriptionTier;
  isSubscriptionActive?: boolean;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  lastLogin?: string;
  lastIp?: string;
  device?: string;
  accountManager?: string;
  performanceScore?: number;
  createdAt?: string;
  subscriptionExpiry?: string;
  autoRenew?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  priceMonthly: number;
  priceYearly: number;
  limits: {
    stores: number;
    staff: number;
    products: number;
    tickets: number;
  };
  features: {
    branding: boolean;
    advancedAnalytics: boolean;
    reportingDepth: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  description: string;
}

export interface BillingRecord {
  id: string;
  ownerId: string;
  planName: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'cancelled';
  createdAt: string;
  type: 'subscription' | 'upgrade' | 'renewal';
  invoiceNumber: string;
}

export interface RevenueConfig {
  platformCommission: number; // percentage
  taxRate: number; // percentage
  revenueSplit: {
    platform: number;
    referral?: number;
  };
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  location: string;
  contact: string;
  status: 'active' | 'suspended';
  productLimit: number;
  staffLimit: number;
  createdAt: string;
  totalSales?: number;
  violationCount?: number;
}

export interface Permission {
  id: string;
  name: string;
  key: string;
  description: string;
  category: 'core' | 'store' | 'finance' | 'system';
}

export interface RoleConfig {
  role: UserRole;
  permissions: string[];
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  category: 'Laptop' | 'Accessory' | 'Part';
  price: number;
  stock: number;
  image: string;
}

export interface ServiceTicket {
  id: string;
  customerId: string;
  storeId: string;
  device: string;
  issue: string;
  status: 'PENDING' | 'DIAGNOSING' | 'REPAIRING' | 'READY' | 'COMPLETED';
  technicianId?: string;
  createdAt: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}
