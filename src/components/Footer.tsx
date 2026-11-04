import React from 'react';
import { MapPin, Clock, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { THERAPIST_INFO, servicePackages } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-44 sm:pb-48 lg:pb-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline with Official Logo */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo Bekam Bogor"
                width={48}
                height={48}
                className="w-12 h-12 object-contain drop-shadow-sm"
              />
              <span className="font-black text-xl text-white tracking-tight">
                Bekam<span className="text-emerald-400">Bogor</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>{THERAPIST_INFO.tagline}</strong> di wilayah Bogor &amp; sekitarnya. Melayani layanan Home Care se-Bogor Barat, Dramaga, Ciampea, Cibungbulang, Leuwiliang, atau terapi langsung di rumah terapis. Khusus Ikhwan (Laki-laki).
            </p>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{THERAPIST_INFO.certification}</span>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Paket Layanan &amp; Navigasi</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {servicePackages.map(pkg => (
                <li key={pkg.id}>
                  <a href="#paket-layanan" className="hover:text-emerald-400 transition-colors">
                    {pkg.name} (Rp {pkg.price.toLocaleString('id-ID')})
                  </a>
                </li>
              ))}
              <li>
                <a href="#kalkulator-transport" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hitung Biaya Transport (Otomatis)</span>
                </a>
              </li>
              <li>
                <a href="#jadwal-sunnah" className="hover:text-emerald-400 transition-colors">
                  Jadwal Bekam Sunnah Nabawi (Tiap Bulan)
                </a>
              </li>
              {/* SEMENTARA DI-KOMENTAR SESUAI PERMINTAAN USER:
              <li>
                <a href="#profil-terapis" className="hover:text-emerald-400 transition-colors">
                  Profil &amp; Sertifikasi Terapis
                </a>
              </li>
              */}
              <li>
                <a href="#titik-bekam" className="hover:text-emerald-400 transition-colors">
                  Peta Titik Bekam Anatomi
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Lokasi Rumah Terapis (Clean without repetitive kampung text per Screenshot 2) */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lokasi Rumah Terapis</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <a
                href={THERAPIST_INFO.gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm bg-slate-900 border border-emerald-900/60 p-3 rounded-xl transition-colors w-full"
              >
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Buka Titik Google Maps ↗</span>
              </a>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                Melayani Panggilan <strong>Home Care</strong> &amp; Terapi Langsung di Rumah Terapis (Bebas Biaya Transport).
              </p>
            </div>
          </div>

          {/* Col 4: Contacts & WhatsApp Button */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kontak Langsung</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Buka Setiap Hari: 08.00 - 21.00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Peralatan Steril 1x Pakai</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Reservasi Terapi Bekam</span>
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 text-xs sm:text-sm text-slate-500 space-y-3 text-left">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-slate-400">Disclaimer:</strong> Terapi bekam (hijamah) adalah ikhtiar pengobatan komplementer sunnah Nabawi yang telah diakui khasiatnya. Ditangani langsung oleh praktisi bekam bersertifikat resmi Thibbun Nabawi dengan standar sterilitas tinggi.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-900 text-slate-500 font-medium">
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
