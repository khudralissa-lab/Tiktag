import Link from "next/link";
import { Zap } from "lucide-react";

const links: Record<string, string[]> = {
  Products: [
    "NFC Business Cards",
    "NFC Table Tags",
    "NFC Stickers",
    "Review Tags",
    "Wi-Fi Tags",
  ],
  Solutions: [
    "For Creators",
    "For Businesses",
    "For Restaurants",
    "For Events",
    "For Clinics",
  ],
  Company: ["Pricing", "Contact", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">tiktag</span>
            </Link>
            <p className="text-white/25 text-sm leading-relaxed max-w-[180px]">
              Smart NFC + digital identity platform for people and businesses.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/30 hover:text-white/60 text-sm transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2025 Tiktag. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/20 hover:text-white/50 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
