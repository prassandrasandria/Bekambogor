import React from 'react';
import {
  Store,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Truck,
  Package,
  CheckCircle2,
  Flame,
  Star
} from 'lucide-react';

export const TherapyEquipmentBanner: React.FC = () => {
  const shopUrl = 'https://collshp.com/bekamaswaja';

  const productHighlights = [
    { label: 'Kop Bekam Tebal & Presisi' },
    { label: 'Pen Lancet Otomatis (Gold/Silver)' },
    { label: 'Jarum Lancet Steril Medis' },
    { label: 'Minyak Herba But-But & Zaitun' },
    { label: 'Safety Box Medis & Antiseptik' },
  ];

  return (
    <aside aria-label="Banner Toko Alat Terapi" className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white border-b border-emerald-700/50 shadow-lg">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] opacity-10 [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left Content Area */}
          <div className="space-y-3 max-w-3xl">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-current text-rose-600 animate-pulse" />
                <span>Pusat Alat Terapi Resmi • Bekam Aswaja</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Standar Praktisi &amp; Klinis</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Rating 4.9/5</span>
              </span>
            </div>

            {/* Headline & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Toko Alat Terapi &amp; Perlengkapan Bekam Lengkap</span>
                <Sparkles className="w-5 h-5 text-amber-300 shrink-0 hidden sm:inline" />
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Sedia kop bekam tebal anti-pecah, pen lancet gold, jarum steril medis, pompa hisap silikon, minyak terapi herba, hingga perlengkapan sterilisasi klinis. Kualitas teruji, harga bersahabat, siap kirim ke seluruh Indonesia.
              </p>
            </div>

            {/* Product Highlight Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {productHighlights.map((prod) => (
                <a
                  key={prod.label}
                  href={shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 border border-emerald-600/40 text-[11px] sm:text-xs font-medium transition-colors"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{prod.label}</span>
                </a>
              ))}
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs text-emerald-200/90 pt-1 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Pengiriman Cepat (Bisa COD / Ekspedisi)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Packing Bubble Wrap Tebal &amp; Aman</span>
              </span>
            </div>

          </div>

          {/* Right Action / CTA Box */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            <a
              href={shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-400/25 hover:shadow-xl hover:shadow-amber-400/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group text-center"
              title="Buka Toko Alat Terapi Lengkap (collshp.com/bekamaswaja)"
            >
              <Store className="w-5 h-5 text-slate-950 shrink-0" />
              <span>Buka Toko Alat Terapi</span>
              <ExternalLink className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>

            <div className="text-center lg:text-right">
              <span className="text-[11px] text-emerald-300/80 font-medium">
                🌐 Katalog Resmi: <strong className="text-white underline">collshp.com/bekamaswaja</strong>
              </span>
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
};
