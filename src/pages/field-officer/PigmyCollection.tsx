import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const dailySummary = {
  totalCustomers: 34,
  totalCollected: 14250,
  cashCollected: 6000,
  upiCollected: 5050,
};

const customers = [
  { customer: 'Ramesh', accountNo: 'PG1021', dueToday: 50, status: 'Not Paid' },
  { customer: 'Kavya', accountNo: 'PG1022', dueToday: 100, status: 'Paid (UPI)' },
  { customer: 'Prakash', accountNo: 'PG1523', dueToday: 50, status: 'Not Paid' },
];

export default function PigmyCollection() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [paymentMode, setPaymentMode] = useState('cash');

  const handleCollect = (customer: any) => {
    setSelectedCustomer(customer);
  };

  const handleConfirm = () => {
    toast.success('Collection confirmed');
    setSelectedCustomer(null);
  };

  const handleEndOfDay = () => {
    toast.success('Pigmy Deposit Remitted via FO12 – Karnataka Co-op Bank');
  };

  return (
    <DashboardLayout title="Pigmy Collection">
      <div className="space-y-6">
        <Card className="bg-primary/5">
          <CardContent className="py-4">
            <p className="text-center font-medium">Pigmy Collection Home</p>
          </CardContent>
        </Card>

        {/* Daily Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>Total Pigmy Customers Today: <strong>{dailySummary.totalCustomers}</strong></div>
              <div>Total Collected: <strong className="text-green-600">₹{dailySummary.totalCollected.toLocaleString()}</strong></div>
              <div>Cash Collected: <strong>₹{dailySummary.cashCollected.toLocaleString()}</strong></div>
              <div>UPI Collected: <strong>₹{dailySummary.upiCollected.toLocaleString()}</strong></div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Collection List */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Collection List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Account No</TableHead>
                  <TableHead>Due Today</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.accountNo}>
                    <TableCell>{c.customer}</TableCell>
                    <TableCell className="font-mono">{c.accountNo}</TableCell>
                    <TableCell>₹{c.dueToday}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === 'Not Paid' ? 'destructive' : 'default'}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {c.status === 'Not Paid' ? (
                        <Button variant="link" size="sm" onClick={() => handleCollect(c)}>
                          [Collect]
                        </Button>
                      ) : (
                        <Button variant="link" size="sm">[View]</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Collection Form */}
        {selectedCustomer && (
          <Card>
            <CardHeader>
              <CardTitle>When FO Clicks "Collect"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p><strong>Customer:</strong> {selectedCustomer.customer} ({selectedCustomer.accountNo})</p>
              </div>
              <div className="space-y-2">
                <Label>Enter Amount</Label>
                <Input type="number" defaultValue={selectedCustomer.dueToday} />
              </div>
              <div className="space-y-2">
                <Label>Mode of Payment</Label>
                <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Remarks</Label>
                <Input placeholder="Optional remarks" />
              </div>
              <Button onClick={handleConfirm}>Confirm Collection</Button>
            </CardContent>
          </Card>
        )}

        {/* End of Day Deposit */}
        <Card>
          <CardHeader>
            <CardTitle>End of Day Deposit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p>Total Amount to Deposit: <strong>₹{dailySummary.totalCollected.toLocaleString()}</strong></p>
              <div className="space-y-2">
                <Label>Deposit Reference No.</Label>
                <Input placeholder="Enter reference number" />
              </div>
            </div>
            <Button onClick={handleEndOfDay}>Confirm Day Closure</Button>
            <p className="text-sm text-muted-foreground">
              After closure → SMS to all customers: "₹50 Pigmy Deposit Remitted via FO12 – Karnataka Co-op Bank"
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
