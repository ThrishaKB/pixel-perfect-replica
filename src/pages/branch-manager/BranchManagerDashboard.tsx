import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const summaryStats = {
  totalDeposits: '12.4 Cr',
  totalLoans: '8.7 Cr',
  npaPercent: '3.2%',
  profitThisMonth: '4.2 Lakh',
  digitalTransactions: 1284,
};

const keyAlerts = [
  { type: 'warning', message: '12 Loan Accounts Overdue' },
  { type: 'warning', message: '5 High-Value FDs Maturing Today' },
  { type: 'error', message: '2 AML Flags Pending Review' },
];

const quickGraphs = [
  { title: 'Deposits Trend', type: 'Line Graph' },
  { title: 'Loans vs Recovery', type: 'Bar Graph' },
];

const todaysTasks = [
  { task: 'Approve Loan #3021 (Home Loan)', link: '/branch-manager/loans' },
  { task: 'Review Complaint #771 (Service Issue)', link: '/branch-manager/compliance' },
  { task: 'Verify KYC for Customer #5561', link: '/branch-manager/customers' },
];

export default function BranchManagerDashboard() {
  return (
    <DashboardLayout title="Manager Overview Dashboard">
      <div className="space-y-6">
        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-2xl font-bold text-primary">₹{summaryStats.totalDeposits}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Loans</p>
                <p className="text-2xl font-bold">₹{summaryStats.totalLoans}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">NPA %</p>
                <p className="text-2xl font-bold text-destructive">{summaryStats.npaPercent}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Profit This Month</p>
                <p className="text-2xl font-bold text-green-600">₹{summaryStats.profitThisMonth}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Digital Transactions Today</p>
                <p className="text-2xl font-bold">{summaryStats.digitalTransactions.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Key Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {keyAlerts.map((alert, i) => (
                <li key={i} className="flex items-center gap-2">
                  {alert.type === 'error' ? (
                    <Badge variant="destructive">!</Badge>
                  ) : (
                    <Badge variant="secondary">⚠</Badge>
                  )}
                  <span>{alert.message}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Graphs */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Graphs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickGraphs.map((graph) => (
                <div key={graph.title} className="p-8 border rounded-lg text-center bg-muted/30">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{graph.title}</p>
                  <p className="text-sm text-muted-foreground">[{graph.type}]</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {todaysTasks.map((task, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  <span>{task.task}</span>
                  <Button variant="link" size="sm" asChild className="ml-auto">
                    <Link to={task.link}>View →</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: 'Deposits Management', href: '/branch-manager/deposits' },
            { title: 'Loans Management', href: '/branch-manager/loans' },
            { title: 'Transactions Monitoring', href: '/branch-manager/transactions' },
            { title: 'Employee Management', href: '/branch-manager/employees' },
            { title: 'Customer Management', href: '/branch-manager/customers' },
            { title: 'Compliance & Audit', href: '/branch-manager/compliance' },
          ].map((link) => (
            <Card key={link.title} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <Link to={link.href} className="font-medium hover:text-primary">
                  {link.title} →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
