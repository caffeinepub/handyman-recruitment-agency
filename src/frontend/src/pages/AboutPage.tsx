import { Target, Eye, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Handyman Recruitment Agency - our mission, vision, and commitment to connecting skilled workers with quality opportunities."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <SectionHeading className="text-center mb-12">About Us</SectionHeading>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground text-center">
              Handyman Recruitment Agency is a professional recruitment service specializing in
              connecting skilled and semi-skilled handymen with quality employment opportunities in
              Uitenhage and Gqeberha. We bridge the gap between talented workers and employers who need
              reliable, qualified professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-brand-orange" />
                  Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide efficient, professional recruitment services that connect skilled handymen
                  with employers, creating opportunities for growth and success for both parties.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-6 w-6 text-brand-orange" />
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the leading handyman recruitment agency in the Eastern Cape, known for
                  quality, reliability, and professional excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-brand-orange" />
                  Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We are committed to maintaining the highest standards of professionalism, integrity,
                  and quality in all our recruitment services.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/30 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Why Work With Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Local Expertise:</strong> Deep understanding of the Uitenhage and Gqeberha job
                  markets
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Thorough Screening:</strong> All candidates are pre-screened and verified
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Fast Service:</strong> Quick turnaround times for placements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Professional Standards:</strong> Commitment to quality and excellence in every
                  placement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Personalized Service:</strong> We take time to understand both client and
                  candidate needs
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
