
import { SubscriptionPlan, SubscriptionTier, BillingRecord, RevenueConfig } from '../types';

class BillingService {
  private static PLANS_KEY = 'st_subscription_plans';
  private static BILLING_KEY = 'st_billing_history';
  private static REVENUE_KEY = 'st_revenue_config';

  private static initDB() {
    if (!localStorage.getItem(this.PLANS_KEY)) {
      const initialPlans: SubscriptionPlan[] = [
        {
          id: 'p1',
          name: 'Standard Aceh',
          tier: SubscriptionTier.BASIC,
          priceMonthly: 499000,
          priceYearly: 4990000,
          limits: { stores: 1, staff: 3, products: 100, tickets: 20 },
          features: { branding: false, advancedAnalytics: false, reportingDepth: 'daily' },
          description: 'Cocok untuk toko retail tunggal di wilayah lokal.'
        },
        {
          id: 'p2',
          name: 'Sumatra Expansion',
          tier: SubscriptionTier.PRO,
          priceMonthly: 1299000,
          priceYearly: 12990000,
          limits: { stores: 3, staff: 10, products: 1000, tickets: 100 },
          features: { branding: true, advancedAnalytics: true, reportingDepth: 'monthly' },
          description: 'Untuk bisnis yang mulai berekspansi antar kota.'
        },
        {
          id: 'p3',
          name: 'Tech Giant',
          tier: SubscriptionTier.ENTERPRISE,
          priceMonthly: 2999000,
          priceYearly: 29990000,
          limits: { stores: 99, staff: 99, products: 99999, tickets: 99999 },
          features: { branding: true, advancedAnalytics: true, reportingDepth: 'yearly' },
          description: 'Solusi enterprise tak terbatas untuk korporasi teknologi.'
        }
      ];
      localStorage.setItem(this.PLANS_KEY, JSON.stringify(initialPlans));
    }

    if (!localStorage.getItem(this.BILLING_KEY)) {
      const initialBilling: BillingRecord[] = [
        {
          id: 'b1',
          ownerId: 'u2',
          planName: 'Sumatra Expansion',
          amount: 1299000,
          status: 'paid',
          createdAt: new Date().toISOString(),
          type: 'subscription',
          invoiceNumber: 'INV-2024-001'
        }
      ];
      localStorage.setItem(this.BILLING_KEY, JSON.stringify(initialBilling));
    }

    if (!localStorage.getItem(this.REVENUE_KEY)) {
      const initialRevenue: RevenueConfig = {
        platformCommission: 10,
        taxRate: 11,
        revenueSplit: { platform: 100 }
      };
      localStorage.setItem(this.REVENUE_KEY, JSON.stringify(initialRevenue));
    }
  }

  static getPlans(): SubscriptionPlan[] {
    this.initDB();
    return JSON.parse(localStorage.getItem(this.PLANS_KEY) || '[]');
  }

  static updatePlan(plan: SubscriptionPlan) {
    const plans = this.getPlans();
    const index = plans.findIndex(p => p.id === plan.id);
    if (index !== -1) {
      plans[index] = plan;
      localStorage.setItem(this.PLANS_KEY, JSON.stringify(plans));
    }
  }

  static getBillingHistory(): BillingRecord[] {
    this.initDB();
    return JSON.parse(localStorage.getItem(this.BILLING_KEY) || '[]');
  }

  static getRevenueConfig(): RevenueConfig {
    this.initDB();
    return JSON.parse(localStorage.getItem(this.REVENUE_KEY) || '{}');
  }

  static updateRevenueConfig(config: RevenueConfig) {
    localStorage.setItem(this.REVENUE_KEY, JSON.stringify(config));
  }

  static forceRenew(ownerId: string) {
    // Logic to create new billing record and extend expiry
    alert(`Pembaruan paksa dipicu untuk Owner ${ownerId}`);
  }

  static cancelSubscription(ownerId: string) {
    // Logic to set subscription inactive
    alert(`Langganan dibatalkan untuk Owner ${ownerId}`);
  }
}

export default BillingService;
