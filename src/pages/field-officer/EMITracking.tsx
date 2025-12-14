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

const emiList = [
  { borrower: 'Ramesh', loanId: '1021', emiAmount: 8240, status: 'Overdue', dueDate: '05-Mar-25' },
  { borrower: 'Kavya', loanId: '1020', emiAmount: 5700, status: 'Due Today', dueDate: '14-Mar-25' },
  { borrower: 'Anil', loanId: '1019', emiAmount: 6120, status: 'Paid', dueDate: 'Rt-Feb-25' },
];

const paymentHistory = [
  { month: 'Jan', emi: 8240, status: 'Paid', datePaid: '05-Jan', mode: 'Cash', receiptNo: 'RCT011' },
  { month: 'Feb', emi: 8240, status: 'Paid', datePaid: '05-Feb', mode: 'UPI', receiptNo: 'RCT084' },
  { month: 'Mar', emi: 8240, status: 'Overdue', datePaid: '—', mode: '—', receiptNo: '—' },
];

export default function EMITracking() {
  const [selectedBorrower, setSelectedBorrower] = useState<any>(null);

  const handleRecordPayment = (borrower: any) => {
    setSelectedBorrower(borrower);
  };

  const handleConfirm = () => {
    toast.success('Payment recorded successfully');
    setSelectedBorrower(null);
  };

  return (
    <DashboardLayout title="EMI Maintenance / Tracking">
      <div className="space-y-6">
        <Card className="bg-primary/5">
          <CardContent className="py-4">
            <p className="text-center font-medium">EMI Payment Tracking Dashboard</p>
          </CardContent>
        </Card>

        {/* Borrower EMI List */}
        <Card>
          <CardHeader>
            <CardTitle>Borrower EMI List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>EMI Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emiList.map((emi) => (
                  <TableRow key={emi.loanId}>
                    <TableCell>{emi.borrower}</TableCell>
                    <TableCell className="font-mono">{emi.loanId}</TableCell>
                    <TableCell>₹{emi.emiAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        emi.status === 'Overdue' ? 'destructive' : 
                        emi.status === 'Due Today' ? 'secondary' : 'default'
                      }>
                        {emi.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{emi.dueDate}</TableCell>
                    <TableCell>
                      {emi.status === 'Paid' ? (
                        <Button variant="link" size="sm">[View History]</Button>
                      ) : (
                        <Button variant="link" size="sm" onClick={() => handleRecordPayment(emi)}>
                          [Record Payment]
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Record Payment Form */}
        {selectedBorrower && (
          <Card>
            <CardHeader>
              <CardTitle>When FO Clicks "Record Payment"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p><strong>Borrower:</strong> {selectedBorrower.borrower} (Loan {selectedBorrower.loanId})</p>
                <p><strong>EMI Amount:</strong> ₹{selectedBorrower.emiAmount.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Label>Amount Received</Label>
                <Input type="number" defaultValue={selectedBorrower.emiAmount} />
              </div>
              <div className="space-y-2">
                <Label>Mode</Label>
                <RadioGroup defaultValue="cash">
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
                <Label>Payment Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Remarks</Label>
                <Input placeholder="Optional remarks" />
              </div>
              <Button onClick={handleConfirm}>Confirm Payment</Button>
            </CardContent>
          </Card>
        )}

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History (Example)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>EMI</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Paid</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Receipt No.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((record) => (
                  <TableRow key={record.month}>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>₹{record.emi.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === 'Overdue' ? 'destructive' : 'default'}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.datePaid}</TableCell>
                    <TableCell>{record.mode}</TableCell>
                    <TableCell className="font-mono">{record.receiptNo}</TableCell>
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
