import React, { useState } from 'react';
import { Sparkles, Info, BookOpen, HeartPulse, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { cuppingPointsData } from '../data/cuppingPoints';
import { CuppingPoint } from '../types';

interface InteractiveBodyMapProps {
  onSelectPointForBooking: (pointName: string) => void;
}

export const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({ onSelectPointForBooking }) => {
  const [selectedPoint, setSelectedPoint] = useState<CuppingPoint>(cuppingPointsData[0]); // default Al-Kahil
  const [activeView, setActiveView] = useState<'posterior' | 'head'>('posterior');

  const visiblePoints = cuppingPointsData.filter(p => {
    if (activeView === 'head') {
      return p.bodyView === 'head' || p.id.startsWith('al-akhdaain') || p.id === 'al-kahil';
    }
    return p.bodyView === 'posterior';
  });

  return (
    <section id="titik-bekam" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
            Anatomi Sunnah &amp; Titik Medis Tubuh
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Peta Titik Bekam Interaktif
            <span className="block text-emerald-700 text-2xl sm:text-3xl font-bold mt-1">
              (Punggung &amp; Kepala)
            </span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Klik titik-titik pada tubuh di bawah ini untuk mempelajari nama sunnah Arab, dalil hadits, serta manfaat medis klinisnya.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveView('posterior')}
              className={`px-5 py-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'posterior'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Titik Punggung (Al-Kahil, Belikat, Pinggang)
            </button>
            <button
              onClick={() => setActiveView('head')}
              className={`px-5 py-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'head'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Titik Kepala &amp; Leher (Ummu Mughits, Urat Leher)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Anatomy Silhouette Canvas */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center relative shadow-sm">
            <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-700">
                {activeView === 'posterior' ? 'Tampak Belakang (Posterior)' : 'Tampak Atas & Leher (Kranial)'}
              </span>
              <span className="text-emerald-700 font-medium">Klik lingkaran untuk info</span>
            </div>

            {/* Visual Body Canvas with SVG and Point Pins */}
            <div className="relative w-full max-w-[340px] aspect-[1/1.5] flex items-center justify-center">
              
              {/* Silhouette SVG */}
              {activeView === 'posterior' ? (
                <svg className="w-full h-full text-slate-300 drop-shadow-sm" viewBox="0 0 200 320" fill="currentColor">
                  {/* Head & Neck */}
                  <path d="M100 20 C112 20 120 30 120 44 C120 56 112 64 100 64 C88 64 80 56 80 44 C80 30 88 20 100 20 Z" />
                  {/* Neck */}
                  <path d="M92 64 L108 64 L112 76 L88 76 Z" />
                  {/* Shoulders & Torso */}
                  <path d="M88 76 C70 78 45 92 40 120 L48 180 L56 180 L54 135 L68 135 L66 210 C66 220 72 230 84 230 L116 230 C128 230 134 220 134 210 L132 135 L146 135 L144 180 L152 180 L160 120 C155 92 130 78 112 76 Z" />
                  {/* Spine line subtle */}
                  <line x1="100" y1="76" x2="100" y2="225" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                  {/* Pelvis & Legs */}
                  <path d="M84 230 L74 300 L90 300 L98 245 L102 245 L110 300 L126 300 L116 230 Z" />
                </svg>
              ) : (
                <svg className="w-full h-full text-slate-300 drop-shadow-sm" viewBox="0 0 200 320" fill="currentColor">
                  {/* Cranial Top View */}
                  <ellipse cx="100" cy="80" rx="60" ry="70" fill="currentColor" opacity="0.85" />
                  {/* Ears */}
                  <ellipse cx="36" cy="85" rx="8" ry="16" />
                  <ellipse cx="164" cy="85" rx="8" ry="16" />
                  {/* Neck lines */}
                  <path d="M75 140 C75 180 65 210 50 240 L150 240 C135 210 125 180 125 140 Z" />
                  {/* Shoulders */}
                  <path d="M50 240 C35 250 20 270 20 300 L180 300 C180 270 165 250 150 240 Z" />
                </svg>
              )}

              {/* Hotspots */}
              {visiblePoints.map((point) => {
                const isSelected = selectedPoint.id === point.id;
                return (
                  <button
                    key={point.id}
                    onClick={() => setSelectedPoint(point)}
                    style={{
                      left: `${point.coords.x}%`,
                      top: `${point.coords.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-10 group cursor-pointer p-1 transition-all ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                    }`}
                    title={point.indonesianName}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      {/* Pulse effect if selected or sunnah */}
                      {isSelected && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full text-[10px] font-bold shadow-md transition-colors ${
                          isSelected
                            ? 'h-7 w-7 bg-emerald-600 text-white ring-2 ring-white ring-offset-2 ring-offset-emerald-600'
                            : point.sunnahStatus
                            ? 'h-6 w-6 bg-amber-500 hover:bg-amber-600 text-white'
                            : 'h-6 w-6 bg-teal-600 hover:bg-teal-700 text-white'
                        }`}
                      >
                        {point.sunnahStatus ? '★' : '•'}
                      </span>
                    </span>

                    {/* Point Mini Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-slate-900 text-white text-[10px] font-semibold rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                      {point.indonesianName}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="w-full mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-center gap-6 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span>Titik Sunnah Hadits (★)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-600 inline-block"></span>
                <span>Titik Medis Terapi (•)</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Point Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            {/* Header of Point - Neatly aligned, clean spacing without cramming */}
            <div className="border-b border-slate-100 pb-5 space-y-3">
              {/* Badge & Arabic Name Row - Responsive layout preventing overflow */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-2xs ${
                    selectedPoint.sunnahStatus
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-teal-100 text-teal-900 border border-teal-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{selectedPoint.sunnahStatus ? 'Titik Sunnah Nabawi' : 'Titik Medis Anatomi'}</span>
                </span>

                {/* Pure Arabic Script with proper styling and overflow protection */}
                <div className="bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/80">
                  <span className="font-arabic text-xl sm:text-2xl font-bold text-emerald-800 tracking-wide" dir="rtl">
                    {selectedPoint.arabicName}
                  </span>
                </div>
              </div>

              {/* Point Name in Indonesian */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {selectedPoint.indonesianName}
                </h3>
              </div>

              {/* Anatomical Position Box */}
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950">Letak Anatomi: </span>
                  <span className="text-slate-700">{selectedPoint.location}</span>
                </div>
              </div>
            </div>

            {/* Hadith Citation if available */}
            {selectedPoint.hadithReference && (
              <div className="my-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  Rujukan Dalil / Sunnah:
                </div>
                <p className="italic leading-relaxed">
                  "{selectedPoint.hadithReference}"
                </p>
              </div>
            )}

            {/* Medical Benefits */}
            <div className="space-y-4 my-5">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-emerald-600" />
                Manfaat &amp; Khasiat Klinis:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedPoint.medicalBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indications & Symptoms */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Indikasi Keluhan Pasien:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedPoint.indications.map((ind, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Cautions */}
            {selectedPoint.cautions && (
              <div className="mt-4 p-3 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500 shrink-0" />
                <span><strong>Catatan Terapis:</strong> {selectedPoint.cautions}</span>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Tertarik membekam titik ini saat sesi terapi Anda?
              </p>
              <button
                onClick={() => onSelectPointForBooking(selectedPoint.indonesianName)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <span>Minta Titik {selectedPoint.indonesianName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
