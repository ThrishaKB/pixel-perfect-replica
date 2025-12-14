import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function AccountOpening() {
  const handleSubmit = () => {
    toast.success('Account opening request submitted to CBS');
  };

  return (
    <DashboardLayout title="Account Opening (CBS Entry)">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Customer Summary */}
        <Card className="bg-primary/5">
          <CardContent className="py-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Customer:</span>
                <span className="ml-2 font-medium">Ramesh Kumar</span>
              </div>
              <div>
                <span className="text-muted-foreground">KYC Status:</span>
                <span className="ml-2 font-medium text-green-600">Verified</span>
              </div>
              <div>
                <span className="text-muted-foreground">Customer ID:</span>
                <span className="ml-2 font-medium">C-10567</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Type */}
        <Card>
          <CardHeader>
            <CardTitle>Account Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Account Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sb">Savings Account (SB)</SelectItem>
                  <SelectItem value="ca">Current Account (CA)</SelectItem>
                  <SelectItem value="rd">Recurring Deposit (RD)</SelectItem>
                  <SelectItem value="fd">Fixed Deposit (FD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account Variant</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="senior">Senior Citizen</SelectItem>
                  <SelectItem value="staff">Staff Account</SelectItem>
                  <SelectItem value="nri">NRI Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysuru-main">Mysuru Main</SelectItem>
                    <SelectItem value="mysuru-rural">Mysuru Rural</SelectItem>
                    <SelectItem value="bangalore">Bangalore Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Initial Deposit Amount (₹)</Label>
                <Input type="number" placeholder="Minimum ₹500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mode of Operation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="joint-either">Joint - Either or Survivor</SelectItem>
                    <SelectItem value="joint-both">Joint - Both Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cheque Book Required</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nominee Details */}
        <Card>
          <CardHeader>
            <CardTitle>Nominee Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nominee Name</Label>
                <Input placeholder="Enter nominee name" />
              </div>
              <div className="space-y-2">
                <Label>Relationship</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="son">Son</SelectItem>
                    <SelectItem value="daughter">Daughter</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nominee DOB</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Nominee Share (%)</Label>
                <Input type="number" defaultValue="100" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services & Features */}
        <Card>
          <CardHeader>
            <CardTitle>Services & Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 'debit', label: 'Debit Card Required' },
              { id: 'mobile', label: 'Mobile Banking' },
              { id: 'internet', label: 'Internet Banking' },
              { id: 'sms', label: 'SMS Alerts' },
              { id: 'statement', label: 'E-Statement' },
            ].map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox id={service.id} />
                <Label htmlFor={service.id}>{service.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSubmit}>Submit to CBS</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
