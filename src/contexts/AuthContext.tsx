import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types/bank';

interface AuthContextType {
  user: User | null;
  login: (employeeId: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<string, User> = {
  'TL-07': { id: 'TL-07', name: 'Teller User', role: 'teller', branch: 'Mysuru Rural', shift: 'Morning' },
  'FO-12': { id: 'FO-12', name: 'Field Officer', role: 'field_officer', branch: 'Mysuru Rural' },
  'LO-05': { id: 'LO-05', name: 'Loan Officer', role: 'loan_officer', branch: 'Mysuru Rural' },
  'BM-01': { id: 'BM-01', name: 'Branch Manager', role: 'branch_manager', branch: 'Mysuru Main' },
  'AU-01': { id: 'AU-01', name: 'Senior Auditor', role: 'auditor', branch: 'Mysuru Division' },
  'CO-03': { id: 'CO-03', name: 'Onboarding Officer', role: 'customer_onboarding', branch: 'Mysuru Rural' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (employeeId: string, password: string, role: UserRole): boolean => {
    const mockUser = mockUsers[employeeId];
    if (mockUser && mockUser.role === role && password === 'password') {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
