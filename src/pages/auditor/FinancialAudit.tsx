import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const financialSummary = {
  totalDeposits: '₹14.7 Cr',
  totalLoans: '₹9.7 Cr',
};

const loanFileVerification = [
  { type: 'Gold Vault', value: '₹1 Cr (5 Cr)' },
];

const documentationCheck = {
  cashLedgerComparison: 'Pending',
};

const mismatchReport = [
  { id: 1, type: 'Cash Vault', amount: '₹25,000', status: 'Pending' },
];

const expenseVerification = [
  { id: 1, item: 'Pending Bills', count: 3 },
  { id: 2, item: 'Unauthorized Expenses', count: 1 },
];

export default function FinancialAudit() {
  return (
    <DashboardLayout title="Financial Review Dashboard">
      <div className="space-y-6">
        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-2xl font-bold">{financialSummary.totalDeposits}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Loans</p>
                <p className="text-2xl font-bold">{financialSummary.totalLoans}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan File Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Loan File Verification</CardTitle>
          </CardHeader>
          <CardContent>
            {loanFileVerification.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>{item.type}:</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documentation Check */}
        <Card>
          <CardHeader>
            <CardTitle>Documentation Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span>Cash / Ledger Comparison:</span>
              <Badge variant="secondary">{documentationCheck.cashLedgerComparison}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mismatch Report Table */}
        <Card>
          <CardHeader>
            <CardTitle>Mismatch Report Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mismatchReport.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Expense Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expenseVerification.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <span>{item.item}:</span>
                  <Badge variant={item.item.includes('Unauthorized') ? 'destructive' : 'secondary'}>
                    {item.count}
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
