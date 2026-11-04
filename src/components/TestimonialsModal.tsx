import React, { useState } from 'react';
import {
  X,
  Receipt,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Eye,
  ZoomIn,
  Building2,
  Clock,
  User,
  ArrowRight
} from 'lucide-react';
import { INITIAL_TRANSFER_PROOFS, TransferProof } from '../data/transferProofs';
import { formatRupiah } from '../data/shopProducts';
import { THERAPIST_INFO } from '../data/treatments';
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
}) => {
  const [selectedBank, setSelectedBank] = useState<string>('semua');
  const [lightboxImage, setLightboxImage] = useState<TransferProof | null>(null);

  if (!isOpen) return null;

  const banks = [
    { id: 'semua', label: 'Semua Bukti', count: INITIAL_TRANSFER_PROOFS.length },
    {
      id: 'SeaBank',
      label: 'SeaBank',
      count: INITIAL_TRANSFER_PROOFS.filter((p) => p.bankName === 'SeaBank').length
    },
    {
      id: 'Bank Jago (Syariah)',
      label: 'Bank Jago Syariah',
      count: INITIAL_TRANSFER_PROOFS.filter((p) => p.bankName === 'Bank Jago (Syariah)').length
    },
    {
      id: 'BRI (BRImo)',
      label: 'BRI / BRImo',
      count: INITIAL_TRANSFER_PROOFS.filter((p) => p.bankName === 'BRI (BRImo)').length
    },
    {
      id: 'BCA',
      label: 'BCA',
      count: INITIAL_TRANSFER_PROOFS.filter((p) => p.bankName === 'BCA').length
    },
    {
      id: 'DANA / E-Wallet',
      label: 'DANA / E-Wallet',
      count: INITIAL_TRANSFER_PROOFS.filter((p) => p.bankName === 'DANA / E-Wallet').length
    }
  ];

  const filteredProofs =
    selectedBank === 'semua'
      ? INITIAL_TRANSFER_PROOFS
      : INITIAL_TRANSFER_PROOFS.filter((p) => p.bankName === selectedBank);

  const totalVerifiedAmount = INITIAL_TRANSFER_PROOFS.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header (No star icons) */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-600/40">
              <Receipt className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparansi &amp; Bukti Amanah</span>
            </div>
            <h3 className="font-black text-xl sm:text-2xl leading-tight text-white">
              Bukti Transfer Pasien
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Dokumentasi bukti transfer asli pembayaran sesi terapi bekam dan herbal alami di Bekam Bogor.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3"
            aria-label="Tutup Bukti Transfer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bank Filter Tabs */}
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {banks.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBank(b.id)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                selectedBank === b.id
                  ? 'bg-white text-emerald-900 shadow-xs border border-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{b.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  selectedBank === b.id
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {b.count}
              </span>
            </button>
          ))}
        </div>

        {/* Modal Body / Proofs List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-sm">
                  100% Transaksi Nyata &amp; Terverifikasi
                </p>
                <p className="text-xs text-emerald-800">
                  Total {INITIAL_TRANSFER_PROOFS.length} bukti transfer terekam senilai {formatRupiah(totalVerifiedAmount)}
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Amanah &amp; Terpercaya</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProofs.map((proof) => (
              <div
                key={proof.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Snapshot Preview */}
                <div
                  onClick={() => setLightboxImage(proof)}
                  className="relative aspect-4/3 sm:aspect-16/10 bg-slate-100 overflow-hidden cursor-pointer group/img"
                  title="Klik untuk memperbesar struk transfer"
                >
                  <img
                    src={proof.imageUrl}
                    alt={`Bukti transfer ${proof.bankName} dari ${proof.customerName}`}
                    className="w-full h-full object-cover object-top group-hover/img:scale-103 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md">
                      <ZoomIn className="w-4 h-4 text-emerald-700" />
                      <span>Lihat Struk Lengkap</span>
                    </span>
                  </div>
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider">
                      {proof.bankName}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Berhasil</span>
                    </span>
                  </div>
                </div>

                {/* Proof Information Details */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{proof.customerName}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {proof.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-emerald-800">
                          {formatRupiah(proof.amount)}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-[11px] text-slate-500">Penerima:</span>
                        <span className="font-bold text-slate-800 text-[11px]">{proof.receiverName}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-[11px] text-slate-500">Layanan:</span>
                        <span className="font-medium text-slate-700 text-[11px] truncate max-w-[170px]">{proof.items}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxImage(proof)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Periksa Bukti Asli</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            Siap merasakan terapi bekam steril dan sunnah? Konsultasikan keluhan Anda sekarang.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Booking Terapi Sekarang</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal (Click to View Full Struk) */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Bukti Struk {lightboxImage.bankName}
                </p>
                <h4 className="text-sm font-black text-white">
                  {lightboxImage.customerName} • {formatRupiah(lightboxImage.amount)}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto bg-slate-100 flex items-center justify-center">
              <img
                src={lightboxImage.imageUrl}
                alt={`Struk lengkap ${lightboxImage.customerName}`}
                className="max-h-[65vh] w-auto rounded-xl object-contain shadow-md"
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-1.5">
              <p className="text-slate-600">
                <strong className="text-slate-900">Catatan:</strong> {lightboxImage.notes}
              </p>
              <p className="text-slate-500 text-[11px]">
                Waktu: {lightboxImage.date} • No. Ref: {lightboxImage.refNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
