import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { INITIAL_TRANSFER_PROOFS, TransferProof } from '../data/transferProofs';

interface TransferProofCarouselProps {
  proofs?: TransferProof[];
  title?: string;
  subtitle?: string;
}

export const TransferProofCarousel: React.FC<TransferProofCarouselProps> = ({
  proofs = INITIAL_TRANSFER_PROOFS,
  title,
  subtitle
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = proofs.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Preload adjacent images
  useEffect(() => {
    if (totalSlides === 0) return;
    const nextIdx = (currentIndex + 1) % totalSlides;
    const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
    const img1 = new Image();
    img1.src = proofs[nextIdx].imageUrl;
    const img2 = new Image();
    img2.src = proofs[prevIdx].imageUrl;
  }, [currentIndex, totalSlides, proofs]);

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

  // Touch swipe support without any page displacement
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (totalSlides === 0) return null;

  const currentSlide = proofs[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Optional Title */}
      {title && (
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Clean Main Viewport - Completely clean without text overlay */}
      <div
        className="relative w-full max-w-md sm:max-w-lg mx-auto rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-200 aspect-[3/4] sm:aspect-[4/5] max-h-[560px] select-none cursor-pointer flex items-center justify-center p-2.5 sm:p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setIsLightboxOpen(true)}
        title="Klik untuk memperbesar struk"
      >
        <img
          src={currentSlide.imageUrl}
          alt={`Struk bukti transaksi ${currentIndex + 1} dari ${totalSlides}`}
          width={800}
          height={1100}
          className="w-full h-full object-contain rounded-2xl select-none transition-opacity duration-300"
        />

        {/* Minimal clean floating navigation buttons */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer shadow-xl border border-white/20"
          aria-label="Foto Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer shadow-xl border border-white/20"
          aria-label="Foto Selanjutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Clean Slide Indicator & Counter */}
      <div className="flex items-center justify-between px-2 pt-3 text-xs text-slate-500 font-semibold max-w-md sm:max-w-lg mx-auto">
        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          Struk {currentIndex + 1} dari {totalSlides}
        </span>
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Perbesar</span>
        </button>
      </div>

      {/* Thumbnail Strip (Clean, without auto-scrolling window) */}
      <div className="flex gap-2 overflow-x-auto pb-2 pt-2 scrollbar-thin mt-1 scroll-smooth max-w-md sm:max-w-lg mx-auto">
        {proofs.map((proof, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={proof.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`p-1 rounded-xl border transition-all cursor-pointer shrink-0 bg-white ${
                isActive
                  ? 'border-emerald-600 ring-2 ring-emerald-500/50 scale-105 shadow-md'
                  : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
              }`}
              aria-label={`Lihat struk ${idx + 1}`}
            >
              <img
                src={proof.imageUrl}
                alt={`Thumbnail ${idx + 1}`}
                width={56}
                height={70}
                className="w-12 h-14 sm:w-14 sm:h-16 rounded-lg object-cover object-top bg-slate-100"
              />
            </button>
          );
        })}
      </div>

      {/* Clean Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="flex items-center justify-between text-white max-w-4xl w-full mx-auto pb-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-300">
              Bukti Transaksi ({currentIndex + 1} dari {totalSlides})
            </span>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center relative max-w-4xl w-full mx-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.imageUrl}
              alt={`Struk transaksi ${currentIndex + 1}`}
              className="max-h-[82vh] max-w-[95vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl select-none"
            />

            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              aria-label="Selanjutnya"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          <div className="text-center text-xs text-slate-400 pt-2">
            Tekan Esc atau klik area kosong untuk menutup
          </div>
        </div>
      )}
    </div>
  );
};
