import React, { useState } from 'react';
import { Star, ChevronDown, CheckCircle, HelpCircle, ShieldCheck } from 'lucide-react';
import { testimonialsData, faqData } from '../data/faqAndTestimonials';
import { WhatsAppIcon } from './WhatsAppIcon';

export const TestimonialsFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<'all' | 'dasar' | 'sunnah' | 'medis' | 'layanan'>('all');

  const filteredFaqs = faqCategoryFilter === 'all'
    ? faqData
    : faqData.filter(item => item.category === faqCategoryFilter);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Block */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              Pengalaman Jamaah &amp; Pasien
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Apa Kata Warga Bogor yang Telah Berbekam?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Ulasan asli dari para ikhwan dan akhwat yang telah mempercayakan ikhtiar kesembuhan dan kebugaran mereka bersama Bekam Bogor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((testi) => (
              <div
                key={testi.id}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 flex flex-col justify-between hover:border-emerald-300 transition-colors shadow-2xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{testi.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{testi.comment}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{testi.name}</h4>
                    <p className="text-[11px] text-slate-500">{testi.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      {testi.therapistType}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{testi.serviceUsed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Block */}
        <div className="border-t border-slate-200 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              Pertanyaan yang Sering Diajukan
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Tanya Jawab Seputar Terapi Bekam (FAQ)
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Pelajari segala hal mengenai prosedur bekam, rasa sakit, keamanan medis, serta ketentuan syariat Islam.
            </p>
          </div>

          {/* FAQ Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setFaqCategoryFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                faqCategoryFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Topik
            </button>
            <button
              onClick={() => setFaqCategoryFilter('dasar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                faqCategoryFilter === 'dasar'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Apakah Sakit?
            </button>
            <button
              onClick={() => setFaqCategoryFilter('sunnah')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                faqCategoryFilter === 'sunnah'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Syariat &amp; Sunnah
            </button>
            <button
              onClick={() => setFaqCategoryFilter('medis')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                faqCategoryFilter === 'medis'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Keamanan Medis
            </button>
            <button
              onClick={() => setFaqCategoryFilter('layanan')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                faqCategoryFilter === 'layanan'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Layanan Homecare
            </button>
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 bg-emerald-50/20">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-slate-500 mb-3">
              Punya pertanyaan khusus seputar keluhan fisik atau titik bekam Anda?
            </p>
            <a
              href="https://wa.me/6285777205863?text=Assalamu%27alaikum%20saya%20ingin%20tanya%20konsultasi%20terapi%20bekam."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Tanya Langsung ke Terapis via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
