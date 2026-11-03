import React, { useState } from 'react';
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
  Search,
  ExternalLink,
  UserCheck
} from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navMenuItems = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    {
      id: 'kalkulator-transport',
      label: 'Hitung Biaya Transport',
      icon: <Calculator className="w-4 h-4 text-emerald-600" />,
      badge: 'Rp 1.500/km'
    },
    { id: 'paket-layanan', label: 'Biaya & Paket Bekam', icon: <Layers className="w-4 h-4" />, badge: 'Mulai 85rb' },
    { id: 'dokumentasi-foto', label: 'Dokumentasi Terapi', icon: <Camera className="w-4 h-4" /> },
    { id: 'titik-bekam', label: 'Peta Titik Bekam', icon: <Activity className="w-4 h-4" /> },
    {
      id: 'jadwal-sunnah',
      label: 'Jadwal Bekam Sunnah',
      icon: <Calendar className="w-4 h-4 text-amber-600" />,
      badge: 'Otomatis'
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
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <a href="#beranda" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Logo Bekam Bogor"
            className="w-10 h-10 object-contain drop-shadow-sm"
          />
          <div>
            <div className="font-extrabold text-base text-slate-900 leading-tight">
              Bekam<span className="text-emerald-600">Bogor</span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">{THERAPIST_INFO.tagline}</p>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a
            href={THERAPIST_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 transition-colors"
            aria-label="Chat WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Sticky Left Sidebar (Driacom Style) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo Bekam Bogor"
                className="w-13 h-13 object-contain drop-shadow-sm hover:scale-105 transition-transform"
              />
              <div>
                <div className="font-black text-xl tracking-tight text-slate-900 leading-tight">
                  Bekam<span className="text-emerald-600">Bogor</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block border border-emerald-100 mt-0.5">
                  {THERAPIST_INFO.tagline}
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Special Restriction Notice */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-[11px] font-bold text-amber-900 leading-tight">
              Khusus Ikhwan (Laki-laki)
            </span>
          </div>

          {/* Search Box */}
          <div className="mt-3 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari layanan, titik bekam..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Menu Navigasi
          </div>
          {navMenuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 mt-2 px-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1.5">
              Info &amp; Alamat
            </div>
            <a
              href={THERAPIST_INFO.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80 transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate text-[11px]">Kp. Leuwisadeng, Bogor</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </a>
          </div>
        </div>

        {/* Bottom: Fast Action & WhatsApp Button without showing raw digits */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2.5">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>Jadwalkan Bekam</span>
          </button>

          <a
            href={THERAPIST_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Chat WhatsApp</span>
          </a>

          <div className="text-[10px] text-center text-slate-500 font-medium">
            Praktisi Bersertifikat &amp; Bersanad
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs"
        />
      )}
    </>
  );
};
