import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Maximize2,
  ShieldCheck,
  UserCheck,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { THERAPIST_INFO, THERAPIST_CERTIFICATES } from '../data/treatments';
import { TherapistCertificate } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TherapistProfileProps {
  onOpenBooking: () => void;
}

export const TherapistProfile: React.FC<TherapistProfileProps> = ({ onOpenBooking }) => {
  const [selectedCert, setSelectedCert] = useState<TherapistCertificate | null>(null);

  return (
    <section id="profil-terapis" className="py-16 bg-white relative overflow-hidden border-y border-slate-200/80">
      {/* Decorative background subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200 shadow-2xs">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Profil Terapis &amp; Sertifikasi Resmi
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Ditangani Langsung oleh Terapis Berpengalaman
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Keamanan, ketepatan titik anatomi, dan sterilitas terapi Anda ditangani langsung oleh praktisi berdedikasi dengan pelatihan dan sertifikasi kompetensi resmi.
          </p>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-200/80 shadow-lg">
          
          {/* Photo Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-3xl blur-sm opacity-50 group-hover:opacity-80 transition duration-300" />
              <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border-2 border-white">
                <img
                  src={THERAPIST_INFO.photoUrl}
                  alt="Praktisi Bekam Profesional Bogor"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 text-center">
                  <p className="text-white font-black text-lg sm:text-xl tracking-tight">Praktisi Bekam Profesional</p>
                  <p className="text-emerald-300 text-xs sm:text-sm font-semibold">Terapis Bekam Aswaja &amp; Thibbun Nabawi</p>
                </div>
              </div>
            </div>

            {/* Quick Experience Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md">
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>Praktisi Berpengalaman &amp; Bersanad</span>
            </div>
          </div>

          {/* Bio & Credentials Details */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div>
              <div className="inline-block text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-md mb-2">
                Identitas Praktisi Resmi
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Praktisi Bekam Berpengalaman
                <span className="block text-base sm:text-lg font-semibold text-emerald-700 mt-1">
                  Bersertifikat Resmi &amp; Bersanad Thibbun Nabawi
                </span>
              </h3>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              <strong>{THERAPIST_INFO.experienceYears}</strong>. Beliau secara konsisten memperdalam keilmuan hijamah melalui berbagai pelatihan formal, seminar kesehatan reguler berbadan hukum, dan pelatihan bekam medis terapan. Setiap tindakan terapi dilakukan dengan dedikasi penuh mengamalkan sunnah Rasulullah ﷺ dengan standar kebersihan tinggi.
            </p>

            {/* Credential Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
                <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Pelatihan Bekam Aswaja</h4>
                  <p className="text-[11px] text-slate-500">Kaidah sunnah &amp; keilmuan Aswaja Surabaya</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
                <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">SK Kemenkumham Resmi</h4>
                  <p className="text-[11px] text-slate-500">Al-Hijamah Thibbun Nabawi Training Center</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Gusmus Raksa Jasad</h4>
                  <p className="text-[11px] text-slate-500">GM Terapi Perbaikan Sistem Organ Tubuh</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Bekam Terapan Medis</h4>
                  <p className="text-[11px] text-slate-500">dr. Ahmad Rizki Ramanda Nst</p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Konsultasi &amp; Booking Jadwal</span>
              </button>

              <a
                href={THERAPIST_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-all"
              >
                <span>WhatsApp: {THERAPIST_INFO.phone}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

          </div>

        </div>

        {/* Certificate Gallery Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <FileCheck2 className="w-4 h-4" />
                Dokumen Bukti Pelatihan &amp; Seminar
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Sertifikat &amp; Lisensi Kompetensi Terapis
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              *Klik pada sertifikat untuk memperbesar dan melihat detail utuh
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {THERAPIST_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Certificate Preview Image */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-emerald-800/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs">
                    {cert.badge}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Lihat Sertifikat</span>
                    </span>
                  </div>
                </div>

                {/* Certificate Information */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {cert.institution}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono font-medium truncate max-w-[140px]">
                      {cert.credentialNumber}
                    </span>
                    <span className="font-semibold text-emerald-700 shrink-0 inline-flex items-center">
                      Detail <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Full Resolution Certificate Modal Lightbox */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="pr-4">
                <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md mb-1">
                  {selectedCert.badge}
                </span>
                <h3 className="font-black text-sm sm:text-base text-slate-900 leading-tight">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nomor: <span className="font-mono font-bold text-slate-700">{selectedCert.credentialNumber}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer shrink-0"
                aria-label="Tutup sertifikat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Image */}
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 bg-slate-100 flex items-center justify-center">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[60vh] w-auto max-w-full rounded-xl shadow-md border border-slate-200 object-contain bg-white"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-slate-800">Penerbit / Penyelenggara:</p>
                <p className="text-slate-600">{selectedCert.institution}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Diberikan Kepada: <strong>{selectedCert.recipient}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCert(null);
                    onOpenBooking();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md cursor-pointer inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  <span>Booking Terapi</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
