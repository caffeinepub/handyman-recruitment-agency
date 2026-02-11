import { Wrench, Users, FileCheck, Clock, Shield, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Professional handyman recruitment services for clients and candidates. Sourcing, screening, and placement of skilled workers."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <SectionHeading className="text-center mb-4">Our Services</SectionHeading>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Comprehensive recruitment solutions for both clients and candidates
          </p>

          {/* For Clients */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Wrench className="h-6 w-6 text-brand-orange" />
              For Clients
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-brand-orange" />
                    Sourcing Skilled Workers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We source skilled and semi-skilled handymen across various trades to meet your
                    specific requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-brand-orange" />
                    Pre-Screening & Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All candidates undergo thorough document verification and screening before being
                    presented to clients.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-orange" />
                    Flexible Placements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We offer both temporary and permanent placement options to suit your business needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-brand-orange" />
                    Quality Assurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We ensure all candidates meet professional standards and have the necessary
                    qualifications.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-muted/30 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Trades We Recruit For:</h4>
              <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                  Plumbers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                  Electricians
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                  Carpenters
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                  Painters
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                  Welders
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                  General Maintenance Workers
                </li>
              </ul>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-brand-orange" />
              For Candidates
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Placement Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We connect you with quality employers looking for your specific skills and experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Simple online registration process to get your profile into our database and visible
                    to potential employers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Document Submission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Secure online document upload system for your CV, ID, certificates, and
                    qualifications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We verify your documents and qualifications to give you credibility with potential
                    employers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
