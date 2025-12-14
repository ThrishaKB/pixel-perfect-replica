import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function AccountCreation() {
  const handleSubmit = () => {
    toast.success('Account submitted to CBS');
  };

  return (
    <DashboardLayout title="Account Creation Module">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="bg-primary/5">
          <CardContent className="py-4">
            <p className="text-center font-medium">Create New Account (Savings / Loan – Full KYC)</p>
          </CardContent>
        </Card>

        {/* Account Type */}
        <Card>
          <CardHeader>
            <CardTitle>Account Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Account Type: [Savings ▼] [Loan ▼]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="loan">Loan Account</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input placeholder="Enter phone number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Aadhaar Number</Label>
                <Input placeholder="Enter Aadhaar number" />
              </div>
              <div className="space-y-2">
                <Label>PAN Number</Label>
                <Input placeholder="Enter PAN number" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input placeholder="Enter full address" />
            </div>
          </CardContent>
        </Card>

        {/* KYC Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>KYC Document Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Aadhaar (Front)', action: 'Upload' },
              { label: 'Aadhaar (Back)', action: 'Upload' },
              { label: 'PAN Card', action: 'Upload' },
              { label: 'Address Proof', action: 'Upload' },
              { label: 'Photo', action: 'Capture / Upload' },
              { label: 'Signature', action: 'Capture / Upload' },
            ].map((doc) => (
              <div key={doc.label} className="flex items-center justify-between p-3 border rounded-lg">
                <span>{doc.label}:</span>
                <Button variant="outline" size="sm">
                  {doc.action.includes('Capture') ? (
                    <Camera className="w-4 h-4 mr-2" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  [{doc.action}]
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Branch</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysuru-main">Mysuru Main</SelectItem>
                    <SelectItem value="mysuru-rural">Mysuru Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Initial Deposit (₹)</Label>
                <Input type="number" placeholder="Enter amount" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nominee Name</Label>
              <Input placeholder="Enter nominee name" />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={handleSubmit}>Submit to CBS</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
