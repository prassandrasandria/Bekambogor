import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Receipt,
  ShoppingBag,
  Calendar,
  ShieldCheck,
  CreditCard,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { INITIAL_TRANSFER_PROOFS, TransferProof } from '../data/transferProofs';
import { testimonialsData } from '../data/faqAndTestimonials';
import { formatRupiah } from '../data/shopProducts';
import { THERAPIST_INFO, getCleanWhatsAppNumber } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenCart: () => void;
}

export const TestimonialsModal: React.FC<TestimonialsModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  onOpenCart
}) => {
  const [activeTab, setActiveTab] = useState<'bukti_transfer' | 'ulasan_bekam'>('bukti_transfer');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-600/40">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Bukti Amanah &amp; Kepuasan Pasien</span>
            </div>
            <h3 className="font-black text-xl sm:text-2xl leading-tight">
              Testimoni &amp; Bukti Transfer
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1">
              Transparansi transaksi herbal alami serta ulasan asli jamaah Bekam Bogor
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Tutup Testimoni"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 p-1.5 border-b border-slate-200 grid grid-cols-2 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('bukti_transfer')}
            className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'bukti_transfer'
                ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4 text-emerald-600" />
            <span>Bukti Transfer Herbal</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full">
              {INITIAL_TRANSFER_PROOFS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ulasan_bekam')}
            className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'ulasan_bekam'
                ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Ulasan Pasien Bekam</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-full">
              {testimonialsData.length}
            </span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: BUKTI TRANSFER PEMBELIAN MADU & HERBAL */}
          {activeTab === 'bukti_transfer' && (
            <div className="space-y-4">
              
              {/* Info Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Amanah &amp; Transparansi Pembelian Herbal</p>
                  <p className="text-[11px] text-amber-800/90 mt-0.5 leading-relaxed">
                    Setiap pemesanan madu &amp; herbal diproses secara amanah. Setelah transfer, bukti pembayaran dicatat dan pesanan langsung disiapkan untuk diantar atau dikirim ekspedisi.
                  </p>
                </div>
              </div>

              {/* Transfer Cards List */}
              <div className="space-y-3">
                {INITIAL_TRANSFER_PROOFS.map((trf) => (
                  <div
                    key={trf.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 transition-all shadow-2xs space-y-2.5"
                  >
                    {/* Top Row: Bank Badge & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-800 text-white text-[11px] font-black tracking-wider uppercase">
                          {trf.bankName}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {trf.date}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{trf.status}</span>
                      </span>
                    </div>

                    {/* Customer & Product details */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                          {trf.customerName}
                        </h4>
                        <span className="font-black text-emerald-800 text-sm sm:text-base">
                          {formatRupiah(trf.amount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{trf.location}</span>
                      </div>
                    </div>

                    {/* Purchased Items */}
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs space-y-1">
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{trf.items}</span>
                      </div>
                      {trf.notes && (
                        <p className="text-[11px] text-slate-500 italic pl-5">
                          "{trf.notes}"
                        </p>
                      )}
                    </div>

                    {/* Bottom Reference */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>No. Ref: {trf.refNumber}</span>
                      <span className="text-emerald-700 font-semibold">Toko Herbal Bekam Bogor</span>
                    </div>

                    {/* Placeholder for uploaded image attachment if present */}
                    {trf.imageUrl && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-slate-200">
                        <img
                          src={trf.imageUrl}
                          alt={`Bukti transfer ${trf.customerName}`}
                          className="w-full h-auto object-cover max-h-60"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Call to Action for buyers */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <p className="text-xs font-bold text-emerald-950">
                  Sudah Melakukan Pemesanan Madu / Herbal?
                </p>
                <p className="text-[11px] text-emerald-800">
                  Kirimkan konfirmasi &amp; bukti transfer via WhatsApp agar pesanan langsung kami siapkan untuk diantar ke rumah Anda.
                </p>
                <a
                  href={`https://wa.me/${getCleanWhatsAppNumber(THERAPIST_INFO.phone)}?text=${encodeURIComponent('Assalamu\'alaikum Praktisi Bekam Bogor, saya ingin mengirimkan bukti transfer pembelian madu / herbal.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
                  <span>Kirim Bukti Transfer via WhatsApp</span>
                </a>
              </div>

            </div>
          )}

          {/* TAB 2: ULASAN PASIEN BEKAM */}
          {activeTab === 'ulasan_bekam' && (
            <div className="space-y-3">
              {testimonialsData.map((testi) => (
                <div
                  key={testi.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{testi.name}</h4>
                      <p className="text-xs text-slate-500">{testi.location}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200/60">
                    "{testi.comment}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-emerald-800">{testi.serviceUsed}</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Pasien Terverifikasi
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>Belanja Herbal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Booking Jadwal</span>
          </button>
        </div>

      </div>
    </div>
  );
};
