import React, { useState, useMemo } from 'react';
import { Calendar, Moon, Sparkles, BookOpen, Clock, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { getDynamicSunnahDates, sunnahHadiths, cuppingRulesAndPreparation } from '../data/sunnahCalendar';
import { DynamicSunnahDate } from '../types';

interface SunnahScheduleBannerProps {
  onSelectDateToBook: (dateStr: string) => void;
}

export const SunnahScheduleBanner: React.FC<SunnahScheduleBannerProps> = ({ onSelectDateToBook }) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'rules' | 'hadith'>('calendar');
  const [activeHadithIdx, setActiveHadithIdx] = useState(0);

  // Dynamic automatic calculation of upcoming sunnah dates
  const dynamicDates = useMemo(() => getDynamicSunnahDates(6), []);

  return (
    <section id="jadwal-sunnah" className="py-16 bg-emerald-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700 text-emerald-200 text-xs font-semibold mb-3">
            <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
            <span>Update Otomatis Tiap Bulan Kalender Hijriyyah</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Jadwal Hari Sunnah Bekam (17, 19, 21 Hijriyyah)
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Rasulullah SAW menganjurkan berbekam pada tanggal <strong>17, 19, dan 21</strong> setiap bulan Hijriyyah sebagai sarana kesembuhan berbagai penyakit. Kalender di bawah ini otomatis menghitung tanggal masehi terdekat.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-emerald-950/70 border border-emerald-800 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              📅 Tanggal Sunnah Terdekat
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              📋 Panduan Sebelum &amp; Sesudah
            </button>
            <button
              onClick={() => setActiveTab('hadith')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'hadith'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              📖 Dalil Hadits Shahih
            </button>
          </div>
        </div>

        {/* Tab 1: Calendar View with Automatic Dynamic Dates */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {dynamicDates.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-3xl p-6 border transition-all duration-300 ${
                    item.isNext
                      ? 'bg-gradient-to-b from-emerald-800 to-emerald-900 border-amber-400 shadow-2xl ring-2 ring-amber-400/30 transform md:-translate-y-1'
                      : 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-700'
                  }`}
                >
                  {item.isNext && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 font-black text-[10px] px-3.5 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      SUNNAH TERDEKAT ({item.daysUntil === 0 ? 'HARI INI' : `${item.daysUntil} Hari Lagi`})
                    </div>
                  )}

                  <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3 mb-4">
                    <span className="text-xs font-bold uppercase text-emerald-300 tracking-wider">
                      {item.dayName}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 font-medium">
                      {item.hijriMonthName} {item.hijriYear} H
                    </span>
                  </div>

                  <div className="text-center py-2">
                    <div className="text-4xl sm:text-5xl font-black text-amber-300 mb-1">
                      {item.hijriDay}
                    </div>
                    <div className="text-[11px] text-emerald-200 uppercase tracking-widest font-bold">
                      HIJRIYYAH
                    </div>
                    <div className="mt-4 pt-3 border-t border-emerald-800/60">
                      <p className="text-base sm:text-lg font-bold text-white">
                        {item.gregorianDate.toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-emerald-300/90 mt-1 line-clamp-2">
                        {item.significance}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectDateToBook(item.dateString)}
                    className="w-full mt-5 py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-600/60"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Booking Tanggal Ini</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Note banner */}
            <div className="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong>Catatan Bekam Darurat/Harian:</strong> Untuk keluhan mendadak (masuk angin parah, migrain mendadak, darah tinggi melonjak, pegal linu berat), berbekam diperbolehkan kapan saja setiap hari tanpa harus menunggu tanggal sunnah.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pre & Post Cupping Rules */}
        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-950/70 p-6 sm:p-8 rounded-3xl border border-emerald-800">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-amber-300 font-bold text-base border-b border-emerald-800 pb-2">
                <AlertCircle className="w-5 h-5" />
                <h3>Persiapan Sebelum Dibekam</h3>
              </div>
              <ul className="space-y-2.5">
                {cuppingRulesAndPreparation.beforeCupping.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-800 pt-6 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-base border-b border-emerald-800 pb-2">
                <CheckCircle className="w-5 h-5" />
                <h3>Pantangan &amp; Anjuran Sesudah Bekam</h3>
              </div>
              <ul className="space-y-2.5">
                {cuppingRulesAndPreparation.afterCupping.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Hadith Citations */}
        {activeTab === 'hadith' && (
          <div className="bg-emerald-950/70 p-6 sm:p-8 rounded-3xl border border-emerald-800 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              {sunnahHadiths.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHadithIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    activeHadithIdx === idx ? 'bg-amber-400 w-8' : 'bg-emerald-800'
                  }`}
                  aria-label={`Hadith ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-center space-y-4">
              <p className="font-arabic text-2xl sm:text-3xl text-amber-200 leading-loose py-2" dir="rtl">
                {sunnahHadiths[activeHadithIdx].textArabic}
              </p>
              <div className="h-px w-24 bg-emerald-700 mx-auto my-2" />
              <p className="text-sm sm:text-base text-emerald-100 italic font-medium max-w-2xl mx-auto leading-relaxed">
                "{sunnahHadiths[activeHadithIdx].translation}"
              </p>
              <p className="text-xs sm:text-sm font-bold text-amber-400 tracking-wider">
                {sunnahHadiths[activeHadithIdx].narrator}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
