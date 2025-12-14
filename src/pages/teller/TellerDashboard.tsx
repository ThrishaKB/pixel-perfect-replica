import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Check, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const todayTransactions = [
  { time: '10:42', member: 'Anil', type: 'Deposit', amount: 2000, status: 'success' },
  { time: '10:51', member: 'Kavya', type: 'W/D', amount: 500, status: 'success' },
  { time: '11:03', member: 'Ravi', type: 'Deposit', amount: 15000, status: 'flagged' },
];

const cashPosition = {
  startingCash: 50000,
  cashIn: 17000,
  cashOut: 12500,
  expectedBalance: 54500,
};

export default function TellerDashboard() {
  return (
    <DashboardLayout title="Teller Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button asChild className="flex-1">
                <Link to="/teller/deposits">
                  <ArrowDownToLine className="w-4 h-4 mr-2" />
                  Deposit
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/teller/withdrawals">
                  <ArrowUpFromLine className="w-4 h-4 mr-2" />
                  Withdrawal
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/teller/transfers">
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Transfer
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cash Position */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Position</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Starting Cash:</span>
              <span className="font-medium">₹{cashPosition.startingCash.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cash In:</span>
              <span className="font-medium text-green-600">₹{cashPosition.cashIn.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cash Out:</span>
              <span className="font-medium text-red-600">₹{cashPosition.cashOut.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-medium">Expected Balance:</span>
              <span className="font-bold text-primary">₹{cashPosition.expectedBalance.toLocaleString()}</span>
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link to="/teller/balancing">Start End-of-Day Balancing</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Today's Transactions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Today's Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Txn Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayTransactions.map((txn, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono">{txn.time}</TableCell>
                    <TableCell>{txn.member}</TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell>₹{txn.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {txn.status === 'success' ? (
                        <Badge className="status-success">
                          <Check className="w-3 h-3 mr-1" /> Success
                        </Badge>
                      ) : (
                        <Badge className="status-warning">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Flagged
                        </Badge>
                      )}
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
