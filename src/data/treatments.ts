import { ServicePackage } from '../types';

export const THERAPIST_INFO = {
  name: 'Bekam Bogor - Spesialis Bekam Panggilan',
  tagline: 'Spesialis Bekam Panggilan',
  description: 'Melayani bekam panggilan ke rumah pasien se-Bogor & sekitarnya, atau datang langsung ke rumah terapis di Leuwisadeng (bebas biaya transport). Khusus Ikhwan (Laki-laki).',
  address: 'Kp. Leuwisadeng RT 01 RW 03 Kec. Leuwisadeng Kab.Bogor',
  phone: '085777205863',
  whatsappUrl: 'https://wa.me/6285777205863',
  gmapsUrl: 'https://maps.app.goo.gl/zCZNsTtXu6BtTctv7',
  mapCoordinates: { lat: -6.5707973, lng: 106.6064241 },
  transportRatePerKm: 1500, // Rp 1.500 per km (dihitung PP: 2 x jarak x 1500)
  certification: 'Praktisi Bersertifikat dan Bersanad',
  genderRestriction: 'Khusus Ikhwan (Laki-laki)',
  clinicStatus: 'Belum buka klinik, adapun jika ingin datang ke rumah terapis dipersilakan (gratis biaya transport).'
};

export const servicePackages: ServicePackage[] = [
  {
    id: 'bekam-kering-seluncur',
    name: 'Bekam Kering + Seluncur',
    slug: 'bekam-kering-seluncur',
    tagline: 'Relaksasi otot kaku, melancarkan sirkulasi qi & mengusir masuk angin tanpa sayatan jarum',
    description: 'Terapi bekam kering (dry cupping) dikombinasikan dengan teknik bekam luncur / sliding menggunakan minyak herba zaitun hangat. Sangat nyaman untuk meredakan ketegangan otot punggung dan masuk angin.',
    price: 85000,
    durationMinutes: 40,
    cupCount: 'Area Punggung Penuh',
    features: [
      'Pemeriksaan tekanan darah (tensi) awal gratis',
      'Masase pemanasan dengan minyak herba hangat',
      'Teknik bekam seluncur (sliding cupping) sepanjang meridian',
      'Bekam kering statis pada titik-titik ketegangan otot',
      'Tanpa sayatan jarum / tidak mengeluarkan darah',
      'Konsultasi kesehatan & keluhan fisik'
    ],
    recommendedFor: [
      'Masuk angin & badan meriang',
      'Pundak kaku & otot punggung tegang',
      'Pemula bekam atau yang belum siap jarum',
      'Pekerja duduk lama di depan komputer / berkendara'
    ]
  },
  {
    id: 'bekam-basah-punggung',
    name: 'Bekam Basah Punggung',
    slug: 'bekam-basah-punggung',
    tagline: 'Detoksifikasi darah kotor pada titik inti sunnah Nabawi di area punggung & pundak',
    description: 'Terapi bekam basah steril berstandar medis pada area punggung utama (Al-Kahil, Al-Katifain, pinggang). Menggunakan jarum lancet steril sekali pakai yang dibuka di hadapan pasien.',
    price: 110000,
    durationMinutes: 50,
    cupCount: '7 - 11 Titik Punggung',
    isPopular: true,
    features: [
      'Pemeriksaan tensi & kondisi kesehatan awal gratis',
      'Jarum lancet steril 1x pakai & sarung tangan medis',
      'Pemijatan relaksasi awal dengan minyak zaitun murni',
      'Bekam basah steril mengeluarkan darah statis/toksin',
      'Pembersihan antiseptik & minyak but-but herba',
      'Fokus titik sunnah Al-Kahil (tengkuk), belikat & pinggang'
    ],
    recommendedFor: [
      'Pegal linu leher, pundak & punggung',
      'Kolesterol & asam urat tinggi',
      'Hipertensi / tekanan darah tinggi',
      'Rutin bulanan pada tanggal sunnah (17, 19, 21 Hijriyyah)'
    ]
  },
  {
    id: 'bekam-basah-full-body',
    name: 'Bekam Basah Full Body',
    slug: 'bekam-basah-full-body',
    tagline: 'Perawatan menyeluruh titik sunnah & keluhan anatomi lengkap dari kepala hingga kaki',
    description: 'Paket terlengkap untuk detoksifikasi total. Meliputi titik leher, punggung, pinggang, betis/kaki, serta kepala (jika diperlukan) untuk memulihkan stamina secara menyeluruh.',
    price: 135000,
    durationMinutes: 75,
    cupCount: '12 - 16 Titik Lengkap',
    features: [
      'Pemeriksaan tekanan darah (tensi) lengkap',
      'Jarum lancet steril sekali pakai berstandar medis',
      'Kombinasi bekam luncur sebelum penusukan',
      'Bekam basah komprehensif: leher, punggung, pinggang & kaki',
      'Opsional bekam titik kepala (Ummu Mughits) jika ada vertigo/migrain',
      'Peregangan relaksasi penutup & minyak herba berkualitas'
    ],
    recommendedFor: [
      'Kelelahan fisik berat / capek menahun',
      'Migrain berat, vertigo, atau sering pusing',
      'Sakit pinggang menjalar ke kaki (sciatica)',
      'Detoksifikasi total perokok aktif & pekerja keras'
    ]
  }
];

export function calculateTransportCost(distanceKm: number, serviceType: 'panggilan' | 'ke_rumah_terapis'): number {
  if (serviceType === 'ke_rumah_terapis') {
    return 0; // Datang ke rumah terapis bebas biaya transport
  }
  // Rumus: Jarak (km) x 2 (PP) x 1500
  const dist = Math.max(0, distanceKm);
  return dist * 2 * THERAPIST_INFO.transportRatePerKm;
}

export const bogorCoverageDistricts = [
  { name: 'Leuwisadeng & Sekitarnya', areas: 'Kp. Leuwisadeng, Sadeng, Wangunjaya, Kalong', etaMinutes: '10 - 20 mnt' },
  { name: 'Leuwiliang & Sekitarnya', areas: 'Pabuarankembar, Barengkok, Cibeber, Karacak', etaMinutes: '15 - 25 mnt' },
  { name: 'Cibungbulang', areas: 'Cibatok, Cimanggu, Situ Udik, Dukuh', etaMinutes: '20 - 30 mnt' },
  { name: 'Ciampea & Dramaga', areas: 'Cinangneng, Bojongjengkol, Benteng, Kampus IPB', etaMinutes: '25 - 40 mnt' },
  { name: 'Bogor Barat & Yasmin', areas: 'Bubulak, Cilendek, Semplak, Curug', etaMinutes: '35 - 50 mnt' },
  { name: 'Bogor Kota & Sekitarnya', areas: 'Pajajaran, Baranangsiang, Kedunghalang, Empang', etaMinutes: '40 - 60 mnt' }
];

