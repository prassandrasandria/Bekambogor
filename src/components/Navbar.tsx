import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, ShieldCheck, Menu, X, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (packageId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Paket Layanan', href: '#layanan' },
    { label: 'Peta Titik Bekam', href: '#titik-bekam' },
    { label: 'Hari Sunnah', href: '#jadwal-sunnah' },
    { label: 'Cek Keluhan', href: '#cek-keluhan' },
    { label: 'Standar Steril', href: '#sterilitas' },
    { label: 'Wilayah Bogor', href: '#area-bogor' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Layanan Bekam Medik & Sunnah Bogor • Siap Panggilan Homecare Seluruh Bogor & Sekitarnya</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline">🕒 Setiap Hari 08.00 - 21.00 WIB</span>
            <a 
              href="https://wa.me/6285163518070?text=Assalamu%27alaikum%20Admin%20Bekam%20Bogor%2C%20saya%20ingin%20konsultasi%20jadwal%20bekam."
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-200 hover:text-white flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp CS: 0851-6351-8070</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
                <path d="M6 10a6 6 0 0 0 12 0" />
                <path d="M12 16v6" />
                <path d="M8 22h8" />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Bekam<span className="text-emerald-600">Bogor</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Medik & Sunnah
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Klinik & Homecare Se-Bogor Raya</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/6281280007890?text=Assalamu%27alaikum%20Admin%20Bekam%20Bogor%2C%20saya%20ingin%20tanya-tanya%20terapi%20bekam."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat WA</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Jadwalkan Bekam</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Pesan</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Jadwalkan Terapi Bekam Sekarang</span>
            </button>
            <a
              href="https://wa.me/6281280007890?text=Assalamu%27alaikum%20Admin%20Bekam%20Bogor%2C%20saya%20ingin%20konsultasi."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Konsultasi Cepat via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
