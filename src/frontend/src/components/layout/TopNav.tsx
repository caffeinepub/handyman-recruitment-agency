import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '../Brand/Logo';
import LoginButton from '../auth/LoginButton';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/register', label: 'Register' },
  { path: '/hire', label: 'Hire' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/admin', label: 'Admin' }
];

export default function TopNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-10 w-auto" />
          <span className="hidden font-bold text-lg sm:inline-block">
            Handyman Recruitment Agency
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                location.pathname === link.path ? 'text-brand-orange' : 'text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LoginButton />
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-brand-orange ${
                    location.pathname === link.path ? 'text-brand-orange' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                <LoginButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
