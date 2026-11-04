import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';

interface TherapistLocationProps {
  onOpenBooking?: () => void;
}

export const TherapistLocation: React.FC<TherapistLocationProps> = () => {
  return (
    <section id="lokasi-rumah" className="py-14 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Langsung Judul Bersih & Langsung Peta Lokasi */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Lokasi Rumah Terapis
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Peta Lokasi Kediaman Terapis
          </h2>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-3 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 px-2 gap-2 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Titik Lokasi Rumah Terapis (Google Maps)</span>
            </div>
            <a
              href={THERAPIST_INFO.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Buka Petunjuk Arah di Google Maps ↗</span>
            </a>
          </div>

          <a
            href={THERAPIST_INFO.gmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-80 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden border border-slate-200 group cursor-pointer"
            title="Klik peta untuk membuka rute langsung di Google Maps"
          >
            <iframe
              title="Peta Lokasi Terapi Bekam Bogor"
              src="https://maps.google.com/maps?q=-6.5707973,106.6064241&hl=id&z=16&output=embed"
              width="100%"
              height="100%"
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
            />
            {/* Click to open overlay */}
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/25 transition-all flex items-end justify-center pb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-xl border border-slate-200 group-hover:scale-105 transition-transform">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Klik Peta untuk Buka Rute Langsung di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </span>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
