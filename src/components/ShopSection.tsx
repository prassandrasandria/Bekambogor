import React, { useMemo } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { SHOP_PRODUCTS, formatRupiah } from '../data/shopProducts';
import { ShopProduct, CartItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { THERAPIST_INFO, getCleanWhatsAppNumber } from '../data/treatments';

interface ShopSectionProps {
  cartItems: CartItem[];
  onAddToCart: (product: ShopProduct) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOpenCart: () => void;
  onViewAllProducts: () => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
  onViewAllProducts
}) => {
  // Show only 3 featured products on homepage as requested
  const featuredProducts = useMemo(() => {
    return [
      SHOP_PRODUCTS.find((p) => p.id === 'madu-jts-vitalitas') || SHOP_PRODUCTS[0],
      SHOP_PRODUCTS.find((p) => p.id === 'paket-pasutri-harmonis') || SHOP_PRODUCTS[1],
      SHOP_PRODUCTS.find((p) => p.id === 'madu-lambung-gerd') || SHOP_PRODUCTS[3]
    ];
  }, []);

  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach((item) => {
      map.set(item.product.id, item.quantity);
    });
    return map;
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const handleDirectWhatsAppBuy = (product: ShopProduct) => {
    const message = `*PEMESANAN HERBAL CEPAT - BEKAM BOGOR*

Halo Praktisi Bekam Bogor, saya ingin memesan:
- *${product.name}* (${product.volume})
- Harga Promo Diskon 50%: *${formatRupiah(product.price)}* (Harga Normal ${formatRupiah(product.originalPrice || product.price * 2)})
- Jumlah: 1 botol/kemasan

Bisa dibawakan saat sesi terapi bekam panggilan atau dikirim via kurir? Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const cleanPhone = getCleanWhatsAppNumber(THERAPIST_INFO.phone);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="toko-herbal" className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
              <span>Toko Herbal Resmi • Diskon 50%</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Herbal Alami &amp; Madu Pilihan Terapis
            </h2>
            <p className="mt-1.5 text-slate-600 text-xs sm:text-sm max-w-xl">
              Madu herbal berkualitas untuk detoksifikasi, asam lambung, dan vitalitas alami tanpa BKO. Siap dibawakan saat sesi bekam.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Lihat Semua Produk ({SHOP_PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Grid on Mobile (Row 1: Prod 1 & 2, Row 2: Prod 3 & See All Button Card), 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          
          {/* Products 1, 2, 3 */}
          {featuredProducts.map((product) => {
            const qtyInCart = cartQuantityMap.get(product.id) || 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-emerald-400"
              >
                {/* Product Image */}
                <div
                  className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={onViewAllProducts}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* 50% Discount Tag */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                    <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md">
                      DISKON 50%
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] sm:text-[11px] font-extrabold shadow-2xs">
                      {product.volume}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">
                      {product.brand}
                    </div>

                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-emerald-800 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed hidden sm:block">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-black text-slate-950">
                          {formatRupiah(product.price)}
                        </span>
                        <span className="text-[11px] text-rose-500 line-through">
                          {formatRupiah(product.originalPrice || product.price * 2)}
                        </span>
                      </div>
                    </div>

                    {qtyInCart === 0 ? (
                      <div className="grid grid-cols-4 gap-1">
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="col-span-3 py-2 px-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Beli</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleDirectWhatsAppBuy(product)}
                          title="Pesan via WA"
                          className="col-span-1 py-2 px-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center border border-emerald-300 transition-colors cursor-pointer"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-800" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-1 border border-emerald-300">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, qtyInCart - 1)}
                            className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:bg-emerald-100 flex items-center justify-center shadow-2xs font-bold cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1.5 text-xs font-black text-emerald-900">
                            {qtyInCart}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, qtyInCart + 1)}
                            className="w-6 h-6 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center shadow-2xs font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-800 pr-1">Di Keranjang</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 4th Item: Card "Lihat Semua Produk Herbal" (Completing the 2x2 grid on mobile & 4-col on desktop) */}
          <div
            onClick={onViewAllProducts}
            className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02] border-2 border-emerald-600/50 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:12px_12px]" />

            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 group-hover:text-slate-950 transition-colors" />
              </div>

              <div className="inline-block px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                +{SHOP_PRODUCTS.length - 3} Produk Lainnya
              </div>

              <h3 className="font-black text-sm sm:text-lg leading-tight text-white group-hover:text-emerald-200 transition-colors">
                Lihat Semua Produk Herbal
              </h3>

              <p className="text-[11px] text-emerald-200/90 leading-relaxed hidden sm:block">
                Tersedia madu hernia, kista, asma, stroke, asam urat, ambeien, minyak tulang sisi, dan jamu sapu jagad.
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-emerald-700/60 mt-3 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-white">
              <span>Buka Katalog Lengkap</span>
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
