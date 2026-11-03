import React from 'react';
import { ShieldCheck, Sparkles, MapPin, CheckCircle2, Calendar, Star, Calculator, ArrowRight, UserCheck } from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreCalculator }) => {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-8 pb-14 lg:pt-12 lg:pb-20">
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{THERAPIST_INFO.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
              Terapi Bekam Steril &amp; Sunnah{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                Panggilan di Bogor
              </span>
            </h1>

            {/* Clarification on Clinic & Home visiting */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Menghidupkan Thibbun Nabawi untuk kebugaran tubuh, meredakan migrain, kolesterol, pegal pundak &amp; pinggang. <strong>Karena belum buka klinik</strong>, kami fokus melayani panggilan ke rumah pasien, adapun jika ingin <strong>datang langsung ke rumah terapis di Leuwisadeng sangat dipersilakan (bebas biaya transport)</strong>.
            </p>

            {/* Gender restriction alert */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-900 shadow-2xs">
              <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Sementara ini hanya tersedia untuk ikhwan (laki-laki)</span>
            </div>

            {/* Key Trust Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 text-left">Jarum 1x Pakai</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 text-left">{THERAPIST_INFO.certification}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 text-left">Transport Rp 1.500/km (PP)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreCalculator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Hitung Biaya Transport &amp; Pesan Bekam</span>
              </button>
              
              <a
                href={THERAPIST_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            {/* Location tag */}
            <div className="pt-2 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rumah Terapis: {THERAPIST_INFO.address}</span>
            </div>
          </div>

          {/* Right Column: Pricing & Hadith Card with Official Logo */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-3.5 py-1 rounded-bl-xl tracking-wider uppercase">
                TARIF RESMI
              </div>

              {/* Logo & Brand preview */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <img
                  src="/logo.png"
                  alt="Emblem Bekam Bogor"
                  className="w-14 h-14 object-contain drop-shadow-sm"
                />
                <div>
                  <h3 className="font-black text-lg text-slate-900 leading-tight">Bekam Bogor</h3>
                  <p className="text-xs text-emerald-700 font-bold">{THERAPIST_INFO.certification}</p>
                  <p className="text-[11px] text-slate-400">Khusus Ikhwan (Laki-laki)</p>
                </div>
              </div>

              {/* Hadith */}
              <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 text-center">
                <p className="font-arabic text-lg sm:text-xl text-emerald-950 font-bold mb-1 dir-rtl" dir="rtl">
                  خَيْرُ مَا تَدَاوَيْتُمْ بِهِ الْحِجَامَةُ
                </p>
                <p className="text-xs text-emerald-900 font-medium italic">
                  "Sebaik-baik pengobatan yang kalian gunakan untuk berobat adalah berbekam."
                </p>
                <p className="text-[10px] text-emerald-700 font-bold mt-1">
                  (HR. Al-Bukhari &amp; Muslim)
                </p>
              </div>

              {/* 3 Price Highlights */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Bekam Kering + Seluncur</h4>
                    <p className="text-[11px] text-slate-500">Tanpa sayatan jarum, relaksasi otot</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-emerald-700">Rp 85.000</span>
                    <span className="text-[10px] text-slate-400 block">+ transport</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-300 flex items-center justify-between ring-1 ring-emerald-500/20">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-slate-900">Bekam Basah Punggung</h4>
                      <span className="text-[9px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.2 rounded">FAVORIT</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Titik sunnah Al-Kahil &amp; belikat</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-emerald-700">Rp 110.000</span>
                    <span className="text-[10px] text-slate-400 block">+ transport</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Bekam Basah Full Body</h4>
                    <p className="text-[11px] text-slate-500">Titik lengkap kepala s.d kaki</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-emerald-700">Rp 135.000</span>
                    <span className="text-[10px] text-slate-400 block">+ transport</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={onExploreCalculator}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Buka Fitur Hitung Biaya Transport</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
