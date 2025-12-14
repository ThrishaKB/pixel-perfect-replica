import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const documents = [
  { name: 'Aadhaar Card (Front)', status: 'uploaded', required: true },
  { name: 'Aadhaar Card (Back)', status: 'uploaded', required: true },
  { name: 'PAN Card', status: 'pending', required: true },
  { name: 'Passport Photo', status: 'pending', required: true },
  { name: 'Address Proof', status: 'pending', required: true },
  { name: 'Signature', status: 'pending', required: true },
  { name: 'Income Proof', status: 'pending', required: false },
];

export default function KYCDocuments() {
  const handleUpload = (docName: string) => {
    toast.success(`${docName} uploaded successfully`);
  };

  return (
    <DashboardLayout title="KYC Document Collection">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Document Upload List */}
        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc) => (
              <div 
                key={doc.name} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {doc.status === 'uploaded' ? (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.required ? 'Required' : 'Optional'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.status === 'uploaded' ? (
                    <Badge className="bg-green-100 text-green-800">Uploaded</Badge>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleUpload(doc.name)}>
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUpload(doc.name)}>
                        <Camera className="w-4 h-4 mr-1" />
                        Capture
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Document Quality Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Document Quality Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Documents should be clear and legible</li>
              <li>• All four corners of the document should be visible</li>
              <li>• No glare or shadows on the document</li>
              <li>• File size should be less than 5MB</li>
              <li>• Accepted formats: JPG, PNG, PDF</li>
            </ul>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }} />
              </div>
              <span className="text-sm font-medium">2/6 Required Documents</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline">Save & Continue Later</Button>
          <Button>Proceed to Verification</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
