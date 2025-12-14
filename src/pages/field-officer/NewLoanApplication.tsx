import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function NewLoanApplication() {
  const [memberId, setMemberId] = useState('');
  const [member, setMember] = useState<any>(null);

  const handleSearch = () => {
    setMember({
      name: 'Ramesh Kumar',
      memberId: 'M-10221',
      phone: '9876543210',
      address: 'Mysuru Rural',
    });
  };

  const handleSubmit = () => {
    toast.success('Loan application submitted successfully');
  };

  return (
    <DashboardLayout title="New Loan Application">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Member Search */}
        <Card>
          <CardHeader>
            <CardTitle>1. Member Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by Member ID / Name / Phone"
                  className="pl-9"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            {member && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Member ID:</strong> {member.memberId}</p>
                <p><strong>Phone:</strong> {member.phone}</p>
                <p><strong>Address:</strong> {member.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loan Details */}
        {member && (
          <Card>
            <CardHeader>
              <CardTitle>2. Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Loan Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agri">Agri Term Loan</SelectItem>
                      <SelectItem value="gold">Gold Loan</SelectItem>
                      <SelectItem value="housing">Housing Loan</SelectItem>
                      <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                      <SelectItem value="business">Business Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tenure (months)</Label>
                  <Input type="number" placeholder="e.g., 24" />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate</Label>
                  <Input disabled value="Auto-calculated" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Purpose</Label>
                <Textarea placeholder="Describe the purpose of the loan" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Required Documents */}
        {member && (
          <Card>
            <CardHeader>
              <CardTitle>3. Required Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Aadhaar Card', 'PAN Card', 'Income Proof', 'Land Ownership Document'].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                  <span>{doc}</span>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Submit */}
        {member && (
          <div className="flex gap-4">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={handleSubmit}>Submit Application</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
