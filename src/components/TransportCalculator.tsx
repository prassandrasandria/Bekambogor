import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Navigation,
  Home,
  Car,
  MapPin,
  Search,
  Crosshair,
  Sparkles,
  Clock,
  Loader2,
  CheckCircle2,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { servicePackages, THERAPIST_INFO, calculateTransportCost } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TransportCalculatorProps {
  onSelectBookingWithDetails: (
    packageId: string,
    serviceType: 'panggilan' | 'ke_rumah_terapis',
    distanceKm: number,
    address?: string
  ) => void;
}

// Bogor area database for instant accurate road distance lookup (km from Kp. Leuwisadeng)
const BOGOR_LOCAL_DISTANCES: { [key: string]: { roadKm: number; estMinutes: string } } = {
  'leuwisadeng': { roadKm: 3, estMinutes: '10-15 mnt' },
  'sadeng': { roadKm: 3, estMinutes: '10-15 mnt' },
  'wangunjaya': { roadKm: 4, estMinutes: '10-15 mnt' },
  'leuwiliang': { roadKm: 5, estMinutes: '15-20 mnt' },
  'barengkok': { roadKm: 6, estMinutes: '15-20 mnt' },
  'cibungbulang': { roadKm: 10, estMinutes: '20-30 mnt' },
  'cibatok': { roadKm: 11, estMinutes: '20-30 mnt' },
  'cimanggu': { roadKm: 12, estMinutes: '25-35 mnt' },
  'pamijahan': { roadKm: 14, estMinutes: '30-40 mnt' },
  'ciampea': { roadKm: 15, estMinutes: '30-40 mnt' },
  'warung borong': { roadKm: 15, estMinutes: '30-40 mnt' },
  'cinangneng': { roadKm: 16, estMinutes: '35-45 mnt' },
  'cigudeg': { roadKm: 16, estMinutes: '35-45 mnt' },
  'dramaga': { roadKm: 20, estMinutes: '40-50 mnt' },
  'ipb': { roadKm: 21, estMinutes: '40-50 mnt' },
  'ciomas': { roadKm: 24, estMinutes: '45-60 mnt' },
  'laladon': { roadKm: 23, estMinutes: '45-55 mnt' },
  'pagelaran': { roadKm: 24, estMinutes: '45-60 mnt' },
  'bogor barat': { roadKm: 25, estMinutes: '50-65 mnt' },
  'semplak': { roadKm: 24, estMinutes: '50-60 mnt' },
  'bubulak': { roadKm: 23, estMinutes: '45-55 mnt' },
  'yasmin': { roadKm: 26, estMinutes: '50-65 mnt' },
  'curugmekar': { roadKm: 26, estMinutes: '50-65 mnt' },
  'bogor kota': { roadKm: 30, estMinutes: '60-75 mnt' },
  'stasiun bogor': { roadKm: 29, estMinutes: '60-75 mnt' },
  'tanah sareal': { roadKm: 30, estMinutes: '60-80 mnt' },
  'kedunghalang': { roadKm: 32, estMinutes: '60-80 mnt' },
  'bogor tengah': { roadKm: 30, estMinutes: '60-75 mnt' },
  'bogor timur': { roadKm: 33, estMinutes: '65-85 mnt' },
  'baranangsiang': { roadKm: 33, estMinutes: '65-85 mnt' },
  'pajajaran': { roadKm: 33, estMinutes: '65-85 mnt' },
  'bogor selatan': { roadKm: 32, estMinutes: '65-85 mnt' },
  'sukasari': { roadKm: 33, estMinutes: '65-85 mnt' },
  'kemang': { roadKm: 28, estMinutes: '55-70 mnt' },
  'parung': { roadKm: 35, estMinutes: '70-90 mnt' },
  'cibinong': { roadKm: 38, estMinutes: '75-95 mnt' },
  'pemda cibinong': { roadKm: 38, estMinutes: '75-95 mnt' },
  'bojonggede': { roadKm: 37, estMinutes: '70-90 mnt' },
  'sentul': { roadKm: 42, estMinutes: '80-100 mnt' },
  'babakan madang': { roadKm: 43, estMinutes: '80-100 mnt' },
  'gunung putri': { roadKm: 45, estMinutes: '85-110 mnt' },
  'cileungsi': { roadKm: 48, estMinutes: '90-120 mnt' },
  'citeureup': { roadKm: 40, estMinutes: '80-100 mnt' },
  'caringin': { roadKm: 38, estMinutes: '75-95 mnt' },
  'ciawi': { roadKm: 37, estMinutes: '75-95 mnt' },
  'megamendung': { roadKm: 43, estMinutes: '85-110 mnt' },
  'cisarua': { roadKm: 47, estMinutes: '90-120 mnt' }
};

export const TransportCalculator: React.FC<TransportCalculatorProps> = ({ onSelectBookingWithDetails }) => {
  const [serviceType, setServiceType] = useState<'panggilan' | 'ke_rumah_terapis'>('panggilan');
  const [distanceKm, setDistanceKm] = useState<number>(5);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(servicePackages[1].id);
  
  // Smart Address & Location Share Link input state
  const [locationInput, setLocationInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [analysisSource, setAnalysisSource] = useState<string | null>(null);
  const [detectedAddress, setDetectedAddress] = useState<string>('Leuwiliang, Kab. Bogor');
  const [gpsStatusMessage, setGpsStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const selectedPackage = servicePackages.find(p => p.id === selectedPackageId) || servicePackages[0];

  const transportCost = calculateTransportCost(distanceKm, serviceType);
  const totalCost = selectedPackage.price + transportCost;

  // Format currency in Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Haversine formula for road distance estimation (with 1.28x topography bend factor)
  const calculateHaversineRoadKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightKm = R * c;
    const roadKm = Math.round(straightKm * 1.28);
    return Math.max(1, roadKm);
  };

  // Core analysis function
  const analyzeAddressOrUrl = async (rawInput: string) => {
    const query = rawInput.trim();
    if (!query) return;

    setIsAnalyzing(true);
    const therapistLat = THERAPIST_INFO.mapCoordinates.lat;
    const therapistLng = THERAPIST_INFO.mapCoordinates.lng;

    try {
      // 1. Detect Coordinates or Google Maps URL containing coordinates
      const coordRegex = /(-?\d{1,2}\.\d+)[,\s]+(10\d\.\d+)/;
      const coordMatch = query.match(coordRegex);

      if (coordMatch) {
        const destLat = parseFloat(coordMatch[1]);
        const destLng = parseFloat(coordMatch[2]);
        const calculatedKm = calculateHaversineRoadKm(therapistLat, therapistLng, destLat, destLng);
        
        setDistanceKm(calculatedKm);
        setDetectedAddress(`Titik Koordinat Maps (${destLat.toFixed(4)}, ${destLng.toFixed(4)})`);
        setAnalysisSource('Koordinat Google Maps');
        setIsAnalyzing(false);
        return;
      }

      // 2. Check Local Curated Bogor Database (Instant 0ms lookup)
      const cleanLower = query.toLowerCase().replace(/kecamatan|desa|kelurahan|perumahan|jalan|jl\.|rt|rw/g, '').trim();
      let matchedKm: number | null = null;
      let matchedName = '';

      for (const [key, val] of Object.entries(BOGOR_LOCAL_DISTANCES)) {
        if (cleanLower.includes(key) || key.includes(cleanLower)) {
          matchedKm = val.roadKm;
          matchedName = key.charAt(0).toUpperCase() + key.slice(1);
          break;
        }
      }

      if (matchedKm !== null) {
        setDistanceKm(matchedKm);
        setDetectedAddress(`${query} (Wilayah ${matchedName})`);
        setAnalysisSource('Database Wilayah Bogor');
        setIsAnalyzing(false);
        return;
      }

      // 3. Online Geocoding with OpenStreetMap Nominatim for specific Bogor addresses
      try {
        const cleanQuery = query.replace(/https?:\/\/\S+/gi, '').trim() || query;
        const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery + ', Bogor, Indonesia')}&limit=1`;
        
        const response = await fetch(searchUrl, {
          headers: { 'Accept-Language': 'id,en' }
        });

        if (response.ok) {
          const results = await response.json();
          if (results && results.length > 0) {
            const destLat = parseFloat(results[0].lat);
            const destLng = parseFloat(results[0].lon);
            const calculatedKm = calculateHaversineRoadKm(therapistLat, therapistLng, destLat, destLng);
            
            setDistanceKm(calculatedKm);
            setDetectedAddress(results[0].display_name.split(',').slice(0, 3).join(','));
            setAnalysisSource('Analisis Geocoding Peta');
            setIsAnalyzing(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Geocoding fallback', e);
      }

      // 4. Default gentle estimation if completely unknown
      setDistanceKm(15);
      setDetectedAddress(`${query} (Estimasi Area Bogor)`);
      setAnalysisSource('Estimasi Rata-rata Bogor (15 km)');
    } catch (err) {
      console.error(err);
      setDistanceKm(10);
      setDetectedAddress(query);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Debounced auto-analysis as user types
  useEffect(() => {
    if (!locationInput.trim() || locationInput.trim().length < 3) return;
    
    const timer = setTimeout(() => {
      analyzeAddressOrUrl(locationInput);
    }, 800);

    return () => clearTimeout(timer);
  }, [locationInput]);

  // GPS Location Trigger - Request Browser Permission & Accurately Locate
  const handleRequestGpsLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage({
        type: 'error',
        text: 'Browser Anda belum mendukung fitur GPS. Silakan ketik nama kelurahan/kecamatan Anda di kolom input.'
      });
      return;
    }

    setIsGpsLoading(true);
    setGpsStatusMessage({
      type: 'info',
      text: 'Mengaktifkan GPS & meminta izin lokasi untuk mencari posisi akurat Anda...'
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const therapistLat = THERAPIST_INFO.mapCoordinates.lat;
        const therapistLng = THERAPIST_INFO.mapCoordinates.lng;

        // Calculate accurate road distance
        const calculatedKm = calculateHaversineRoadKm(therapistLat, therapistLng, userLat, userLng);
        setDistanceKm(calculatedKm);
        setAnalysisSource('GPS Lokasi Otomatis (Akurat)');

        // Try reverse geocode to get real street / area name
        let placeLabel = `GPS (${userLat.toFixed(4)}, ${userLng.toFixed(4)})`;
        try {
          const revUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}`;
          const res = await fetch(revUrl, { headers: { 'Accept-Language': 'id,en' } });
          if (res.ok) {
            const data = await res.json();
            if (data && data.display_name) {
              const parts = data.display_name.split(',');
              placeLabel = parts.slice(0, 3).join(',').trim();
            }
          }
        } catch {
          // Keep coordinate label if reverse lookup times out
        }

        setLocationInput(placeLabel);
        setDetectedAddress(placeLabel);
        setIsGpsLoading(false);
        setGpsStatusMessage({
          type: 'success',
          text: `Lokasi Anda terdeteksi: ${placeLabel} (${calculatedKm} km dari Kp. Leuwisadeng).`
        });
      },
      (error) => {
        setIsGpsLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsStatusMessage({
            type: 'error',
            text: 'Izin akses GPS belum diberikan di browser Anda. Silakan ketik nama kelurahan/kecamatan Anda di kolom pencarian di atas.'
          });
        } else {
          setGpsStatusMessage({
            type: 'error',
            text: 'Sinyal GPS lemah atau tidak dapat ditemukan. Silakan masukkan nama alamat secara manual di kolom input.'
          });
        }
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  const handleProceedToBooking = () => {
    onSelectBookingWithDetails(selectedPackage.id, serviceType, distanceKm, detectedAddress || locationInput);
  };

  return (
    <section id="kalkulator-transport" className="py-14 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            Hitung Biaya Transport Otomatis
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Kalkulator Biaya Transport
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Masukkan alamat rumah Anda atau gunakan tombol GPS lokasi otomatis. Sistem akan menganalisis jarak dari rumah terapis di <strong>Kp. Leuwisadeng</strong> dan menghitung rincian biaya transport <strong>Rp 1.500 / km (Pulang-Pergi / PP)</strong> secara transparan.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-xl overflow-hidden">
          
          <div className="p-6 sm:p-8 space-y-7">
            
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
                    <h4 className="font-bold text-sm text-slate-900">Bekam Panggilan (Ke Rumah Pasien)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Terapis datang membawa peralatan lengkap steril. Biaya transport transparan Rp 1.500/km (PP).</p>
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
                    <p className="text-xs text-slate-500 mt-0.5">Dipersilakan datang langsung ke Kp. Leuwisadeng. Bebas biaya transport (Rp 0)!</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Location Input, GPS Button, and Hitung Jarak in exact requested sequence */}
            {serviceType === 'panggilan' ? (
              <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-emerald-600" />
                    2. Masukkan Alamat Pasien / Gunakan GPS Otomatis
                  </label>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/80 px-2.5 py-0.5 rounded-lg self-start sm:self-auto">
                    Analisis Otomatis
                  </span>
                </div>

                {/* 1. Area Input Manual */}
                <div className="relative">
                  <label htmlFor="input-alamat-pasien" className="sr-only">
                    Ketik Alamat Pasien atau Tautan Google Maps
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    id="input-alamat-pasien"
                    type="text"
                    aria-label="Ketik alamat manual pasien atau tautan Google Maps"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        analyzeAddressOrUrl(locationInput);
                      }
                    }}
                    placeholder="1. Ketik alamat manual (contoh: Dramaga, Yasmin, Ciampea, Cibungbulang) atau tempel link Maps..."
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-2xs"
                  />
                </div>

                {/* 2. Tombol GPS Otomatis Lokasi Dia & 3. Tombol Hitung Jarak */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  
                  {/* Dedicated GPS Button */}
                  <button
                    type="button"
                    onClick={handleRequestGpsLocation}
                    disabled={isGpsLoading}
                    className="sm:col-span-7 py-3 px-4 rounded-xl bg-white border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50/80 disabled:opacity-60 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    {isGpsLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                        <span>Mencari Titik GPS Anda...</span>
                      </>
                    ) : (
                      <>
                        <Crosshair className="w-4 h-4 text-emerald-600 animate-pulse" />
                        <span>2. Tentukan Lokasi Saya Otomatis (GPS)</span>
                      </>
                    )}
                  </button>

                  {/* Hitung Jarak Button */}
                  <button
                    type="button"
                    onClick={() => analyzeAddressOrUrl(locationInput)}
                    disabled={isAnalyzing}
                    className="sm:col-span-5 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Menghitung...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>3. Hitung Jarak &amp; Biaya</span>
                      </>
                    )}
                  </button>
                </div>

                {/* GPS Status / Feedback Message */}
                {gpsStatusMessage && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2 animate-in fade-in ${
                      gpsStatusMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : gpsStatusMessage.type === 'error'
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-blue-50 border-blue-200 text-blue-900'
                    }`}
                  >
                    {gpsStatusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <span>{gpsStatusMessage.text}</span>
                  </div>
                )}

                {/* Live Distance Analysis Result Card */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-300/80 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        Hasil Analisis Jarak:
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{detectedAddress}</span>
                      </h4>
                      {analysisSource && (
                        <p className="text-[10px] text-slate-400">
                          Metode analisis: {analysisSource}
                        </p>
                      )}
                    </div>

                    <div className="text-right sm:self-center">
                      <span className="text-[10px] font-semibold text-slate-500 block">Jarak Terdeteksi</span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-800">
                        {distanceKm} km
                      </span>
                    </div>
                  </div>

                  {/* Distance Slider for Manual Adjustment - Clean styling */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor="input-slider-jarak" className="text-slate-600 font-semibold cursor-pointer">
                        Sesuaikan Jarak Manual:
                      </label>
                      <span className="font-bold text-emerald-800">Biaya transport Rp 2.500 / Km (Pulang Pergi)</span>
                    </div>
                    <input
                      id="input-slider-jarak"
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      aria-label="Sesuaikan Jarak Manual (km)"
                      value={distanceKm}
                      onChange={(e) => {
                        setDistanceKm(Number(e.target.value));
                        setDetectedAddress(`Penyesuaian Manual (${e.target.value} km)`);
                        setAnalysisSource('Slider Manual');
                      }}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Transport Breakdown Calculation */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                    <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-slate-500 block font-semibold">Rumus Biaya Transport:</span>
                      <span className="font-bold text-slate-800">{distanceKm} km x Rp 2.500</span>
                    </div>

                    <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-slate-500 block font-semibold">Total Biaya Transport:</span>
                      <span className="font-extrabold text-emerald-800 text-sm">{formatRupiah(transportCost)}</span>
                    </div>

                    <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 block font-semibold">Estimasi Perjalanan:</span>
                        <span className="font-bold text-slate-800">± {Math.round(distanceKm * 2.2)} - {Math.round(distanceKm * 2.8)} menit</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Datang ke Rumah Terapis Notice */
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Gratis Biaya Transport (Rp 0)</span>
                </div>
                <p className="leading-relaxed">
                  Anda memilih untuk datang langsung ke kediaman terapis di <strong>{THERAPIST_INFO.address}</strong>. Tidak ada biaya transport sama sekali. Anda hanya membayar biaya paket terapi bekam yang dipilih.
                </p>
              </div>
            )}

            {/* Step 3: Package Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                3. Pilih Paket Bekam
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {servicePackages.map((pkg) => {
                  const isSelected = pkg.id === selectedPackageId;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/30 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {pkg.cupCount}
                          </span>
                          {pkg.isPopular && (
                            <span className="text-[9px] font-black bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded">
                              FAVORIT
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{pkg.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{pkg.tagline}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Tarif Paket:</span>
                        <span className="font-extrabold text-sm text-emerald-800">{formatRupiah(pkg.price)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Summary & Single Action Button */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <div className="md:col-span-7 space-y-2.5">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">
                    Ringkasan Estimasi Biaya &amp; Rute
                  </span>
                  
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span>Paket Terapi: <strong>{selectedPackage.name}</strong></span>
                      <span className="text-white font-semibold">{formatRupiah(selectedPackage.price)}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span>
                        Biaya Transport {serviceType === 'panggilan' ? `(${distanceKm} km x Rp 2.500)` : '(Di Rumah Terapis)'}:
                      </span>
                      <span className={transportCost === 0 ? 'text-emerald-400 font-bold' : 'text-white font-semibold'}>
                        {transportCost === 0 ? 'GRATIS (Rp 0)' : formatRupiah(transportCost)}
                      </span>
                    </div>

                    {serviceType === 'panggilan' && (
                      <div className="flex justify-between text-[11px] text-emerald-300/90 pt-0.5">
                        <span>Tujuan:</span>
                        <span className="truncate max-w-[220px] font-medium">{detectedAddress}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-emerald-300/80 pt-1">
                    * Jarum steril 1x pakai dibuka di hadapan pasien • Cek tensi awal gratis
                  </p>
                </div>

                <div className="md:col-span-5 text-center md:text-right space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Estimasi Biaya</span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-300">
                      {formatRupiah(totalCost)}
                    </span>
                  </div>

                  {/* Single Clean Primary Action Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleProceedToBooking}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Lanjut Pesan via WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                      Formulir data akan terisi otomatis untuk konfirmasi ke WhatsApp
                    </p>
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
