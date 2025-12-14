import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const auditOverview = {
  totalIssues: 18,
  criticalOpen: 4,
  lastAuditCompleted: '08 Dec 2024',
};

const keyAlerts = [
  'Cash Vault mismatch detected at Branch #12',
  'Suspicious Transaction: Rs.25 - Taxes',
  'Missing loan documents - 2 Accounts',
  'Unusual Cash Withdrawals - 4 Accounts',
];

const auditInsights = [
  { title: 'NPA's Trend', type: 'Bar Graph' },
  { title: 'KYC Compliance Trend', type: 'Line Graph' },
];

const itemsNeedingAttention = [
  'Incomplete Loan File – Loan #2210',
  'Overdue Customer for Pigmy – 11 Accounts',
  'Unusual Cash Withdrawals – 4 Accounts',
];

export default function AuditorDashboard() {
  return (
    <DashboardLayout title="Audit Overview Summary">
      <div className="space-y-6">
        {/* Audit Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Issues Identified</p>
              <p className="text-3xl font-bold">{auditOverview.totalIssues}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Critical (Open)</p>
              <p className="text-3xl font-bold text-destructive">{auditOverview.criticalOpen}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Last Audit Completed</p>
              <p className="text-xl font-bold">{auditOverview.lastAuditCompleted}</p>
            </CardContent>
          </Card>
        </div>

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
                  <Badge variant="destructive" className="w-2 h-2 p-0 rounded-full" />
                  <span>{alert}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Audit Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Insights (Graphs)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {auditInsights.map((insight) => (
                <div key={insight.title} className="p-8 border rounded-lg text-center bg-muted/30">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{insight.title}</p>
                  <p className="text-sm text-muted-foreground">[{insight.type}]</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Items Needing Immediate Review */}
        <Card>
          <CardHeader>
            <CardTitle>Items Needing Immediate Review</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {itemsNeedingAttention.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Financial Audit', href: '/auditor/financial', icon: FileText },
            { title: 'Compliance Audit', href: '/auditor/compliance', icon: FileText },
            { title: 'Transaction Review', href: '/auditor/transactions', icon: FileText },
            { title: 'Loan File Verification', href: '/auditor/loan-files', icon: FileText },
          ].map((link) => (
            <Card key={link.title} className="hover:bg-muted/50 transition-colors">
              <CardContent className="pt-6">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link to={link.href}>
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
