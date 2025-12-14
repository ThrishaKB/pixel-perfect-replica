import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';

const complianceStatus = {
  kycPending: 22,
  amlAlerts: 2,
  policyViolations: 3,
};

const kycReviewTable = [
  { customerId: 'C-1001', name: 'Ramesh', kycStatus: 'Expired', action: 'Review' },
  { customerId: 'C-1002', name: 'Kavya', kycStatus: 'Pending', action: 'Review' },
];

const complianceDeadlines = [
  'RBI Monthly Compliance – Due in 5 Days',
];

export default function ComplianceAudit() {
  return (
    <DashboardLayout title="Compliance Dashboard">
      <div className="space-y-6">
        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-muted-foreground">KYC Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{complianceStatus.kycPending}</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-muted-foreground">AML Alerts</p>
                <p className="text-2xl font-bold text-red-600">{complianceStatus.amlAlerts}</p>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Policy Violations</p>
                <p className="text-2xl font-bold text-orange-600">{complianceStatus.policyViolations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Review Table */}
        <Card>
          <CardHeader>
            <CardTitle>KYC Review Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kycReviewTable.map((customer) => (
                  <TableRow key={customer.customerId}>
                    <TableCell className="font-mono">{customer.customerId}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>
                      <Badge variant={customer.kycStatus === 'Expired' ? 'destructive' : 'secondary'}>
                        {customer.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm">{customer.action}</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Compliance Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Compliance Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {complianceDeadlines.map((deadline, i) => (
                <li key={i} className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span>{deadline}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
