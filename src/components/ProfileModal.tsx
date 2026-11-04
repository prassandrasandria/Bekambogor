import React from 'react';
import {
  X,
  UserCheck,
  Award,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ExternalLink,
  CalendarCheck
} from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup Profil"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 p-1 border-2 border-amber-400 shrink-0 overflow-hidden shadow-lg">
              <img
                src={THERAPIST_INFO.photoUrl}
                alt={THERAPIST_INFO.therapistName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/90 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>Praktisi Bekam &amp; Herbal</span>
              </div>
              <h3 className="font-extrabold text-xl leading-tight text-white">
                {THERAPIST_INFO.therapistName}
              </h3>
              <p className="text-xs text-emerald-200 font-medium">
                {THERAPIST_INFO.experienceSince} • Bersertifikat &amp; Bersanad
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-slate-700">
          
          {/* Status Badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">Standar Higienis &amp; Steril Medis</p>
                <p className="text-[11px] text-emerald-800">Jarum lancet 1x pakai dibuka di depan pasien</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-emerald-200 text-emerald-900 whitespace-nowrap">
              Khusus Ikhwan
            </span>
          </div>

          {/* Credentials */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[11px] block">
              Sertifikasi &amp; Sanad Keilmuan:
            </span>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 text-xs">Sertifikat Praktisi Bekam Medis</p>
                  <p className="text-[11px] text-slate-500">Standar Perkumpulan Bekam Indonesia (PBI) &amp; SOP Asosiasi Bekam</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 text-xs">Sanad &amp; Manhaj Thibbun Nabawi</p>
                  <p className="text-[11px] text-slate-500">Kaidah sunnah Rasulullah SAW: penentuan titik Al-Kahil, Al-Akhda’ain, Ummu Mughits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Service Area */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[11px] block">
              Jangkauan &amp; Titik Praktik:
            </span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Rumah Terapis: </span>
                  <span>{THERAPIST_INFO.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Jam Layanan: </span>
                  <span>Setiap Hari (08.00 - 21.00 WIB)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Booking Jadwal</span>
          </button>

          <a
            href={`https://wa.me/${THERAPIST_INFO.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Praktisi Bekam Bogor, saya ingin konsultasi terapi bekam / herbal.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-800" />
            <span>Chat WA</span>
          </a>
        </div>

      </div>
    </div>
  );
};
