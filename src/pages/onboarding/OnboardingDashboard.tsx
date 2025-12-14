import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, FileText, CheckCircle, Shield, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const dashboardStats = {
  pendingRegistrations: 8,
  kycPending: 12,
  accountsOpenedToday: 5,
  foCoordinationPending: 3,
};

const quickActions = [
  { title: 'New Customer Registration', href: '/onboarding/new', icon: UserPlus },
  { title: 'KYC Document Collection', href: '/onboarding/kyc', icon: FileText },
  { title: 'Identity Verification', href: '/onboarding/identity', icon: CheckCircle },
  { title: 'Account Opening (CBS Entry)', href: '/onboarding/account-opening', icon: Building2 },
  { title: 'RBI Compliance Checklist', href: '/onboarding/compliance', icon: Shield },
  { title: 'FO Coordination', href: '/onboarding/fo-coordination', icon: Users },
];

export default function OnboardingDashboard() {
  return (
    <DashboardLayout title="Customer Onboarding Officer Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Pending Registrations</p>
              <p className="text-2xl font-bold">{dashboardStats.pendingRegistrations}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">KYC Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{dashboardStats.kycPending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Accounts Opened Today</p>
              <p className="text-2xl font-bold text-green-600">{dashboardStats.accountsOpenedToday}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">FO Coordination Pending</p>
              <p className="text-2xl font-bold">{dashboardStats.foCoordinationPending}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Button 
                  key={action.title} 
                  variant="outline" 
                  className="h-auto py-6 flex-col gap-2"
                  asChild
                >
                  <Link to={action.href}>
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm">{action.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Onboarding Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { customer: 'Ramesh Kumar', status: 'KYC Submitted', time: '10 mins ago' },
                { customer: 'Kavya Sharma', status: 'Account Created', time: '1 hour ago' },
                { customer: 'Anil Reddy', status: 'Documents Pending', time: '2 hours ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.customer}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === 'Account Created' ? 'default' : 'secondary'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
