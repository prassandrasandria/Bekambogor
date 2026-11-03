import React from 'react';
import { MapPin, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { THERAPIST_INFO, servicePackages } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline with Official Logo */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo Bekam Bogor"
                className="w-12 h-12 object-contain drop-shadow-sm"
              />
              <span className="font-black text-xl text-white tracking-tight">
                Bekam<span className="text-emerald-400">Bogor</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>{THERAPIST_INFO.tagline}</strong> di wilayah Bogor &amp; sekitarnya. Melayani panggilan ke rumah pasien atau terapi langsung di rumah terapis di Leuwisadeng. Khusus Ikhwan (Laki-laki).
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{THERAPIST_INFO.certification}</span>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Paket Layanan</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {servicePackages.map(pkg => (
                <li key={pkg.id}>
                  <a href="#paket-layanan" className="hover:text-emerald-400 transition-colors">
                    {pkg.name} (Rp {pkg.price.toLocaleString('id-ID')})
                  </a>
                </li>
              ))}
              <li>
                <a href="#kalkulator-transport" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Hitung Biaya Transport (Rp 1.500/km PP)
                </a>
              </li>
              <li>
                <a href="#jadwal-sunnah" className="hover:text-emerald-400 transition-colors">
                  Jadwal Bekam Sunnah (Update Tiap Bulan)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Lokasi Rumah Terapis</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{THERAPIST_INFO.address}</span>
              </div>
              <a
                href={THERAPIST_INFO.gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-semibold text-xs"
              >
                <span>Buka Titik Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-[11px] text-slate-500 pt-1">
                * {THERAPIST_INFO.clinicStatus}
              </p>
            </div>
          </div>

          {/* Col 4: Contacts without exposing raw digits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kontak Langsung</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Buka Setiap Hari: 08.00 - 21.00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Khusus Pasien Ikhwan (Pria)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={THERAPIST_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright - aligned to the left */}
        <div className="pt-6 border-t border-slate-900 text-xs text-slate-500 space-y-2 text-left">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-slate-400">Disclaimer:</strong> Terapi bekam (hijamah) adalah ikhtiar pengobatan komplementer sunnah Nabawi yang telah diakui khasiatnya. Ditangani langsung oleh {THERAPIST_INFO.certification} khusus ikhwan (laki-laki).
          </p>
          <p className="text-slate-500 pt-1 font-medium">
            &copy; 2026 Bekam Bogor.
          </p>
        </div>
      </div>
    </footer>
  );
};
