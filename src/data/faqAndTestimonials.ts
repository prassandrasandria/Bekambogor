import { ReviewTestimonial, FaqItem, CarouselSlide } from '../types';

export const carouselSlidesData: CarouselSlide[] = [
  {
    id: 'slide-1',
    imageSrc: '/src/assets/images/bekam_kegiatan_1_1793672022589.jpg',
    title: 'Terapi Bekam Titik Punggung Sunnah',
    subtitle: 'Penempelan kop steril presisi pada jalur meridian tulang belakang untuk detoksifikasi darah statis & meredakan ketegangan otot leher/pundak.',
    badge: 'Bekam Basah Medis'
  },
  {
    id: 'slide-2',
    imageSrc: '/src/assets/images/bekam_alat_steril_1793672044093.jpg',
    title: 'Peralatan Steril Medis & Jarum 1x Pakai',
    subtitle: 'Set kop bersih disinfeksi medis, pompa vakum higienis, minyak zaitun murni, dan jarum lancet steril yang selalu baru dibuka di hadapan pasien.',
    badge: 'Higienitas Terjamin'
  },
  {
    id: 'slide-3',
    imageSrc: '/src/assets/images/bekam_seluncur_punggung_1793672060514.jpg',
    title: 'Bekam Luncur (Sliding Cupping) Relaksasi',
    subtitle: 'Teknik luncuran lembut menggunakan minyak herba hangat untuk melancarkan sirkulasi darah, menghangatkan tubuh, dan mengusir angin dingin.',
    badge: 'Relaksasi Nyaman'
  }
];

export const testimonialsData: ReviewTestimonial[] = [
  {
    id: 'testi-1',
    name: 'Pak H. Wahyudi',
    location: 'Leuwisadeng, Kab. Bogor',
    therapistType: 'Terapis Ikhwan',
    rating: 5,
    date: '3 hari yang lalu',
    comment: 'Alhamdulillah sudah langganan bekam panggilan ke rumah. Terapisnya ramah, tepat waktu, bacaan doa sunnahnya jelas, dan badannya langsung enteng setelah dibekam basah punggung. Tarif transportnya sangat transparan.',
    serviceUsed: 'Bekam Basah Punggung (Panggilan)',
    verified: true
  },
  {
    id: 'testi-2',
    name: 'Kang Asep Supriadi',
    location: 'Leuwiliang, Kab. Bogor',
    therapistType: 'Terapis Ikhwan',
    rating: 5,
    date: '1 minggu yang lalu',
    comment: 'Pundak dan leher kaku berat karena sering bawa motor jauh. Ambil bekam kering + seluncur dulu, lalu bekam basah. Masya Allah tidur malam jadi nyenyak sekali dan tensi lebih stabil.',
    serviceUsed: 'Bekam Basah Full Body',
    verified: true
  },
  {
    id: 'testi-3',
    name: 'Ust. Rahmat Hidayat',
    location: 'Dramaga, Bogor',
    therapistType: 'Terapis Ikhwan',
    rating: 5,
    date: '2 minggu yang lalu',
    comment: 'Peralatan steril, jarum lancet dibuka langsung di depan saya. Terapis bersertifikat dan bersanad, memahami titik-titik sunnah dengan tepat. Sangat direkomendasikan untuk ikhwan di Bogor.',
    serviceUsed: 'Bekam Basah Punggung',
    verified: true
  },
  {
    id: 'testi-4',
    name: 'Pak Rudi Hermawan',
    location: 'Cibungbulang, Kab. Bogor',
    therapistType: 'Terapis Ikhwan',
    rating: 5,
    date: '3 minggu yang lalu',
    comment: 'Saya memilih datang langsung ke rumah terapis di Kp. Leuwisadeng karena rumah dekat dan tanpa biaya transport. Tempatnya bersih, adem, dan pelayanannya memuaskan.',
    serviceUsed: 'Bekam Basah Punggung (Di Rumah Terapis)',
    verified: true
  }
];

export const faqData: FaqItem[] = [
  {
    question: 'Siapa saja yang bisa diterapi di Bekam Bogor?',
    answer: 'Saat ini layanan terapi bekam kami khusus melayani pasien ikhwan (laki-laki / pria dewasa maupun remaja) yang ditangani langsung oleh terapis pria bersertifikat dan bersanad.',
    category: 'dasar'
  },
  {
    question: 'Bagaimana sistem layanan panggilan ke rumah dan datang ke rumah terapis?',
    answer: 'Kami mengutamakan layanan Bekam Panggilan ke rumah Anda di wilayah Bogor & sekitarnya. Namun jika Anda ingin datang langsung ke rumah terapis kami di Kp. Leuwisadeng RT 01 RW 03 Kec. Leuwisadeng Kab. Bogor, sangat dipersilakan dan tidak dikenakan biaya transport (gratis biaya transport).',
    category: 'layanan'
  },
  {
    question: 'Bagaimana cara menghitung biaya transport untuk bekam panggilan?',
    answer: 'Biaya transport sangat transparan: Rp 1.500 per kilometer dihitung Pulang-Pergi (PP). Contoh: jika jarak dari rumah terapis ke rumah Anda adalah 5 km, maka perhitungannya: 5 km x 2 (PP) x Rp 1.500 = Rp 15.000. Anda bisa menggunakan fitur Hitung Biaya Transport di website ini untuk menghitung total biaya secara otomatis sebelum memesan.',
    category: 'layanan'
  },
  {
    question: 'Apakah terapi bekam itu sakit atau menyakitkan?',
    answer: 'Insya Allah tidak sakit. Kami menggunakan jarum lancet mikro ultra-tipis medis sekali pakai dengan pen bekam berkecepatan tinggi. Sensasinya hanya seperti gigitan semut kecil sesaat. Sebelum dibekam basah, dilakukan pemijatan dan bekam luncur relaksasi terlebih dahulu agar otot lemas dan rileks.',
    category: 'dasar'
  },
  {
    question: 'Bagaimana standar sterilisasi peralatan bekam?',
    answer: 'Kami menerapkan higienitas medis ketat: Jarum lancet 100% sekali pakai (single-use disposable) yang langsung dibuang ke wadah pembuangan jarum, sarung tangan medis sekali pakai, serta kop bekam yang dicuci bersih dengan deterjen medis dan direndam disinfektan antiseptik hospital-grade.',
    category: 'medis'
  },
  {
    question: 'Kapan waktu terbaik untuk melakukan bekam sunnah?',
    answer: 'Waktu paling utama sesuai Sunnah Nabi SAW adalah pada tanggal 17, 19, dan 21 setiap bulan Hijriyyah. Jadwal tanggal sunnah ini otomatis terupdate di website ini setiap bulannya. Namun untuk keluhan mendadak (masuk angin, pegal linu berat, sakit kepala kambuh), bekam boleh dilakukan kapan saja setiap hari.',
    category: 'sunnah'
  }
];

export interface SymptomRecommendation {
  symptom: string;
  category: string;
  recommendedPoints: string[];
  suggestedPackage: string;
  tip: string;
}

export const symptomGuideData: SymptomRecommendation[] = [
  {
    symptom: 'Pundak Kaku & Leher Belakang Tegang',
    category: 'Otot & Sendi',
    recommendedPoints: ['Al-Kahil (Punuk)', 'Al-Akhda’ain (Urat Leher)', 'Al-Katifain (Belikat)'],
    suggestedPackage: 'Bekam Basah Punggung (Rp 110.000)',
    tip: 'Paling sering dialami pengendara motor dan pekerja komputer. Titik Al-Kahil sangat efektif merelaksasi simpul saraf leher.'
  },
  {
    symptom: 'Masuk Angin Berat & Badan Meriang',
    category: 'Kebugaran',
    recommendedPoints: ['Bekam Luncur Punggung Penuh', 'Titik Meridian Paru'],
    suggestedPackage: 'Bekam Kering + Seluncur (Rp 85.000)',
    tip: 'Tanpa sayatan jarum. Efek gesekan kop dan minyak herba hangat melancarkan peredaran darah dan mengusir angin dingin.'
  },
  {
    symptom: 'Kolesterol Tinggi & Tekanan Darah Naik',
    category: 'Kardiovaskular',
    recommendedPoints: ['Al-Kahil', 'Al-Katifain Kanan-Kiri', 'Punggung Tengah'],
    suggestedPackage: 'Bekam Basah Punggung (Rp 110.000)',
    tip: 'Membantu menurunkan tahanan pembuluh darah tepi dan mengurangi kepekatan darah statis di pembuluh perifer.'
  },
  {
    symptom: 'Sakit Pinggang & Pegal Duduk Lama',
    category: 'Lumbal & Saraf',
    recommendedPoints: ['Al-Warik (Pinggang Kiri-Kanan)', 'Sakrum (Tulang Ekor)', 'Betis'],
    suggestedPackage: 'Bekam Basah Full Body (Rp 135.000)',
    tip: 'Melancarkan peredaran darah di sekitar diskus lumbal dan meredakan tekanan saraf pinggang yang menjalar.'
  },
  {
    symptom: 'Migrain / Sering Pusing Kepala Sebelah',
    category: 'Saraf Kranial',
    recommendedPoints: ['Al-Akhda’ain', 'Al-Kahil', 'Ummu Mughits (Puncak Kepala)'],
    suggestedPackage: 'Bekam Basah Full Body (Rp 135.000)',
    tip: 'Membantu meredakan ketegangan mikrosirkulasi di kepala dan menormalkan aliran oksigen ke otak.'
  },
  {
    symptom: 'Kelelahan Total & Badan Lemas Menahun',
    category: 'Detoksifikasi Total',
    recommendedPoints: ['Titik Sunnah Punggung Lengkap', 'Pinggang', 'Betis'],
    suggestedPackage: 'Bekam Basah Full Body (Rp 135.000)',
    tip: 'Detoksifikasi menyeluruh untuk membersihkan endapan racun dan merangsang pembentukan sel darah merah baru.'
  }
];
