
import { SubscriptionPlan, SubscriptionTier, BillingRecord, RevenueConfig } from '../types';

class BillingService {
  private static PLANS_KEY = 'st_plans';
  private static BILLING_KEY = 'st_billing';
  private static REVENUE_KEY = 'st_rev_config';

  private static init() {
    if (!localStorage.getItem(this.PLANS_KEY)) {
      const initialPlans: SubscriptionPlan[] = [
        {
          id: 'p1', name: 'Standard Aceh', tier: SubscriptionTier.BASIC,
          priceMonthly: 499000, priceYearly: 4990000,
          limits: { stores: 1, staff: 3, products: 100, tickets: 20 },
          features: { branding: false, advancedAnalytics: false, reportingDepth: 'daily' },
          description: 'Retail tunggal lokal.'
        },
        {
          id: 'p2', name: 'Sumatra Expansion', tier: SubscriptionTier.PRO,
          priceMonthly: 1299000, priceYearly: 12990000,
          limits: { stores: 3, staff: 10, products: 1000, tickets: 100 },
          features: { branding: true, advancedAnalytics: true, reportingDepth: 'monthly' },
          description: 'Ekspansi antar kota.'
        },
        {
          id: 'p3', name: 'Tech Giant', tier: SubscriptionTier.ENTERPRISE,
          priceMonthly: 2999000, priceYearly: 29990000,
          limits: { stores: 99, staff: 99, products: 99999, tickets: 99999 },
          features: { branding: true, advancedAnalytics: true, reportingDepth: 'yearly' },
          description: 'Solusi tak terbatas.'
        }
      ];
      localStorage.setItem(this.PLANS_KEY, JSON.stringify(initialPlans));
    }
    if (!localStorage.getItem(this.REVENUE_KEY)) {
      localStorage.setItem(this.REVENUE_KEY, JSON.stringify({
        platformCommission: 10,
        taxRate: 11,
        revenueSplit: { platform: 100 }
      }));
    }
  }

  static getPlans(): SubscriptionPlan[] { this.init(); return JSON.parse(localStorage.getItem(this.PLANS_KEY) || '[]'); }
  
  static updatePlan(plan: SubscriptionPlan) {
    const plans = this.getPlans();
    const idx = plans.findIndex(p => p.id === plan.id);
    if (idx !== -1) { plans[idx] = plan; localStorage.setItem(this.PLANS_KEY, JSON.stringify(plans)); }
  }

  static getRevenueConfig(): RevenueConfig { return JSON.parse(localStorage.getItem(this.REVENUE_KEY) || '{}'); }
  
  static updateRevenueConfig(config: RevenueConfig) { localStorage.setItem(this.REVENUE_KEY, JSON.stringify(config)); }

  static getBillingHistory(): BillingRecord[] {
    return JSON.parse(localStorage.getItem(this.BILLING_KEY) || '[]');
  }
}

export default BillingService;
