import { Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ayush Das. All rights reserved.
          </p>
          <a
            href="https://linkedin.com/in/ayushdas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
