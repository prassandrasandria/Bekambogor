import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, Sparkles, ShieldCheck } from 'lucide-react';
import { carouselSlidesData } from '../data/faqAndTestimonials';

export const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselSlidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselSlidesData.length) % carouselSlidesData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselSlidesData.length);
  };

  const currentSlide = carouselSlidesData[currentIndex];

  return (
    <section id="dokumentasi-foto" className="py-14 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            Dokumentasi Praktik
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Galeri Kegiatan &amp; Dokumentasi Terapi Bekam
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Foto nyata pelaksanaan terapi bekam panggilan dan peralatan higienis yang digunakan. Setiap prosedur dilakukan secara tertib, teliti, dan sesuai sunnah.
          </p>
        </div>

        {/* Main Carousel Wrapper */}
        <div
          className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-200 aspect-[16/9] max-h-[520px] group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Active Image */}
          <img
            key={currentSlide.id}
            src={currentSlide.imageSrc}
            alt={currentSlide.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
          />

          {/* Dark gradient overlay for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          {/* Top badge */}
          <div className="absolute top-5 left-5 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {currentSlide.badge}
            </span>
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-6 left-6 right-6 z-20 max-w-2xl text-white space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-sm">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow-sm line-clamp-2">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
            {carouselSlidesData.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Selector Below Carousel */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
          {carouselSlidesData.map((slide, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-2 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <img
                  src={slide.imageSrc}
                  alt={slide.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="overflow-hidden hidden sm:block">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{slide.title}</h4>
                  <span className="text-[10px] text-emerald-700 font-semibold">{slide.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
