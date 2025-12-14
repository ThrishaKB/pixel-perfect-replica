import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const summary = {
  totalLoanFilesChecked: 74,
  incompleteFiles: 6,
  missingSignatures: 2,
};

const loanFileChecklist = [
  { loanId: 'L-2201', borrower: 'Ramesh', status: 'Complete', issue: '—' },
  { loanId: 'L-2202', borrower: 'Kavya', status: 'Incomplete', issue: 'Missing Collateral Docs' },
  { loanId: 'L-2203', borrower: 'Anil', status: 'Incomplete', issue: 'Signature Missing' },
];

export default function LoanFileVerification() {
  return (
    <DashboardLayout title="Loan Documentation Audit">
      <div className="space-y-6">
        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Loan Files Checked</p>
                <p className="text-2xl font-bold">{summary.totalLoanFilesChecked}</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Incomplete Files</p>
                <p className="text-2xl font-bold text-yellow-600">{summary.incompleteFiles}</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Missing Signatures</p>
                <p className="text-2xl font-bold text-red-600">{summary.missingSignatures}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan File Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Loan File Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>File Status</TableHead>
                  <TableHead>Missing / Issue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanFileChecklist.map((file) => (
                  <TableRow key={file.loanId}>
                    <TableCell className="font-mono">{file.loanId}</TableCell>
                    <TableCell>{file.borrower}</TableCell>
                    <TableCell>
                      <Badge variant={file.status === 'Complete' ? 'default' : 'destructive'}>
                        {file.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{file.issue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
