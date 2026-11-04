import React from 'react';
import { Home, MapPin, Calendar, ShoppingBag, Receipt } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  cartCount: number;
  onNavigateHome: () => void;
  onNavigateLocation: () => void;
  onOpenBooking: () => void;
  onOpenCart: () => void;
  onOpenTestimonials: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  cartCount,
  onNavigateHome,
  onNavigateLocation,
  onOpenBooking,
  onOpenCart,
  onOpenTestimonials
}) => {
  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-end justify-items-center relative">
        
        {/* 1. Beranda */}
        <button
          type="button"
          onClick={onNavigateHome}
          className={`flex flex-col items-center justify-center py-1 px-1 w-full text-center transition-colors cursor-pointer ${
            activeSection === 'beranda' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeSection === 'beranda' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-1 tracking-tight">Beranda</span>
        </button>

        {/* 2. Lokasi */}
        <button
          type="button"
          onClick={onNavigateLocation}
          className={`flex flex-col items-center justify-center py-1 px-1 w-full text-center transition-colors cursor-pointer ${
            activeSection === 'lokasi-rumah' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className={`w-5 h-5 ${activeSection === 'lokasi-rumah' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-1 tracking-tight">Lokasi</span>
        </button>

        {/* 3. Booking Jadwal (Ditengah - Elevated Circular/Squircle Button like QRIS in screenshot) */}
        <div className="flex flex-col items-center justify-center -mt-6">
          <button
            type="button"
            onClick={onOpenBooking}
            aria-label="Booking Jadwal Bekam"
            className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-700/40 border-3 border-white ring-2 ring-emerald-500/20 active:scale-95 transition-transform cursor-pointer"
          >
            <Calendar className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className="text-[10px] font-extrabold text-emerald-800 mt-1 tracking-tight whitespace-nowrap">
            Booking
          </span>
        </div>

        {/* 4. Keranjang */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 px-1 w-full text-center transition-colors cursor-pointer text-slate-500 hover:text-slate-800 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4.5 h-4.5 px-1 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Keranjang</span>
        </button>

        {/* 5. Bukti Transfer Pasien (Bukan bintang) */}
        <button
          type="button"
          onClick={onOpenTestimonials}
          className="flex flex-col items-center justify-center py-1 px-1 w-full text-center transition-colors cursor-pointer text-slate-500 hover:text-slate-800"
        >
          <Receipt className="w-5 h-5 stroke-[1.8] text-emerald-700" />
          <span className="text-[11px] mt-1 tracking-tight font-medium">Bukti Trf</span>
        </button>

      </div>
    </nav>
  );
};
