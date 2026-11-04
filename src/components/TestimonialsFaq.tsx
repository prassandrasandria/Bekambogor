import React, { useState } from 'react';
import { Star, ChevronDown, CheckCircle2, HelpCircle, ShieldCheck, Receipt, ShoppingBag, MapPin } from 'lucide-react';
import { testimonialsData, faqData } from '../data/faqAndTestimonials';
import { INITIAL_TRANSFER_PROOFS } from '../data/transferProofs';
import { formatRupiah } from '../data/shopProducts';
import { WhatsAppIcon } from './WhatsAppIcon';

export const TestimonialsFaq: React.FC = () => {
  const [testiTab, setTestiTab] = useState<'bekam' | 'transfer_herbal'>('transfer_herbal');
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
        
        {/* Testimonials & Transfer Proofs Block */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              Testimoni &amp; Bukti Amanah
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Kepuasan Pelanggan &amp; Jamaah
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Bukti sah transaksi pembelian madu herbal alami serta ulasan pasien yang telah berikhtiar sembuh bersama Bekam Bogor.
            </p>

            {/* Tab Filter */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl mt-6 border border-slate-200">
              <button
                type="button"
                onClick={() => setTestiTab('transfer_herbal')}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  testiTab === 'transfer_herbal'
                    ? 'bg-white text-emerald-900 shadow-xs border border-slate-200/80'
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
                onClick={() => setTestiTab('bekam')}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  testiTab === 'bekam'
                    ? 'bg-white text-emerald-900 shadow-xs border border-slate-200/80'
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
          </div>

          {/* Tab 1: Bukti Transfer Herbal */}
          {testiTab === 'transfer_herbal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
              {INITIAL_TRANSFER_PROOFS.map((trf) => (
                <div
                  key={trf.id}
                  className="bg-slate-50 p-5 rounded-3xl border border-slate-200/90 flex flex-col justify-between hover:border-emerald-300 transition-colors shadow-2xs space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-800 text-white text-[11px] font-black uppercase tracking-wider">
                        {trf.bankName}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {trf.status}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">{trf.customerName}</h4>
                        <span className="font-black text-emerald-800 text-sm">
                          {formatRupiah(trf.amount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{trf.location}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
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
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{trf.date}</span>
                    <span className="text-emerald-700 font-semibold">{trf.refNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Ulasan Pasien Bekam */}
          {testiTab === 'bekam' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
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
          )}
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
              href="https://wa.me/6285163518070?text=Assalamu%27alaikum%20saya%20ingin%20tanya%20konsultasi%20terapi%20bekam."
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
