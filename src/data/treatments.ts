import { ServicePackage } from '../types';

export const THERAPIST_INFO = {
  name: 'Bekam Bogor - Spesialis Bekam Panggilan',
  tagline: 'Spesialis Bekam Panggilan',
  description: 'Melayani bekam panggilan ke rumah pasien se-Bogor dan Sekitarnya, atau datang langsung ke rumah terapis di Leuwisadeng (bebas biaya transport). Saat ini khusus melayani ikhwan (laki-laki), insya Allah ke depan tersedia terapis akhwat (perempuan).',
  address: 'Kp. Leuwisadeng RT 01 RW 03 Kec. Leuwisadeng Kab.Bogor',
  phone: '085163518070',
  whatsappUrl: 'https://wa.me/6285163518070',
  gmapsUrl: 'https://maps.app.goo.gl/zCZNsTtXu6BtTctv7',
  mapCoordinates: { lat: -6.5707973, lng: 106.6064241 },
  transportRatePerKm: 2500, // Rp 2.500 / km (Pulang Pergi: jarak x 2.500)
  certification: 'Praktisi Bersertifikat dan Bersanad',
  genderRestriction: 'Khusus Ikhwan (Laki-laki) *sementara waktu, insya Allah ke depan tersedia terapis akhwat',
  genderNote: 'Sementara khusus ikhwan / pria, insya Allah ke depan tersedia terapis akhwat (perempuan)',
  clinicStatus: 'Melayani panggilan ke rumah pasien & terapi langsung di rumah terapis.'
};

export const servicePackages: ServicePackage[] = [
  {
    id: 'bekam-kering-seluncur',
    name: 'Bekam Kering + Seluncur',
    slug: 'bekam-kering-seluncur',
    tagline: 'Relaksasi otot kaku, melancarkan sirkulasi qi & mengusir masuk angin tanpa sayatan jarum',
    description: 'Terapi bekam kering (dry cupping) dikombinasikan dengan teknik bekam luncur / sliding menggunakan minyak herba zaitun hangat. Sangat nyaman untuk meredakan ketegangan otot punggung dan masuk angin.',
    price: 65000,
    durationMinutes: 40,
    cupCount: 'Area Punggung Penuh',
    features: [
      'Pemeriksaan tekanan darah (tensi) awal gratis',
      'Pijat pemanasan dengan minyak herba hangat',
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
    price: 100000,
    durationMinutes: 50,
    cupCount: '7 - 11 Titik Punggung',
    isPopular: true,
    features: [
      'Pemeriksaan tensi & kondisi kesehatan awal gratis',
      'Jarum lancet steril 1x pakai & sarung tangan medis',
      'Pijat pemanasan & relaksasi awal dengan minyak zaitun murni',
      'Bekam basah steril mengeluarkan darah statis/toksin (7 - 11 titik)',
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
    tagline: 'Perawatan menyeluruh titik sunnah & keluhan anatomi full body hingga kaki',
    description: 'Paket terlengkap untuk detoksifikasi total. Meliputi titik leher, punggung, pinggang, betis/kaki, serta kepala (jika diperlukan) untuk memulihkan stamina secara menyeluruh.',
    price: 125000,
    durationMinutes: 75,
    cupCount: '15 - 17 Titik Lengkap',
    features: [
      'Pemeriksaan tekanan darah (tensi) lengkap',
      'Jarum lancet steril sekali pakai berstandar medis',
      'Pijat pemanasan & kombinasi bekam luncur sebelum penusukan',
      'Bekam basah komprehensif 15 - 17 titik lengkap: leher, punggung, pinggang & kaki',
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
  // Rumus langsung: Jarak (km) x Rp 2.500 (sudah mencakup Pulang-Pergi)
  const dist = Math.max(0, distanceKm);
  return dist * THERAPIST_INFO.transportRatePerKm;
}
