import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Privacy policy for Handyman Recruitment Agency. Learn how we collect, use, and protect your personal information."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <SectionHeading className="mb-8">Privacy Policy</SectionHeading>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">1. Introduction</h3>
              <p>
                Handyman Recruitment Agency ("we", "us", "our") is committed to protecting your privacy
                and complying with the Protection of Personal Information Act (POPIA) in South Africa.
                This Privacy Policy explains how we collect, use, store, and protect your personal
                information.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">2. Information We Collect</h3>
              <p>We collect the following types of personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>From Candidates:</strong> Full name, ID number, contact details (phone, email,
                  physical address), trade/skill information, years of experience, work areas, CV, ID
                  copy, Matric certificate, and qualification/trade certificates.
                </li>
                <li>
                  <strong>From Clients:</strong> Full name, company name (if applicable), contact details
                  (phone, email), service requirements, location, and job descriptions.
                </li>
                <li>
                  <strong>From Contact Forms:</strong> Name, contact details, and message content.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h3>
              <p>We use your personal information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process candidate registrations and job applications</li>
                <li>To match candidates with suitable job opportunities</li>
                <li>To verify qualifications and documents</li>
                <li>To respond to client enquiries and recruitment requests</li>
                <li>To communicate with you about job opportunities or recruitment services</li>
                <li>To maintain our database of candidates and clients</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">4. Document Handling</h3>
              <p>
                All documents uploaded to our platform (CVs, ID copies, certificates) are stored securely
                and are only accessible to authorized administrators. We do not share your documents with
                third parties without your explicit consent, except when presenting your profile to
                potential employers as part of our recruitment service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">5. Data Storage and Security</h3>
              <p>
                Your personal information is stored on secure servers. We implement appropriate technical
                and organizational measures to protect your data against unauthorized access, loss, or
                misuse. However, no method of transmission over the internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">6. Data Retention</h3>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes
                outlined in this policy, or as required by law. Candidate profiles remain active in our
                database until you request removal. Client enquiries are retained for record-keeping and
                service improvement purposes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">7. Your Rights</h3>
              <p>Under POPIA, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to the processing of your information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">8. Sharing of Information</h3>
              <p>
                We do not sell, rent, or trade your personal information. We may share your information
                with potential employers only as part of our recruitment service and with your implied
                consent through registration. We may also disclose information if required by law or to
                protect our rights.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">9. Consent</h3>
              <p>
                By submitting your information through our website, you consent to the collection, use,
                and storage of your personal information as described in this Privacy Policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">10. Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this
                page with an updated "Last Updated" date.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">11. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights,
                please contact us:
              </p>
              <ul className="list-none space-y-1">
                <li>
                  <strong>Phone:</strong> 0712115763
                </li>
                <li>
                  <strong>Email:</strong> hragency415@gmail.com
                </li>
                <li>
                  <strong>Operating Areas:</strong> Uitenhage and Gqeberha
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
