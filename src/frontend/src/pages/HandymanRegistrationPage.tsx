import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { ExternalBlob } from '../backend';

export default function HandymanRegistrationPage() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    physicalAddress: '',
    tradeSkill: '',
    yearsExperience: '',
    workAreas: ''
  });

  const [files, setFiles] = useState<{
    cv: File | null;
    idCopy: File | null;
    matricCert: File | null;
    qualificationCert: File | null;
  }>({
    cv: null,
    idCopy: null,
    matricCert: null,
    qualificationCert: null
  });

  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [success, setSuccess] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');

      const candidateId = await actor.registerCandidate({
        fullName: formData.fullName,
        idNumber: formData.idNumber,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        physicalAddress: formData.physicalAddress,
        tradeSkill: formData.tradeSkill,
        yearsExperience: BigInt(formData.yearsExperience || 0),
        workAreas: formData.workAreas
      });

      const uploadFile = async (file: File, docType: string) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
          setUploadProgress((prev) => ({ ...prev, [docType]: percentage }));
        });

        await actor.uploadCandidateDocument(
          candidateId,
          file.name,
          file.type,
          blob,
          docType
        );
      };

      if (files.cv) await uploadFile(files.cv, 'cv');
      if (files.idCopy) await uploadFile(files.idCopy, 'idCopy');
      if (files.matricCert) await uploadFile(files.matricCert, 'matricCert');
      if (files.qualificationCert) await uploadFile(files.qualificationCert, 'qualificationCert');
    },
    onSuccess: () => {
      setSuccess(true);
      setFormData({
        fullName: '',
        idNumber: '',
        phoneNumber: '',
        email: '',
        physicalAddress: '',
        tradeSkill: '',
        yearsExperience: '',
        workAreas: ''
      });
      setFiles({
        cv: null,
        idCopy: null,
        matricCert: null,
        qualificationCert: null
      });
      setUploadProgress({});
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    registerMutation.mutate();
  };

  const handleFileChange = (docType: keyof typeof files, file: File | null) => {
    setFiles((prev) => ({ ...prev, [docType]: file }));
  };

  return (
    <>
      <Seo
        title="Register as Handyman"
        description="Register as a skilled handyman with Handyman Recruitment Agency. Upload your CV and qualifications to get started."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <SectionHeading className="text-center mb-4">Handyman Registration</SectionHeading>
          <p className="text-center text-muted-foreground mb-8">
            Complete the form below to register with our agency. All fields are required.
          </p>

          {success && (
            <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Your application has been received. We will contact you if shortlisted.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic contact details</CardDescription>
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
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    required
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
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="physicalAddress">Physical Address *</Label>
                  <Input
                    id="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Work Information</CardTitle>
                <CardDescription>Your skills and experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tradeSkill">Trade / Skill *</Label>
                  <Input
                    id="tradeSkill"
                    placeholder="e.g., Plumber, Electrician, Painter, Carpenter"
                    value={formData.tradeSkill}
                    onChange={(e) => setFormData({ ...formData, tradeSkill: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="yearsExperience">Years of Experience *</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    min="0"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="workAreas">Areas Willing to Work In *</Label>
                  <Input
                    id="workAreas"
                    placeholder="e.g., Uitenhage, Gqeberha"
                    value={formData.workAreas}
                    onChange={(e) => setFormData({ ...formData, workAreas: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>Upload your required documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cv">Upload CV (PDF only) *</Label>
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                    required
                  />
                  {uploadProgress.cv !== undefined && uploadProgress.cv < 100 && (
                    <p className="text-sm text-muted-foreground mt-1">Uploading: {uploadProgress.cv}%</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="idCopy">Upload ID Copy (PDF or Image) *</Label>
                  <Input
                    id="idCopy"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange('idCopy', e.target.files?.[0] || null)}
                    required
                  />
                  {uploadProgress.idCopy !== undefined && uploadProgress.idCopy < 100 && (
                    <p className="text-sm text-muted-foreground mt-1">Uploading: {uploadProgress.idCopy}%</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="matricCert">Upload Matric Certificate (PDF or Image) *</Label>
                  <Input
                    id="matricCert"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange('matricCert', e.target.files?.[0] || null)}
                    required
                  />
                  {uploadProgress.matricCert !== undefined && uploadProgress.matricCert < 100 && (
                    <p className="text-sm text-muted-foreground mt-1">Uploading: {uploadProgress.matricCert}%</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="qualificationCert">
                    Upload Qualification/Trade Certificate (PDF or Image) *
                  </Label>
                  <Input
                    id="qualificationCert"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange('qualificationCert', e.target.files?.[0] || null)}
                    required
                  />
                  {uploadProgress.qualificationCert !== undefined && uploadProgress.qualificationCert < 100 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Uploading: {uploadProgress.qualificationCert}%
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-brand-orange hover:bg-brand-orange/90"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>

            {registerMutation.isError && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  {registerMutation.error instanceof Error
                    ? registerMutation.error.message
                    : 'Failed to submit application. Please try again.'}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
