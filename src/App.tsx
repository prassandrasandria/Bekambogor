import React, { useState } from 'react';
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
import { Calendar, UserCheck } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [bookingServiceType, setBookingServiceType] = useState<'panggilan' | 'ke_rumah_terapis'>('panggilan');
  const [bookingDistanceKm, setBookingDistanceKm] = useState<number>(5);
  const [bookingDate, setBookingDate] = useState<string | undefined>(undefined);
  const [bookingSymptom, setBookingSymptom] = useState<string | undefined>(undefined);

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
    distanceKm: number
  ) => {
    setBookingPackageId(packageId);
    setBookingServiceType(serviceType);
    setBookingDistanceKm(distanceKm);
    setIsBookingOpen(true);
  };

  const handleExploreCalculator = () => {
    handleNavigate('kalkulator-transport');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col lg:flex-row selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Desktop Sticky Left Sidebar (Driacom Style) */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area (Offset for Desktop Sticky Sidebar) */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col overflow-x-hidden">
        
        {/* Top Header / Announcement Bar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 lg:static z-20 shadow-2xs">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="font-semibold text-emerald-800">{THERAPIST_INFO.tagline}</span>
              <span className="hidden md:inline text-slate-400">•</span>
              <span className="hidden md:inline text-slate-500">{THERAPIST_INFO.clinicStatus}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Khusus Ikhwan</span>
              </span>

              <a
                href={THERAPIST_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-1.5 rounded-lg shadow-2xs transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>Chat WhatsApp</span>
              </a>
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
          <TransportCalculator
            onSelectBookingWithDetails={handleSelectBookingWithDetails}
          />

          {/* Photo Documentation Carousel */}
          <PhotoCarousel />

          {/* Services & Exact 3 Packages */}
          <ServicesSection onSelectPackage={handleSelectPackage} />

          {/* Automatic Dynamic Monthly Hijri Sunnah Dates */}
          <SunnahScheduleBanner onSelectDateToBook={handleSelectDateToBook} />

          {/* Dedicated Therapist Home Location Section with Embedded Map */}
          <TherapistLocation />

          {/* Interactive Cupping Points Silhouette Guide */}
          <InteractiveBodyMap onSelectPointForBooking={handleSelectPointForBooking} />

          {/* Hygiene, Hospital-grade Sterilization & Sanad */}
          <HygieneProtocols />

          {/* Testimonials & FAQs */}
          <TestimonialsFaq />
        </main>

        {/* Footer */}
        <Footer onOpenBooking={handleOpenBooking} />

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId={bookingPackageId}
        initialServiceType={bookingServiceType}
        initialDistanceKm={bookingDistanceKm}
        initialDate={bookingDate}
        initialSymptom={bookingSymptom}
      />

      {/* Floating Action Button (WhatsApp Quick Connect) - Moved higher on mobile to prevent overlapping with bottom bar */}
      <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40">
        <a
          href={THERAPIST_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Chat WhatsApp"
        >
          <div className="relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <WhatsAppIcon className="w-5 h-5 relative z-10 text-white" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide hidden sm:inline">
            Chat WhatsApp
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 shadow-xl flex items-center justify-between gap-3">
        <div className="text-left">
          <p className="text-[11px] font-bold text-emerald-800">Bekam Bogor</p>
          <p className="text-[10px] text-slate-500">Khusus Ikhwan • Rp 1.500/km PP</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={THERAPIST_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-700 text-white shadow-xs hover:bg-emerald-800"
            aria-label="Chat WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
          </a>
          <button
            onClick={handleOpenBooking}
            className="py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Pesan Jadwal</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
