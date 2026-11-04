import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  Truck,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../data/shopProducts';
import { THERAPIST_INFO } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'antar_bekam' | 'ekspedisi' | 'ambil_di_tempat'>('antar_bekam');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    let deliveryText = '';
    if (deliveryMethod === 'antar_bekam') {
      deliveryText = 'Diantar langsung saat sesi Terapi Bekam Panggilan (Gratis Ongkir)';
    } else if (deliveryMethod === 'ekspedisi') {
      deliveryText = 'Kirim via Ekspedisi / Kurir (JNE / J&T / GoSend / Grab)';
    } else {
      deliveryText = 'Ambil langsung di Rumah Terapis (Kp. Leuwisadeng RT 01 RW 03)';
    }

    const itemsSummary = cartItems
      .map((item, idx) => {
        const subtotal = item.product.price * item.quantity;
        return `${idx + 1}. *${item.product.name}*\n   - Jumlah: ${item.quantity} botol/pcs (${item.product.volume})\n   - Harga: ${formatRupiah(item.product.price)} x ${item.quantity} = *${formatRupiah(subtotal)}*`;
      })
      .join('\n\n');

    const message = `*PEMESANAN HERBAL & MADU - BEKAM BOGOR*

Halo Praktisi Bekam Bogor, saya ingin memesan produk herbal berikut:

${itemsSummary}

--------------------------------------
*TOTAL HARGA: ${formatRupiah(totalPrice)}*
*Jumlah Item: ${totalQuantity} pcs*

*Metode Pengambilan/Pengiriman:*
${deliveryText}

*Data Pemesan:*
- Nama: *${customerName.trim() || '-'}*
- No. WhatsApp: *${customerPhone.trim() || '-'}*
- Alamat Lengkap: *${customerAddress.trim() || '-'}*
${customerNotes.trim() ? `- Catatan: ${customerNotes.trim()}` : ''}

Mohon konfirmasi ketersediaan stok dan kelanjutan pesanannya. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const cleanPhone = THERAPIST_INFO.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl leading-tight">Keranjang Belanja Herbal</h3>
              <p className="text-xs text-emerald-200">
                {totalQuantity > 0 ? `${totalQuantity} item terpilih • Pesan langsung via WhatsApp` : 'Keranjang masih kosong'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup Keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">Keranjang Belanja Masih Kosong</h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                  Pilih madu herbal, minyak terapi, atau jamu tradisional di bawah ini lalu klik tombol "Tambah ke Keranjang".
                </p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Lihat Produk Herbal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Daftar Produk ({cartItems.length})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Kosongkan</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => {
                    const subtotal = item.product.price * item.quantity;
                    return (
                      <div key={item.product.id} className="py-3 flex items-center gap-3 sm:gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h5>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-700">
                              {item.product.volume}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-emerald-700">
                              {formatRupiah(item.product.price)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                aria-label="Kurangi jumlah"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                aria-label="Tambah jumlah"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="text-xs text-slate-400 block sm:inline mr-1">Subtotal:</span>
                              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                                {formatRupiah(subtotal)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50 cursor-pointer self-start sm:self-center shrink-0"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery / Handover Method */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Metode Pengambilan / Pengiriman:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('antar_bekam')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryMethod === 'antar_bekam'
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Diantar Saat Bekam</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                      Gratis Ongkir (Dibawakan Terapis)
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('ekspedisi')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryMethod === 'ekspedisi'
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>Ekspedisi / Kurir</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      JNE / J&amp;T / GoSend / Grab
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('ambil_di_tempat')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryMethod === 'ambil_di_tempat'
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>Ambil Sendiri</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Kp. Leuwisadeng RT 01/03
                    </p>
                  </button>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Informasi Pemesan:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap:
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Pak Hendra"
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp:
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Pengiriman / Catatan:
                  </label>
                  <textarea
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Contoh: Jl. Raya Dramaga No. 12, dekat RS Medika. Atau: 'Bawa sekalian saat bekam besok'"
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Total Pembayaran Produk</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-800">
                  {formatRupiah(totalPrice)}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  ({totalQuantity} botol/kemasan)
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                className="py-3 px-5 sm:px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Pesan Sekarang via WA</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% Herbal Alami Berkualitas • Terdaftar P-IRT &amp; Halal • Bayar Aman</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
