import { DynamicSunnahDate } from '../types';

export const sunnahHadiths = [
  {
    textArabic: 'خَيْرُ مَا تَدَاوَيْتُمْ بِهِ الْحِجَامَةُ',
    translation: 'Sebaik-baik pengobatan yang kalian gunakan untuk berobat adalah berbekam (hijamah).',
    narrator: 'HR. Al-Bukhari no. 5696 & Muslim no. 1577'
  },
  {
    textArabic: 'مَا مَرَرْتُ لَيْلَةَ أُسْرِيَ بِي بِمَلإٍ مِنَ الْمَلاَئِكَةِ إِلاَّ قَالُوا: يَا مُحَمَّدُ مُرْ أُمَّتَكَ بِالْحِجَامَةِ',
    translation: 'Tidaklah aku melewati sekumpulan malaikat pada malam Isra\' Mi\'raj melainkan mereka berkata: Wahai Muhammad, perintahkanlah umatmu untuk berbekam.',
    narrator: 'HR. Ibnu Majah no. 3477 & At-Tirmidzi (Shahih)'
  },
  {
    textArabic: 'الشِّفَاءُ فِي ثَلاَثَةٍ: شَرْبَةِ عَسَلٍ، وَشَرْطَةِ مِحْجَمٍ، وَكَيَّةِ نَارٍ، وَأَنْهَى أُمَّتِي عَنِ الْكَيِّ',
    translation: 'Kesembuhan itu ada pada tiga hal: minum madu, sayatan alat bekam, dan sengatan api (kayy). Dan aku melarang umatku dari sengatan api.',
    narrator: 'HR. Al-Bukhari no. 5680'
  },
  {
    textArabic: 'مَنِ احْتَجَمَ لِسَبْعَ عَشْرَةَ وَتِسْعَ عَشْرَةَ وَإِحْدَى وَعِشْرِينَ كَانَ شِفَاءً مِنْ كُلِّ دَاءٍ',
    translation: 'Barangsiapa berbekam pada tanggal 17, 19, dan 21 (bulan Hijriyyah), maka itu akan menjadi kesembuhan bagi setiap penyakit.',
    narrator: 'HR. Abu Dawud no. 3861, Tirmidzi no. 2051'
  }
];

export const cuppingRulesAndPreparation = {
  beforeCupping: [
    'Puasa makan berat minimal 2-3 jam sebelum bekam (perut tidak boleh terlalu penuh).',
    'Cukup minum air putih hangat atau madu sebelum sesi terapi.',
    'Tidur cukup pada malam sebelum bekam; hindari begadang semalaman sebelum diterapi.',
    'Mandi bersih dengan air hangat sebelum terapis tiba atau sebelum berangkat ke rumah terapis.',
    'Beritahukan kepada terapis jika mengonsumsi obat pengencer darah atau riwayat diabetes.'
  ],
  afterCupping: [
    'Istirahat tenang 1-2 jam setelah bekam, hindari olahraga berat atau angkat beban.',
    'Boleh minum air hangat dicampur madu asli atau sari kurma untuk memulihkan energi tubuh.',
    'Hindari mandi air dingin langsung setelah bekam (beri jeda minimal 2-3 jam, atau gunakan air hangat).',
    'Hindari makanan berlemak tinggi, santan pekat, atau makanan pedas menyengat selama 12 jam pertama.',
    'Titik bekas kop bekam akan memudar dalam 3 sampai 7 hari secara alami tanpa meninggalkan bekas luka.'
  ]
};

/**
 * Automatically calculates the upcoming Sunnah cupping days (17, 19, and 21 Hijri)
 * dynamically based on the current date so it updates automatically every month.
 */
export function getDynamicSunnahDates(limit = 6): DynamicSunnahDate[] {
  const results: DynamicSunnahDate[] = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let islamicFormatter: Intl.DateTimeFormat;
  try {
    islamicFormatter = new Intl.DateTimeFormat('id-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    // Fallback if specific locale is missing
    islamicFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // Scan up to 100 days ahead to find all 17, 19, 21 dates
  for (let i = 0; i < 100 && results.length < limit; i++) {
    const testDate = new Date(today.getTime() + i * 86400000);
    try {
      const parts = islamicFormatter.formatToParts(testDate);
      const dayPart = parts.find(p => p.type === 'day')?.value;
      const monthPart = parts.find(p => p.type === 'month')?.value;
      const yearPart = parts.find(p => p.type === 'year')?.value;
      const dayNum = parseInt(dayPart || '0', 10);

      if (dayNum === 17 || dayNum === 19 || dayNum === 21) {
        const isToday = i === 0;
        const isNext = results.length === 0;
        const dayName = testDate.toLocaleDateString('id-ID', { weekday: 'long' });
        const dateString = testDate.toISOString().split('T')[0];

        let significance = `Hari Sunnah ke-${dayNum === 17 ? '1 (Utama)' : dayNum === 19 ? '2' : '3'} bulan ${monthPart}`;
        if (dayName === 'Senin' || dayName === 'Kamis') {
          significance += ` — Bertepatan dengan hari ${dayName} (Sangat Dianjurkan)`;
        }

        results.push({
          gregorianDate: testDate,
          dateString,
          dayName,
          hijriDay: dayNum,
          hijriMonthName: monthPart || 'Hijriyyah',
          hijriYear: yearPart || '',
          daysUntil: i,
          isToday,
          isNext,
          significance
        });
      }
    } catch {
      // ignore parsing error on unusual dates
    }
  }

  return results;
}
