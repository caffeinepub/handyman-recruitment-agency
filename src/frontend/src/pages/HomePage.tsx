import { Link } from '@tanstack/react-router';
import { CheckCircle2, Users, Briefcase, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '../components/Brand/Logo';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="Professional handyman recruitment services in Uitenhage and Gqeberha. Connect skilled workers with quality opportunities."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-navy to-background py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-8">
            <Logo className="h-32 w-auto md:h-40" />
            <SectionHeading level={1} className="text-white max-w-3xl">
              Professional Handyman Recruitment Services
            </SectionHeading>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Connecting skilled and semi-skilled handymen with quality job opportunities in Uitenhage
              and Gqeberha. Your trusted partner for recruitment excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                <Link to="/register">Register as a Handyman</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white hover:bg-white/90">
                <Link to="/hire">Hire a Handyman</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-brand-orange py-6">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-6 text-white text-sm md:text-base">
            <a href="tel:0712115763" className="hover:underline font-medium">
              📞 0712115763
            </a>
            <a href="https://wa.me/27712115763" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
              💬 WhatsApp
            </a>
            <a href="mailto:hragency415@gmail.com" className="hover:underline font-medium">
              ✉️ hragency415@gmail.com
            </a>
            <a
              href="https://www.facebook.com/HandymanRecruitmentAgency"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium"
            >
              📘 Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Operating Locations */}
      <section className="py-8 bg-muted/30">
        <div className="container text-center">
          <p className="text-lg font-medium">
            <span className="text-muted-foreground">Operating in:</span>{' '}
            <span className="text-brand-orange font-bold">Uitenhage</span> &{' '}
            <span className="text-brand-orange font-bold">Gqeberha</span>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading className="text-center mb-12">How It Works</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="font-bold text-xl mb-3">1. Register</h3>
                <p className="text-muted-foreground">
                  Handymen register online with their skills, experience, and documents. Quick and easy
                  process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="font-bold text-xl mb-3">2. Verify</h3>
                <p className="text-muted-foreground">
                  We screen and verify all documents to ensure quality and professionalism for our
                  clients.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="font-bold text-xl mb-3">3. Connect</h3>
                <p className="text-muted-foreground">
                  We match qualified handymen with clients looking for skilled workers. Win-win for
                  everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionHeading className="text-center mb-12">Why Choose Us</SectionHeading>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Pre-Screened Candidates</h3>
                <p className="text-muted-foreground">
                  All handymen are verified with proper documentation and qualifications.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Fast Placement</h3>
                <p className="text-muted-foreground">
                  Quick turnaround time to match the right candidate with the right job.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Local Expertise</h3>
                <p className="text-muted-foreground">
                  Deep understanding of the Uitenhage and Gqeberha job markets.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Professional Service</h3>
                <p className="text-muted-foreground">
                  Committed to quality, reliability, and excellent customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <div className="container text-center">
          <SectionHeading level={2} className="text-white mb-6">
            Ready to Get Started?
          </SectionHeading>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're looking for work or looking to hire, we're here to help. Get in touch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-brand-navy hover:bg-white/90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
