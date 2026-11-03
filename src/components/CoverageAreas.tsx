import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Home, Building2, Check, Phone } from 'lucide-react';
import { bogorCoverageDistricts, THERAPIST_INFO } from '../data/treatments';

interface CoverageAreasProps {
  onSelectDistrictToBook: (districtName: string) => void;
}

export const CoverageAreas: React.FC<CoverageAreasProps> = ({ onSelectDistrictToBook }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(bogorCoverageDistricts[0]);

  return (
    <section id="area-bogor" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Jangkauan Layanan Se-Bogor Raya
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Siap Datang ke Rumah (Homecare) &amp; Kunjungan Klinik
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Tim terapis kami tersebar strategis di berbagai titik wilayah Bogor Kota dan sekitarnya untuk respon cepat dan kenyamanan Anda sekeluarga.
          </p>
        </div>

        {/* 2 Modes Comparison (Klinik vs Homecare) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          {/* Card 1: Homecare */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Paling Praktis
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Layanan Panggilan ke Rumah (Homecare)</h3>
                <p className="text-xs text-slate-500 mt-1">Anda cukup beristirahat di rumah, terapis kami yang datang lengkap dengan semua perlengkapan.</p>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Terapis membawa matras terapi lipat khusus &amp; alas perlak steril</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cocok untuk lansia, pasien pasca-stroke, atau ibu menyusui</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bisa request terapis ikhwan &amp; akhwat sekaligus untuk suami-istri</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bebas macet dan antre di jalan</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onSelectDistrictToBook(selectedDistrict.name)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Pesan Bekam Panggilan Sekarang</span>
              </button>
            </div>
          </div>

          {/* Card 2: Datang ke Rumah Terapis */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase mb-1">
                  Bebas Biaya Transport (Rp 0)
                </div>
                <h3 className="text-xl font-bold text-slate-900">Datang ke Rumah Terapis</h3>
                <p className="text-xs text-slate-500 mt-1">Belum buka klinik, namun jika ingin terapi datang langsung ke rumah terapis sangat dipersilakan.</p>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Gratis Biaya Transport (Rp 0):</strong> Hanya bayar paket bekam yang dipilih</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Khusus Ikhwan (Laki-laki):</strong> Praktisi bersertifikat dan bersanad</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Ruang Terapi Bersih &amp; Nyaman:</strong> Jarum baru steril 1x pakai</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Lokasi:</strong> Kp. Leuwisadeng RT 01 RW 03, Kec. Leuwisadeng, Kab. Bogor</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={THERAPIST_INFO.gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Petunjuk Arah Google Maps ke Rumah Terapis</span>
              </a>
            </div>
          </div>

        </div>

        {/* Coverage District Cards Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Daftar Kecamatan Jangkauan Homecare Bogor</h3>
              <p className="text-xs text-slate-500">Estimasi kedatangan terapis terhitung sejak konfirmasi jadwal disepakati</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Aktif Setiap Hari (08:00 - 20:00 WIB)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {bogorCoverageDistricts.map((district: { name: string; areas: string; etaMinutes: string }) => {
              const isSelected = selectedDistrict.name === district.name;
              return (
                <div
                  key={district.name}
                  onClick={() => setSelectedDistrict(district)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-sm text-slate-900">{district.name}</h4>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {district.etaMinutes}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {district.areas}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-600 font-semibold">Terapis Tersedia</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDistrictToBook(district.name);
                      }}
                      className="text-[11px] font-bold text-slate-900 hover:text-emerald-700"
                    >
                      Pilih Area Ini →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
