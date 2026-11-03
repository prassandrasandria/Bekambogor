import React, { useState } from 'react';
import { Calculator, Navigation, Home, Car, CheckCircle2, ArrowRight, Info, MapPin } from 'lucide-react';
import { servicePackages, THERAPIST_INFO, calculateTransportCost } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TransportCalculatorProps {
  onSelectBookingWithDetails: (packageId: string, serviceType: 'panggilan' | 'ke_rumah_terapis', distanceKm: number, transportCost: number, totalCost: number) => void;
}

export const TransportCalculator: React.FC<TransportCalculatorProps> = ({ onSelectBookingWithDetails }) => {
  const [serviceType, setServiceType] = useState<'panggilan' | 'ke_rumah_terapis'>('panggilan');
  const [distanceKm, setDistanceKm] = useState<number>(5);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(servicePackages[1].id);

  const selectedPackage = servicePackages.find(p => p.id === selectedPackageId) || servicePackages[0];

  const transportCost = calculateTransportCost(distanceKm, serviceType);
  const totalCost = selectedPackage.price + transportCost;

  const quickDistances = [3, 5, 8, 12, 18, 25, 35];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleWhatsAppBooking = () => {
    const transportText = serviceType === 'panggilan'
      ? `Rp ${transportCost.toLocaleString('id-ID')} (${distanceKm} km x 2 PP x Rp 1.500)`
      : 'Rp 0 (Gratis - Terapi di Rumah Terapis Leuwisadeng)';

    const message = `*KONSULTASI & BOOKING BEKAM BOGOR*
---------------------------------------
📦 *Paket:* ${selectedPackage.name} (Rp ${selectedPackage.price.toLocaleString('id-ID')})
🚗 *Layanan:* ${serviceType === 'panggilan' ? 'Bekam Panggilan ke Rumah Pasien' : 'Terapi di Rumah Terapis (Kp. Leuwisadeng)'}
${serviceType === 'panggilan' ? `📍 *Jarak Tempuh:* ${distanceKm} km (PP: ${distanceKm * 2} km)\n💰 *Biaya Transport:* ${transportText}\n` : ''}💵 *TOTAL ESTIMASI BIAYA:* Rp ${totalCost.toLocaleString('id-ID')}
---------------------------------------
Assalamu'alaikum, saya ikhwan ingin memesan sesi bekam dengan rincian di atas. Mohon info ketersediaan jadwal terapis. Terima kasih.`;

    const waUrl = `${THERAPIST_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="kalkulator-transport" className="py-14 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            Transparan Tanpa Biaya Tersembunyi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Hitung Biaya Transport
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hitung langsung perkiraan Biaya Transport ke lokasi Anda. Tarif resmi <strong>Rp 1.500 / km</strong> dihitung <strong>Pulang-Pergi (PP)</strong>. Jika terapi di rumah terapis, bebas biaya transport (Rp 0)!
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-xl overflow-hidden">
          
          {/* Top Banner Notice */}
          <div className="bg-emerald-800 text-emerald-50 px-6 py-3 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span><strong>Titik Awal Terapis:</strong> {THERAPIST_INFO.address}</span>
            </div>
            <a
              href={THERAPIST_INFO.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200 hover:text-white underline font-semibold flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Buka di Google Maps</span>
            </a>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Step 1: Mode Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                1. Pilih Jenis Layanan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setServiceType('panggilan')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    serviceType === 'panggilan'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${serviceType === 'panggilan' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Bekam Panggilan (Ke Rumah Anda)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Terapis datang membawa peralatan lengkap ke rumah Anda. Biaya transport Rp 1.500/km (PP).</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('ke_rumah_terapis')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    serviceType === 'ke_rumah_terapis'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${serviceType === 'ke_rumah_terapis' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">Datang ke Rumah Terapis</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        GRATIS TRANSPORT
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Dipersilakan datang langsung ke Kp. Leuwisadeng. Bebas biaya transport (Rp 0).</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Distance Input */}
            {serviceType === 'panggilan' ? (
              <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-emerald-600" />
                    2. Perkiraan Jarak Rumah Terapis ke Rumah Anda (km)
                  </label>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-100/70 px-2.5 py-0.5 rounded-lg self-start sm:self-auto">
                    Hitungan PP = {distanceKm} km x 2 = {distanceKm * 2} km
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="flex-1 accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl px-3 py-1.5 shadow-2xs">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Math.max(1, Number(e.target.value)))}
                      className="w-14 text-center font-extrabold text-base text-slate-900 focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 font-semibold">km</span>
                  </div>
                </div>

                {/* Quick distance buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-500 font-medium mr-1">Pilihan Cepat:</span>
                  {quickDistances.map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => setDistanceKm(km)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        distanceKm === km
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {km} km
                    </button>
                  ))}
                </div>

                {/* Formula Breakdown Card */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Rumus Hitungan Biaya Transport:</span>{' '}
                    <span>{distanceKm} km x 2 (PP) x Rp 1.500 = </span>
                    <strong className="text-emerald-700 font-bold">{formatRupiah(transportCost)}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong>Terapi di Rumah Terapis:</strong> Biaya transport adalah <strong>Rp 0 (GRATIS)</strong>. Anda cukup membayar biaya paket bekam yang dipilih.
                </div>
              </div>
            )}

            {/* Step 3: Package Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                {serviceType === 'panggilan' ? '3.' : '2.'} Pilih Paket Bekam
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {servicePackages.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-md">
                            {pkg.cupCount}
                          </span>
                          {pkg.isPopular && (
                            <span className="text-[9px] font-extrabold bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded">
                              Favorit
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">{pkg.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{pkg.tagline}</p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-100/80">
                        <span className="text-base font-extrabold text-slate-900">
                          {formatRupiah(pkg.price)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">+ transport</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Summary & Total Card */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <div className="md:col-span-7 space-y-2.5">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">
                    Ringkasan Estimasi Biaya
                  </span>
                  
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span>Paket: <strong>{selectedPackage.name}</strong></span>
                      <span className="text-white font-semibold">{formatRupiah(selectedPackage.price)}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span>
                        Biaya Transport {serviceType === 'panggilan' ? `(${distanceKm} km x 2 PP)` : '(Di Rumah Terapis)'}:
                      </span>
                      <span className={transportCost === 0 ? 'text-emerald-400 font-bold' : 'text-white font-semibold'}>
                        {transportCost === 0 ? 'GRATIS (Rp 0)' : formatRupiah(transportCost)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-300/80 pt-1">
                    * Khusus Ikhwan (Laki-laki) • Jarum steril 1x pakai • Cek tensi gratis
                  </p>
                </div>

                <div className="md:col-span-5 text-center md:text-right space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Biaya Sesi</span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-300">
                      {formatRupiah(totalCost)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppBooking}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Chat WhatsApp untuk Pesan</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => onSelectBookingWithDetails(selectedPackage.id, serviceType, distanceKm, transportCost, totalCost)}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Isi Formulir Lengkap Online
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
