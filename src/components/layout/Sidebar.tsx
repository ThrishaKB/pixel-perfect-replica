import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  PiggyBank, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  ArrowLeftRight,
  Calculator,
  FileText,
  User,
  LogOut,
  ClipboardList,
  CheckCircle,
  Wallet,
  CreditCard,
  Users,
  Building2,
  TrendingUp,
  Shield,
  FileSearch,
  UserPlus,
  FolderCheck,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const tellerNav: NavItem[] = [
  { label: 'Dashboard', href: '/teller', icon: LayoutDashboard },
  { label: 'Deposits', href: '/teller/deposits', icon: ArrowDownToLine },
  { label: 'Withdrawals', href: '/teller/withdrawals', icon: ArrowUpFromLine },
  { label: 'Transfers', href: '/teller/transfers', icon: ArrowLeftRight },
  { label: 'End-of-Day Balancing', href: '/teller/balancing', icon: Calculator },
  { label: 'Reports', href: '/teller/reports', icon: FileText },
  { label: 'Profile', href: '/teller/profile', icon: User },
];

const fieldOfficerNav: NavItem[] = [
  { label: 'Dashboard', href: '/field-officer', icon: LayoutDashboard },
  { label: 'New Loan Application', href: '/field-officer/new-loan', icon: ClipboardList },
  { label: 'Pending Verifications', href: '/field-officer/verifications', icon: CheckCircle, badge: '12' },
  { label: 'Field Visit Checklist', href: '/field-officer/field-visit', icon: FolderCheck },
  { label: 'Account Creation', href: '/field-officer/account-creation', icon: UserPlus, badge: 'NEW' },
  { label: 'Pigmy Collection', href: '/field-officer/pigmy', icon: Wallet, badge: 'NEW' },
  { label: 'EMI Maintenance', href: '/field-officer/emi', icon: CreditCard, badge: 'NEW' },
  { label: 'Profile', href: '/field-officer/profile', icon: User },
];

const branchManagerNav: NavItem[] = [
  { label: 'Dashboard', href: '/branch-manager', icon: LayoutDashboard },
  { label: 'Deposits', href: '/branch-manager/deposits', icon: PiggyBank },
  { label: 'Loans', href: '/branch-manager/loans', icon: TrendingUp },
  { label: 'Transactions', href: '/branch-manager/transactions', icon: ArrowLeftRight },
  { label: 'Employees', href: '/branch-manager/employees', icon: Users },
  { label: 'Customers', href: '/branch-manager/customers', icon: Building2 },
  { label: 'Compliance', href: '/branch-manager/compliance', icon: Shield },
  { label: 'Reports', href: '/branch-manager/reports', icon: FileText },
  { label: 'Settings', href: '/branch-manager/settings', icon: Settings },
];

const loanOfficerNav: NavItem[] = [
  { label: 'Dashboard', href: '/loan-officer', icon: LayoutDashboard },
  { label: 'Application Details', href: '/loan-officer/applications', icon: ClipboardList },
  { label: 'Checklist', href: '/loan-officer/checklist', icon: CheckCircle },
  { label: 'Credit Score', href: '/loan-officer/credit-score', icon: TrendingUp },
  { label: 'Documents', href: '/loan-officer/documents', icon: FileText },
  { label: 'Approval Routing', href: '/loan-officer/approval', icon: ArrowLeftRight },
];

const auditorNav: NavItem[] = [
  { label: 'Dashboard', href: '/auditor', icon: LayoutDashboard },
  { label: 'Financial Audit', href: '/auditor/financial', icon: PiggyBank },
  { label: 'Compliance Audit', href: '/auditor/compliance', icon: Shield },
  { label: 'Transaction Review', href: '/auditor/transactions', icon: ArrowLeftRight },
  { label: 'Loan File Verification', href: '/auditor/loan-files', icon: FileSearch },
  { label: 'Documentation Check', href: '/auditor/documentation', icon: FolderCheck },
  { label: 'Reports', href: '/auditor/reports', icon: FileText },
  { label: 'Settings', href: '/auditor/settings', icon: Settings },
];

const customerOnboardingNav: NavItem[] = [
  { label: 'Dashboard', href: '/onboarding', icon: LayoutDashboard },
  { label: 'New Registration', href: '/onboarding/new', icon: UserPlus },
  { label: 'KYC Documents', href: '/onboarding/kyc', icon: FileText },
  { label: 'Identity Verification', href: '/onboarding/identity', icon: CheckCircle },
  { label: 'Account Opening', href: '/onboarding/account-opening', icon: PiggyBank },
  { label: 'RBI Compliance', href: '/onboarding/compliance', icon: Shield },
  { label: 'FO Coordination', href: '/onboarding/fo-coordination', icon: Users },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getNavItems = (): NavItem[] => {
    switch (user?.role) {
      case 'teller': return tellerNav;
      case 'field_officer': return fieldOfficerNav;
      case 'branch_manager': return branchManagerNav;
      case 'loan_officer': return loanOfficerNav;
      case 'auditor': return auditorNav;
      case 'customer_onboarding': return customerOnboardingNav;
      default: return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-primary">Karnataka Co-operative Bank</h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
          {user?.role === 'teller' && 'Teller Portal'}
          {user?.role === 'field_officer' && 'FO Portal'}
          {user?.role === 'branch_manager' && 'Manager Portal'}
          {user?.role === 'loan_officer' && 'Loan Processing'}
          {user?.role === 'auditor' && 'Auditor Portal'}
          {user?.role === 'customer_onboarding' && 'Onboarding Portal'}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-primary' 
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  item.badge === 'NEW' 
                    ? 'bg-accent text-accent-foreground font-semibold' 
                    : 'bg-sidebar-primary text-sidebar-primary-foreground'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/60">{user?.id}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
