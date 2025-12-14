import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/bank';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

const roleRoutes: Record<UserRole, string> = {
  teller: '/teller',
  field_officer: '/field-officer',
  loan_officer: '/loan-officer',
  branch_manager: '/branch-manager',
  auditor: '/auditor',
  customer_onboarding: '/onboarding',
};

const roleLabels: Record<UserRole, string> = {
  teller: 'Teller',
  field_officer: 'Field Officer',
  loan_officer: 'Loan Officer',
  branch_manager: 'Branch Manager',
  auditor: 'Auditor',
  customer_onboarding: 'Customer Onboarding Officer',
};

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('teller');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(employeeId, password, role)) {
      toast.success('Login successful');
      navigate(roleRoutes[role]);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-primary rounded-xl flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Karnataka Co-operative Bank</CardTitle>
          <CardDescription>Employee Portal Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Login As</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="employeeId"
                  placeholder="e.g., TL-07"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            <button 
              type="button"
              className="w-full text-sm text-primary hover:underline"
              onClick={() => toast.info('Contact Branch Admin for password reset')}
            >
              Forgot password? Contact Branch Admin
            </button>
          </form>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: Use role prefix as ID (e.g., TL-07 for Teller) with password "password"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
