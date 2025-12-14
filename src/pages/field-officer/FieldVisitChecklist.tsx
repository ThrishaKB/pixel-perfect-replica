import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Camera, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const visitSummary = {
  totalToday: 6,
  completed: 2,
  pending: 4,
};

const fieldVisitTasks = [
  { appId: '1021', borrower: 'Ramesh', loanType: 'Agri Term Loan', visitType: 'Residence Check', action: 'Start Visit' },
  { appId: '1019', borrower: 'Anil', loanType: 'Housing Loan', visitType: 'Property Photo', action: 'Start Visit' },
  { appId: '1014', borrower: 'Prakash', loanType: 'Agri TL', visitType: 'Land Verification', action: 'Start Visit' },
  { appId: '1009', borrower: 'Lakshmi', loanType: 'Business Loan', visitType: 'Shop/Workspace', action: 'Start Visit' },
];

export default function FieldVisitChecklist() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const handleSubmit = () => {
    toast.success('Field visit report submitted');
    setSelectedApp(null);
  };

  return (
    <DashboardLayout title="Field Visit Checklist — Field Officer">
      <div className="space-y-6">
        {/* Visit Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Visit Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8 text-sm">
              <div>• Total Visits Assigned Today: <strong>{visitSummary.totalToday}</strong></div>
              <div>• Completed Visits: <strong className="text-green-600">{visitSummary.completed}</strong></div>
              <div>• Pending Visits: <strong className="text-yellow-600">{visitSummary.pending}</strong></div>
            </div>
          </CardContent>
        </Card>

        {/* Field Visit Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Field Visit Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Visit Type</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fieldVisitTasks.map((task) => (
                  <TableRow key={task.appId}>
                    <TableCell className="font-mono">{task.appId}</TableCell>
                    <TableCell>{task.borrower}</TableCell>
                    <TableCell>{task.loanType}</TableCell>
                    <TableCell>{task.visitType}</TableCell>
                    <TableCell>
                      <Button 
                        variant="link" 
                        size="sm"
                        onClick={() => setSelectedApp(task.appId)}
                      >
                        [{task.action}]
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Field Visit Checklist Form */}
        {selectedApp && (
          <Card>
            <CardHeader>
              <CardTitle>Field Visit Checklist — Application #{selectedApp}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Verification */}
              <div className="space-y-4">
                <h4 className="font-medium">Location Verification</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Visit Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>GPS Coordinates</Label>
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Capture Location (Last Captured: —)
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="address-confirm" />
                  <Label htmlFor="address-confirm">Address Confirmation: [Yes / No]</Label>
                </div>
              </div>

              {/* Household / Business Check */}
              <div className="space-y-4">
                <h4 className="font-medium">Household / Business Check</h4>
                <div className="space-y-2">
                  {[
                    { id: 'borrower', label: 'Borrower Present' },
                    { id: 'family', label: 'Family/Neighbors Confirmed' },
                    { id: 'operational', label: 'Business Operational (if applicable)' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <span className="w-48">{item.label}:</span>
                      <Checkbox id={`${item.id}-yes`} />
                      <Label htmlFor={`${item.id}-yes`}>Yes</Label>
                      <Checkbox id={`${item.id}-no`} />
                      <Label htmlFor={`${item.id}-no`}>No</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document / Collateral Check */}
              <div className="space-y-4">
                <h4 className="font-medium">Document / Collateral Check</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="w-48">Collateral Present (if any):</span>
                    <Checkbox id="collateral-yes" />
                    <Label htmlFor="collateral-yes">Yes</Label>
                    <Checkbox id="collateral-no" />
                    <Label htmlFor="collateral-no">No</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-48">Documents Match:</span>
                    <Checkbox id="docs-yes" />
                    <Label htmlFor="docs-yes">Yes</Label>
                    <Checkbox id="docs-no" />
                    <Label htmlFor="docs-no">No</Label>
                  </div>
                </div>
              </div>

              {/* Photo Evidence */}
              <div className="space-y-4">
                <h4 className="font-medium">Photo Evidence</h4>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos [Take Photo] (0 uploaded)
                </Button>
              </div>

              {/* Additional Observations */}
              <div className="space-y-2">
                <Label>Additional Observations</Label>
                <Textarea placeholder="Enter any additional observations..." />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setSelectedApp(null)}>
                  Save Progress
                </Button>
                <Button onClick={handleSubmit}>
                  Submit Visit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
