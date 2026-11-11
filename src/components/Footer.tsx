import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';

interface FooterProps {
  onOpenBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-10 pb-40 sm:pb-44 lg:pb-12 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo Bekam Bogor"
              width={42}
              height={42}
              className="w-10 h-10 object-contain drop-shadow-sm"
            />
            <div>
              <span className="font-black text-lg text-white tracking-tight block">
                Bekam<span className="text-emerald-400">Bogor</span>
              </span>
              <p className="text-xs text-slate-400">{THERAPIST_INFO.tagline}</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/50 w-fit">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{THERAPIST_INFO.certification}</span>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 text-xs sm:text-sm text-slate-400 space-y-3 text-left">
          <p className="max-w-3xl leading-relaxed text-slate-400">
            <strong className="text-slate-300">Disclaimer:</strong> Terapi bekam (hijamah) adalah ikhtiar pengobatan komplementer sunnah yang telah diakui khasiatnya. Ditangani langsung oleh praktisi bekam bersertifikat resmi dengan standar sterilitas tinggi.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-slate-900 text-slate-400 font-medium">
            <p>
              &copy; {new Date().getFullYear()} Bekam Bogor. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>Wilayah Layanan: Bogor dan Sekitarnya</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

