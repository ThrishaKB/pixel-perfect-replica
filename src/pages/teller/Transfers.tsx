import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

export default function Transfers() {
  const [fromMember, setFromMember] = useState<any>(null);
  const [toMember, setToMember] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [refNo] = useState(`TXN-${Math.random().toString(36).substr(2, 5).toUpperCase()}`);

  const handleFromSearch = () => {
    setFromMember({
      name: 'Anil Kumar',
      memberId: 'M-10223',
      account: { type: 'SB', number: 'SB-1234', balance: 85000 },
    });
  };

  const handleToSearch = () => {
    setToMember({
      name: 'Priya Devi',
      memberId: 'M-10224',
      account: { type: 'CA', number: 'CA-5678' },
    });
  };

  const handleSubmit = () => {
    toast.success('Transfer initiated successfully');
    setFromMember(null);
    setToMember(null);
    setAmount('');
  };

  return (
    <DashboardLayout title="Transfers - Internal Member Transfer">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Step 1: From Member */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                1
              </span>
              From Member
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search Member: ID / Name / Phone"
                  className="pl-9"
                />
              </div>
              <Button onClick={handleFromSearch}>Search</Button>
            </div>

            {fromMember && (
              <>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Account: Dropdown (SB/CA)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sb">SB - {fromMember.account.number}</SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Balance:</span>
                  <span className="ml-2 font-bold text-primary">
                    ₹{fromMember.account.balance.toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Step 2: To Member */}
        {fromMember && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  2
                </span>
                To Member
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search Member: ID / Name / Phone"
                    className="pl-9"
                  />
                </div>
                <Button onClick={handleToSearch}>Search</Button>
              </div>

              {toMember && (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Account: Dropdown" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">CA - {toMember.account.number}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Transfer Details */}
        {fromMember && toMember && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  3
                </span>
                Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label>Purpose</Label>
                <Input placeholder="Enter purpose of transfer" />
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Reference No (auto):</span>
                <span className="ml-2 font-mono font-medium">{refNo}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {fromMember && toMember && amount && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  4
                </span>
                Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => {
                  setFromMember(null);
                  setToMember(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Initiate Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
