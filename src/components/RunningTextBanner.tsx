import React from 'react';
import { Sparkles, HeartPulse } from 'lucide-react';

export const RunningTextBanner: React.FC = () => {
  const marqueeItems = [
    {
      brand: 'Bekam Aswaja Bogor',
      text: 'Melayani bekam panggilan untuk wilayah Bogor dan sekitarnya, menyediakan kebutuhan peralatan terapi, dan menjual madu & obat herbal alami'
    },
    {
      brand: 'Bekam Aswaja Bogor',
      text: 'Melayani bekam panggilan untuk wilayah Bogor dan sekitarnya, menyediakan kebutuhan peralatan terapi, dan menjual madu & obat herbal alami'
    },
    {
      brand: 'Bekam Aswaja Bogor',
      text: 'Melayani bekam panggilan untuk wilayah Bogor dan sekitarnya, menyediakan kebutuhan peralatan terapi, dan menjual madu & obat herbal alami'
    }
  ];

  return (
    <div
      role="region"
      aria-label="Pengumuman Layanan Bekam Aswaja Bogor"
      className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white border-b-2 border-emerald-700/80 relative overflow-hidden py-3.5 sm:py-4.5 lg:py-5 min-h-[58px] sm:min-h-[68px] flex items-center shadow-md select-none group"
    >
      {/* Soft gradient edge fade masks on left and right for smooth appearance/exit */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-28 bg-gradient-to-r from-emerald-950 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-28 bg-gradient-to-l from-teal-950 to-transparent z-10"
      />

      {/* Marquee Track: Calm, slow-scrolling dual sets for seamless loop */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {marqueeItems.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center shrink-0">
              <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-800/95 text-amber-300 font-black text-sm sm:text-base tracking-wide border border-emerald-600/90 shadow-sm">
                <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 animate-pulse" />
                <span>{item.brand}</span>
              </span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-emerald-50 ml-3 sm:ml-4 tracking-normal drop-shadow-xs">
                {item.text}
              </span>
              <span className="mx-8 sm:mx-12 text-amber-400 font-bold flex items-center gap-1.5" aria-hidden="true">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 inline" />
                <span className="text-amber-300 text-sm sm:text-base">•</span>
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Exact clone for seamless loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center shrink-0">
              <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-800/95 text-amber-300 font-black text-sm sm:text-base tracking-wide border border-emerald-600/90 shadow-sm">
                <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 animate-pulse" />
                <span>{item.brand}</span>
              </span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-emerald-50 ml-3 sm:ml-4 tracking-normal drop-shadow-xs">
                {item.text}
              </span>
              <span className="mx-8 sm:mx-12 text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 inline" />
                <span className="text-amber-300 text-sm sm:text-base">•</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
