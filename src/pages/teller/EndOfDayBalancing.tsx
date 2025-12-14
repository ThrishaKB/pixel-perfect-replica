import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Save, Send } from 'lucide-react';
import { toast } from 'sonner';

const cashSummary = {
  startingCash: 50000,
  totalCashIn: 17000,
  totalCashOut: 12500,
  systemExpectedBalance: 54500,
};

export default function EndOfDayBalancing() {
  const [denominations, setDenominations] = useState({
    d2000: 0,
    d500: 0,
    d200: 0,
    d100: 0,
    d50: 0,
    d20: 0,
    d10: 0,
    coins: 0,
  });
  const [remarks, setRemarks] = useState('');

  const calculatedPhysical = 
    denominations.d2000 * 2000 +
    denominations.d500 * 500 +
    denominations.d200 * 200 +
    denominations.d100 * 100 +
    denominations.d50 * 50 +
    denominations.d20 * 20 +
    denominations.d10 * 10 +
    denominations.coins;

  const difference = calculatedPhysical - cashSummary.systemExpectedBalance;
  const showAlert = Math.abs(difference) > 500;

  const handleDenominationChange = (key: keyof typeof denominations, value: string) => {
    setDenominations(prev => ({
      ...prev,
      [key]: parseInt(value) || 0,
    }));
  };

  const handleSave = () => {
    toast.success('Report saved');
  };

  const handleSubmit = () => {
    if (showAlert && !remarks) {
      toast.error('Please provide remarks for the difference');
      return;
    }
    toast.success('Report submitted to Branch Manager');
  };

  return (
    <DashboardLayout title="End-of-Day Cash Balancing">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Starting Cash:</span>
              <span className="font-medium">₹{cashSummary.startingCash.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Total Cash In:</span>
              <span className="font-medium text-green-600">₹{cashSummary.totalCashIn.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Total Cash Out:</span>
              <span className="font-medium text-red-600">₹{cashSummary.totalCashOut.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span className="font-semibold">System Expected Balance:</span>
              <span className="font-bold text-primary">₹{cashSummary.systemExpectedBalance.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Count Physical Cash */}
        <Card>
          <CardHeader>
            <CardTitle>Count Physical Cash</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { key: 'd2000', label: '₹2000 Notes' },
              { key: 'd500', label: '₹500 Notes' },
              { key: 'd200', label: '₹200 Notes' },
              { key: 'd100', label: '₹100 Notes' },
              { key: 'd50', label: '₹50 Notes' },
              { key: 'd20', label: '₹20 Notes' },
              { key: 'd10', label: '₹10 Notes' },
              { key: 'coins', label: 'Coins' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4">
                <Label className="w-24">{label}:</Label>
                <Input 
                  type="number" 
                  className="w-24"
                  value={denominations[key as keyof typeof denominations]}
                  onChange={(e) => handleDenominationChange(key as keyof typeof denominations, e.target.value)}
                />
              </div>
            ))}
            <div className="pt-4 border-t mt-4">
              <div className="text-lg font-semibold">
                **Calculated Physical Cash: ₹{calculatedPhysical.toLocaleString()}**
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Difference */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Difference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">System Balance</p>
                <p className="text-xl font-bold">₹{cashSummary.systemExpectedBalance.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Physical Balance</p>
                <p className="text-xl font-bold">₹{calculatedPhysical.toLocaleString()}</p>
              </div>
              <div className={`p-4 rounded-lg ${difference === 0 ? 'bg-green-100' : difference > 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                <p className="text-sm text-muted-foreground">Difference</p>
                <p className={`text-xl font-bold ${difference === 0 ? 'text-green-600' : difference > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  **₹{Math.abs(difference).toLocaleString()} {difference !== 0 && `(${difference > 0 ? 'Excess' : 'Short'})`}**
                </p>
              </div>
            </div>

            {showAlert && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Risk Flag: Difference is greater than ₹500. Please provide remarks.
                </AlertDescription>
              </Alert>
            )}

            {showAlert && (
              <div className="space-y-2">
                <Label>Remarks entry (required):</Label>
                <Textarea 
                  placeholder="Explain the difference..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Final Action */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Final Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save & Generate Report
              </Button>
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-2" />
                Submit to Branch Manager
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
