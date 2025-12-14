import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Deposits() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [depositType, setDepositType] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');

  const handleSearch = () => {
    // Mock member search
    setSelectedMember({
      name: 'Ramesh Kumar',
      memberId: 'M-10221',
      accounts: [
        { type: 'SB', number: 'SB-XXXX', balance: 25000 },
        { type: 'CA', number: 'CA-XXXX', balance: 150000 },
      ],
      kycStatus: 'verified',
    });
    setStep(2);
  };

  const handleSubmit = () => {
    toast.success('Deposit submitted successfully');
    // Reset form
    setStep(1);
    setSelectedMember(null);
    setAmount('');
    setNarration('');
  };

  return (
    <DashboardLayout title="Deposit - New Transaction">
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
                  placeholder="Search by Member ID / Name / Phone"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>

            {selectedMember && (
              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Member Details (Auto-Filled after selection)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2 font-medium">{selectedMember.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Member ID:</span>
                    <span className="ml-2 font-medium">{selectedMember.memberId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Accounts:</span>
                    <span className="ml-2">
                      {selectedMember.accounts.map((acc: any) => acc.type).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">KYC Status:</span>
                    <Badge className="ml-2 status-success">
                      <CheckCircle className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Deposit Details */}
        {selectedMember && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  2
                </span>
                Deposit Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Selected</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedMember.accounts.map((acc: any) => (
                        <SelectItem key={acc.number} value={acc.number}>
                          {acc.type} - {acc.number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Deposit Type</Label>
                  <Select value={depositType} onValueChange={setDepositType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input 
                  type="number" 
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Narration</Label>
                <Input 
                  placeholder="Optional narration"
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                />
              </div>

              {depositType === 'cheque' && (
                <div className="space-y-2">
                  <Label>Cheque No / Bank</Label>
                  <Input placeholder="Enter cheque details" />
                </div>
              )}

              <div className="space-y-2">
                <Label>Attachment Upload (optional)</Label>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {selectedMember && amount && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  3
                </span>
                Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>Cancel</Button>
                <Button onClick={handleSubmit} className="flex-1">Submit Deposit</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
