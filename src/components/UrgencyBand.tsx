import { Clock, AlertTriangle } from "lucide-react";

export default function UrgencyBand() {
  return (
    <div className="bg-gold-500 py-3 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertTriangle size={15} className="text-ink-800 shrink-0" />
          <span className="text-sm font-bold text-ink-900">
            EU AI Act high-risk deadline: August 2026
          </span>
        </div>
        <span className="hidden sm:block text-ink-700">·</span>
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-ink-800 shrink-0" />
          <span className="text-sm text-ink-800">
            FCA Mills Review reports late 2026 — the first-mover window is now
          </span>
        </div>
      </div>
    </div>
  );
}
