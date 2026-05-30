import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import { CTA_LABEL } from "@/lib/waitlist";

const navLinks = [
  { label: "Why community", href: "#why" },
  { label: "Your sector", href: "#sectors" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "The Book", href: "#book" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ink-900/97 backdrop-blur-md shadow-lg shadow-ink-950/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gold-500 flex items-center justify-center">
              <span className="text-ink-900 font-serif font-bold text-sm leading-none">AI</span>
            </div>
            <span className="font-serif font-semibold text-white text-lg tracking-tight">
              AI Integrity
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-200 hover:text-gold-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <button
              onClick={() => setModal(true)}
              className="px-4 py-2 rounded border border-gold-500 text-gold-400 text-sm font-semibold hover:bg-gold-500 hover:text-ink-900 transition-all"
            >
              {CTA_LABEL}
            </button>
          </div>

          <button
            className="md:hidden p-2 text-ink-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-ink-900 border-t border-ink-700 px-6 py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ink-200 font-medium text-sm hover:text-gold-400 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); setModal(true); }}
              className="mt-2 px-4 py-2.5 rounded border border-gold-500 text-gold-400 text-sm font-semibold text-center hover:bg-gold-500 hover:text-ink-900 transition-all"
            >
              {CTA_LABEL}
            </button>
          </div>
        )}
      </header>

      <WaitlistModal open={modal} onClose={() => setModal(false)} source="navigation" />
    </>
  );
}
