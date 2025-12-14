import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function NewRegistration() {
  const handleSubmit = () => {
    toast.success('Customer registration submitted');
  };

  return (
    <DashboardLayout title="New Customer Registration">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Customer Type */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select customer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="joint">Joint Account</SelectItem>
                <SelectItem value="minor">Minor (Guardian Account)</SelectItem>
                <SelectItem value="huf">HUF</SelectItem>
                <SelectItem value="firm">Proprietorship / Firm</SelectItem>
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
                <Label>Full Name (as per Aadhaar)</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Father's/Spouse Name</Label>
                <Input placeholder="Enter name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input placeholder="Enter mobile number" />
              </div>
              <div className="space-y-2">
                <Label>Email (Optional)</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Details */}
        <Card>
          <CardHeader>
            <CardTitle>Address Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Address</Label>
              <Input placeholder="Enter current address" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input placeholder="City" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input placeholder="State" />
              </div>
              <div className="space-y-2">
                <Label>PIN Code</Label>
                <Input placeholder="PIN Code" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Permanent Address (if different)</Label>
              <Input placeholder="Enter permanent address" />
            </div>
          </CardContent>
        </Card>

        {/* Occupation Details */}
        <Card>
          <CardHeader>
            <CardTitle>Occupation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Occupation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="housewife">Housewife</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Annual Income Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below2">Below ₹2 Lakh</SelectItem>
                    <SelectItem value="2-5">₹2-5 Lakh</SelectItem>
                    <SelectItem value="5-10">₹5-10 Lakh</SelectItem>
                    <SelectItem value="above10">Above ₹10 Lakh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSubmit}>Proceed to KYC</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
