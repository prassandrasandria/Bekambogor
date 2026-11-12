import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../data/shopProducts';
import { THERAPIST_INFO, getCleanWhatsAppNumber } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onViewProducts?: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onViewProducts
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    if (!recipientName.trim() || !recipientPhone.trim() || !recipientAddress.trim() || !postalCode.trim()) {
      setErrorMessage('Mohon lengkapi Nama Penerima, Nomor Handphone, Alamat Lengkap, dan Kode Pos untuk pengiriman kurir.');
      return;
    }

    setErrorMessage(null);

    const itemsSummary = cartItems
      .map((item, idx) => {
        const subtotal = item.product.price * item.quantity;
        return `${idx + 1}. *${item.product.name}*\n   - Jumlah: ${item.quantity} botol/kemasan (${item.product.volume})\n   - Harga: ${formatRupiah(item.product.price)} x ${item.quantity} = *${formatRupiah(subtotal)}*`;
      })
      .join('\n\n');

    const message = `*FORMULIR PEMESANAN HERBAL & MADU - BEKAM BOGOR*

Halo Praktisi Bekam Bogor, saya ingin memesan produk herbal berikut:

${itemsSummary}

--------------------------------------
*TOTAL HARGA PRODUK: ${formatRupiah(totalPrice)}*
*Jumlah Item: ${totalQuantity} botol/kemasan*
*Metode Pengiriman: Diantar Kurir / Ekspedisi*

*DATA PENERIMA PENGIRIMAN:*
- Nama Penerima: *${recipientName.trim()}*
- No. Handphone/WA: *${recipientPhone.trim()}*
- Alamat Lengkap: *${recipientAddress.trim()}*
- Kode Pos: *${postalCode.trim()}*

Mohon konfirmasi ketersediaan stok, total ongkos kirim kurir, dan nomor rekening pembayarannya. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const cleanPhone = getCleanWhatsAppNumber(THERAPIST_INFO.phone);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl leading-tight">Formulir Pemesanan Herbal</h3>
              <p className="text-xs text-emerald-200">
                {totalQuantity > 0 ? `${totalQuantity} produk terpilih • Pengiriman Diantar Kurir` : 'Keranjang masih kosong'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup Formulir"
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
                  Pilih madu herbal alami atau suplemen kesehatan yang Anda butuhkan lalu klik tombol "Beli" atau "+ Keranjang".
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onViewProducts) {
                    onViewProducts();
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
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
                    Daftar Produk yang Dipesan ({cartItems.length})
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
                          title="Hapus dari daftar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Courier Notice */}
              <div className="bg-emerald-50/80 rounded-2xl p-3.5 sm:p-4 border border-emerald-200/90 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-emerald-950">
                    Pengiriman Langsung Diantar Kurir / Ekspedisi
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    Pesanan Anda akan dikemas rapi, aman dengan bubble wrap, dan diantar kurir langsung ke alamat penerima di bawah ini.
                  </p>
                </div>
              </div>

              {/* Form Data Penerima Pengiriman Kurir (Nama, No Handphone, Alamat Lengkap, Kode Pos) */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                    Formulir Data Penerima Pengiriman
                  </span>
                  <span className="text-[11px] font-semibold text-rose-600">*Wajib Diisi</span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Penerima <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => {
                        setRecipientName(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Contoh: Bpk. Ahmad Fauzi"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nomor Handphone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={recipientPhone}
                      onChange={(e) => {
                        setRecipientPhone(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Contoh: 081234567890"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Alamat Lengkap Pengiriman <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={recipientAddress}
                    onChange={(e) => {
                      setRecipientAddress(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Nama Jalan, Nomor Rumah, RT/RW, Patokan Rumah, Nama Kelurahan/Desa, dan Kecamatan"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kode Pos <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Contoh: 16640"
                    className="w-full sm:w-1/2 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 shrink-0 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Total Pembayaran Produk</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-800">
                  {formatRupiah(totalPrice)}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  ({totalQuantity} botol/kemasan) • Pengiriman Kurir
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Pesan Sekarang via WA</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% Herbal Alami Berkualitas • Terdaftar P-IRT &amp; Halal • Pengiriman Cepat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
