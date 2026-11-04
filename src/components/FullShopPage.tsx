import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Search,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  Eye,
  X,
  ShieldCheck,
  Truck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SHOP_PRODUCTS, formatRupiah } from '../data/shopProducts';
import { ShopProduct, ProductCategory, CartItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TransferProofCarousel } from './TransferProofCarousel';
import { THERAPIST_INFO, getCleanWhatsAppNumber } from '../data/treatments';

interface FullShopPageProps {
  onBackToHome: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: ShopProduct) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOpenCart: () => void;
}

export const FullShopPage: React.FC<FullShopPageProps> = ({
  onBackToHome,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewProduct, setPreviewProduct] = useState<ShopProduct | null>(null);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

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

  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((product) => {
      if (selectedCategory !== 'semua' && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchTagline = product.tagline.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchBenefits = product.benefits.some((b) => b.toLowerCase().includes(query));
        return matchName || matchBrand || matchTagline || matchDesc || matchBenefits;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleDirectWhatsAppBuy = (product: ShopProduct) => {
    const message = `*PEMESANAN HERBAL CEPAT - BEKAM BOGOR*

Halo Praktisi Bekam Bogor, saya ingin memesan:
- *${product.name}* (${product.volume})
- Harga Promo Diskon 50%: *${formatRupiah(product.price)}* (Harga Normal ${formatRupiah(product.originalPrice || product.price * 2)})
- Jumlah: 1 botol/kemasan

Bisa dibawakan saat terapi bekam atau dikirim via kurir ke alamat saya? Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const cleanPhone = getCleanWhatsAppNumber(THERAPIST_INFO.phone);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'semua', label: 'Semua Produk', count: SHOP_PRODUCTS.length },
    {
      id: 'madu-herbal',
      label: 'Madu Herbal Khusus',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'madu-herbal').length
    },
    {
      id: 'vitalitas-pasutri',
      label: 'Vitalitas & Pasutri',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'vitalitas-pasutri').length
    },
    {
      id: 'minyak-jamu',
      label: 'Minyak & Jamu Terapi',
      count: SHOP_PRODUCTS.filter((p) => p.category === 'minyak-jamu').length
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-28 lg:pb-16 animate-in fade-in duration-300">
      
      {/* Sub Navigation Bar - Flush under the mobile top bar with zero empty gap */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span>Keranjang</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-black flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-emerald-900 to-teal-900 text-white py-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>PROMO SPESIAL DISKON 50%</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Katalog Lengkap Herbal &amp; Madu Alami
          </h1>

          <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Seluruh formula herbal alami pilihan praktisi terapi Bekam Bogor. Madu penyakit dalam, stamina pasutri tanpa BKO, jamu tradisional resep leluhur, serta minyak terapi berizin P-IRT resmi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] font-semibold text-emerald-200">
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              Bisa Diantar Saat Bekam Panggilan
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              100% Herbal Alami &amp; Halal
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded-md text-[11px] ${
                        isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari keluhan (lambung, asam urat, asma...)"
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-300 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Product Cards Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-lg text-slate-800">Tidak ada produk yang cocok</h3>
            <p className="text-sm text-slate-500">
              Coba kata kunci lain atau pilih tab "Semua Produk".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('semua');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 cursor-pointer"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => {
              const qtyInCart = cartQuantityMap.get(product.id) || 0;
              const isExpanded = expandedDetailsId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-emerald-400"
                >
                  {/* Image with zoom trigger */}
                  <div
                    className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setPreviewProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* 50% Off Discount Badge */}
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

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-bold backdrop-blur-sm">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Brosur</span>
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-emerald-700 truncate">{product.brand}</span>
                        <span className="hidden sm:inline text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          {product.categoryLabel}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm sm:leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed hidden sm:block">
                        {product.description}
                      </p>

                      {/* Tombol Lihat Detail Produk Lengkap (Muncul lengkap tanpa kepotong) */}
                      <div className="mt-2.5">
                        <button
                          type="button"
                          onClick={() => setPreviewProduct(product)}
                          className="w-full py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Lihat Detail Produk</span>
                        </button>
                      </div>
                    </div>

                    {/* Price with 50% Strikethrough */}
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

                      {/* Add to Cart or Stepper */}
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
                            title="Pesan via WhatsApp"
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
          </div>
        )}

        {/* Bukti Transaksi Pembelian Herbal Alami (Clean Slider) */}
        <section className="mt-14 pt-10 border-t border-slate-200">
          <TransferProofCarousel
            title="Bukti Transaksi Pembelian Madu &amp; Herbal Alami"
            subtitle="Dokumentasi bukti transfer asli transaksi pembelian madu dan herbal alami di Bekam Bogor."
          />
        </section>

      </main>

      {/* Product Image Modal Zoom */}
      {previewProduct && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-6 max-h-[92vh] flex flex-col">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                  {previewProduct.brand}
                </span>
                <span className="text-xs text-slate-300">{previewProduct.volume}</span>
              </div>
              <button
                onClick={() => setPreviewProduct(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-[420px] flex items-center justify-center">
                <img
                  src={previewProduct.image}
                  alt={previewProduct.name}
                  className="w-full h-auto max-h-[420px] object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">{previewProduct.name}</h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">{previewProduct.tagline}</p>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{previewProduct.description}</p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900">
                  Khasiat &amp; Manfaat:
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {previewProduct.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold block uppercase tracking-wider text-slate-800 mb-1">
                  Aturan Minum / Pakai:
                </span>
                <p>{previewProduct.dosage}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <div>
                <div className="text-[10px] text-rose-500 line-through">
                  {formatRupiah(previewProduct.originalPrice || previewProduct.price * 2)}
                </div>
                <div className="text-xl font-black text-emerald-800">
                  {formatRupiah(previewProduct.price)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(previewProduct);
                    setPreviewProduct(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Beli</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleDirectWhatsAppBuy(previewProduct);
                    setPreviewProduct(null);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Pesan via WA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
