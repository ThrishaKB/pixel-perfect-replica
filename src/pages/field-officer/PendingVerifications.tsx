import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const summaryStats = {
  totalPending: 12,
  documentMissing: 5,
  fieldVisitPending: 4,
  clarificationsReturned: 3,
};

const applications = [
  { appId: '1021', borrower: 'Ramesh', loanType: 'Agri Term Loan', pendingItem: 'Field Verification', action: 'Open' },
  { appId: '1020', borrower: 'Kavya', loanType: 'Gold Loan', pendingItem: 'Upload Income Proof', action: 'Open' },
  { appId: '1019', borrower: 'Anil', loanType: 'Housing', pendingItem: 'Update GPS Location', action: 'Open' },
  { appId: '1018', borrower: 'Deepa', loanType: 'Vehicle Loan', pendingItem: 'Aadhaar Mismatch', action: 'Open' },
  { appId: '1017', borrower: 'Prakash', loanType: 'Agri TL', pendingItem: 'Field Visit Report', action: 'Open' },
];

const clarificationRequests = [
  { appId: '1015', borrower: 'Divya', issueRaised: 'Aadhaar name mismatch', action: 'View & Update' },
  { appId: '1012', borrower: 'Manoj', issueRaised: 'Need clearer collateral photo', action: 'View & Update' },
  { appId: '1009', borrower: 'Lakshmi', issueRaised: 'Income proof insufficient', action: 'View & Update' },
];

export default function PendingVerifications() {
  return (
    <DashboardLayout title="Pending Verifications — Field Officer">
      <div className="space-y-6">
        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Verification Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>• Total Pending Applications: <strong>{summaryStats.totalPending}</strong></div>
              <div>• Documents Missing: <strong>{summaryStats.documentMissing}</strong></div>
              <div>• Field Visit Pending: <strong>{summaryStats.fieldVisitPending}</strong></div>
              <div>• Clarifications Returned by LO/BM: <strong>{summaryStats.clarificationsReturned}</strong></div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Requiring Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Applications Requiring Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Pending Item</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.appId}>
                    <TableCell className="font-mono">{app.appId}</TableCell>
                    <TableCell>{app.borrower}</TableCell>
                    <TableCell>{app.loanType}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.pendingItem}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm">[{app.action}]</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Loan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="agri">Agri TL</SelectItem>
                  <SelectItem value="gold">Gold Loan</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="docs">Docs Missing</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Search..." className="w-48" />
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Clarification Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Clarification Requests from LO / BM</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Issue Raised</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clarificationRequests.map((req) => (
                  <TableRow key={req.appId}>
                    <TableCell className="font-mono">{req.appId}</TableCell>
                    <TableCell>{req.borrower}</TableCell>
                    <TableCell>{req.issueRaised}</TableCell>
                    <TableCell>
                      <Button variant="link" size="sm">[{req.action}]</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-4">
              Notes: Click "Open" to complete pending work. All updates are auto-synced to LO dashboard.
              Applications remain here until FO completes all tasks.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
