import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, Calculator, ArrowRight, UserCheck } from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';
import { sunnahHadiths } from '../data/sunnahCalendar';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreCalculator }) => {
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);

  // Auto-slide Hadith every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHadithIndex((prev) => (prev + 1) % sunnahHadiths.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeHadith = sunnahHadiths[currentHadithIndex];

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
              <span>{THERAPIST_INFO.tagline} • Bogor dan Sekitarnya</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Terapi Bekam Steril &amp; Sunnah{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                Panggilan di Bogor
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Menghidupkan Thibbun Nabawi untuk kebugaran tubuh, meredakan migrain, kolesterol, pegal pundak &amp; pinggang. Kami melayani panggilan <strong>Home Care</strong> untuk wilayah <strong>Bogor dan Sekitarnya</strong>, dan jika ingin <strong>datang langsung ke rumah terapis sangat dipersilakan</strong>.
            </p>

            {/* Gender restriction alert (temporary status until akhwat therapist available) */}
            <div className="inline-flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-amber-900 shadow-2xs text-left">
              <UserCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Khusus Pasien Ikhwan (Laki-laki)</span>
                <span className="text-xs text-amber-800">*Bersifat sementara waktu, insya Allah ke depan tersedia terapis akhwat (perempuan)</span>
              </div>
            </div>

            {/* Key Trust Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 text-left">Jarum 1x Pakai Steril</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 text-left">Praktisi Berpengalaman &amp; Bersanad</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <Calculator className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 text-left">Hitung Transport Transparan</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={onExploreCalculator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>Hitung Biaya Transport Otomatis</span>
              </button>
              
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Reservasi Terapi Bekam</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pricing & Hadith Card with Official Logo */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-black px-4 py-1 rounded-bl-xl tracking-wider uppercase">
                TARIF RESMI
              </div>

              {/* Logo & Brand preview */}
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <img
                  src="/logo.png"
                  alt="Emblem Bekam Bogor"
                  width={60}
                  height={60}
                  className="w-14 h-14 object-contain drop-shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-black text-xl text-slate-900 leading-tight">Bekam Bogor</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs sm:text-sm text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Praktisi Bersertifikat Resmi
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Wilayah Layanan: Bogor dan Sekitarnya</p>
                </div>
              </div>

              {/* Hadith - Fixed Height (h-[185px]) to ELIMINATE ANY LAYOUT SHIFT OR JUMPING */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-center relative overflow-hidden h-[185px] flex flex-col justify-between">
                <div key={currentHadithIndex} className="animate-in fade-in duration-300 flex-1 flex flex-col justify-center">
                  <p className="font-arabic text-lg sm:text-xl text-emerald-950 font-semibold mb-1 dir-rtl line-clamp-2 leading-relaxed tracking-wide" dir="rtl">
                    {activeHadith.textArabic}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-900 font-medium italic leading-relaxed line-clamp-2">
                    "{activeHadith.translation}"
                  </p>
                  <p className="text-xs text-emerald-700 font-bold mt-1">
                    ({activeHadith.narrator})
                  </p>
                </div>

                {/* Hadith Slider Indicators (Every 3s) */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {sunnahHadiths.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentHadithIndex(idx)}
                      aria-label={`Slide Hadits ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentHadithIndex === idx ? 'w-6 bg-emerald-600' : 'w-2 bg-emerald-300/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 3 Packages Highlights */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Bekam Kering + Seluncur</h4>
                    <p className="text-xs text-slate-500">Pijat pemanasan, tanpa sayatan jarum</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-emerald-800">Rp 65.000</span>
                    <span className="text-[11px] text-slate-400 block">+ transport</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-300 flex items-center justify-between ring-1 ring-emerald-500/20">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">Bekam Basah Punggung</h4>
                      <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.2 rounded">FAVORIT</span>
                    </div>
                    <p className="text-xs text-slate-500">7 - 11 titik sunnah Al-Kahil &amp; belikat</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-emerald-800">Rp 100.000</span>
                    <span className="text-[11px] text-slate-400 block">+ transport</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Bekam Basah Full Body</h4>
                    <p className="text-xs text-slate-500">15 - 17 titik full body hingga kaki</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-emerald-800">Rp 125.000</span>
                    <span className="text-[11px] text-slate-400 block">+ transport</span>
                  </div>
                </div>
              </div>

              {/* Reservasi Terapi Bekam Button */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reservasi Terapi Bekam</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
