import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Camera, X, Maximize2 } from 'lucide-react';
import { carouselSlidesData } from '../data/faqAndTestimonials';

export const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalSlides = carouselSlidesData.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Snappy auto-play interval: 4 seconds (not slow, buttery smooth)
  useEffect(() => {
    if (isPaused || isLightboxOpen) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isLightboxOpen, handleNext]);

  // Auto scroll active thumbnail inside its horizontal container ONLY (never affects page/window scroll)
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    const activeThumb = thumbnailRefs.current[currentIndex];
    if (activeThumb && container) {
      const containerWidth = container.clientWidth;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.clientWidth;
      const targetScrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Preload adjacent images in browser cache so switching is 100% instant without lag
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % totalSlides;
    const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
    const preloadImg1 = new Image();
    preloadImg1.src = carouselSlidesData[nextIdx].imageSrc;
    const preloadImg2 = new Image();
    preloadImg2.src = carouselSlidesData[prevIdx].imageSrc;
  }, [currentIndex, totalSlides]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  // Touch swipe support for smooth mobile interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = carouselSlidesData[currentIndex];

  return (
    <section id="dokumentasi-foto" className="py-14 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            Dokumentasi Praktik
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Galeri Kegiatan &amp; Dokumentasi Terapi Bekam
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Foto asli pelaksanaan terapi bekam panggilan dan peralatan higienis. Klik foto untuk melihat ukuran utuh resolusi tinggi.
          </p>
        </div>

        {/* Main Carousel Viewport - Clean, ZERO text overlay on image, hardware accelerated */}
        <div
          className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-200 aspect-[4/3] sm:aspect-[16/9] max-h-[520px] select-none cursor-pointer transform-gpu"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsLightboxOpen(true)}
          title="Klik foto untuk melihat ukuran utuh"
        >
          {/* Active Image with Pre-rendered Clean Frame & smooth crossfade */}
          <img
            src={currentSlide.imageSrc}
            alt="Dokumentasi Terapi Bekam Bogor"
            width={1200}
            height={675}
            decoding="async"
            className="w-full h-full object-cover transition-opacity duration-300 ease-out"
          />

          {/* Clean Top Corner Indicators */}
          <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold shadow-md">
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>{currentIndex + 1} / {totalSlides}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium shadow-md">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ukuran Penuh</span>
            </span>
          </div>

          {/* Left Arrow Navigation */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-95 cursor-pointer shadow-lg"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Navigation */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-95 cursor-pointer shadow-lg"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Bar with Clean Counter & Swipe Note */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/90 text-[11px] font-medium shadow-sm">
              Geser foto untuk melihat {totalSlides} dokumentasi
            </span>
          </div>
        </div>

        {/* Thumbnail Strip: Lightweight, smooth scrolling container */}
        <div
          ref={thumbnailContainerRef}
          className="flex gap-2 overflow-x-auto pb-2 pt-3 scrollbar-thin mt-2 scroll-smooth"
        >
          {carouselSlidesData.map((slide, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={slide.id}
                ref={(el) => {
                  thumbnailRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`p-0.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'border-emerald-600 ring-2 ring-emerald-500/40 scale-105 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100'
                }`}
                aria-label={`Pilih foto ${idx + 1}`}
              >
                <img
                  src={slide.imageSrc}
                  alt={`Thumbnail ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
                />
              </button>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal (Lihat Ukuran Utuh) */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white max-w-6xl w-full mx-auto pb-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Dokumentasi Bekam ({currentIndex + 1} dari {totalSlides})</span>
            </div>
            
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Tutup ukuran penuh"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Image in Full Natural Proportions */}
          <div
            className="flex-1 flex items-center justify-center relative max-w-6xl w-full mx-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.imageSrc}
              alt="Foto Dokumentasi Terapi Bekam Penuh"
              className="max-h-[82vh] max-w-[95vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl select-none"
            />

            {/* Lightbox Nav: Left */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Lightbox Nav: Right */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Bottom helper text */}
          <div className="text-center text-xs text-slate-400 pt-2">
            Gunakan tombol panah atau geser layar untuk melihat foto lainnya • Tekan Esc atau klik area kosong untuk menutup
          </div>
        </div>
      )}

    </section>
  );
};
