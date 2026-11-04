import { CuppingPoint } from '../types';

export const cuppingPointsData: CuppingPoint[] = [
  {
    id: 'al-kahil',
    arabicName: 'الكاهل',
    indonesianName: 'Punuk Leher Belakang (Al-Kahil / C7-T1)',
    location: 'Pertemuan tulang leher bagian bawah dan tulang punggung atas (tonjolan C7)',
    bodyView: 'posterior',
    coords: { x: 50, y: 22 },
    sunnahStatus: true,
    hadithReference: 'Rasulullah SAW berbekam di Al-Kahil dan dua urat leher (Al-Akhda’ain). (HR. Abu Dawud no. 3860, Tirmidzi no. 2051)',
    medicalBenefits: [
      'Pusat pertemuan 7 meridian akupunktur utama tubuh',
      'Menurunkan tekanan darah tinggi (hipertensi) secara signifikan',
      'Mengurangi kekakuan otot leher, bahu, dan punggung atas',
      'Mencegah risiko serangan stroke dan sumbatan pembuluh darah otak',
      'Meningkatkan imunitas dan sirkulasi darah ke otak'
    ],
    indications: ['Hipertensi', 'Pegal leher & bahu', 'Kolesterol tinggi', 'Pencegahan stroke', 'Sesak napas/asma', 'Masuk angin akut'],
    cautions: 'Titik utama paling aman dan paling wajib dalam bekam sunnah.'
  },
  {
    id: 'al-akhdaain-kiri',
    arabicName: 'الأخدعين',
    indonesianName: 'Urat Leher Kiri (Al-Akhda’ain Kiri)',
    location: 'Sisi leher kiri di bawah telinga belakang rahang',
    bodyView: 'posterior',
    coords: { x: 42, y: 17 },
    sunnahStatus: true,
    hadithReference: 'Diriwayatkan dari Anas bin Malik bahwa Nabi SAW berbekam pada tiga tempat: dua di al-akhda’ain dan satu di al-kahil. (HR. Abu Dawud)',
    medicalBenefits: [
      'Melancarkan suplai oksigen & darah ke hemisfer otak',
      'Meredakan pusing berputar, vertigo, dan migrain sebelah kiri',
      'Meringankan kekakuan otot leher kaku (tortikolis)',
      'Mengurangi gangguan pendengaran (tinitus) dan radang amandel'
    ],
    indications: ['Migrain', 'Vertigo', 'Telinga berdenging', 'Kaku leher', 'Sakit gigi & radang tenggorokan'],
    cautions: 'Perlu kehati-hatian praktisi berpengalaman karena berdekatan dengan arteri karotis.'
  },
  {
    id: 'al-akhdaain-kanan',
    arabicName: 'الأخدعين',
    indonesianName: 'Urat Leher Kanan (Al-Akhda’ain Kanan)',
    location: 'Sisi leher kanan di bawah telinga belakang rahang',
    bodyView: 'posterior',
    coords: { x: 58, y: 17 },
    sunnahStatus: true,
    hadithReference: 'Diriwayatkan dari Anas bin Malik bahwa Nabi SAW berbekam pada al-akhda’ain dan al-kahil. (Shahih Sunan Tirmidzi)',
    medicalBenefits: [
      'Melancarkan sirkulasi karotis interna kanan ke serebrum',
      'Meredakan ketegangan mata lelah dan sakit kepala temporal',
      'Mengatasi kekakuan sendi rahang dan neuralgia trigeminal'
    ],
    indications: ['Sakit kepala separuh', 'Mata tegang akibat layar HP/laptop', 'Vertigo', 'Nyeri rahang'],
    cautions: 'Tekanan hisap kop sedang, tidak boleh ditarik terlalu kuat.'
  },
  {
    id: 'ummu-mughits',
    arabicName: 'أم مغيث',
    indonesianName: 'Puncak Kepala / Vertex (Ummu Mughits)',
    location: 'Titik tertinggi di ubun-ubun kepala (pertemuan garis kedua telinga)',
    bodyView: 'head',
    coords: { x: 50, y: 15 },
    sunnahStatus: true,
    hadithReference: 'Nabi SAW pernah berbekam di bagian tengah kepalanya karena sakit kepala yang dideritanya saat ihram. (HR. Bukhari)',
    medicalBenefits: [
      'Titik induk pengatur sistem saraf pusat (otak besar & kecil)',
      'Menajamkan daya ingat, konsentrasi, dan ketajaman mental',
      'Mengobati migrain menahun, vertigo akut, dan depresi/anxiety',
      'Menstabilkan tekanan intrakranial dan sinus'
    ],
    indications: ['Pikun / sulit fokus', 'Insomnia kronis', 'Vertigo', 'Depresi & stres berat', 'Sinusitis'],
    cautions: 'Bisa dicukur sedikit rambutnya atau menggunakan minyak zaitun pekat / kop khusus kepala tanpa mencukur.'
  },
  {
    id: 'al-katifain-kiri',
    arabicName: 'الكتفين',
    indonesianName: 'Tulang Belikat Kiri (Al-Katifain Kiri)',
    location: 'Area otot trapezius dan skapula kiri belakang',
    bodyView: 'posterior',
    coords: { x: 34, y: 28 },
    sunnahStatus: true,
    hadithReference: 'Membantu menstabilkan organ thoraks kiri (jantung dan paru bagian kiri).',
    medicalBenefits: [
      'Meringankan beban kelelahan otot bahu bagi pekerja duduk/kantor',
      'Membantu meredakan nyeri dada kiri akibat kelelahan otot interkostal',
      'Melancarkan sirkulasi limfatik aksila'
    ],
    indications: ['Pundak kaku', 'Frozen shoulder kiri', 'Napas terasa berat', 'Kolesterol tinggi'],
    cautions: 'Aman untuk bekam basah maupun luncur.'
  },
  {
    id: 'al-katifain-kanan',
    arabicName: 'الكتفين',
    indonesianName: 'Tulang Belikat Kanan (Al-Katifain Kanan)',
    location: 'Area otot trapezius dan skapula kanan belakang',
    bodyView: 'posterior',
    coords: { x: 66, y: 28 },
    sunnahStatus: true,
    hadithReference: 'Titik pendamping Al-Kahil yang sangat disarankan untuk kebugaran otot bahu.',
    medicalBenefits: [
      'Menghilangkan pegal linu pundak kanan akibat penggunaan mouse & motor',
      'Membantu refleks organ liver dan empedu',
      'Meningkatkan kelenturan rotasi lengan atas'
    ],
    indications: ['Pegal pundak kanan', 'Asam urat menumpuk', 'Kelelahan mengemudi motor/mobil', 'Kembung kronis'],
    cautions: 'Sangat nyaman dikombinasikan dengan bekam luncur.'
  },
  {
    id: 'ma-bainal-katifain',
    arabicName: 'ما بين الكتفين',
    indonesianName: 'Antara Dua Belikat (T4-T5)',
    location: 'Di tengah ruas tulang belakang antara belikat kiri dan kanan',
    bodyView: 'posterior',
    coords: { x: 50, y: 35 },
    sunnahStatus: false,
    medicalBenefits: [
      'Titik refleks paru-paru dan bronkus',
      'Membantu mengeluarkan dahak dan melegakan asma/batuk kering',
      'Meredakan rasa sesak di dada dan rasa tertindih saat tidur'
    ],
    indications: ['Batuk kronis', 'Asma', 'Dada sesak', 'Perokok aktif yang ingin detox'],
    cautions: 'Tekanan hisap sedang.'
  },
  {
    id: 'al-warik-kiri',
    arabicName: 'الورك',
    indonesianName: 'Pinggang Kiri (Al-Warik Kiri)',
    location: 'Sisi kiri lumbal L2-L4 di atas pinggul',
    bodyView: 'posterior',
    coords: { x: 38, y: 55 },
    sunnahStatus: true,
    hadithReference: 'Rasulullah SAW pernah berbekam di pinggulnya karena sakit yang dideritanya. (HR. Abu Dawud)',
    medicalBenefits: [
      'Meredakan sakit pinggang (LBP / Low Back Pain)',
      'Membantu melancarkan fungsi organ ginjal dan pembuangan racun asam urat',
      'Mengurangi kram otot erektor spinalis dan nyeri panggul'
    ],
    indications: ['Sakit pinggang', 'Sering menahan kencing', 'Asam urat tinggi', 'Mudah lelah setelah duduk lama'],
    cautions: 'Hindari bekam basah di atas lesi kulit terbuka atau saat infeksi ginjal akut berdarah.'
  },
  {
    id: 'al-warik-kanan',
    arabicName: 'الورك',
    indonesianName: 'Pinggang Kanan (Al-Warik Kanan)',
    location: 'Sisi kanan lumbal L2-L4 di atas pinggul',
    bodyView: 'posterior',
    coords: { x: 62, y: 55 },
    sunnahStatus: true,
    hadithReference: 'Sunnah bekam di pinggul dan pinggang untuk peredaan nyeri fisik.',
    medicalBenefits: [
      'Menyeimbangkan postur lumbal dan mengurangi ketegangan saraf skiatika kanan',
      'Memperlancar ekskresi asam laktat dan asam urat lewat kemih',
      'Meningkatkan fleksibilitas membungkuk dan ruku’ shalat'
    ],
    indications: ['Sakit pinggang kanan', 'Skiatika (nyeri menjalar ke kaki)', 'Kurang minum air'],
    cautions: 'Aman dan dianjurkan rutin bagi pengendara motor harian.'
  },
  {
    id: 'al-adzim-sakrum',
    arabicName: 'العجز',
    indonesianName: 'Tulang Ekor / Sakrum (Al-’Ajz)',
    location: 'Pertemuan tulang belakang dengan panggul tengah (Sakrum S1-S3)',
    bodyView: 'posterior',
    coords: { x: 50, y: 64 },
    sunnahStatus: false,
    medicalBenefits: [
      'Membantu mengatasi masalah hemoroid / wasir / ambeien',
      'Meningkatkan vitalitas pria dan kesuburan reproduksi wanita',
      'Meredakan kram panggul dan dismenore (nyeri haid)'
    ],
    indications: ['Wasir / ambeien', 'Nyeri haid', 'Lemah syahwat', 'Pegal area panggul'],
    cautions: 'Haram dibekam basah jika sedang menstruasi aktif atau hamil tua.'
  },
  {
    id: 'as-saqain-betis',
    arabicName: 'الساقين',
    indonesianName: 'Otot Betis Belakang (As-Saqain)',
    location: 'Tengah otot betis kanan dan kiri',
    bodyView: 'posterior',
    coords: { x: 50, y: 82 },
    sunnahStatus: false,
    medicalBenefits: [
      'Memompa balik sirkulasi vena dari ekstremitas bawah menuju jantung',
      'Mencegah varises dan bengkak kaki akibat berdiri terlalu lama',
      'Mengeluarkan asam urat yang mengendap di sendi bawah'
    ],
    indications: ['Kaki sering kram malam hari', 'Kaki bengkak (edema ringan)', 'Asam urat tumit/jempol', 'Kelelahan atlet'],
    cautions: 'Hindari pembuluh varises yang sudah menonjol tipis.'
  }
];
