import React from 'react';
import { ClipboardList, CheckCircle2, AlertTriangle, Clock, HeartHandshake, Utensils, Droplets, Moon, Sparkles, ShieldCheck } from 'lucide-react';
import { cuppingRulesAndPreparation } from '../data/sunnahCalendar';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CuppingGuidelinesProps {
  onOpenBooking: () => void;
}

export const CuppingGuidelines: React.FC<CuppingGuidelinesProps> = ({ onOpenBooking }) => {
  const beforeIcons = [
    <Utensils className="w-5 h-5 text-emerald-600 shrink-0" key="1" />,
    <Droplets className="w-5 h-5 text-emerald-600 shrink-0" key="2" />,
    <Moon className="w-5 h-5 text-emerald-600 shrink-0" key="3" />,
    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" key="4" />,
    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" key="5" />
  ];

  const afterIcons = [
    <Clock className="w-5 h-5 text-amber-600 shrink-0" key="1" />,
    <Droplets className="w-5 h-5 text-amber-600 shrink-0" key="2" />,
    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" key="3" />,
    <Utensils className="w-5 h-5 text-amber-600 shrink-0" key="4" />,
    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" key="5" />
  ];

  return (
    <section id="panduan-bekam" className="py-16 bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <ClipboardList className="w-4 h-4 text-emerald-700" />
            <span>Panduan Pasien Bekam</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
            Panduan Praktis Sebelum &amp; Sesudah Bekam
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Ikuti petunjuk sederhana ini agar sesi terapi bekam Anda berjalan aman, nyaman, dan memperoleh manfaat kesehatan yang maksimal.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Card 1: Persiapan Sebelum Dibekam */}
          <div className="bg-white rounded-3xl border-2 border-emerald-200/90 shadow-lg p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-emerald-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block">Langkah Persiapan</span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Sebelum Terapi Bekam</h3>
                </div>
              </div>

              <ul className="space-y-4">
                {cuppingRulesAndPreparation.beforeCupping.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 hover:bg-emerald-50 transition-colors">
                    <div className="p-2 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                      {beforeIcons[idx] || <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider block mb-0.5">
                        Poin #{idx + 1}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                        {rule}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100 text-xs text-emerald-800 font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Kondisi tubuh yang cukup istirahat dan rileks membuat sirkulasi darah lebih optimal.</span>
            </div>
          </div>

          {/* Card 2: Anjuran & Pantangan Sesudah Dibekam */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 shadow-lg p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-amber-100">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                  <AlertTriangle className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block">Perawatan &amp; Pantangan</span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Sesudah Terapi Bekam</h3>
                </div>
              </div>

              <ul className="space-y-4">
                {cuppingRulesAndPreparation.afterCupping.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-100/80 hover:bg-amber-50 transition-colors">
                    <div className="p-2 rounded-xl bg-white border border-amber-200 shadow-2xs">
                      {afterIcons[idx] || <AlertTriangle className="w-5 h-5 text-amber-600" />}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider block mb-0.5">
                        Poin #{idx + 1}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                        {rule}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 text-xs text-amber-900 font-medium flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Bekas kop adalah reaksi alami peredaran darah perifer yang sehat dan cepat pudar.</span>
            </div>
          </div>

        </div>

        {/* Bottom Fast Action Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold">Siap Menjalani Terapi Bekam Hari Ini?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Konsultasikan keluhan kesehatan Anda langsung kepada terapis bersertifikat kami.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Jadwalkan Terapi Bekam Sekarang</span>
          </button>
        </div>

      </div>
    </section>
  );
};
