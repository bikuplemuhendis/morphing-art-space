import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/905312427762"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
