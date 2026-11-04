import React, { useState, useEffect, useRef } from 'react';
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
  AlertCircle,
  Lock,
  X,
  Globe
} from 'lucide-react';
import { servicePackages, THERAPIST_INFO, calculateTransportCost } from '../data/treatments';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface TransportCalculatorProps {
  onSelectBookingWithDetails: (
    packageId: string,
    serviceType: 'panggilan' | 'ke_rumah_terapis',
    distanceKm: number,
    address?: string
  ) => void;
  onTransportStateChange?: (state: {
    packageId: string;
    serviceType: 'panggilan' | 'ke_rumah_terapis';
    distanceKm: number;
    address: string;
  }) => void;
}

export interface LocationSuggestion {
  id: string;
  primary: string;
  secondary: string;
  roadKm: number;
  estMinutes: string;
  source: 'database' | 'online';
  lat?: number;
  lon?: number;
}

// Curated Local Database for instant 0ms lookup
export const CURATED_LOCAL_LOCATIONS = [
  { name: 'Leuwisadeng', sub: 'Kecamatan Leuwisadeng, Bogor Barat', roadKm: 3, estMinutes: '10-15 mnt', aliases: ['sadeng', 'leuwisadeng', 'babakan sadeng', 'sibanteng'] },
  { name: 'Wangunjaya', sub: 'Leuwisadeng, Kab. Bogor', roadKm: 4, estMinutes: '10-15 mnt', aliases: ['wangunjaya'] },
  { name: 'Leuwiliang', sub: 'Pusat Kecamatan Leuwiliang, Kab. Bogor', roadKm: 5, estMinutes: '15-20 mnt', aliases: ['leuwiliang', 'terminal leuwiliang', 'pasar leuwiliang'] },
  { name: 'RSUD Leuwiliang', sub: 'Jl. Raya Cibeber, Leuwiliang', roadKm: 5, estMinutes: '15-20 mnt', aliases: ['rsud leuwiliang', 'cibeber'] },
  { name: 'Barengkok', sub: 'Leuwiliang, Kab. Bogor', roadKm: 6, estMinutes: '15-20 mnt', aliases: ['barengkok'] },
  { name: 'Puraseda', sub: 'Leuwiliang, Kab. Bogor', roadKm: 8, estMinutes: '20-25 mnt', aliases: ['puraseda', 'karyasari'] },
  { name: 'Cibungbulang', sub: 'Kecamatan Cibungbulang, Kab. Bogor', roadKm: 10, estMinutes: '20-30 mnt', aliases: ['cibungbulang'] },
  { name: 'Cibatok (1 & 2)', sub: 'Cibungbulang, Kab. Bogor', roadKm: 11, estMinutes: '20-30 mnt', aliases: ['cibatok', 'cibatok 1', 'cibatok 2', 'super kue cibatok', 'pasar cibatok'] },
  { name: 'Cemplang', sub: 'Cibungbulang, Kab. Bogor', roadKm: 12, estMinutes: '25-35 mnt', aliases: ['cemplang', 'spbu cemplang'] },
  { name: 'Cimanggu Cibungbulang', sub: 'Cibungbulang, Kab. Bogor', roadKm: 12, estMinutes: '25-35 mnt', aliases: ['cimanggu 1', 'cimanggu 2'] },
  { name: 'Situ Daun', sub: 'Tenjolaya / Ciampea, Kab. Bogor', roadKm: 15, estMinutes: '30-40 mnt', aliases: ['situ daun', 'situdaun'] },
  { name: 'Pamijahan', sub: 'Kecamatan Pamijahan, Kab. Bogor', roadKm: 14, estMinutes: '30-40 mnt', aliases: ['pamijahan', 'gunung picung', 'gunung sari', 'cianten'] },
  { name: 'Ciampea', sub: 'Kecamatan Ciampea, Kab. Bogor', roadKm: 15, estMinutes: '30-40 mnt', aliases: ['ciampea', 'bojong rangkas', 'benteng'] },
  { name: 'Cibanteng', sub: 'Ciampea, Kab. Bogor', roadKm: 18, estMinutes: '35-45 mnt', aliases: ['cibanteng', 'desa cibanteng'] },
  { name: 'Warung Borong', sub: 'Jl. Raya Ciampea, Kab. Bogor', roadKm: 15, estMinutes: '30-40 mnt', aliases: ['warung borong', 'wr borong', 'borong'] },
  { name: 'Cinangneng', sub: 'Ciampea / Tenjolaya, Kab. Bogor', roadKm: 16, estMinutes: '35-45 mnt', aliases: ['cinangneng', 'cihideung'] },
  { name: 'Tenjolaya', sub: 'Kecamatan Tenjolaya, Kab. Bogor', roadKm: 17, estMinutes: '35-50 mnt', aliases: ['tenjolaya', 'tapos'] },
  { name: 'Cigudeg', sub: 'Kecamatan Cigudeg, Kab. Bogor', roadKm: 16, estMinutes: '35-45 mnt', aliases: ['cigudeg', 'bunar', 'rengasjajar'] },
  { name: 'Jasinga', sub: 'Kecamatan Jasinga, Kab. Bogor', roadKm: 22, estMinutes: '45-60 mnt', aliases: ['jasinga', 'sipajang'] },
  { name: 'Desa Petir', sub: 'Kecamatan Dramaga, Kab. Bogor', roadKm: 18, estMinutes: '35-45 mnt', aliases: ['petir', 'desa petir', 'petir dramaga', 'jalan raya petir'] },
  { name: 'Dramaga', sub: 'Kecamatan Dramaga, Kab. Bogor', roadKm: 20, estMinutes: '40-50 mnt', aliases: ['dramaga', 'ciherang', 'babakan dramaga'] },
  { name: 'IPB University (Dramaga)', sub: 'Kampus IPB Dramaga, Kab. Bogor', roadKm: 21, estMinutes: '40-50 mnt', aliases: ['ipb', 'kampus ipb', 'institut pertanian bogor'] },
  { name: 'Laladon', sub: 'Ciomas / Dramaga, Terminal Laladon', roadKm: 23, estMinutes: '45-55 mnt', aliases: ['laladon', 'terminal laladon'] },
  { name: 'Bubulak', sub: 'Bogor Barat, Terminal Bubulak', roadKm: 23, estMinutes: '45-55 mnt', aliases: ['bubulak', 'terminal bubulak'] },
  { name: 'Sindangbarang', sub: 'Bogor Barat, Kota Bogor', roadKm: 24, estMinutes: '45-55 mnt', aliases: ['sindangbarang', 'sindang barang', 'sindang', 'pilar'] },
  { name: 'Toko Al Hasbi (Sindang Barang)', sub: 'Jl. Sindang Barang Pilar 1, Bogor Barat', roadKm: 24, estMinutes: '45-55 mnt', aliases: ['toko al hasbi', 'toko alhasbi', 'al hasbi', 'alhasbi', 'toko'] },
  { name: 'Ciomas', sub: 'Kecamatan Ciomas, Kab. Bogor', roadKm: 24, estMinutes: '45-60 mnt', aliases: ['ciomas', 'ciomas permai', 'sukaharja', 'ciapus'] },
  { name: 'Pagelaran', sub: 'Ciomas, Kab. Bogor', roadKm: 24, estMinutes: '45-60 mnt', aliases: ['pagelaran', 'pagelaran ciomas'] },
  { name: 'Semplak', sub: 'Bogor Barat, Lanud Atang Senjaya', roadKm: 24, estMinutes: '50-60 mnt', aliases: ['semplak', 'ats', 'salabenda'] },
  { name: 'Bogor Barat', sub: 'Kota Bogor, Jawa Barat', roadKm: 25, estMinutes: '50-65 mnt', aliases: ['bogor barat', 'cilendek', 'cilendek barat', 'cilendek timur'] },
  { name: 'Taman Yasmin', sub: 'Perumahan Yasmin, Bogor Barat', roadKm: 26, estMinutes: '50-65 mnt', aliases: ['yasmin', 'taman yasmin', 'curug mekar', 'sektor 1', 'sektor 2', 'sektor 3'] },
  { name: 'Taman Heulang', sub: 'Tanah Sareal, Kota Bogor', roadKm: 28, estMinutes: '55-70 mnt', aliases: ['taman heulang', 'heulang'] },
  { name: 'Empang (Bogor Selatan)', sub: 'Bogor Selatan, Kota Bogor', roadKm: 28, estMinutes: '55-70 mnt', aliases: ['empang', 'empang bogor', 'mall bnr'] },
  { name: 'Stasiun Bogor', sub: 'Pabaton, Bogor Tengah, Kota Bogor', roadKm: 29, estMinutes: '60-75 mnt', aliases: ['stasiun bogor', 'stasiun', 'bogor station'] },
  { name: 'Stasiun Cilebut', sub: 'Cilebut Barat, Sukaraja, Kab. Bogor', roadKm: 33, estMinutes: '65-80 mnt', aliases: ['stasiun cilebut', 'cilebut'] },
  { name: 'Stasiun Bojong Gede', sub: 'Bojonggede, Kab. Bogor', roadKm: 36, estMinutes: '70-90 mnt', aliases: ['stasiun bojong gede', 'stasiun bojonggede', 'bojong gede', 'bojonggede'] },
  { name: 'Sukaraja', sub: 'Kecamatan Sukaraja, Kab. Bogor', roadKm: 34, estMinutes: '65-85 mnt', aliases: ['sukaraja', 'sukaraja bogor'] },
  { name: 'Bogor Kota (Pusat)', sub: 'Kota Bogor, Jawa Barat', roadKm: 30, estMinutes: '60-75 mnt', aliases: ['bogor', 'kota bogor', 'bogor tengah', 'kebun raya bogor'] },
  { name: 'Tanah Sareal', sub: 'Kecamatan Tanah Sareal, Kota Bogor', roadKm: 30, estMinutes: '60-80 mnt', aliases: ['tanah sareal', 'kebon pedes', 'tegal gundil'] },
  { name: 'Kedung Halang', sub: 'Bogor Utara, Kota Bogor', roadKm: 32, estMinutes: '60-80 mnt', aliases: ['kedunghalang', 'kedung halang', 'pomad'] },
  { name: 'Baranangsiang', sub: 'Bogor Timur, Terminal Baranangsiang', roadKm: 33, estMinutes: '65-85 mnt', aliases: ['baranangsiang', 'terminal baranangsiang'] },
  { name: 'Pajajaran', sub: 'Jl. Pajajaran, Kota Bogor', roadKm: 33, estMinutes: '65-85 mnt', aliases: ['pajajaran', 'jalan pajajaran', 'bantarjati'] },
  { name: 'Tajur', sub: 'Bogor Timur, Kota Bogor', roadKm: 35, estMinutes: '70-90 mnt', aliases: ['tajur', 'jalan tajur'] },
  { name: 'Parung', sub: 'Kecamatan Parung, Kab. Bogor', roadKm: 35, estMinutes: '70-90 mnt', aliases: ['parung', 'pasar parung', 'lebaksangka'] },
  { name: 'Ciawi', sub: 'Kecamatan Ciawi, Simpang Ciawi', roadKm: 37, estMinutes: '75-95 mnt', aliases: ['ciawi', 'simpang ciawi', 'gadog'] },
  { name: 'Cibinong', sub: 'Kecamatan Cibinong, Kab. Bogor', roadKm: 38, estMinutes: '75-95 mnt', aliases: ['cibinong', 'ccm', 'cibinong city mall', 'stadion pakansari'] },
  { name: 'Citeureup', sub: 'Kecamatan Citeureup, Kab. Bogor', roadKm: 40, estMinutes: '80-100 mnt', aliases: ['citeureup'] },
  { name: 'Sentul & Sirkuit Sentul', sub: 'Sentul City / Babakan Madang, Kab. Bogor', roadKm: 41, estMinutes: '80-100 mnt', aliases: ['sentul', 'sentul city', 'sirkuit sentul', 'babakan madang', 'aeon sentul'] },
  { name: 'Cigombong', sub: 'Kecamatan Cigombong, Kab. Bogor', roadKm: 42, estMinutes: '75-95 mnt', aliases: ['cigombong', 'stasiun cigombong'] },
  { name: 'Megamendung', sub: 'Kawasan Puncak, Kab. Bogor', roadKm: 43, estMinutes: '85-110 mnt', aliases: ['megamendung', 'puncak'] },
  { name: 'Cisarua', sub: 'Kawasan Puncak, Cisarua, Kab. Bogor', roadKm: 47, estMinutes: '90-120 mnt', aliases: ['cisarua', 'taman safari'] },
  { name: 'Gunung Putri', sub: 'Kecamatan Gunung Putri, Kab. Bogor', roadKm: 45, estMinutes: '85-110 mnt', aliases: ['gunung putri', 'wanaherang', 'cicadas'] },
  { name: 'Cileungsi', sub: 'Kecamatan Cileungsi, Kab. Bogor', roadKm: 48, estMinutes: '90-120 mnt', aliases: ['cileungsi', 'mekarsari', 'metland cileungsi'] },
  // Jabodetabek & sekitarnya
  { name: 'Depok (Margonda)', sub: 'Kota Depok, Jawa Barat', roadKm: 46, estMinutes: '80-110 mnt', aliases: ['depok', 'margonda', 'ui depok', 'cinere'] },
  { name: 'Jakarta Selatan', sub: 'DKI Jakarta (Cilandak / Pasar Minggu / Kebayoran)', roadKm: 55, estMinutes: '90-120 mnt', aliases: ['jakarta selatan', 'jaksel', 'cilandak', 'tebet', 'kebayoran'] },
  { name: 'Tangerang Selatan', sub: 'Banten (BSD / Ciputat / Pamulang)', roadKm: 52, estMinutes: '85-115 mnt', aliases: ['tangsel', 'tangerang selatan', 'bsd', 'ciputat', 'pamulang'] },
  { name: 'Bekasi', sub: 'Jawa Barat (Bekasi Barat / Timur)', roadKm: 65, estMinutes: '100-130 mnt', aliases: ['bekasi', 'cikarang'] },
  { name: 'Sukabumi', sub: 'Kota / Kabupaten Sukabumi, Jawa Barat', roadKm: 60, estMinutes: '95-130 mnt', aliases: ['sukabumi', 'cibadak', 'cicurug'] }
];

export const TransportCalculator: React.FC<TransportCalculatorProps> = ({
  onSelectBookingWithDetails,
  onTransportStateChange
}) => {
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

  // Address Suggestions / Autocomplete state - Global Indonesia Coverage
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState<boolean>(false);
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const suggestionsBoxRef = useRef<HTMLDivElement>(null);

  const selectedPackage = servicePackages.find(p => p.id === selectedPackageId) || servicePackages[0];
  const transportCost = calculateTransportCost(distanceKm, serviceType);
  const totalCost = selectedPackage.price + transportCost;

  // Sync to parent/App.tsx so any booking button inherits these exact details
  useEffect(() => {
    if (onTransportStateChange) {
      onTransportStateChange({
        packageId: selectedPackageId,
        serviceType,
        distanceKm,
        address: detectedAddress || locationInput
      });
    }
  }, [selectedPackageId, serviceType, distanceKm, detectedAddress, locationInput, onTransportStateChange]);

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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsBoxRef.current && !suggestionsBoxRef.current.contains(e.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch real-time location suggestions GLOBAL SE-INDONESIA as user types in address
  useEffect(() => {
    const query = locationInput.trim();
    if (!query || query.length < 2) {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
      return;
    }

    // 1. Instant local curated matching (0ms latency)
    const cleanLower = query.toLowerCase().replace(/kecamatan|desa|kelurahan|perumahan|jalan|jl\.|rt|rw/g, '').trim();
    const localMatches: LocationSuggestion[] = [];

    CURATED_LOCAL_LOCATIONS.forEach((loc) => {
      const nameLower = loc.name.toLowerCase();
      const matchName = nameLower.startsWith(cleanLower) || nameLower.includes(cleanLower);
      const matchAlias = loc.aliases.some(a => {
        const aLower = a.toLowerCase();
        return aLower.startsWith(cleanLower) || aLower.includes(cleanLower) || cleanLower.includes(aLower);
      });

      if (matchName || matchAlias) {
        localMatches.push({
          id: `local-${loc.name}`,
          primary: loc.name,
          secondary: loc.sub,
          roadKm: loc.roadKm,
          estMinutes: loc.estMinutes,
          source: 'database'
        });
      }
    });

    // Show instant local matches immediately
    if (localMatches.length > 0) {
      setSuggestions(localMatches.slice(0, 5));
      setIsSuggestionsOpen(true);
    }

    // 2. Global Se-Indonesia Online Geocoding Suggestions via Nominatim OpenStreetMap (CORS-friendly)
    const therapistLat = THERAPIST_INFO.mapCoordinates.lat;
    const therapistLng = THERAPIST_INFO.mapCoordinates.lng;
    let isCancelled = false;

    const timer = setTimeout(async () => {
      if (query.startsWith('http') || query.includes('maps.app.goo.gl')) return;

      setIsFetchingSuggestions(true);
      try {
        const cleanQuery = query.replace(/https?:\/\/\S+/gi, '').trim();
        
        // Multi-Source Geocoding: Nominatim OpenStreetMap with Indonesian country code and soft regional bias
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&countrycodes=id&viewbox=106.3,-6.9,107.2,-6.3&bounded=0&limit=7&addressdetails=1`;
        
        const res = await fetch(nominatimUrl, {
          headers: {
            'Accept-Language': 'id,en',
            'User-Agent': 'BekamBogor-App/2.0'
          }
        });

        if (res.ok && !isCancelled) {
          const items = await res.json();
          if (Array.isArray(items) && items.length > 0) {
            const onlineResults: LocationSuggestion[] = [];

            items.forEach((item: any, idx: number) => {
              const lat = parseFloat(item.lat);
              const lon = parseFloat(item.lon);

              if (!isNaN(lat) && !isNaN(lon)) {
                const calculatedKm = calculateHaversineRoadKm(therapistLat, therapistLng, lat, lon);
                
                // Extract clean primary name (place, POI, village, or street)
                const parts = (item.display_name || '').split(',').map((s: string) => s.trim());
                const primaryName = item.name || parts[0] || query;
                const secondaryName = parts.slice(1, 4).join(', ') || 'Indonesia';

                // Prevent duplicate naming with local matches
                const alreadyExists = localMatches.some(
                  m => m.primary.toLowerCase() === primaryName.toLowerCase()
                );

                if (!alreadyExists) {
                  onlineResults.push({
                    id: `online-osm-${item.place_id || idx}-${primaryName}`,
                    primary: primaryName,
                    secondary: secondaryName,
                    roadKm: calculatedKm,
                    estMinutes: `± ${Math.round(calculatedKm * 2.2)}-${Math.round(calculatedKm * 2.8)} mnt`,
                    source: 'online',
                    lat,
                    lon
                  });
                }
              }
            });

            if (!isCancelled) {
              const combined = [...localMatches, ...onlineResults].slice(0, 7);
              setSuggestions(combined);
              if (combined.length > 0) {
                setIsSuggestionsOpen(true);
              }
            }
          }
        }
      } catch (err) {
        // Fallback gracefully to local matches if network is slow/offline
        if (!isCancelled && localMatches.length > 0) {
          setSuggestions(localMatches.slice(0, 5));
          setIsSuggestionsOpen(true);
        }
      } finally {
        if (!isCancelled) setIsFetchingSuggestions(false);
      }
    }, 280);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [locationInput]);

  // When user selects a suggestion from dropdown
  const handleSelectSuggestion = (sug: LocationSuggestion) => {
    setLocationInput(sug.primary);
    setDetectedAddress(`${sug.primary} (${sug.secondary})`);
    setDistanceKm(sug.roadKm);
    setAnalysisSource(`Saran Peta: ${sug.primary}`);
    setIsSuggestionsOpen(false);
  };

  // Core analysis function (for manual Enter, button click, or pasted coordinates/link)
  const analyzeAddressOrUrl = async (rawInput: string) => {
    const query = rawInput.trim();
    if (!query) return;

    setIsAnalyzing(true);
    setIsSuggestionsOpen(false);
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

      // 2. Check Local Curated Database
      const cleanLower = query.toLowerCase().replace(/kecamatan|desa|kelurahan|perumahan|jalan|jl\.|rt|rw/g, '').trim();
      const matchedLoc = CURATED_LOCAL_LOCATIONS.find((loc) => {
        return loc.name.toLowerCase().includes(cleanLower) ||
          loc.aliases.some(a => a.toLowerCase().includes(cleanLower) || cleanLower.includes(a.toLowerCase()));
      });

      if (matchedLoc) {
        setDistanceKm(matchedLoc.roadKm);
        setDetectedAddress(`${query} (${matchedLoc.name}, ${matchedLoc.sub})`);
        setAnalysisSource('Database Wilayah');
        setIsAnalyzing(false);
        return;
      }

      // 3. Global Geocoding with OpenStreetMap Nominatim for anywhere in Indonesia
      try {
        const cleanQuery = query.replace(/https?:\/\/\S+/gi, '').trim() || query;
        const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&countrycodes=id&viewbox=106.3,-6.9,107.2,-6.3&bounded=0&limit=1`;
        
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

      // 4. Fallback estimation
      setDistanceKm(15);
      setDetectedAddress(`${query}`);
      setAnalysisSource('Estimasi Jarak');
    } catch (err) {
      console.error(err);
      setDistanceKm(10);
      setDetectedAddress(query);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // GPS Location Trigger
  const handleRequestGpsLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage({
        type: 'error',
        text: 'Browser Anda belum mendukung fitur GPS. Silakan ketik nama alamat di kolom input.'
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

        const calculatedKm = calculateHaversineRoadKm(therapistLat, therapistLng, userLat, userLng);
        setDistanceKm(calculatedKm);
        setAnalysisSource('GPS Lokasi Otomatis (Akurat)');

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
          // Keep coordinate label
        }

        setLocationInput(placeLabel);
        setDetectedAddress(placeLabel);
        setIsGpsLoading(false);
        setGpsStatusMessage({
          type: 'success',
          text: `Lokasi Anda terdeteksi: ${placeLabel} (Jarak ${calculatedKm} km).`
        });
      },
      (error) => {
        setIsGpsLoading(false);
        // Automatically reveal manual input so user can enter address
        setShowManualInput(true);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsStatusMessage({
            type: 'error',
            text: 'Izin akses GPS belum diberikan di browser Anda. Silakan ketik nama alamat di kolom pencarian di bawah.'
          });
        } else {
          setGpsStatusMessage({
            type: 'error',
            text: 'Sinyal GPS lemah atau tidak dapat ditemukan. Silakan masukkan nama alamat di kolom input di bawah.'
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
    <section id="kalkulator-transport" className="py-16 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Clean & Large Typography for 30-50 age group */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4 text-emerald-600" />
            Hitung Biaya Transport
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Kalkulator Biaya Transport
          </h2>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-xl overflow-visible">
          
          <div className="p-6 sm:p-9 space-y-8">
            
            {/* Step 1: Mode Selection */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider mb-3.5">
                1. Pilih Jenis Layanan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setServiceType('panggilan')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    serviceType === 'panggilan'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${serviceType === 'panggilan' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg text-slate-900">Bekam Panggilan (Home Care)</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">Terapis datang ke lokasi Anda membawa perlengkapan steril lengkap. Biaya transport transparan Rp 2.500/km (PP).</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('ke_rumah_terapis')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    serviceType === 'ke_rumah_terapis'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${serviceType === 'ke_rumah_terapis' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base sm:text-lg text-slate-900">Datang ke Rumah Terapis</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                        GRATIS TRANSPORT
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">Dipersilakan datang langsung ke rumah terapis. Bebas biaya transport (Rp 0)!</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: 1-Click Automatic GPS Location as Primary Hero Action */}
            {serviceType === 'panggilan' ? (
              <div className="space-y-4 p-5 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-emerald-600" />
                    2. Tentukan Lokasi Anda (Otomatis GPS)
                  </label>
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-100/80 px-3 py-1 rounded-lg self-start sm:self-auto flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    1-Klik Praktis &amp; Akurat
                  </span>
                </div>

                {/* Primary Hero: Big 1-Click GPS Button */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border-2 border-emerald-500/80 shadow-xs text-center space-y-3">
                  <button
                    type="button"
                    onClick={handleRequestGpsLocation}
                    disabled={isGpsLoading}
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] disabled:bg-emerald-400 text-white font-black text-base sm:text-xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-3 transition-all cursor-pointer"
                  >
                    {isGpsLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin text-white shrink-0" />
                        <span>Mendeteksi Titik Lokasi Anda...</span>
                      </>
                    ) : (
                      <>
                        <Crosshair className="w-6 h-6 animate-pulse text-amber-300 shrink-0" />
                        <span>Ambil Lokasi Saya Otomatis (GPS)</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                    ✨ Cukup 1x klik, jarak dan tarif transport langsung terhitung otomatis dan akurat dari posisi Anda saat ini.
                  </p>
                  {/* Subtle toggle for manual address only if needed */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowManualInput(!showManualInput)}
                      className="text-xs sm:text-sm text-slate-600 hover:text-emerald-800 underline font-semibold transition-colors cursor-pointer"
                    >
                      {showManualInput ? '▲ Tutup Kolom Input Manual' : '▼ Mau Masukkan Alamat Manual? Klik di Sini'}
                    </button>
                  </div>
                </div>

                {/* Collapsible Area Input Manual (Hidden by default for ultra-clean UX) */}
                {showManualInput && (
                  <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                    <div className="relative" ref={suggestionsBoxRef}>
                      <label htmlFor="input-alamat-pasien" className="sr-only">
                        Ketik Alamat Lengkap Anda
                      </label>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-5 h-5" />
                      </div>
                      <input
                        id="input-alamat-pasien"
                        type="text"
                        autoComplete="off"
                        aria-label="Ketik alamat manual Anda atau nama jalan/wilayah"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        onFocus={() => {
                          if (suggestions.length > 0) setIsSuggestionsOpen(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (suggestions.length > 0) {
                              handleSelectSuggestion(suggestions[0]);
                            } else {
                              analyzeAddressOrUrl(locationInput);
                            }
                          } else if (e.key === 'Escape') {
                            setIsSuggestionsOpen(false);
                          }
                        }}
                        placeholder="Ketik alamat se-Indonesia (contoh: Yasmin, Dramaga, Tebet, Margonda, Ciampea)..."
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-300 bg-white text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-xs"
                      />

                      {locationInput && (
                        <button
                          type="button"
                          onClick={() => {
                            setLocationInput('');
                            setSuggestions([]);
                            setIsSuggestionsOpen(false);
                          }}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                          aria-label="Hapus teks alamat"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}

                      {/* Maps-like Real-time Location Suggestion Dropdown */}
                      {isSuggestionsOpen && suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                          <div className="p-3 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-emerald-600" />
                              Pilih Saran Lokasi (Klik untuk memilih):
                            </span>
                            {isFetchingSuggestions && (
                              <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Mencari lokasi...
                              </span>
                            )}
                          </div>

                          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                            {suggestions.map((sug) => (
                              <div
                                key={sug.id}
                                onClick={() => handleSelectSuggestion(sug)}
                                className="p-3.5 sm:p-4 hover:bg-emerald-50/80 cursor-pointer transition-colors flex items-center justify-between gap-3 text-left"
                              >
                                <div className="flex items-start gap-3 min-w-0">
                                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                                      {sug.primary}
                                    </h5>
                                    <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                                      {sug.secondary}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right shrink-0">
                                  <span className="inline-block text-xs sm:text-sm font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                                    {sug.roadKm} km
                                  </span>
                                  <span className="block text-xs text-slate-400 mt-0.5">
                                    {sug.estMinutes}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-2.5 bg-slate-50 text-xs text-slate-500 text-center">
                            Jarak otomatis dihitung dari kediaman terapis
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => analyzeAddressOrUrl(locationInput)}
                      disabled={isAnalyzing}
                      className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Menghitung Jarak...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Cari Alamat &amp; Hitung Jarak</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* GPS Status Message */}
                {gpsStatusMessage && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in ${
                      gpsStatusMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : gpsStatusMessage.type === 'error'
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-blue-50 border-blue-200 text-blue-900'
                    }`}
                  >
                    {gpsStatusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <span>{gpsStatusMessage.text}</span>
                  </div>
                )}

                {/* Live Distance Analysis Result Card */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-emerald-300/80 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                        Hasil Analisis Jarak:
                      </span>
                      <h4 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{detectedAddress}</span>
                      </h4>
                      {analysisSource && (
                        <p className="text-xs text-slate-400">
                          Metode analisis: {analysisSource}
                        </p>
                      )}
                    </div>

                    <div className="text-right sm:self-center">
                      <span className="text-xs font-semibold text-slate-500 block">Jarak Terdeteksi</span>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                        {distanceKm} km
                      </span>
                    </div>
                  </div>

                  {/* Slider Jarak - Terkunci Otomatis, Tulisan Tarif Dihapus agar Tulisan 5km Leluasa Tidak Mepet Sesuai Permintaan User */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                        <Lock className="w-4 h-4 text-emerald-600" />
                        <span>Jarak Tempuh Terhitung:</span>
                        <span className="text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-extrabold text-sm sm:text-base">
                          {distanceKm} km (Otomatis)
                        </span>
                      </div>
                    </div>

                    {/* Non-draggable / Read-only Automatic Slider Gauge */}
                    <div className="relative">
                      <input
                        id="input-slider-jarak"
                        type="range"
                        min="1"
                        max="60"
                        step="1"
                        disabled
                        aria-disabled="true"
                        aria-label="Jarak Tempuh Terkunci Otomatis (km)"
                        value={distanceKm}
                        readOnly
                        className="w-full accent-emerald-600 h-3 bg-slate-200 rounded-lg pointer-events-none cursor-not-allowed opacity-90"
                      />
                    </div>
                    
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>🔒 Slider terkunci otomatis mengikuti alamat / titik GPS yang terdeteksi secara akurat.</span>
                    </p>
                  </div>

                  {/* Transport Breakdown Calculation */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm">
                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                      <span className="text-xs text-slate-500 block font-semibold">Rumus Biaya Transport:</span>
                      <span className="font-bold text-slate-900 text-sm sm:text-base">{distanceKm} km x Rp 2.500</span>
                    </div>

                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                      <span className="text-xs text-slate-500 block font-semibold">Total Biaya Transport:</span>
                      <span className="font-black text-emerald-800 text-base sm:text-lg">{formatRupiah(transportCost)}</span>
                    </div>

                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-center gap-2.5">
                      <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-xs text-slate-500 block font-semibold">Estimasi Perjalanan:</span>
                        <span className="font-bold text-slate-900 text-sm sm:text-base">± {Math.round(distanceKm * 2.2)} - {Math.round(distanceKm * 2.8)} menit</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Datang ke Rumah Terapis Notice */
              <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-sm text-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950 text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Gratis Biaya Transport (Rp 0)</span>
                </div>
                <p className="leading-relaxed">
                  Anda memilih untuk datang langsung ke kediaman terapis. Tidak ada biaya transport sama sekali. Anda hanya membayar biaya paket terapi bekam yang dipilih.
                </p>
              </div>
            )}

            {/* Step 3: Package Selector */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider mb-3.5">
                3. Pilih Paket Bekam
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servicePackages.map((pkg) => {
                  const isSelected = pkg.id === selectedPackageId;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/30 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                            {pkg.cupCount}
                          </span>
                          {pkg.isPopular && (
                            <span className="text-[10px] font-black bg-amber-400 text-slate-900 px-2 py-0.5 rounded">
                              FAVORIT
                            </span>
                          )}
                        </div>
                        <h4 className="font-extrabold text-base text-slate-900">{pkg.name}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{pkg.tagline}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-slate-500">Tarif Paket:</span>
                        <span className="font-black text-base text-emerald-800">{formatRupiah(pkg.price)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Summary & Single Action Button */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <div className="md:col-span-7 space-y-3">
                  <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">
                    Ringkasan Estimasi Biaya &amp; Rute
                  </span>
                  
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Paket Terapi: <strong>{selectedPackage.name}</strong></span>
                      <span className="text-white font-semibold">{formatRupiah(selectedPackage.price)}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>
                        Biaya Transport {serviceType === 'panggilan' ? `(${distanceKm} km x Rp 2.500)` : '(Di Rumah Terapis)'}:
                      </span>
                      <span className={transportCost === 0 ? 'text-emerald-400 font-bold' : 'text-white font-semibold'}>
                        {transportCost === 0 ? 'GRATIS (Rp 0)' : formatRupiah(transportCost)}
                      </span>
                    </div>

                    {serviceType === 'panggilan' && (
                      <div className="flex justify-between text-xs sm:text-sm text-emerald-300/90 pt-0.5">
                        <span>Tujuan:</span>
                        <span className="truncate max-w-[240px] font-medium">{detectedAddress}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-emerald-300/80 pt-1">
                    * Jarum steril 1x pakai dibuka di hadapan pasien • Cek tensi awal gratis
                  </p>
                </div>

                <div className="md:col-span-5 text-center md:text-right space-y-3.5 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-7">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Estimasi Biaya</span>
                    <span className="text-3xl sm:text-4xl font-black text-amber-300">
                      {formatRupiah(totalCost)}
                    </span>
                  </div>

                  {/* Primary Action Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleProceedToBooking}
                      className="w-full py-4 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                      <span>Lanjut Pesan via WhatsApp</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-slate-400 mt-2 text-center">
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
