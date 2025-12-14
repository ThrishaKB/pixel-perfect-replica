import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const transactionSummary = {
  totalTransactionsToday: 1284,
  suspicionFlags: 3,
  highValueTxns: 14,
};

const suspiciousTransactions = [
  { id: '112', type: 'UPI', amount: '₹2.4L', flag: 'Pattern Mismatch', action: 'Review' },
];

export default function TransactionMonitoring() {
  return (
    <DashboardLayout title="Transaction Audit Dashboard">
      <div className="space-y-6">
        {/* Transaction Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Transactions Today</p>
                <p className="text-2xl font-bold">{transactionSummary.totalTransactionsToday.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Suspicion Flags</p>
                <p className="text-2xl font-bold text-red-600">{transactionSummary.suspicionFlags}</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-muted-foreground">High Value Txns</p>
                <p className="text-2xl font-bold text-blue-600">{transactionSummary.highValueTxns}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suspicious Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle>Suspicious Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Flag</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suspiciousTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono">{txn.id}</TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{txn.flag}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm">{txn.action}</Button>
                    </TableCell>
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
