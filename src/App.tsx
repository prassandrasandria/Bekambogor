import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { TherapyEquipmentBanner } from './components/TherapyEquipmentBanner';
import { RunningTextBanner } from './components/RunningTextBanner';
import { TransportCalculator } from './components/TransportCalculator';
import { PhotoCarousel } from './components/PhotoCarousel';
import { ShopSection } from './components/ShopSection';
import { FullShopPage } from './components/FullShopPage';
import { CartModal } from './components/CartModal';
import { ProfileModal } from './components/ProfileModal';
import { TestimonialsModal } from './components/TestimonialsModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TherapistLocation } from './components/TherapistLocation';
import { InteractiveBodyMap } from './components/InteractiveBodyMap';
import { HygieneProtocols } from './components/HygieneProtocols';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { TherapistProfile } from './components/TherapistProfile';
import { BookingModal } from './components/BookingModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { ServicePackage, ShopProduct, CartItem } from './types';
import { THERAPIST_INFO } from './data/treatments';
import { formatRupiah } from './data/shopProducts';
import { Calendar, UserCheck, ChevronUp, ShoppingBag, CheckCircle } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home');
  const [activeSection, setActiveSection] = useState('beranda');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [bookingServiceType, setBookingServiceType] = useState<'panggilan' | 'ke_rumah_terapis'>('panggilan');
  const [bookingDistanceKm, setBookingDistanceKm] = useState<number>(5);
  const [bookingAddress, setBookingAddress] = useState<string | undefined>(undefined);
  const [bookingDate, setBookingDate] = useState<string | undefined>(undefined);
  const [bookingSymptom, setBookingSymptom] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Shop and Shopping Cart state (with local storage persistence)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bekambogor_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bekambogor_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const handleAddToCart = (product: ShopProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`"${product.name}" ditambahkan ke keranjang`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

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
    if (sectionId === 'testimoni-bukti' || sectionId === 'testimoni' || sectionId === 'transaksi') {
      setIsTestimonialsOpen(true);
      return;
    }
    if (sectionId === 'toko-herbal') {
      setCurrentView('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentView === 'shop') {
      setCurrentView('home');
      setTimeout(() => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    if (currentView === 'shop') {
      setCurrentView('home');
    }
    setActiveSection('beranda');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateLocation = () => {
    if (currentView === 'shop') {
      setCurrentView('home');
      setTimeout(() => {
        handleNavigate('lokasi-rumah');
      }, 50);
    } else {
      handleNavigate('lokasi-rumah');
    }
  };

  const handleOpenBooking = () => {
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
    if (address && address.trim()) {
      setBookingAddress(address.trim());
    }
    setIsBookingOpen(true);
  };

  // Synchronize homepage calculator changes so any booking button inherits these exact details
  const handleTransportStateChange = (state: {
    packageId: string;
    serviceType: 'panggilan' | 'ke_rumah_terapis';
    distanceKm: number;
    address: string;
  }) => {
    setBookingPackageId(state.packageId);
    setBookingServiceType(state.serviceType);
    setBookingDistanceKm(state.distanceKm);
    if (state.address && state.address.trim()) {
      setBookingAddress(state.address.trim());
    }
  };

  const handleExploreCalculator = () => {
    handleNavigate('kalkulator-transport');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col lg:flex-row selection:bg-emerald-100 selection:text-emerald-900 pb-16 lg:pb-0">
      
      {/* Desktop Sticky Left Sidebar */}
      <Sidebar
        activeSection={currentView === 'shop' ? 'toko-herbal' : activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area (Offset for Desktop Sticky Sidebar) */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col overflow-x-hidden">
        
        {/* If in Full Shop Page View */}
        {currentView === 'shop' ? (
          <FullShopPage
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenCart={() => setIsCartOpen(true)}
          />
        ) : (
          <>
            {/* Running Text Banner: Bekam Aswaja Bogor */}
            <RunningTextBanner />

            {/* Main Body Content Sections */}
            <main className="flex-1">
              {/* Banner Toko Alat Terapi Lengkap */}
              <TherapyEquipmentBanner />

              {/* Hero Section with Sunnah Schedule Card */}
              <Hero
                onOpenBooking={handleOpenBooking}
                onExploreCalculator={handleExploreCalculator}
                onSelectDateToBook={handleSelectDateToBook}
              />

              {/* Transport & Distance Calculator Section */}
              <div className="scroll-reveal">
                <TransportCalculator
                  onSelectBookingWithDetails={handleSelectBookingWithDetails}
                  onTransportStateChange={handleTransportStateChange}
                />
              </div>


              {/* Homepage 3 Featured Products + See All Card in 2-Column Mobile Grid */}
              <div className="scroll-reveal">
                <ShopSection
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onOpenCart={() => setIsCartOpen(true)}
                  onViewAllProducts={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>

              {/* Photo Documentation Carousel with Real Cupping Images */}
              <div className="scroll-reveal">
                <PhotoCarousel />
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
          </>
        )}

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

      {/* Shopping Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onViewProducts={() => {
          setIsCartOpen(false);
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Therapist Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Toast Notification when adding to cart */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md animate-in slide-in-from-top-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="line-clamp-1">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-amber-300 hover:text-amber-200 font-bold whitespace-nowrap cursor-pointer underline"
          >
            Buka Keranjang
          </button>
        </div>
      )}

      {/* Floating Sticky Cart Button on Desktop */}
      {totalCartCount > 0 && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="hidden lg:flex fixed z-40 bottom-8 left-80 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 items-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          title="Buka Keranjang Herbal"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          </div>
          <div className="text-left leading-tight">
            <div className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Keranjang Herbal</div>
            <div className="text-xs font-black text-white">{formatRupiah(totalCartPrice)}</div>
          </div>
          <span className="text-xs font-bold bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-lg">
            Buka
          </span>
        </button>
      )}

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Kembali ke atas"
        className={`fixed z-30 transition-all duration-300 rounded-2xl bg-emerald-700/90 hover:bg-emerald-800 text-white shadow-xl hover:shadow-2xl border border-emerald-500/30 p-3 flex items-center justify-center cursor-pointer backdrop-blur-xs hover:scale-110 active:scale-95 ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        } bottom-20 right-4 lg:bottom-8 lg:right-8`}
        title="Kembali ke atas"
      >
        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Mobile Bottom Navigation Bar (Beranda, Lokasi, Booking Jadwal ditengah, Keranjang, Testimoni) */}
      <MobileBottomNav
        activeSection={currentView === 'shop' ? '' : activeSection}
        cartCount={totalCartCount}
        onNavigateHome={handleNavigateHome}
        onNavigateLocation={handleNavigateLocation}
        onOpenBooking={handleOpenBooking}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTestimonials={() => setIsTestimonialsOpen(true)}
      />

      {/* Testimonials & Herbal Transfer Proofs Modal */}
      <TestimonialsModal
        isOpen={isTestimonialsOpen}
        onClose={() => setIsTestimonialsOpen(false)}
        onOpenBooking={handleOpenBooking}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}

export default App;
