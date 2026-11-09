import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, Calculator, ArrowRight, UserCheck, Calendar, Moon } from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';
import { sunnahHadiths, getDynamicSunnahDates } from '../data/sunnahCalendar';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCalculator: () => void;
  onSelectDateToBook?: (dateStr: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreCalculator, onSelectDateToBook }) => {
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);

  // Auto-slide Hadith every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHadithIndex((prev) => (prev + 1) % sunnahHadiths.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeHadith = sunnahHadiths[currentHadithIndex];
  const dynamicDates = useMemo(() => getDynamicSunnahDates(3), []);

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
            <div className="hero-fade-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{THERAPIST_INFO.tagline} • Bogor dan Sekitarnya</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-fade-2 text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Terapi Bekam Steril &amp; Sunnah{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                Panggilan di Bogor
              </span>
            </h1>

            {/* Description */}
            <p className="hero-fade-3 text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Menghidupkan Thibbun Nabawi untuk kebugaran tubuh, meredakan migrain, kolesterol, pegal pundak &amp; pinggang. Kami melayani panggilan <strong>Home Care</strong> untuk wilayah <strong>Bogor dan Sekitarnya</strong>, dan jika ingin <strong>datang langsung ke rumah terapis sangat dipersilakan</strong>.
            </p>

            {/* Gender restriction alert (temporary status until akhwat therapist available) */}
            <div className="hero-fade-3 inline-flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-amber-900 shadow-2xs text-left">
              <UserCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Khusus Pasien Ikhwan (Laki-laki)</span>
                <span className="text-xs text-amber-800">*Bersifat sementara waktu, insya Allah ke depan tersedia terapis akhwat (perempuan)</span>
              </div>
            </div>

            {/* Key Trust Guarantees */}
            <div className="hero-fade-4 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 text-left">Jarum 1x Pakai Steril</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 text-left">Praktisi Berpengalaman &amp; Bersanad</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1 hover:border-emerald-300 transition-colors">
                <Calculator className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 text-left">Hitung Transport Transparan</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-fade-5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
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

          {/* Right Column: Jadwal Tanggal Sunnah & Hadith Card */}
          <div id="jadwal-sunnah" className="lg:col-span-5 hero-fade-card scroll-mt-24">
            <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-xl p-5 sm:p-7 space-y-4 sm:space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[11px] font-black px-3.5 py-1 rounded-bl-xl tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
                <Moon className="w-3 h-3 text-amber-300" />
                <span>HARI SUNNAH</span>
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

              {/* 3 Tanggal Sunnah Terdekat (17, 19, 21 Hijriyyah) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Jadwal Hari Sunnah Bekam</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    17, 19, 21 Hijriyyah
                  </span>
                </div>

                {dynamicDates.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (onSelectDateToBook) {
                        onSelectDateToBook(item.dateString);
                      } else {
                        onOpenBooking();
                      }
                    }}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                      item.isNext
                        ? 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border-emerald-400 shadow-xs ring-1 ring-emerald-500/30'
                        : 'bg-slate-50/90 border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                        item.isNext
                          ? 'bg-emerald-700 text-amber-300 border-emerald-600 shadow-2xs'
                          : 'bg-white text-emerald-800 border-slate-200'
                      }`}>
                        <span className="text-sm sm:text-base font-black leading-none">{item.hijriDay}</span>
                        <span className="text-[8px] font-extrabold uppercase tracking-tight">HIJRI</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                            {item.gregorianDate.toLocaleDateString('id-ID', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </h4>
                          {item.isNext && (
                            <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded uppercase">
                              {item.daysUntil === 0 ? 'Hari Ini' : `${item.daysUntil} hari lagi`}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.dayName}, {item.hijriDay} {item.hijriMonthName} {item.hijriYear} H
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-700 group-hover:text-white bg-white group-hover:bg-emerald-700 px-2 sm:px-2.5 py-1 rounded-lg border border-emerald-200 group-hover:border-emerald-700 shadow-2xs transition-all">
                        <span>Pilih</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Booking Button for Sunnah Schedule */}
              <button
                type="button"
                onClick={() => {
                  const nextDate = dynamicDates.find((d) => d.isNext) || dynamicDates[0];
                  if (onSelectDateToBook && nextDate) {
                    onSelectDateToBook(nextDate.dateString);
                  } else {
                    onOpenBooking();
                  }
                }}
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Booking Tanggal Sunnah Terdekat</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                *Keluhan mendadak (masuk angin, migrain, pegal linu berat) boleh dibekam kapan saja tanpa harus menunggu tanggal sunnah.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
