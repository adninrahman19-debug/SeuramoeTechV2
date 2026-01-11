
import { DEMO_USERS } from '../constants';
import { User, UserRole } from '../types';

class AuthService {
  private static AUTH_KEY = 'st_auth_user';
  private static USERS_DB_KEY = 'st_users_database';
  private static ORIGINAL_USER_KEY = 'st_original_user';

  private static initDB() {
    const existingDB = localStorage.getItem(this.USERS_DB_KEY);
    if (!existingDB) {
      const initialUsers = DEMO_USERS.map(u => ({
        ...u,
        status: u.status || 'active',
        lastLogin: new Date().toISOString(),
        lastIp: '182.1.22.4' + Math.floor(Math.random() * 9),
        device: 'Windows Desktop',
        performanceScore: u.role === UserRole.STORE_OWNER ? 88 : undefined,
        accountManager: u.role === UserRole.STORE_OWNER ? 'Rahmat Hidayat' : undefined,
        createdAt: new Date().toISOString()
      }));
      localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(initialUsers));
    }
  }

  static getAllUsers(): User[] {
    this.initDB();
    return JSON.parse(localStorage.getItem(this.USERS_DB_KEY) || '[]');
  }

  static login(username: string, password: string): User | null {
    this.initDB();
    const db: User[] = this.getAllUsers();
    
    // Demo logic matching the prompt credentials
    const credentialsMap: Record<string, string> = {
      'superadmin': 'Super@123',
      'owner_acehtech': 'Owner@123',
      'admin_toko1': 'Admin@123',
      'tech_toko1': 'Tech@123',
      'marketing_toko1': 'Market@123',
      'customer001': 'Customer@123',
    };

    const isValid = credentialsMap[username] === password || (username.startsWith('new_') && password === 'Pass@123');

    if (isValid) {
      const user = db.find(u => u.username === username);
      if (user) {
        if (user.status === 'suspended') return null;
        
        user.lastLogin = new Date().toISOString();
        const updatedDB = db.map(u => u.id === user.id ? user : u);
        localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(updatedDB));
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
        return user;
      }
    }
    return null;
  }

  static impersonate(userId: string) {
    const current = this.getCurrentUser();
    if (!current || current.role !== UserRole.SUPER_ADMIN) return;

    const db = this.getAllUsers();
    const targetUser = db.find(u => u.id === userId);
    if (targetUser) {
      localStorage.setItem(this.ORIGINAL_USER_KEY, JSON.stringify(current));
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(targetUser));
      window.location.reload();
    }
  }

  static stopImpersonating() {
    const original = localStorage.getItem(this.ORIGINAL_USER_KEY);
    if (original) {
      localStorage.setItem(this.AUTH_KEY, original);
      localStorage.removeItem(this.ORIGINAL_USER_KEY);
      window.location.reload();
    }
  }

  static isImpersonating(): boolean {
    return !!localStorage.getItem(this.ORIGINAL_USER_KEY);
  }

  static assignAccountManager(userId: string, managerName: string) {
    const db = this.getAllUsers();
    const updated = db.map(u => u.id === userId ? { ...u, accountManager: managerName } : u);
    localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(updated));
  }

  static updateUserStatus(userId: string, status: 'active' | 'suspended' | 'pending') {
    const db = this.getAllUsers();
    const updated = db.map(u => u.id === userId ? { ...u, status } : u);
    localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(updated));
  }

  static deleteUser(userId: string) {
    const db = this.getAllUsers();
    const filtered = db.filter(u => u.id !== userId);
    localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(filtered));
  }

  static logout() {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.ORIGINAL_USER_KEY);
  }

  static getCurrentUser(): User | null {
    const data = localStorage.getItem(this.AUTH_KEY);
    return data ? JSON.parse(data) : null;
  }

  static updateSubscription(tier: any) {
    const user = this.getCurrentUser();
    if (user && user.role === UserRole.STORE_OWNER) {
      user.subscriptionTier = tier;
      user.isSubscriptionActive = true;
      user.status = 'active';
      
      const db = this.getAllUsers();
      const updatedDB = db.map(u => u.id === user.id ? user : u);
      localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(updatedDB));
      
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  }

  static register(data: { fullName: string; username: string; email: string; role: UserRole }): User {
    this.initDB();
    const db = this.getAllUsers();
    const newUser: User = {
      id: 'u' + Math.random().toString(36).substr(2, 9),
      ...data,
      status: data.role === UserRole.STORE_OWNER ? 'pending' : 'active',
      isSubscriptionActive: false,
      createdAt: new Date().toISOString()
    };
    db.push(newUser);
    localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(db));
    return newUser;
  }
}

export default AuthService;
