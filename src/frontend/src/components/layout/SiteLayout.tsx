import { Outlet } from '@tanstack/react-router';
import TopNav from './TopNav';
import Footer from './Footer';
import WhatsAppFloatingButton from '../WhatsAppFloatingButton';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
