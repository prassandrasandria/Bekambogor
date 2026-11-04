import React, { useState, useEffect } from 'react';
import {
  Home,
  Calculator,
  Layers,
  Camera,
  Activity,
  Calendar,
  MapPin,
  ShieldCheck,
  HelpCircle,
  Menu,
  X,
  ExternalLink,
  UserCheck,
  ShoppingBag
} from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  cartCount = 0,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navMenuItems = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    {
      id: 'kalkulator-transport',
      label: 'Hitung Biaya Transport',
      icon: <Calculator className="w-4 h-4 text-emerald-600" />
    },
    { id: 'paket-layanan', label: 'Biaya & Paket Bekam', icon: <Layers className="w-4 h-4" /> },
    {
      id: 'toko-herbal',
      label: 'Toko Herbal & Madu',
      icon: <ShoppingBag className="w-4 h-4 text-emerald-600" />,
      badge: cartCount > 0 ? `${cartCount} item` : 'Baru'
    },
    // SEMENTARA DI-KOMENTAR SESUAI PERMINTAAN USER:
    // {
    //   id: 'profil-terapis',
    //   label: 'Profil & Sertifikat Terapis',
    //   icon: <UserCheck className="w-4 h-4 text-emerald-600" />
    // },
    { id: 'dokumentasi-foto', label: 'Dokumentasi Terapi', icon: <Camera className="w-4 h-4" /> },
    { id: 'titik-bekam', label: 'Peta Titik Bekam', icon: <Activity className="w-4 h-4" /> },
    {
      id: 'jadwal-sunnah',
      label: 'Jadwal Bekam Sunnah',
      icon: <Calendar className="w-4 h-4 text-amber-600" />
    },
    { id: 'lokasi-rumah', label: 'Lokasi & Peta Rumah', icon: <MapPin className="w-4 h-4 text-emerald-600" /> },
    { id: 'sterilitas', label: 'Standar Steril & Sanad', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'faq', label: 'Tanya Jawab (FAQ)', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navigation Bar (Hidden on Desktop) */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <a href="#beranda" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Logo Bekam Bogor"
            width={38}
            height={38}
            className="w-9 h-9 object-contain drop-shadow-sm"
          />
          <div>
            <div className="font-extrabold text-base text-slate-900 leading-tight">
              Bekam<span className="text-emerald-600">Bogor</span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">{THERAPIST_INFO.tagline}</p>
          </div>
        </a>

        {/* Mobile Right Actions: Cart & Hamburger */}
        <div className="flex items-center gap-1.5">
          {onOpenCart && (
            <button
              type="button"
              onClick={onOpenCart}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer relative"
              aria-label="Buka Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Buka Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Blurred right-side overlay when menu is open: clicking anywhere on it or on the X button closes the drawer */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in cursor-pointer"
            aria-label="Tutup Menu"
          />

          {/* Tombol X di area hitam blur */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed top-4 right-4 sm:top-6 sm:right-6 z-60 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white flex items-center justify-center border-2 border-white/50 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Tutup Menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Sidebar Drawer: Desktop Fixed, Mobile Slide-out */}
      <aside
        aria-label="Sidebar Navigasi"
        className={`fixed inset-y-0 left-0 z-55 w-72 max-w-[82vw] bg-white border-r border-slate-200 flex flex-col justify-between shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo Bekam Bogor"
              width={44}
              height={44}
              className="w-11 h-11 object-contain drop-shadow-sm hover:scale-105 transition-transform"
            />
            <div>
              <div className="font-black text-xl tracking-tight text-slate-900 leading-tight">
                Bekam<span className="text-emerald-600">Bogor</span>
              </div>
              <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block border border-emerald-100 mt-0.5">
                {THERAPIST_INFO.tagline}
              </div>
            </div>
          </div>
        </div>

          {/* SEMENTARA DI-KOMENTAR SESUAI PERMINTAAN USER:
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80">
            <img
              src={THERAPIST_INFO.photoUrl}
              alt={THERAPIST_INFO.therapistName}
              className="w-7 h-7 rounded-lg object-cover border border-emerald-500/50 shrink-0"
            />
            <div className="min-w-0 text-left">
              <p className="text-[11px] font-bold text-slate-800 truncate">Terapis: {THERAPIST_INFO.therapistName}</p>
              <p className="text-[10px] text-emerald-700 font-semibold truncate">Sejak {THERAPIST_INFO.experienceSince}</p>
            </div>
          </div>
          */}

        {/* Middle: Semantic Navigation Landmark */}
        <nav aria-label="Menu Navigasi Utama" className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Menu Navigasi
          </div>
          {navMenuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-emerald-800 text-white'
                        : item.id === 'toko-herbal' && cartCount > 0
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 mt-2 px-1 space-y-1.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
              Info &amp; Lokasi
            </div>
            
            <a
              href={THERAPIST_INFO.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200/80 transition-colors"
            >
              <div className="flex items-center gap-2.5 truncate">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate text-xs sm:text-sm">Lokasi Rumah Terapis</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            </a>
          </div>
        </nav>

        {/* Bottom: Fast Action Button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2">
          {cartCount > 0 && onOpenCart && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-between shadow-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Buka Keranjang Herbal</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-950 text-white text-[11px] font-black">
                {cartCount} item
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span>Booking Jadwal Bekam</span>
          </button>

          <div className="text-xs text-center text-slate-500 font-medium">
            Praktisi Bersertifikat &amp; Bersanad
          </div>
        </div>
      </aside>
    </>
  );
};
