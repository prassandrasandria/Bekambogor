import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Car,
  Home,
  ChevronDown,
  Check,
  Sparkles,
  Sun,
  Sunset,
  Moon,
  AlertCircle,
  Lock,
  Navigation,
  Crosshair,
  Loader2
} from 'lucide-react';
import { servicePackages, THERAPIST_INFO, calculateTransportCost, getCleanWhatsAppNumber } from '../data/treatments';
import { BookingFormData } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialServiceType?: 'panggilan' | 'ke_rumah_terapis';
  initialDistanceKm?: number;
  initialDate?: string;
  initialSymptom?: string;
  initialAddress?: string;
}

const POPULAR_AREAS = [
  { name: 'Leuwisadeng', roadKm: 3 },
  { name: 'Wangunjaya', roadKm: 4 },
  { name: 'Leuwiliang', roadKm: 5 },
  { name: 'RSUD Leuwiliang', roadKm: 5 },
  { name: 'Barengkok', roadKm: 6 },
  { name: 'Puraseda', roadKm: 8 },
  { name: 'Cibungbulang', roadKm: 10 },
  { name: 'Cibatok', roadKm: 11 },
  { name: 'Cemplang', roadKm: 12 },
  { name: 'Pamijahan', roadKm: 14 },
  { name: 'Ciampea', roadKm: 15 },
  { name: 'Cigudeg', roadKm: 16 },
  { name: 'Cinangneng', roadKm: 16 },
  { name: 'Tenjolaya', roadKm: 17 },
  { name: 'Dramaga', roadKm: 20 },
  { name: 'IPB Dramaga', roadKm: 21 },
  { name: 'Jasinga', roadKm: 22 },
  { name: 'Laladon', roadKm: 23 },
  { name: 'Bubulak', roadKm: 23 },
  { name: 'Ciomas', roadKm: 24 },
  { name: 'Bogor Barat (Cilendek)', roadKm: 25 },
  { name: 'Taman Yasmin', roadKm: 26 },
  { name: 'Stasiun Bogor', roadKm: 29 },
  { name: 'Bogor Kota (Pusat)', roadKm: 30 },
  { name: 'Tanah Sareal', roadKm: 30 },
  { name: 'Cibinong', roadKm: 38 },
  { name: 'Sentul City', roadKm: 41 },
  { name: 'Puncak / Cisarua', roadKm: 47 }
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  initialServiceType = 'panggilan',
  initialDistanceKm = 5,
  initialDate,
  initialSymptom,
  initialAddress
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    age: '',
    phone: '',
    serviceType: initialServiceType,
    servicePackageId: initialPackageId || servicePackages[1].id,
    distanceKm: initialDistanceKm,
    transportCost: calculateTransportCost(initialDistanceKm, initialServiceType),
    totalCost: 0,
    selectedDate: initialDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    selectedTimeSlot: 'Pagi (08:30 - 10:30 WIB)',
    address: initialAddress || '',
    healthNotes: initialSymptom ? `Keluhan: ${initialSymptom}` : '',
    hasMedicalConditions: {
      diabetes: false,
      bloodThinners: false,
      highBloodPressure: false,
      heartDisease: false
    }
  });

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [formAlertMessage, setFormAlertMessage] = useState<string | null>(null);

  // Custom Dropdowns state
  const [isPackageDropdownOpen, setIsPackageDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // Automatic Location & Locked Distance state
  const [isGpsDetecting, setIsGpsDetecting] = useState(false);
  const [gpsModalNotice, setGpsModalNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAreaPicker, setShowAreaPicker] = useState(false);

  const packageDropdownRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  const selectedPackage = servicePackages.find(p => p.id === formData.servicePackageId) || servicePackages[0];
  const transportCost = calculateTransportCost(formData.distanceKm, formData.serviceType);
  const totalCost = selectedPackage.price + transportCost;

  // Sync initial props (both on change and whenever modal opens)
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        servicePackageId: initialPackageId || prev.servicePackageId,
        serviceType: initialServiceType || prev.serviceType,
        distanceKm: initialDistanceKm !== undefined ? initialDistanceKm : prev.distanceKm,
        address: initialAddress !== undefined && initialAddress !== '' ? initialAddress : prev.address,
        selectedDate: initialDate || prev.selectedDate,
        healthNotes: initialSymptom ? (initialSymptom.startsWith('Keluhan:') ? initialSymptom : `Keluhan: ${initialSymptom}`) : prev.healthNotes
      }));
    }
  }, [isOpen, initialPackageId, initialServiceType, initialDistanceKm, initialAddress, initialDate, initialSymptom]);

  // GPS detection directly in booking modal
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsModalNotice({
        type: 'error',
        text: 'Browser Anda tidak mendukung deteksi GPS. Silakan pilih wilayah Bogor di bawah.'
      });
      return;
    }

    setIsGpsDetecting(true);
    setGpsModalNotice(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;
        
        // Haversine road km to therapist
        const R = 6371;
        const dLat = ((userLat - THERAPIST_INFO.mapCoordinates.lat) * Math.PI) / 180;
        const dLon = ((userLon - THERAPIST_INFO.mapCoordinates.lng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((THERAPIST_INFO.mapCoordinates.lat * Math.PI) / 180) *
            Math.cos((userLat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const estimatedKm = Math.max(1, Math.round(R * c * 1.28));

        let detectedName = '';
        try {
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLon}&zoom=14&addressdetails=1`, {
            headers: { 'Accept-Language': 'id' }
          });
          if (resp.ok) {
            const data = await resp.json();
            const addr = data.address || {};
            const sub = addr.suburb || addr.village || addr.quarter || addr.town || addr.city_district || addr.county || '';
            const city = addr.city || addr.county || 'Kab. Bogor';
            if (sub) {
              detectedName = `${sub}, ${city}`;
            } else if (data.display_name) {
              detectedName = data.display_name.split(',').slice(0, 3).join(', ');
            }
          }
        } catch {
          // fallback silently
        }

        const finalAddress = detectedName ? `${detectedName} (Titik GPS Pasien)` : `Lokasi GPS Pasien (${userLat.toFixed(4)}, ${userLon.toFixed(4)})`;

        setFormData(prev => ({
          ...prev,
          distanceKm: estimatedKm,
          address: prev.address.trim() ? prev.address : finalAddress
        }));
        setIsGpsDetecting(false);
        setGpsModalNotice({
          type: 'success',
          text: `Lokasi otomatis terdeteksi! Jarak otomatis: ${estimatedKm} km (${finalAddress}).`
        });
      },
      (err) => {
        setIsGpsDetecting(false);
        setGpsModalNotice({
          type: 'error',
          text: err.code === 1 ? 'Izin akses GPS belum diaktifkan. Silakan pilih kecamatan di bawah.' : 'Sinyal GPS tidak ditemukan. Silakan pilih kecamatan di bawah.'
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSelectArea = (areaName: string, roadKm: number) => {
    setFormData(prev => ({
      ...prev,
      distanceKm: roadKm,
      address: prev.address.trim() ? prev.address : `Kecamatan ${areaName}, Kab. Bogor`
    }));
    setShowAreaPicker(false);
    setGpsModalNotice({
      type: 'success',
      text: `Wilayah terpilih: ${areaName} • Jarak otomatis: ${roadKm} km (PP: ${roadKm * 2} km).`
    });
  };

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (packageDropdownRef.current && !packageDropdownRef.current.contains(e.target as Node)) {
        setIsPackageDropdownOpen(false);
      }
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target as Node)) {
        setIsTimeDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const timeSlots = [
    { label: 'Pagi (08:30 - 10:30 WIB)', period: 'Pagi', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { label: 'Siang (10:30 - 12:30 WIB)', period: 'Siang', icon: <Sun className="w-4 h-4 text-amber-600" /> },
    { label: 'Ba\'da Dzuhur (13:30 - 15:30 WIB)', period: 'Siang', icon: <Clock className="w-4 h-4 text-emerald-600" /> },
    { label: 'Sore (16:00 - 18:00 WIB)', period: 'Sore', icon: <Sunset className="w-4 h-4 text-orange-500" /> },
    { label: 'Malam Ba\'da Isya (19:30 - 21:00 WIB)', period: 'Malam', icon: <Moon className="w-4 h-4 text-indigo-500" /> }
  ];

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Nama pasien wajib diisi';
    }

    if (!formData.age.trim()) {
      errors.age = 'Usia pasien wajib diisi';
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
        errors.age = 'Masukkan usia yang valid (contoh: 35)';
      }
    }

    if (!formData.phone.trim()) {
      errors.phone = 'No. WhatsApp aktif wajib diisi';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 9) {
      errors.phone = 'Masukkan no. WhatsApp minimal 9-13 digit';
    }

    if (!formData.address.trim()) {
      errors.address = formData.serviceType === 'panggilan'
        ? 'Alamat lengkap / share location pasien wajib diisi untuk panggilan'
        : 'Alamat domisili atau kelurahan pasien wajib diisi';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      setFormAlertMessage('⚠️ Peringatan: Mohon lengkapi data wajib (Nama, Usia, No. WhatsApp, dan Alamat) sebelum melanjutkan ke WhatsApp.');
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setFormAlertMessage(null);

    const conditionsList = [];
    if (formData.hasMedicalConditions.diabetes) conditionsList.push('Diabetes/Gula');
    if (formData.hasMedicalConditions.bloodThinners) conditionsList.push('Obat Pengencer Darah');
    if (formData.hasMedicalConditions.highBloodPressure) conditionsList.push('Hipertensi/Darah Tinggi');
    if (formData.hasMedicalConditions.heartDisease) conditionsList.push('Penyakit Jantung');

    const conditionsText = conditionsList.length > 0 ? conditionsList.join(', ') : 'Tidak ada (Normal)';

    const transportInfoText = formData.serviceType === 'panggilan'
      ? `Rp ${transportCost.toLocaleString('id-ID')} (${formData.distanceKm} km x Rp 2.500)`
      : 'Rp 0 (Gratis Transport - Datang ke Rumah Terapis)';

    const formatIndonesianDateWithDay = (dateStr: string) => {
      if (!dateStr) return '';
      try {
        const [year, month, day] = dateStr.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const dayName = days[dateObj.getDay()];
        const monthName = months[dateObj.getMonth()];
        return `${dayName}, ${day} ${monthName} ${year}`;
      } catch {
        return dateStr;
      }
    };

    const formattedDateWithDay = formatIndonesianDateWithDay(formData.selectedDate);

    const message = `Assalamu'alaikum, saya mau booking jadwal terapi bekam pada hari/tgl:

📅 *${formattedDateWithDay}* (${formData.selectedTimeSlot})

*DATA FORMULIR RESERVASI:*
---------------------------------------
*Nama Pasien:* 
${formData.fullName.trim()}

*Usia Pasien:* ${formData.age.trim()} tahun

*No. WhatsApp:* ${formData.phone.trim()}

 *Tipe Layanan:*
${formData.serviceType === 'panggilan' ? 'Bekam Panggilan (Ke Rumah Pasien)' : 'Terapi di Rumah Terapis'}

*Alamat Pasien:*
${formData.serviceType === 'panggilan' ? formData.address.trim() : (formData.address.trim() || THERAPIST_INFO.address)}

*Jarak Tempuh:*
${formData.serviceType === 'panggilan' ? `${formData.distanceKm} km (Pulang Pergi)` : '0 km (Di Rumah Terapis)'}

*Biaya Transport:*
${formData.serviceType === 'panggilan' ? `Rp ${transportCost.toLocaleString('id-ID')} (${formData.distanceKm} km x Rp 2.500)` : 'Rp 0 (Datang ke Rumah Terapis)'}

*Paket Terapi:*
${selectedPackage.name} (Rp ${selectedPackage.price.toLocaleString('id-ID')})

*TOTAL BIAYA:*
Rp ${totalCost.toLocaleString('id-ID')}

*Kondisi Kesehatan:* ${conditionsText}

*Catatan Keluhan:* ${formData.healthNotes.trim() ? formData.healthNotes.trim() : 'Tidak ada'}
---------------------------------------
Mohon konfirmasi ketersediaan jadwal tersebut. Terima kasih.`;

    const cleanTherapistPhone = getCleanWhatsAppNumber(THERAPIST_INFO.phone);
    const waLink = `https://wa.me/${cleanTherapistPhone}?text=${encodeURIComponent(message)}`;
    setGeneratedWaUrl(waLink);
    setBookingSubmitted(true);

    // Directly open WhatsApp with pre-filled form
    window.open(waLink, '_blank');
  };

  const handleQuickDateSelect = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const dateStr = d.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, selectedDate: dateStr }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-visible animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-t-3xl flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 p-1.5 border-2 border-emerald-400 shrink-0 shadow-md hidden sm:flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo Bekam Bogor"
                className="w-9 h-9 object-contain"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Layanan Steril &amp; Profesional
              </div>
              <h3 className="text-xl sm:text-2xl font-black">Formulir Booking Jadwal Bekam</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                {THERAPIST_INFO.tagline} • Standar Higienis SOP Medis &amp; Sanad Bekam Aswaja
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div ref={modalBodyRef} className="p-5 sm:p-7 max-h-[78vh] overflow-y-auto">
          
          {/* Validation Alert Banner */}
          {formAlertMessage && !bookingSubmitted && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs flex items-start gap-2.5 animate-in shake duration-300">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900">{formAlertMessage}</p>
                <p className="text-[11px] text-rose-700 mt-0.5">Semua data bertanda bintang (*) wajib dilengkapi agar jadwal dapat dikonfirmasi oleh terapis.</p>
              </div>
            </div>
          )}

          {bookingSubmitted ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Formulir Siap Terkirim ke WhatsApp!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Data pendaftaran atas nama <strong>{formData.fullName}</strong> ({formData.age} thn) telah disiapkan dengan format rapi. Jika halaman WhatsApp belum terbuka otomatis, silakan klik tombol di bawah:
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <p><strong>👤 Pasien:</strong> {formData.fullName} ({formData.age} tahun)</p>
                <p><strong>📦 Paket:</strong> {selectedPackage.name}</p>
                <p><strong>Layanan:</strong> {formData.serviceType === 'panggilan' ? `Bekam Home Care (${formData.distanceKm} km)` : 'Datang ke Rumah Terapis'}</p>
                <p><strong>📍 Alamat:</strong> {formData.address}</p>
                <p><strong>📅 Jadwal:</strong> {formData.selectedDate} • {formData.selectedTimeSlot}</p>
                <p className="pt-1 border-t border-emerald-200"><strong>💵 Total Biaya:</strong> <strong className="text-emerald-800 text-sm">Rp {totalCost.toLocaleString('id-ID')}</strong></p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href={generatedWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md text-sm transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Buka WhatsApp Sekarang</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setBookingSubmitted(false);
                    onClose();
                  }}
                  className="px-4 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Service Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Pilih Lokasi Terapi</span>
                  <span className="text-xs text-emerald-700 font-semibold">Bogor &amp; Sekitarnya</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'panggilan' })}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-center cursor-pointer flex flex-col items-center gap-1 ${
                      formData.serviceType === 'panggilan'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/30 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Car className="w-4 h-4 text-emerald-600" />
                    <span>Home Care (Panggilan)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'ke_rumah_terapis' })}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer flex flex-col items-center gap-1 ${
                      formData.serviceType === 'ke_rumah_terapis'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/30 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Home className="w-4 h-4 text-emerald-600" />
                    <span>Di Rumah Terapis</span>
                    <span className="text-[9px] text-emerald-700 font-extrabold uppercase">Gratis Transport</span>
                  </button>
                </div>
              </div>

              {/* Custom Designed Package Dropdown */}
              <div className="space-y-1.5 relative" ref={packageDropdownRef}>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Pilihan Paket Bekam *</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    {selectedPackage.cupCount}
                  </span>
                </label>

                {/* Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsPackageDropdownOpen(!isPackageDropdownOpen)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                    isPackageDropdownOpen
                      ? 'border-emerald-600 ring-2 ring-emerald-600/30 bg-white shadow-md'
                      : 'border-slate-200 hover:border-emerald-300 bg-white hover:bg-slate-50/50 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
                      {selectedPackage.cupCount.includes('17') || selectedPackage.cupCount.includes('Full') ? '17' : selectedPackage.cupCount.includes('11') || selectedPackage.cupCount.includes('Punggung') ? '11' : '0'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                        <span>{selectedPackage.name}</span>
                        {selectedPackage.isPopular && (
                          <span className="ml-1.5 inline-block bg-amber-400 text-slate-900 text-[9px] font-extrabold px-1.5 py-0.2 rounded align-middle">
                            Favorit
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {selectedPackage.cupCount} • {selectedPackage.durationMinutes} menit
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2 sm:px-2.5 py-1 rounded-lg">
                      {selectedPackage.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through font-medium">
                          Rp {selectedPackage.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className="font-black text-xs sm:text-sm text-emerald-800 whitespace-nowrap">
                        Rp {selectedPackage.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isPackageDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Custom Options Menu */}
                {isPackageDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-2xl z-40 overflow-hidden divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                    {servicePackages.map((pkg) => {
                      const isSelected = pkg.id === formData.servicePackageId;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => {
                            setFormData({ ...formData, servicePackageId: pkg.id });
                            setIsPackageDropdownOpen(false);
                          }}
                          className={`p-3.5 flex items-start justify-between gap-3 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-emerald-50/90 text-emerald-950 font-semibold'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs sm:text-sm text-slate-900">
                                {pkg.name}
                              </span>
                              {pkg.isPopular && (
                                <span className="bg-amber-400 text-slate-900 text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                                  Favorit
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {pkg.tagline}
                            </p>
                            <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                              {pkg.cupCount}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-center">
                            <div className="text-right">
                              {pkg.originalPrice && (
                                <span className="block text-[10px] text-slate-400 line-through">
                                  Rp {pkg.originalPrice.toLocaleString('id-ID')}
                                </span>
                              )}
                              <span className="font-black text-xs text-emerald-800 whitespace-nowrap">
                                Rp {pkg.price.toLocaleString('id-ID')}
                              </span>
                            </div>
                            {isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-slate-300" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Automatic Location & Locked Distance (Only for Panggilan) */}
              {formData.serviceType === 'panggilan' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-3">
                  
                  {/* Header with Locked Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Lock className="w-4 h-4 text-emerald-700" />
                      <span>Jarak Tempuh Otomatis:</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-black shadow-xs">
                      {formData.distanceKm} km (PP: {formData.distanceKm * 2} km)
                    </span>
                  </div>

                  {/* Locked Visual Meter - Non-Draggable */}
                  <div className="space-y-1">
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 relative select-none">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-full transition-all duration-300 shadow-xs"
                        style={{ width: `${Math.min(100, Math.max(5, (formData.distanceKm / 50) * 100))}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                      <span>0 km (Rumah Terapis)</span>
                      <span className="font-bold text-emerald-800 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-600 inline" />
                        Jarak Terkunci Otomatis (Tidak Bisa Digeser Manual)
                      </span>
                      <span>50 km</span>
                    </div>
                  </div>

                  {/* Transport Fee Calculation */}
                  <div className="p-3 rounded-xl bg-white border border-emerald-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Biaya Transport (Pulang-Pergi):</span>
                      <span className="font-black text-emerald-800 text-sm sm:text-base">
                        Rp {transportCost.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {formData.distanceKm} km x Rp 2.500
                      </span>
                    </div>
                  </div>

                  {/* Location Detection Tools: GPS & Quick Area Selector */}
                  <div className="pt-1 space-y-2">
                    <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                      <span>Tentukan Lokasi &amp; Jarak Otomatis:</span>
                      <button
                        type="button"
                        onClick={() => setShowAreaPicker(!showAreaPicker)}
                        className="text-emerald-700 hover:text-emerald-800 underline font-bold text-[11px] cursor-pointer"
                      >
                        {showAreaPicker ? 'Tutup Pilihan Wilayah' : 'Pilih Wilayah / Kecamatan'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleDetectGps}
                        disabled={isGpsDetecting}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                      >
                        {isGpsDetecting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Mencari Titik GPS...</span>
                          </>
                        ) : (
                          <>
                            <Crosshair className="w-4 h-4 text-emerald-200" />
                            <span>📍 Deteksi Lokasi Otomatis (GPS)</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowAreaPicker(!showAreaPicker)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pilih Wilayah ({formData.distanceKm} km)</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAreaPicker ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* GPS Alert Notice */}
                    {gpsModalNotice && (
                      <div
                        className={`p-2.5 rounded-xl text-xs flex items-start gap-2 animate-in fade-in duration-200 ${
                          gpsModalNotice.type === 'success'
                            ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-300'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {gpsModalNotice.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <span className="font-semibold text-[11px] leading-tight">{gpsModalNotice.text}</span>
                      </div>
                    )}

                    {/* Quick Area Picker Grid */}
                    {showAreaPicker && (
                      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-md space-y-2 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                          <span className="text-[11px] font-bold text-slate-700">
                            Pilih Kecamatan / Wilayah Pasien:
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">Jarak Otomatis</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-44 overflow-y-auto pr-1">
                          {POPULAR_AREAS.map((area) => (
                            <button
                              key={area.name}
                              type="button"
                              onClick={() => handleSelectArea(area.name, area.roadKm)}
                              className={`p-2 rounded-xl text-left text-xs border transition-all cursor-pointer ${
                                formData.distanceKm === area.roadKm
                                  ? 'border-emerald-600 bg-emerald-50/90 font-bold text-emerald-950 ring-1 ring-emerald-500'
                                  : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="font-bold line-clamp-1">{area.name}</div>
                              <div className="text-[10px] text-emerald-700 font-semibold">{area.roadKm} km</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* Mandatory Personal Data: Nama, Usia, No. WhatsApp */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  
                  {/* Nama Lengkap */}
                  <div className="sm:col-span-8 space-y-1">
                    <label htmlFor="booking-fullname" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer">
                      <span>Nama Pasien *</span>
                      {validationErrors.fullName && (
                        <span className="text-[10px] text-rose-600 font-bold lowercase">{validationErrors.fullName}</span>
                      )}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="booking-fullname"
                        type="text"
                        aria-label="Nama Lengkap Pasien"
                        placeholder="Contoh: Muhammad Ihsan"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (validationErrors.fullName) {
                            setValidationErrors(prev => ({ ...prev, fullName: '' }));
                          }
                        }}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-all ${
                          validationErrors.fullName
                            ? 'border-rose-400 bg-rose-50/30 ring-2 ring-rose-500/20'
                            : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Usia Pasien */}
                  <div className="sm:col-span-4 space-y-1">
                    <label htmlFor="booking-age" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer">
                      <span>Usia *</span>
                      {validationErrors.age && (
                        <span className="text-[10px] text-rose-600 font-bold lowercase">Wajib</span>
                      )}
                    </label>
                    <input
                      id="booking-age"
                      type="number"
                      aria-label="Usia Pasien"
                      min="7"
                      max="99"
                      placeholder="Contoh: 35"
                      value={formData.age}
                      onChange={(e) => {
                        setFormData({ ...formData, age: e.target.value });
                        if (validationErrors.age) {
                          setValidationErrors(prev => ({ ...prev, age: '' }));
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm text-center focus:outline-none transition-all ${
                        validationErrors.age
                          ? 'border-rose-400 bg-rose-50/30 ring-2 ring-rose-500/20'
                          : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                {/* No WhatsApp */}
                <div className="space-y-1">
                  <label htmlFor="booking-phone" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer">
                    <span>No. WhatsApp Aktif *</span>
                    {validationErrors.phone && (
                      <span className="text-[10px] text-rose-600 font-bold lowercase">{validationErrors.phone}</span>
                    )}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="booking-phone"
                      type="tel"
                      aria-label="Nomor WhatsApp Aktif"
                      placeholder="Contoh: 081234567890"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (validationErrors.phone) {
                          setValidationErrors(prev => ({ ...prev, phone: '' }));
                        }
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-all ${
                        validationErrors.phone
                          ? 'border-rose-400 bg-rose-50/30 ring-2 ring-rose-500/20'
                          : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Mandatory Address (Alamat Pasien / Link Maps) */}
                <div className="space-y-1">
                  <label htmlFor="booking-address" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer">
                    <span>
                      {formData.serviceType === 'panggilan'
                        ? 'Alamat Lengkap / Patokan Rumah / Link Maps Pasien *'
                        : 'Alamat Domisili Pasien (Kecamatan / Kelurahan) *'}
                    </span>
                    {validationErrors.address && (
                      <span className="text-[10px] text-rose-600 font-bold lowercase">Wajib diisi</span>
                    )}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <textarea
                      id="booking-address"
                      aria-label="Alamat Pasien atau Tautan Google Maps"
                      rows={2}
                      placeholder={
                        formData.serviceType === 'panggilan'
                          ? 'Contoh: Perumahan Yasmin Sektor 3 No. 15, dekat Masjid Al-Ikhlas, atau tempel link Google Maps...'
                          : 'Contoh: Leuwiliang / Dramaga Bogor'
                      }
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (validationErrors.address) {
                          setValidationErrors(prev => ({ ...prev, address: '' }));
                        }
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-all resize-none ${
                        validationErrors.address
                          ? 'border-rose-400 bg-rose-50/30 ring-2 ring-rose-500/20'
                          : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Tanggal Terapi & Custom Sesi Waktu Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Date Picker with Quick Select Chips */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Pilih Tanggal *</span>
                    <span className="text-[10px] text-slate-500">Pilihan Cepat:</span>
                  </label>
                  
                  {/* Quick date chips */}
                  <div className="flex gap-1.5 mb-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickDateSelect(0)}
                      className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 cursor-pointer transition-colors"
                    >
                      Hari Ini
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDateSelect(1)}
                      className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 cursor-pointer transition-colors"
                    >
                      Besok
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDateSelect(2)}
                      className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 cursor-pointer transition-colors"
                    >
                      Lusa
                    </button>
                  </div>

                  <input
                    id="booking-selected-date"
                    type="date"
                    required
                    aria-label="Pilih Tanggal Reservasi"
                    value={formData.selectedDate}
                    onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Custom Sesi Waktu Dropdown */}
                <div className="space-y-1.5 relative" ref={timeDropdownRef}>
                  <label id="booking-time-label" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Sesi Waktu *
                  </label>

                  <button
                    type="button"
                    aria-labelledby="booking-time-label"
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isTimeDropdownOpen
                        ? 'border-emerald-600 ring-2 ring-emerald-600/30 bg-white shadow-md'
                        : 'border-slate-300 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate text-slate-800">{formData.selectedTimeSlot}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isTimeDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>

                  {/* Custom Time Options Menu */}
                  {isTimeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl z-40 overflow-hidden divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                      {timeSlots.map((slot) => {
                        const isSelected = formData.selectedTimeSlot === slot.label;
                        return (
                          <div
                            key={slot.label}
                            onClick={() => {
                              setFormData({ ...formData, selectedTimeSlot: slot.label });
                              setIsTimeDropdownOpen(false);
                            }}
                            className={`p-2.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-900 font-bold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {slot.icon}
                              <span>{slot.label}</span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

              {/* Medical Screening Checkboxes */}
              <div className="space-y-1.5">
                <span className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Skrining Riwayat Kesehatan (Beri tanda jika ada)
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <label htmlFor="cond-diabetes" className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      id="cond-diabetes"
                      type="checkbox"
                      aria-label="Riwayat Diabetes / Gula"
                      checked={formData.hasMedicalConditions.diabetes}
                      onChange={(e) => setFormData({
                        ...formData,
                        hasMedicalConditions: { ...formData.hasMedicalConditions, diabetes: e.target.checked }
                      })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Diabetes / Gula</span>
                  </label>

                  <label htmlFor="cond-hypertension" className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      id="cond-hypertension"
                      type="checkbox"
                      aria-label="Riwayat Darah Tinggi / Hipertensi"
                      checked={formData.hasMedicalConditions.highBloodPressure}
                      onChange={(e) => setFormData({
                        ...formData,
                        hasMedicalConditions: { ...formData.hasMedicalConditions, highBloodPressure: e.target.checked }
                      })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Darah Tinggi</span>
                  </label>

                  <label htmlFor="cond-blood-thinners" className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      id="cond-blood-thinners"
                      type="checkbox"
                      aria-label="Konsumsi Obat Pengencer Darah"
                      checked={formData.hasMedicalConditions.bloodThinners}
                      onChange={(e) => setFormData({
                        ...formData,
                        hasMedicalConditions: { ...formData.hasMedicalConditions, bloodThinners: e.target.checked }
                      })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Obat Pengencer Darah</span>
                  </label>

                  <label htmlFor="cond-heart" className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      id="cond-heart"
                      type="checkbox"
                      aria-label="Riwayat Penyakit Jantung"
                      checked={formData.hasMedicalConditions.heartDisease}
                      onChange={(e) => setFormData({
                        ...formData,
                        hasMedicalConditions: { ...formData.hasMedicalConditions, heartDisease: e.target.checked }
                      })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Riwayat Jantung</span>
                  </label>
                </div>
              </div>

              {/* Specific Health Notes */}
              <div className="space-y-1">
                <label htmlFor="booking-health-notes" className="text-xs font-bold text-slate-800 uppercase tracking-wider block cursor-pointer">
                  Keluhan Pasien / Catatan Khusus
                </label>
                <input
                  id="booking-health-notes"
                  type="text"
                  aria-label="Keluhan Pasien atau Catatan Khusus"
                  placeholder="Contoh: Pegal leher, pusing, masuk angin, ingin fokus titik sunnah..."
                  value={formData.healthNotes}
                  onChange={(e) => setFormData({ ...formData, healthNotes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Total & Submit */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Biaya:</span>
                  <span className="text-xl font-black text-emerald-800">
                    Rp {totalCost.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Kirim Reservasi via WhatsApp</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
