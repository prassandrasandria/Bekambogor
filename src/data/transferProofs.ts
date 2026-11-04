export interface TransferProof {
  id: string;
  customerName: string;
  location: string;
  date: string;
  items: string;
  amount: number;
  bankName: 'BCA' | 'BRI' | 'Bank Mandiri' | 'BSI (Bank Syariah)' | 'QRIS';
  status: 'Lunas & Terverifikasi' | 'Pesanan Diproses';
  refNumber: string;
  notes?: string;
  imageUrl?: string;
}

export const INITIAL_TRANSFER_PROOFS: TransferProof[] = [
  {
    id: 'trf-001',
    customerName: 'Abu Fatih (Hendra)',
    location: 'Leuwiliang, Kab. Bogor',
    date: 'Hari ini, 09:42 WIB',
    items: '2x Madu JTS Vitalitas Herbal + 1x Minyak Zaitun Ruqyah',
    amount: 345000,
    bankName: 'BCA',
    status: 'Lunas & Terverifikasi',
    refNumber: 'TRF-BCA-20261104-9821',
    notes: 'Paket diantar langsung saat sesi bekam sore hari ini',
    imageUrl: undefined
  },
  {
    id: 'trf-002',
    customerName: 'Pak Dedi Kurniawan',
    location: 'Dramaga, Bogor Barat',
    date: 'Kemarin, 14:15 WIB',
    items: '1x Paket Pasutri Harmonis (Madu JTS + Madu Subur Wanita)',
    amount: 280000,
    bankName: 'QRIS',
    status: 'Lunas & Terverifikasi',
    refNumber: 'QRIS-NMID-20261103-4412',
    notes: 'Kirim via kurir GoSend instan sampai sebelum ashar',
    imageUrl: undefined
  },
  {
    id: 'trf-003',
    customerName: 'Ust. Maulana Akbar',
    location: 'Cibungbulang, Kab. Bogor',
    date: '2 November 2026',
    items: '2x Madu Lambung & Pencernaan (GERD Maag)',
    amount: 210000,
    bankName: 'BSI (Bank Syariah)',
    status: 'Lunas & Terverifikasi',
    refNumber: 'BSI-FT-20261102-7719',
    notes: 'Alhamdulillah kondisi lambung membaik, pesan botol kedua',
    imageUrl: undefined
  },
  {
    id: 'trf-004',
    customerName: 'Kang Rizki Ramadhan',
    location: 'Ciampea, Kab. Bogor',
    date: '1 November 2026',
    items: '1x Madu Hitam Pahit Ratu Lebah + 1x Habbatussauda Oil',
    amount: 195000,
    bankName: 'BRI',
    status: 'Lunas & Terverifikasi',
    refNumber: 'BRIMO-20261101-3108',
    notes: 'Diambil sendiri ke rumah terapis Kp. Leuwisadeng',
    imageUrl: undefined
  },
  {
    id: 'trf-005',
    customerName: 'Pak H. Wahyudi',
    location: 'Tanah Sareal, Kota Bogor',
    date: '31 Oktober 2026',
    items: '3x Madu Murni Sumbawa Hutan Asli',
    amount: 360000,
    bankName: 'Bank Mandiri',
    status: 'Lunas & Terverifikasi',
    refNumber: 'LIVIN-20261031-8891',
    notes: 'Langsung kirim via JNE YES ke alamat kantor',
    imageUrl: undefined
  },
  {
    id: 'trf-006',
    customerName: 'Ikhwan Fauzan',
    location: 'Pamijahan, Kab. Bogor',
    date: '30 Oktober 2026',
    items: '1x Madu JTS Vitalitas + 1x Minyak Herba But-But',
    amount: 200000,
    bankName: 'QRIS',
    status: 'Lunas & Terverifikasi',
    refNumber: 'QRIS-NMID-20261030-5520',
    notes: 'Bawakan saat terapis datang bekam panggilan ke rumah',
    imageUrl: undefined
  }
];
