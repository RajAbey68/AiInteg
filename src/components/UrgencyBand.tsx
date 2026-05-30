import { Clock } from "lucide-react";

export default function UrgencyBand() {
  return (
    <div className="bg-amber-50 border-y border-amber-200 py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center">
        <Clock size={16} className="text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">The window is now.</span> The FCA's Mills Review
          reports late 2026. Before the regulatory picture clarifies, larger advisory firms
          haven't entered this market aggressively. Early community members shape the
          conversation.
        </p>
      </div>
    </div>
  );
}
