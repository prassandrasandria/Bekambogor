export interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  durationMinutes: number;
  cupCount: string;
  features: string[];
  recommendedFor: string[];
  isPopular?: boolean;
}

export interface CuppingPoint {
  id: string;
  arabicName: string;
  indonesianName: string;
  location: string;
  bodyView: 'posterior' | 'anterior' | 'head';
  coords: { x: number; y: number };
  sunnahStatus: boolean;
  hadithReference?: string;
  medicalBenefits: string[];
  indications: string[];
  cautions?: string;
}

export interface DynamicSunnahDate {
  gregorianDate: Date;
  dateString: string; // YYYY-MM-DD
  dayName: string; // Senin, Kamis, etc.
  hijriDay: number; // 17, 19, 21
  hijriMonthName: string; // Jumadil Awwal, etc.
  hijriYear: string;
  daysUntil: number; // e.g. 0 = today, 1 = tomorrow
  isToday: boolean;
  isNext: boolean;
  significance: string;
}

export interface BookingFormData {
  fullName: string;
  age: string;
  phone: string;
  serviceType: 'panggilan' | 'ke_rumah_terapis';
  servicePackageId: string;
  distanceKm: number;
  transportCost: number;
  totalCost: number;
  selectedDate: string;
  selectedTimeSlot: string;
  address: string;
  healthNotes: string;
  hasMedicalConditions: {
    diabetes: boolean;
    bloodThinners: boolean;
    highBloodPressure: boolean;
    heartDisease: boolean;
  };
}

export interface CarouselSlide {
  id: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface ReviewTestimonial {
  id: string;
  name: string;
  location: string;
  therapistType: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'dasar' | 'sunnah' | 'medis' | 'layanan';
}

export interface TherapistCertificate {
  id: string;
  title: string;
  institution: string;
  credentialNumber: string;
  date: string;
  recipient: string;
  badge: string;
  imageUrl: string;
  description?: string;
}

export type ProductCategory = 'semua' | 'madu-herbal' | 'vitalitas-pasutri' | 'minyak-jamu';

export interface ShopProduct {
  id: string;
  name: string;
  category: 'madu-herbal' | 'vitalitas-pasutri' | 'minyak-jamu';
  categoryLabel: string;
  brand: string;
  price: number;
  originalPrice?: number;
  volume: string;
  image: string;
  tagline: string;
  badge?: string;
  description: string;
  benefits: string[];
  composition?: string[];
  dosage: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

