import React from 'react';
import { MapPin, Navigation, Home, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

export const TherapistLocation: React.FC = () => {
  return (
    <section id="lokasi-rumah" className="py-16 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Alamat &amp; Titik Lokasi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Lokasi Rumah Terapis Bekam
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Karena saat ini <strong>belum membuka klinik</strong>, terapis fokus melayani <strong>Bekam Panggilan</strong> ke rumah pasien. Adapun jika Anda ingin terapi dan datang langsung ke rumah terapis di Leuwisadeng, sangat dipersilakan dengan <strong>bebas biaya transport (gratis biaya transport)</strong>.
          </p>
        </div>

        {/* Location Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Alamat Lengkap
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {THERAPIST_INFO.address}
                </h3>
              </div>

              {/* Perks of visiting therapist home */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ketentuan Kunjungan ke Rumah Terapis:
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Bebas Biaya Transport:</strong> Pasien hanya membayar tarif paket bekam yang dipilih (Rp 85rb / 110rb / 135rb).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Ruangan Khusus Ikhwan:</strong> Disediakan tempat terapi khusus pria yang bersih, tenang, dan tertutup.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Konfirmasi Jadwal Terlebih Dahulu:</strong> Harap membuat janji via WhatsApp sebelum berkunjung agar terapis standby di rumah.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={THERAPIST_INFO.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Petunjuk Arah Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={THERAPIST_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right Information Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 to-teal-950 text-white p-6 sm:p-8 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300">
                  <MapPin className="w-7 h-7" />
                </div>
                
                <div>
                  <h4 className="text-lg font-bold">Kecamatan Leuwisadeng, Bogor</h4>
                  <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                    Siap melayani panggilan bekam ke berbagai area sekitar: Leuwisadeng, Leuwiliang, Cibungbulang, Nanggung, Ciampea, Dramaga, hingga Bogor Kota.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs space-y-1">
                  <p className="font-semibold text-emerald-200">Layanan Terapis Resmi:</p>
                  <p className="text-sm font-bold text-white">Khusus Ikhwan (Laki-laki)</p>
                  <p className="text-[11px] text-emerald-300">Praktisi Bersertifikat dan Bersanad</p>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={THERAPIST_INFO.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Buka Titik di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Embedded Interactive Google Map clickable directly to Google Maps */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden p-3 sm:p-4">
          <div className="flex items-center justify-between pb-3 px-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Peta Titik Lokasi: Terapi Bekam Bogor (Kp. Leuwisadeng)</span>
            </div>
            <a
              href={THERAPIST_INFO.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
            >
              <span>Buka di Google Maps ↗</span>
            </a>
          </div>

          <a
            href={THERAPIST_INFO.gmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 group cursor-pointer"
            title="Klik peta untuk membuka titik tujuan di Google Maps"
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
