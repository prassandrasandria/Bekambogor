import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { TransportCalculator } from './components/TransportCalculator';
import { PhotoCarousel } from './components/PhotoCarousel';
import { ServicesSection } from './components/ServicesSection';
import { SunnahScheduleBanner } from './components/SunnahScheduleBanner';
import { TherapistLocation } from './components/TherapistLocation';
import { InteractiveBodyMap } from './components/InteractiveBodyMap';
import { HygieneProtocols } from './components/HygieneProtocols';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { ServicePackage } from './types';
import { THERAPIST_INFO } from './data/treatments';
import { Calendar, UserCheck, ChevronUp } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [bookingServiceType, setBookingServiceType] = useState<'panggilan' | 'ke_rumah_terapis'>('panggilan');
  const [bookingDistanceKm, setBookingDistanceKm] = useState<number>(5);
  const [bookingAddress, setBookingAddress] = useState<string | undefined>(undefined);
  const [bookingDate, setBookingDate] = useState<string | undefined>(undefined);
  const [bookingSymptom, setBookingSymptom] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll reveal animations for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    setBookingPackageId(pkg.id);
    setIsBookingOpen(true);
  };

  const handleSelectDateToBook = (dateStr: string) => {
    setBookingDate(dateStr);
    setIsBookingOpen(true);
  };

  const handleSelectPointForBooking = (pointName: string) => {
    setBookingSymptom(`Fokus terapi titik: ${pointName}`);
    setIsBookingOpen(true);
  };

  const handleSelectBookingWithDetails = (
    packageId: string,
    serviceType: 'panggilan' | 'ke_rumah_terapis',
    distanceKm: number,
    address?: string
  ) => {
    setBookingPackageId(packageId);
    setBookingServiceType(serviceType);
    setBookingDistanceKm(distanceKm);
    if (address) {
      setBookingAddress(address);
    }
    setIsBookingOpen(true);
  };

  const handleExploreCalculator = () => {
    handleNavigate('kalkulator-transport');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col lg:flex-row selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Desktop Sticky Left Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Area (Offset for Desktop Sticky Sidebar) */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col overflow-x-hidden">
        
        {/* Top Header / Announcement Bar - Clean without redundant WhatsApp button */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 lg:static z-20 shadow-2xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="font-semibold text-emerald-800">{THERAPIST_INFO.tagline}</span>
              <span className="hidden md:inline text-slate-400">•</span>
              <span className="hidden md:inline text-slate-500">{THERAPIST_INFO.clinicStatus}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Bogor &amp; Sekitarnya
              </span>
            </div>
          </div>
        </header>

        {/* Main Body Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onOpenBooking={handleOpenBooking}
            onExploreCalculator={handleExploreCalculator}
          />

          {/* Transport & Distance Calculator Section */}
          <div className="scroll-reveal">
            <TransportCalculator
              onSelectBookingWithDetails={handleSelectBookingWithDetails}
            />
          </div>

          {/* Photo Documentation Carousel with Real Cupping Images */}
          <div className="scroll-reveal">
            <PhotoCarousel />
          </div>

          {/* Services & Exact 3 Packages */}
          <div className="scroll-reveal">
            <ServicesSection onSelectPackage={handleSelectPackage} />
          </div>

          {/* Automatic Dynamic Monthly Hijri Sunnah Dates */}
          <div className="scroll-reveal">
            <SunnahScheduleBanner onSelectDateToBook={handleSelectDateToBook} />
          </div>

          {/* Dedicated Therapist Home Location Section with Embedded Map */}
          <div className="scroll-reveal">
            <TherapistLocation onOpenBooking={handleOpenBooking} />
          </div>

          {/* Interactive Cupping Points Silhouette Guide */}
          <div className="scroll-reveal">
            <InteractiveBodyMap onSelectPointForBooking={handleSelectPointForBooking} />
          </div>

          {/* Hygiene, Hospital-grade Sterilization & Sanad */}
          <div className="scroll-reveal">
            <HygieneProtocols />
          </div>

          {/* Testimonials & FAQs */}
          <div className="scroll-reveal">
            <TestimonialsFaq />
          </div>
        </main>

        {/* Footer */}
        <Footer onOpenBooking={handleOpenBooking} />

      </div>

      {/* Booking Modal (Mandatory validation: Nama, Usia, Phone, Alamat) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId={bookingPackageId}
        initialServiceType={bookingServiceType}
        initialDistanceKm={bookingDistanceKm}
        initialDate={bookingDate}
        initialSymptom={bookingSymptom}
        initialAddress={bookingAddress}
      />

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Kembali ke atas"
        className={`fixed z-40 transition-all duration-300 rounded-2xl bg-emerald-700/90 hover:bg-emerald-800 text-white shadow-xl hover:shadow-2xl border border-emerald-500/30 p-3 flex items-center justify-center cursor-pointer backdrop-blur-xs hover:scale-110 active:scale-95 ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        } bottom-20 right-4 lg:bottom-8 lg:right-8`}
        title="Kembali ke atas"
      >
        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Mobile Sticky Bottom Action Bar - Text changed to 'Booking Jadwal' to fit cleanly without line breaks */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 shadow-xl flex items-center justify-between gap-3">
        <div className="text-left shrink-0">
          <p className="text-[11px] font-bold text-emerald-800">Bekam Bogor</p>
          <p className="text-[10px] text-slate-500 font-semibold">Spesialis Bekam Panggilan</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleOpenBooking}
            className="p-2.5 rounded-xl bg-emerald-700 text-white shadow-xs hover:bg-emerald-800 cursor-pointer"
            aria-label="Chat WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
          </button>
          <button
            type="button"
            onClick={handleOpenBooking}
            className="py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Booking Jadwal</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
