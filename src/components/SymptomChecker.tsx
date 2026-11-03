import React, { useState } from 'react';
import { Activity, CheckCircle, ArrowRight, Lightbulb, Stethoscope } from 'lucide-react';
import { symptomGuideData } from '../data/faqAndTestimonials';

interface SymptomCheckerProps {
  onSelectSymptomForBooking: (symptomName: string, suggestedPackage: string) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSelectSymptomForBooking }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const currentItem = symptomGuideData[selectedIdx];

  return (
    <section id="cek-keluhan" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
            Asesmen Mandiri &amp; Rekomendasi Titik
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Apa Keluhan Kesehatan yang Sedang Anda Rasakan?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Pilih keluhan tubuh Anda di bawah ini untuk melihat titik bekam yang tepat, khasiat klinis yang diharapkan, serta rekomendasi paket terapi.
          </p>
        </div>

        {/* Symptoms Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {symptomGuideData.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-700 to-emerald-800 border-emerald-400 shadow-xl ring-2 ring-emerald-400/40 transform -translate-y-0.5'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {item.category}
                  </span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-emerald-300" />}
                </div>
                <h4 className={`text-xs sm:text-sm font-bold leading-snug ${
                  isSelected ? 'text-white' : 'text-slate-200'
                }`}>
                  {item.symptom}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Symptom Detailed Card */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                  Analisa Keluhan Terpilih:
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentItem.symptom}
                </h3>
              </div>

              {/* Recommended Points */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Titik Bekam yang Ditargetkan:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentItem.recommendedPoints.map((point, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold text-xs sm:text-sm flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical explanation tip */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-amber-300">Penjelasan Terapis:</strong> {currentItem.tip}
                </p>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 bg-gradient-to-br from-emerald-900/90 to-teal-950 p-6 rounded-2xl border border-emerald-700/80 text-center space-y-4">
              <div>
                <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                  Rekomendasi Paket:
                </p>
                <p className="text-lg font-bold text-white mt-1">
                  {currentItem.suggestedPackage}
                </p>
              </div>

              <button
                onClick={() => onSelectSymptomForBooking(currentItem.symptom, currentItem.suggestedPackage)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Konsultasikan Keluhan Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-emerald-300/80">
                Data keluhan akan otomatis terisi pada formulir konsultasi
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
