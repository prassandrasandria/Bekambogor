import React from 'react';
import { Check, Clock, Sparkles, UserCheck, ArrowRight, Car } from 'lucide-react';
import { servicePackages } from '../data/treatments';
import { ServicePackage } from '../types';

interface ServicesSectionProps {
  onSelectPackage: (pkg: ServicePackage) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectPackage }) => {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="paket-layanan" className="py-16 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Tarif Resmi &amp; Transparan
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Pilihan Paket Terapi Bekam
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Dikerjakan langsung oleh terapis bersertifikat dan bersanad untuk wilayah <strong>Bogor dan Sekitarnya</strong>. Bebas biaya transport jika datang langsung ke rumah terapis di Leuwisadeng.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {servicePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl bg-white border flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                pkg.isPopular
                  ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/20 md:-translate-y-1'
                  : 'border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md'
              }`}
            >
              {pkg.isPopular && (
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold uppercase tracking-wider py-1.5 px-4 text-center shadow-xs">
                  ★ Paling Banyak Dipilih
                </div>
              )}

              <div className="p-6 sm:p-7 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                      {pkg.cupCount}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {pkg.durationMinutes} menit
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900">
                      {formatRupiah(pkg.price)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      + transport
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 text-xs text-slate-700">
                  <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Rincian &amp; Fasilitas Terapi:
                  </p>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended For */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Cocok Untuk Keluhan:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.recommendedFor.map((rec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.isPopular
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Reservasi Paket Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transport policy banner */}
        <div className="mt-10 bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Ketentuan Biaya Transport Panggilan</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Biaya transport dihitung secara adil dan transparan dari Kp. Leuwisadeng ke rumah pasien. Jika pasien datang langsung ke rumah terapis, <strong>bebas biaya transport (gratis)</strong>.
              </p>
            </div>
          </div>
          <a
            href="#kalkulator-transport"
            className="shrink-0 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors"
          >
            Hitung Biaya Transport →
          </a>
        </div>

      </div>
    </section>
  );
};
