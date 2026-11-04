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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Tarif Resmi &amp; Transparan
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Pilihan Paket Terapi Bekam
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Dikerjakan langsung oleh terapis bersertifikat dan bersanad untuk wilayah <strong>Bogor dan Sekitarnya</strong>. Bebas biaya transport jika datang langsung ke rumah terapis.
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
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold uppercase tracking-wider py-2 px-4 text-center shadow-xs">
                  ★ Paling Banyak Dipilih
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                      {pkg.cupCount}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {pkg.durationMinutes} menit
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      {formatRupiah(pkg.price)}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      + transport
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 text-sm text-slate-700">
                  <p className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                    Rincian &amp; Fasilitas Terapi:
                  </p>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended For */}
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Cocok Untuk Keluhan:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.recommendedFor.map((rec, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
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

      </div>
    </section>
  );
};
