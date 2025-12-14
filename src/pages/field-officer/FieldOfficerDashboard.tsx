import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const summaryStats = {
  totalApplications: 26,
  pendingVerifications: 12,
  returnedByLO: 3,
  completedThisWeek: 7,
};

const applications = [
  { id: '1021', borrower: 'Ramesh', loanType: 'Agri TL', status: 'Pending Verif', action: 'Open' },
  { id: '1020', borrower: 'Kavya', loanType: 'Gold Loan', status: 'Docs Missing', action: 'Open' },
  { id: '1019', borrower: 'Anil', loanType: 'Housing', status: 'Field Visit', action: 'Open' },
];

const tasksRequiringAttention = [
  'Upload income proof for Application #1020',
  'Update GPS location for Application #1019',
  'Aadhaar mismatch flagged for App #1018',
];

export default function FieldOfficerDashboard() {
  return (
    <DashboardLayout title="Field Officer Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-6">
            <h2 className="text-xl font-semibold">Welcome, FO12 (Field Officer – Mysuru Rural Branch)</h2>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{summaryStats.totalApplications}</p>
                  <p className="text-sm text-muted-foreground">Total Applications Assigned</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{summaryStats.pendingVerifications}</p>
                  <p className="text-sm text-muted-foreground">Pending Verifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{summaryStats.returnedByLO}</p>
                  <p className="text-sm text-muted-foreground">Returned by LO/BM</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{summaryStats.completedThisWeek}</p>
                  <p className="text-sm text-muted-foreground">Completed This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Assigned */}
        <Card>
          <CardHeader>
            <CardTitle>Applications Assigned to You</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-mono">{app.id}</TableCell>
                    <TableCell>{app.borrower}</TableCell>
                    <TableCell>{app.loanType}</TableCell>
                    <TableCell>
                      <Badge variant={app.status === 'Docs Missing' ? 'destructive' : 'secondary'}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" asChild>
                        <Link to={`/field-officer/verifications`}>[{app.action}]</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tasks Requiring Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Tasks Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tasksRequiringAttention.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  {task}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
