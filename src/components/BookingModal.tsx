import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Phone, ShieldCheck, Heart, CheckCircle2, Car, Home } from 'lucide-react';
import { servicePackages, THERAPIST_INFO, calculateTransportCost } from '../data/treatments';
import { BookingFormData, ServicePackage } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialServiceType?: 'panggilan' | 'ke_rumah_terapis';
  initialDistanceKm?: number;
  initialDate?: string;
  initialSymptom?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  initialServiceType = 'panggilan',
  initialDistanceKm = 5,
  initialDate,
  initialSymptom
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    serviceType: initialServiceType,
    servicePackageId: initialPackageId || servicePackages[1].id,
    distanceKm: initialDistanceKm,
    transportCost: calculateTransportCost(initialDistanceKm, initialServiceType),
    totalCost: 0,
    selectedDate: initialDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    selectedTimeSlot: 'Pagi (08:30 - 10:30 WIB)',
    address: '',
    healthNotes: initialSymptom ? `Keluhan: ${initialSymptom}` : '',
    hasMedicalConditions: {
      diabetes: false,
      bloodThinners: false,
      highBloodPressure: false,
      heartDisease: false
    }
  });

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  const selectedPackage = servicePackages.find(p => p.id === formData.servicePackageId) || servicePackages[0];
  const transportCost = calculateTransportCost(formData.distanceKm, formData.serviceType);
  const totalCost = selectedPackage.price + transportCost;

  useEffect(() => {
    if (initialPackageId) {
      setFormData(prev => ({ ...prev, servicePackageId: initialPackageId }));
    }
    if (initialServiceType) {
      setFormData(prev => ({ ...prev, serviceType: initialServiceType }));
    }
    if (initialDistanceKm) {
      setFormData(prev => ({ ...prev, distanceKm: initialDistanceKm }));
    }
    if (initialDate) {
      setFormData(prev => ({ ...prev, selectedDate: initialDate }));
    }
    if (initialSymptom) {
      setFormData(prev => ({ ...prev, healthNotes: initialSymptom }));
    }
  }, [initialPackageId, initialServiceType, initialDistanceKm, initialDate, initialSymptom]);

  if (!isOpen) return null;

  const timeSlots = [
    'Pagi (08:30 - 10:30 WIB)',
    'Siang (10:30 - 12:30 WIB)',
    'Ba\'da Dzuhur (13:30 - 15:30 WIB)',
    'Sore (16:00 - 18:00 WIB)',
    'Malam Ba\'da Isya (19:30 - 21:00 WIB)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const conditionsList = [];
    if (formData.hasMedicalConditions.diabetes) conditionsList.push('Diabetes/Gula');
    if (formData.hasMedicalConditions.bloodThinners) conditionsList.push('Obat Pengencer Darah');
    if (formData.hasMedicalConditions.highBloodPressure) conditionsList.push('Hipertensi/Darah Tinggi');
    if (formData.hasMedicalConditions.heartDisease) conditionsList.push('Penyakit Jantung');

    const conditionsText = conditionsList.length > 0 ? conditionsList.join(', ') : 'Tidak ada (Normal)';

    const transportInfoText = formData.serviceType === 'panggilan'
      ? `Rp ${transportCost.toLocaleString('id-ID')} (${formData.distanceKm} km x 2 PP x Rp 1.500)`
      : 'Rp 0 (Gratis Transport - Datang ke Rumah Terapis Leuwisadeng)';

    const message = `*FORMULIR PENDAFTARAN BEKAM BOGOR*
---------------------------------------
👤 *Nama Pasien:* ${formData.fullName} (Ikhwan)
📱 *No. WhatsApp:* ${formData.phone}
🏠 *Tipe Layanan:* ${formData.serviceType === 'panggilan' ? 'Bekam Panggilan (Ke Rumah Pasien)' : 'Datang ke Rumah Terapis (Kp. Leuwisadeng)'}
${formData.serviceType === 'panggilan' ? `📍 *Alamat Lengkap:* ${formData.address || '-'}\n🚗 *Jarak Tempuh:* ${formData.distanceKm} km (PP: ${formData.distanceKm * 2} km)\n💰 *Biaya Transport:* ${transportInfoText}\n` : `🏡 *Lokasi Terapi:* Kp. Leuwisadeng RT 01 RW 03 Kec. Leuwisadeng\n`}
📦 *Paket Bekam:* ${selectedPackage.name} (Rp ${selectedPackage.price.toLocaleString('id-ID')})
📅 *Hari/Tanggal:* ${formData.selectedDate}
⏰ *Sesi Waktu:* ${formData.selectedTimeSlot}
💵 *TOTAL BIAYA:* Rp ${totalCost.toLocaleString('id-ID')}

🩺 *Kondisi Kesehatan:* ${conditionsText}
📝 *Catatan Keluhan:* ${formData.healthNotes || 'Ingin bekam rutin sunnah & stamina'}
---------------------------------------
Mohon konfirmasi ketersediaan jadwal terapis. Terima kasih.`;

    const waLink = `${THERAPIST_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
    setGeneratedWaUrl(waLink);
    setBookingSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 text-[11px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Khusus Ikhwan (Laki-laki)
            </div>
            <h3 className="text-xl sm:text-2xl font-black">Formulir Pendaftaran Bekam</h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              {THERAPIST_INFO.tagline} • Ditangani {THERAPIST_INFO.certification}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
          
          {bookingSubmitted ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Pendaftaran Siap Dikirim!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Atas nama <strong>{formData.fullName}</strong> untuk tanggal <strong>{formData.selectedDate}</strong>.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left text-xs space-y-1.5">
                <p><strong>Paket:</strong> {selectedPackage.name}</p>
                <p><strong>Layanan:</strong> {formData.serviceType === 'panggilan' ? `Bekam Panggilan (${formData.distanceKm} km)` : 'Datang ke Rumah Terapis (Leuwisadeng)'}</p>
                <p><strong>Total Estimasi:</strong> <strong className="text-emerald-800 text-sm">Rp {totalCost.toLocaleString('id-ID')}</strong></p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href={generatedWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md text-xs sm:text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Kirim ke WhatsApp Terapis</span>
                </a>
                <button
                  onClick={() => {
                    setBookingSubmitted(false);
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Service Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Pilih Lokasi Terapi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'panggilan' })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      formData.serviceType === 'panggilan'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🚗 Panggilan ke Rumah Pasien
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'ke_rumah_terapis' })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      formData.serviceType === 'ke_rumah_terapis'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🏡 Di Rumah Terapis (Gratis Transport)
                  </button>
                </div>
              </div>

              {/* Package Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Paket Terapi Bekam
                </label>
                <select
                  value={formData.servicePackageId}
                  onChange={(e) => setFormData({ ...formData, servicePackageId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {servicePackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — Rp {pkg.price.toLocaleString('id-ID')} ({pkg.cupCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Distance Slider (Only for Panggilan) */}
              {formData.serviceType === 'panggilan' && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Perkiraan Jarak dari Leuwisadeng:</span>
                    <span className="font-extrabold text-emerald-700">{formData.distanceKm} km (PP: {formData.distanceKm * 2} km)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={formData.distanceKm}
                    onChange={(e) => setFormData({ ...formData, distanceKm: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Biaya Transport: Rp {transportCost.toLocaleString('id-ID')}</span>
                    <span>(Rp 1.500/km PP)</span>
                  </div>
                </div>
              )}

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pilih Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.selectedDate}
                    onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Sesi Waktu
                  </label>
                  <select
                    value={formData.selectedTimeSlot}
                    onChange={(e) => setFormData({ ...formData, selectedTimeSlot: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Nama Pasien (Ikhwan) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    No. WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Address (If Panggilan) */}
              {formData.serviceType === 'panggilan' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Alamat Lengkap / Patokan Rumah *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jl. Raya Dramaga No. 12, dekat Masjid..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Medical Screening Checkboxes */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Skrining Kesehatan (Beri tanda jika ada)
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <label className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasMedicalConditions.diabetes}
                      onChange={(e) => setFormData({
                        ...formData,
                        hasMedicalConditions: { ...formData.hasMedicalConditions, diabetes: e.target.checked }
                      })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Diabetes/Gula</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasMedicalConditions.highBloodPressure}
                      onChange={(e) => setFormData({
                        ...formData,
                        hasMedicalConditions: { ...formData.hasMedicalConditions, highBloodPressure: e.target.checked }
                      })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Darah Tinggi</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasMedicalConditions.bloodThinners}
                      onChange={(e) => setFormData({
                        ...formData,
                        hasMedicalConditions: { ...formData.hasMedicalConditions, bloodThinners: e.target.checked }
                      })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Obat Pengencer Darah</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
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
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Keluhan / Catatan Khusus
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pegal leher, masuk angin, ingin fokus titik sunnah..."
                  value={formData.healthNotes}
                  onChange={(e) => setFormData({ ...formData, healthNotes: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Total & Submit */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Biaya:</span>
                  <span className="text-lg font-black text-emerald-800">
                    Rp {totalCost.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Kirim via WhatsApp</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
