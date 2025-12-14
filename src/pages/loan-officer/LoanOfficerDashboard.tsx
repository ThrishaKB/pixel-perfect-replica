import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, AlertTriangle, FileText } from 'lucide-react';

const applicationDetails = {
  memberId: '#10221',
  name: 'Kamesh',
  creditScore: 712,
  activeLoans: 1,
  loanType: 'Agri Loan',
  amount: '1,50,000',
  tenure: '24 months',
  interest: 'Auto-calculated',
  purpose: '',
};

const checklist = [
  { item: 'Photo ID', status: 'verified' },
  { item: 'Aadhaar Verified', status: 'verified' },
  { item: 'Latest Payslip', status: 'missing' },
  { item: 'Land Ownership Document', status: 'missing' },
];

const creditScoring = {
  incomeObligationRatio: '24%',
  pastEmiRecord: 'Good',
  fraudFlags: 'None',
};

export default function LoanOfficerDashboard() {
  return (
    <DashboardLayout title="Loan Application Processing">
      <div className="space-y-6">
        {/* Header Info */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Member: {applicationDetails.memberId}</p>
                <p className="text-xl font-semibold">{applicationDetails.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Credit Score</p>
                <p className="text-2xl font-bold">{applicationDetails.creditScore}</p>
              </div>
              <Badge variant="secondary">Active Loans: {applicationDetails.activeLoans}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="details">Application Details</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="credit">Credit Score</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="approval">Approval Routing</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Loan Type:</p>
                    <p className="font-medium">{applicationDetails.loanType}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Amount:</p>
                    <p className="font-medium">₹{applicationDetails.amount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tenure:</p>
                    <p className="font-medium">{applicationDetails.tenure}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Interest:</p>
                    <p className="font-medium">{applicationDetails.interest}</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <p className="text-sm text-muted-foreground">Purpose:</p>
                    <p className="font-medium text-muted-foreground">[___________]</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checklist" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Checklist (Auto-Validation)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.item} className="flex items-center gap-3">
                      {item.status === 'verified' ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                      <span className={item.status === 'missing' ? 'text-red-600' : ''}>
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credit" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Credit Scoring Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span>Income / Obligation Ratio:</span>
                    <span className="font-medium">{creditScoring.incomeObligationRatio}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span>Past EMI Record:</span>
                    <Badge variant="outline" className="text-green-600">{creditScoring.pastEmiRecord}</Badge>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span>Fraud Flags:</span>
                    <Badge className="bg-green-100 text-green-800">{creditScoring.fraudFlags}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-8 border-2 border-dashed rounded-lg text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">[Preview Window: Document.pdf]</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approval" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Approval Routing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button className="flex-1">Approve</Button>
                  <Button variant="destructive" className="flex-1">Reject</Button>
                  <Button variant="outline" className="flex-1">Return to FO</Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Approval Notes:</p>
                  <textarea 
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    placeholder="Add notes for this decision..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
