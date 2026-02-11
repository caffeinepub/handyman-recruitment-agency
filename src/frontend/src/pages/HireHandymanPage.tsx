import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';

export default function HireHandymanPage() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    serviceType: '',
    location: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const enquiryMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');

      await actor.submitEnquiry({
        fullName: formData.fullName,
        companyName: formData.companyName || undefined,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        serviceType: formData.serviceType,
        location: formData.location,
        message: formData.message
      });
    },
    onSuccess: () => {
      setSuccess(true);
      setFormData({
        fullName: '',
        companyName: '',
        phoneNumber: '',
        email: '',
        serviceType: '',
        location: '',
        message: ''
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    enquiryMutation.mutate();
  };

  return (
    <>
      <Seo
        title="Hire a Handyman"
        description="Looking to hire skilled handymen? Submit your requirements and we'll connect you with qualified professionals."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <SectionHeading className="text-center mb-4">Hire a Handyman</SectionHeading>
          <p className="text-center text-muted-foreground mb-8">
            Tell us about your requirements and we'll match you with qualified handymen.
          </p>

          {success && (
            <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Thank you for your enquiry. We will contact you shortly with suitable candidates.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Client Enquiry Form</CardTitle>
                <CardDescription>Provide details about your hiring needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name (if applicable)</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="serviceType">Type of Service Needed *</Label>
                  <Input
                    id="serviceType"
                    placeholder="e.g., Plumbing, Electrical, Painting"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Uitenhage, Gqeberha"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Describe the Job *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Please provide details about the work required..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-6 bg-brand-orange hover:bg-brand-orange/90"
              disabled={enquiryMutation.isPending}
            >
              {enquiryMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </Button>

            {enquiryMutation.isError && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  {enquiryMutation.error instanceof Error
                    ? enquiryMutation.error.message
                    : 'Failed to submit enquiry. Please try again.'}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
