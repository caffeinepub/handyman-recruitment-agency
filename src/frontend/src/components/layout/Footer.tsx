import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'handyman-recruitment'
  );

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-brand-orange transition-colors">
                  Register as Handyman
                </Link>
              </li>
              <li>
                <Link to="/hire" className="hover:text-brand-orange transition-colors">
                  Hire a Handyman
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-orange transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:0712115763" className="hover:text-brand-orange transition-colors">
                  Phone: 0712115763
                </a>
              </li>
              <li>
                <a
                  href="mailto:hragency415@gmail.com"
                  className="hover:text-brand-orange transition-colors"
                >
                  Email: hragency415@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27712115763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  WhatsApp: 0712115763
                </a>
              </li>
              <li className="text-muted-foreground">Uitenhage & Gqeberha</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-brand-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Handyman Recruitment Agency. Built with{' '}
            <Heart className="h-4 w-4 text-brand-orange fill-brand-orange" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
