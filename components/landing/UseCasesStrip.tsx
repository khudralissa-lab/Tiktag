import {
  Briefcase,
  UtensilsCrossed,
  Star,
  Heart,
  Calendar,
  Building2,
} from "lucide-react";

const cases = [
  { icon: Briefcase, label: "Business Cards" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Star, label: "Creators" },
  { icon: Heart, label: "Clinics" },
  { icon: Calendar, label: "Events" },
  { icon: Building2, label: "Companies" },
];

export default function UseCasesStrip() {
  return (
    <div className="border-y border-white/[0.05] py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-white/20 text-[11px] font-semibold tracking-[0.18em] uppercase text-center mb-7">
          Built for every professional
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {cases.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-200"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
