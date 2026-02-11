import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/27712115763"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40"
      aria-label="Chat on WhatsApp"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    </a>
  );
}
