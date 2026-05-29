import { useState } from "react";
import { Menu, X } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity"; // placeholder — update when community is live

const navLinks = [
  { label: "Who it's for", href: "#who" },
  { label: "How it works", href: "#how" },
  { label: "Community", href: "#community" },
  { label: "The Book", href: "#book" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-semibold text-slate-900 text-lg tracking-tight">
            AI Integrity
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-brand-600 transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
          >
            Join the community
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-700 font-medium text-sm"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold text-center"
            onClick={() => setOpen(false)}
          >
            Join the community
          </a>
        </div>
      )}
    </header>
  );
}
