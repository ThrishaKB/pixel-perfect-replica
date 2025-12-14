import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const verificationStatus = [
  { type: 'Aadhaar Verification', status: 'verified', details: 'Name and DOB matched' },
  { type: 'PAN Verification', status: 'pending', details: 'Awaiting verification' },
  { type: 'Mobile OTP', status: 'verified', details: 'OTP verified successfully' },
  { type: 'Video KYC', status: 'not_required', details: 'Not required for this account type' },
];

export default function IdentityVerification() {
  const handleVerify = (type: string) => {
    toast.success(`${type} verification initiated`);
  };

  return (
    <DashboardLayout title="Identity Verification">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationStatus.map((item) => (
              <div 
                key={item.type} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {item.status === 'verified' ? (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  ) : item.status === 'pending' ? (
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                </div>
                <div>
                  {item.status === 'verified' ? (
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  ) : item.status === 'pending' ? (
                    <Button size="sm" onClick={() => handleVerify(item.type)}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Verify Now
                    </Button>
                  ) : (
                    <Badge variant="secondary">Not Required</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Manual Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Verification (If Required)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Aadhaar Number</Label>
              <div className="flex gap-2">
                <Input placeholder="Enter 12-digit Aadhaar" />
                <Button variant="outline">Verify</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>PAN Number</Label>
              <div className="flex gap-2">
                <Input placeholder="Enter PAN" />
                <Button variant="outline">Verify</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Biometric Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Biometric Verification (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-8 border-2 border-dashed rounded-lg text-center">
              <p className="text-muted-foreground mb-4">
                Connect biometric device for fingerprint verification
              </p>
              <Button variant="outline">Connect Device</Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline">Back to Documents</Button>
          <Button>Proceed to Account Opening</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
