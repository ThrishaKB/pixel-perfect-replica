export type UserRole = 
  | 'teller' 
  | 'field_officer' 
  | 'loan_officer' 
  | 'branch_manager' 
  | 'auditor' 
  | 'customer_onboarding';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  branch: string;
  shift?: string;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  memberId: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  accounts: Account[];
  address?: string;
  aadhaar?: string;
  pan?: string;
}

export interface Account {
  id: string;
  type: 'SB' | 'CA' | 'RD' | 'FD' | 'Loan';
  accountNumber: string;
  balance: number;
  memberId: string;
}

export interface Transaction {
  id: string;
  time: string;
  member: string;
  memberId: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer';
  amount: number;
  mode: 'Cash' | 'UPI' | 'Cheque';
  status: 'success' | 'pending' | 'flagged';
  narration?: string;
}

export interface LoanApplication {
  id: string;
  appId: string;
  borrower: string;
  memberId: string;
  loanType: 'Agri TL' | 'Gold Loan' | 'Housing' | 'Vehicle Loan' | 'Business Loan';
  amount: number;
  tenure: number;
  interest: number;
  status: 'pending' | 'pending_verif' | 'docs_missing' | 'approved' | 'rejected' | 'field_visit';
  creditScore?: number;
  documents?: LoanDocument[];
  purpose?: string;
}

export interface LoanDocument {
  type: string;
  status: 'verified' | 'pending' | 'missing';
}

export interface PigmyCollection {
  customerId: string;
  customerName: string;
  accountNo: string;
  dueToday: number;
  status: 'not_paid' | 'paid_upi' | 'paid_cash';
}

export interface EMIRecord {
  borrower: string;
  loanId: string;
  emiAmount: number;
  status: 'due' | 'overdue' | 'paid';
  dueDate: string;
}

export interface CashPosition {
  startingCash: number;
  cashIn: number;
  cashOut: number;
  expectedBalance: number;
  physicalBalance?: number;
}

export interface DenominationCount {
  d2000: number;
  d500: number;
  d200: number;
  d100: number;
  d50: number;
  d20: number;
  d10: number;
  coins: number;
}
