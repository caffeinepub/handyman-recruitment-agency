import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { SiFacebook } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { Variant_client_candidate } from '../backend';

export default function ContactPage() {
  const { actor } = useActor();
  const [candidateForm, setCandidateForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [clientForm, setClientForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [candidateSuccess, setCandidateSuccess] = useState(false);
  const [clientSuccess, setClientSuccess] = useState(false);

  const candidateMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitContactMessage({
        fullName: candidateForm.fullName,
        contactType: Variant_client_candidate.candidate,
        phoneNumber: candidateForm.phoneNumber,
        email: candidateForm.email,
        message: candidateForm.message
      });
    },
    onSuccess: () => {
      setCandidateSuccess(true);
      setCandidateForm({ fullName: '', phoneNumber: '', email: '', message: '' });
    }
  });

  const clientMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitContactMessage({
        fullName: clientForm.fullName,
        contactType: Variant_client_candidate.client,
        phoneNumber: clientForm.phoneNumber,
        email: clientForm.email,
        message: clientForm.message
      });
    },
    onSuccess: () => {
      setClientSuccess(true);
      setClientForm({ fullName: '', phoneNumber: '', email: '', message: '' });
    }
  });

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateSuccess(false);
    candidateMutation.mutate();
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientSuccess(false);
    clientMutation.mutate();
  };

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Handyman Recruitment Agency. Call, WhatsApp, or email us for recruitment services in Uitenhage and Gqeberha."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <SectionHeading className="text-center mb-4">Contact Us</SectionHeading>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Get in touch with us for all your recruitment needs
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="tel:0712115763"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Phone className="h-5 w-5 text-brand-orange" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">0712115763</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/27712115763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-brand-orange" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">0712115763</p>
                  </div>
                </a>

                <a
                  href="mailto:hragency415@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Mail className="h-5 w-5 text-brand-orange" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">hragency415@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/HandymanRecruitmentAgency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <SiFacebook className="h-5 w-5 text-brand-orange" />
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-sm text-muted-foreground">Handyman Recruitment Agency</p>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We provide recruitment services in the following areas:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                    <span className="font-medium">Uitenhage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                    <span className="font-medium">Gqeberha (Port Elizabeth)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Choose the appropriate form below</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="candidate">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="candidate">Candidate Message</TabsTrigger>
                  <TabsTrigger value="client">Client Enquiry</TabsTrigger>
                </TabsList>

                <TabsContent value="candidate">
                  {candidateSuccess && (
                    <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        Your message has been received. We will get back to you soon.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleCandidateSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="candidate-name">Full Name *</Label>
                      <Input
                        id="candidate-name"
                        value={candidateForm.fullName}
                        onChange={(e) =>
                          setCandidateForm({ ...candidateForm, fullName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="candidate-phone">Phone Number *</Label>
                      <Input
                        id="candidate-phone"
                        type="tel"
                        value={candidateForm.phoneNumber}
                        onChange={(e) =>
                          setCandidateForm({ ...candidateForm, phoneNumber: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="candidate-email">Email *</Label>
                      <Input
                        id="candidate-email"
                        type="email"
                        value={candidateForm.email}
                        onChange={(e) =>
                          setCandidateForm({ ...candidateForm, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="candidate-message">Message *</Label>
                      <Textarea
                        id="candidate-message"
                        rows={5}
                        value={candidateForm.message}
                        onChange={(e) =>
                          setCandidateForm({ ...candidateForm, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-brand-orange/90"
                      disabled={candidateMutation.isPending}
                    >
                      {candidateMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                    {candidateMutation.isError && (
                      <Alert variant="destructive">
                        <AlertDescription>Failed to send message. Please try again.</AlertDescription>
                      </Alert>
                    )}
                  </form>
                </TabsContent>

                <TabsContent value="client">
                  {clientSuccess && (
                    <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        Your enquiry has been received. We will contact you shortly.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleClientSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="client-name">Full Name *</Label>
                      <Input
                        id="client-name"
                        value={clientForm.fullName}
                        onChange={(e) => setClientForm({ ...clientForm, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-phone">Phone Number *</Label>
                      <Input
                        id="client-phone"
                        type="tel"
                        value={clientForm.phoneNumber}
                        onChange={(e) =>
                          setClientForm({ ...clientForm, phoneNumber: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-email">Email *</Label>
                      <Input
                        id="client-email"
                        type="email"
                        value={clientForm.email}
                        onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client-message">Message *</Label>
                      <Textarea
                        id="client-message"
                        rows={5}
                        value={clientForm.message}
                        onChange={(e) => setClientForm({ ...clientForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-brand-orange/90"
                      disabled={clientMutation.isPending}
                    >
                      {clientMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Enquiry'
                      )}
                    </Button>
                    {clientMutation.isError && (
                      <Alert variant="destructive">
                        <AlertDescription>Failed to send enquiry. Please try again.</AlertDescription>
                      </Alert>
                    )}
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
