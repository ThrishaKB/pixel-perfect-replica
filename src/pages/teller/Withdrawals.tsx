import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Withdrawals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [withdrawalMode, setWithdrawalMode] = useState('cash');
  const [verificationMethod, setVerificationMethod] = useState('otp');
  const [otp, setOtp] = useState('');
  const [amount, setAmount] = useState('');

  const handleSearch = () => {
    setSelectedMember({
      name: 'Kavya Sharma',
      memberId: 'M-10222',
      account: { type: 'SB', number: 'SB-XXXX', balance: 42350 },
    });
  };

  const handleSendOTP = () => {
    toast.success('OTP sent to member\'s registered mobile');
  };

  const handleSubmit = () => {
    toast.success('Withdrawal processed successfully');
    setSelectedMember(null);
    setAmount('');
    setOtp('');
  };

  return (
    <DashboardLayout title="Withdrawals - New Transaction">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Step 1: Member Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                1
              </span>
              Member Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Member ID / Name / Phone"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            {selectedMember && (
              <p className="mt-3 text-sm text-muted-foreground">
                (Member info and eligible withdrawal accounts shown)
              </p>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Withdrawal Details */}
        {selectedMember && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  2
                </span>
                Withdrawal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  <span className="text-muted-foreground">Account Selected:</span>
                  <span className="ml-2 font-medium">{selectedMember.account.type}-XXXX</span>
                </div>
                <div className="text-sm mt-1">
                  <span className="text-muted-foreground">Available Balance:</span>
                  <span className="ml-2 font-medium text-primary">
                    ₹{selectedMember.account.balance.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Withdrawal Amount (₹)</Label>
                <Input 
                  type="number" 
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Mode</Label>
                <Select value={withdrawalMode} onValueChange={setWithdrawalMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Transfer to another internal account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Narration</Label>
                <Input placeholder="Optional narration" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: OTP / Identity Verification */}
        {selectedMember && amount && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  3
                </span>
                OTP / Identity Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Verification Method:</Label>
                <RadioGroup value={verificationMethod} onValueChange={setVerificationMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otp" id="otp" />
                    <Label htmlFor="otp">Ask Member to provide OTP</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aadhaar" id="aadhaar" />
                    <Label htmlFor="aadhaar">Verify Using Aadhaar Last 4 Digits</Label>
                  </div>
                </RadioGroup>
              </div>

              {verificationMethod === 'otp' && (
                <Button variant="outline" onClick={handleSendOTP}>
                  <Send className="w-4 h-4 mr-2" />
                  Send OTP
                </Button>
              )}

              <div className="space-y-2">
                <Label>Input OTP</Label>
                <Input 
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Final Confirmation */}
        {selectedMember && amount && otp && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  4
                </span>
                Final Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setSelectedMember(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Process Withdrawal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
