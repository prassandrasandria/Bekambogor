import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { faqData } from '../data/faqAndTestimonials';
import { WhatsAppIcon } from './WhatsAppIcon';
import { THERAPIST_INFO, getCleanWhatsAppNumber } from '../data/treatments';

export const TestimonialsFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<'all' | 'dasar' | 'sunnah' | 'medis' | 'layanan'>('all');

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
              Pelajari aturan terapi bekam sunnah, kebersihan sterilisasi, serta panduan praktis sebelum dan sesudah berbekam.
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
    </section>
  );
};
