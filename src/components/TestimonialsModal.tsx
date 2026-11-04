import React, { useState } from 'react';
import {
  X,
  ArrowLeftRight
} from 'lucide-react';
import { INITIAL_TRANSFER_PROOFS } from '../data/transferProofs';
import { TransferProofCarousel } from './TransferProofCarousel';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenCart?: () => void;
}

export const TestimonialsModal: React.FC<TestimonialsModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [selectedBank, setSelectedBank] = useState<string>('semua');

  if (!isOpen) return null;

  const banks = [
    { id: 'semua', label: 'Semua Transaksi', count: INITIAL_TRANSFER_PROOFS.length },
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-600/40">
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transaksi Herbal</span>
            </div>
            <h3 className="font-black text-xl sm:text-2xl leading-tight text-white">
              Bukti Transaksi Pembelian Madu &amp; Herbal Alami
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Dokumentasi bukti transfer asli transaksi pembelian madu dan herbal alami di Bekam Bogor.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3"
            aria-label="Tutup Transaksi"
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

        {/* Modal Body / Slider View */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <TransferProofCarousel proofs={filteredProofs} />
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
    </div>
  );
};
