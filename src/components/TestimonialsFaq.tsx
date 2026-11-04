import React, { useState } from 'react';
import {
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Receipt,
  Eye,
  ZoomIn,
  Building2,
  User,
  X
} from 'lucide-react';
import { faqData } from '../data/faqAndTestimonials';
import { INITIAL_TRANSFER_PROOFS, TransferProof } from '../data/transferProofs';
import { formatRupiah } from '../data/shopProducts';
import { WhatsAppIcon } from './WhatsAppIcon';
import { THERAPIST_INFO, getCleanWhatsAppNumber } from '../data/treatments';

export const TestimonialsFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<'all' | 'dasar' | 'sunnah' | 'medis' | 'layanan'>('all');
  const [selectedProof, setSelectedProof] = useState<TransferProof | null>(null);

  const filteredFaqs = faqCategoryFilter === 'all'
    ? faqData
    : faqData.filter(item => item.category === faqCategoryFilter);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleDirectAsk = () => {
    const message = 'Assalamu\'alaikum Praktisi Bekam Bogor, saya ingin bertanya seputar terapi bekam dan konsultasi keluhan kesehatan saya.';
    const cleanPhone = getCleanWhatsAppNumber(THERAPIST_INFO.phone);
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bukti Transfer Section (No star icons) */}
        <div id="testimoni-bukti" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Receipt className="w-3.5 h-3.5 text-emerald-700" />
              Bukti Transfer Pasien &amp; Transaksi Sah
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Bukti Transfer &amp; Amanah Layanan
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Dokumentasi sah pembayaran transfer pasien terapi bekam dan herbal alami di Bekam Bogor. 100% amanah, profesional, dan terpercaya.
            </p>
          </div>

          {/* Transfer Proofs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_TRANSFER_PROOFS.map((trf) => (
              <div
                key={trf.id}
                className="bg-slate-50 rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                {/* Proof Image Preview */}
                <div
                  onClick={() => setSelectedProof(trf)}
                  className="relative aspect-16/10 bg-slate-200 overflow-hidden cursor-pointer group/img"
                  title="Klik untuk melihat struk asli"
                >
                  <img
                    src={trf.imageUrl}
                    alt={`Struk transfer ${trf.bankName} dari ${trf.customerName}`}
                    className="w-full h-full object-cover object-top group-hover/img:scale-104 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Perbesar Struk</span>
                    </span>
                  </div>
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider">
                      {trf.bankName}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      {trf.status}
                    </span>
                  </div>
                </div>

                {/* Text Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{trf.customerName}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">{trf.date}</p>
                      </div>
                      <span className="font-black text-emerald-800 text-base">
                        {formatRupiah(trf.amount)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80 leading-relaxed">
                      {trf.notes}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono truncate max-w-[170px]">
                      Ref: {trf.refNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProof(trf)}
                      className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Lihat Asli</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ (Tanya Jawab Seputar Bekam) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              Tanya Jawab Lengkap (FAQ)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Pelajari aturan thibbun nabawi, kebersihan sterilisasi, serta panduan praktis sebelum dan sesudah berbekam.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: 'all', label: 'Semua Tanya Jawab' },
                { id: 'dasar', label: 'Umum & Pasien' },
                { id: 'sunnah', label: 'Sunnah & Waktu' },
                { id: 'medis', label: 'Steril & Keamanan' },
                { id: 'layanan', label: 'Panggilan & Transport' }
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFaqCategoryFilter(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    faqCategoryFilter === cat.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-emerald-300 bg-emerald-50/20 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-emerald-700 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-100/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Callout Help */}
          <div className="max-w-2xl mx-auto mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Masih Memiliki Pertanyaan Lain?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Jangan ragu untuk langsung berkonsultasi mengenai keluhan dan jadwal terapi terbaik bagi Anda melalui WhatsApp resmi praktisi kami.
            </p>
            <button
              type="button"
              onClick={handleDirectAsk}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Tanya Praktisi via WhatsApp</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox for Struk Photo */}
      {selectedProof && (
        <div
          onClick={() => setSelectedProof(null)}
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Bukti Struk {selectedProof.bankName}
                </p>
                <h4 className="text-sm font-black text-white">
                  {selectedProof.customerName} • {formatRupiah(selectedProof.amount)}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProof(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto bg-slate-100 flex items-center justify-center">
              <img
                src={selectedProof.imageUrl}
                alt={`Struk lengkap ${selectedProof.customerName}`}
                className="max-h-[65vh] w-auto rounded-xl object-contain shadow-md"
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-1.5">
              <p className="text-slate-600">
                <strong className="text-slate-900">Catatan:</strong> {selectedProof.notes}
              </p>
              <p className="text-slate-500 text-[11px]">
                Waktu: {selectedProof.date} • No. Ref: {selectedProof.refNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
