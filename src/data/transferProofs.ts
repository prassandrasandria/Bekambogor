export interface TransferProof {
  id: string;
  customerName: string;
  senderName: string;
  receiverName: string;
  location: string;
  date: string;
  items: string;
  amount: number;
  bankName: 'SeaBank' | 'Bank Jago (Syariah)' | 'BRI (BRImo)' | 'BCA' | 'DANA / E-Wallet';
  status: 'Lunas & Terverifikasi';
  refNumber: string;
  notes: string;
  imageUrl: string;
}

export const INITIAL_TRANSFER_PROOFS: TransferProof[] = [
  {
    id: 'trf-001',
    customerName: 'Muhammad Agung Betariko',
    senderName: 'Muhammad Agung Betariko (SeaBank: 901132522573)',
    receiverName: 'Prassandra Sandria (SeaBank: 901655497524)',
    location: 'Bogor',
    date: '17 Mar 2026, 22:37 WIB',
    items: 'Pelunasan Terapi Bekam & Herbal Alami',
    amount: 150000,
    bankName: 'SeaBank',
    status: 'Lunas & Terverifikasi',
    refNumber: '2026031743504817303293',
    notes: 'Transfer SeaBank Realtime Online ke Prassandra Sandria',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_23.08.38__1__82737878.jpeg'
  },
  {
    id: 'trf-002',
    customerName: 'Saeful R Hidayat',
    senderName: 'Saeful R Hidayat (Jago: 502220774979)',
    receiverName: 'Prassandra Sandria (Jago: 503300849725)',
    location: 'Bogor',
    date: '02 Jun 2026, 19:32 WIB',
    items: 'Paket Terapi Bekam Basah & Madu Vitalitas',
    amount: 199000,
    bankName: 'Bank Jago (Syariah)',
    status: 'Lunas & Terverifikasi',
    refNumber: '260602-CC3H-LJZ4TQ',
    notes: 'Resi Resmi Bank Jago Syariah ke Prassandra Sandria',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_23.08.38_f7c45f18.jpeg'
  },
  {
    id: 'trf-003',
    customerName: 'Muhammad Agung Betariko',
    senderName: 'Muhammad Agung Betariko (BRI: 0546 **** 563)',
    receiverName: 'Prassandra Sandria (SeaBank: 9016 5549 7524)',
    location: 'Bogor',
    date: '22 Juni 2026, 12:27 WIB',
    items: 'Pelunasan Terapi Bekam Home Care Lengkap',
    amount: 199000,
    bankName: 'BRI (BRImo)',
    status: 'Lunas & Terverifikasi',
    refNumber: '163926083907',
    notes: 'Transfer BI-FAST via BRImo Berhasil (Total Rp 201.500)',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_23.07.35_b9d64cdd.jpeg'
  },
  {
    id: 'trf-004',
    customerName: 'Muhammad Fakhri Waliyuddin',
    senderName: 'Muhammad Fakhri Waliyuddin (SeaBank: 901081718181)',
    receiverName: 'Dnid Praxxxxxxx Sanxxxx (DANA: 08996342009)',
    location: 'Bogor',
    date: '14 Okt 2026',
    items: 'Paket Bekam Punggung Sunnah',
    amount: 100000,
    bankName: 'SeaBank',
    status: 'Lunas & Terverifikasi',
    refNumber: '2026110143500399602622125',
    notes: 'Pembayaran Diterima via SeaBank ke e-Wallet DANA',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_23.07.34__2__c698d386.jpeg'
  },
  {
    id: 'trf-005',
    customerName: 'Pasien Terapi (m-BCA)',
    senderName: 'Akun BCA (628 - 0** - **28)',
    receiverName: 'Dnid PRAXXXXXXX SANXXXX (DANA: 0899-634-2009)',
    location: 'Bogor',
    date: '06 Mei 2026, 18:19 WIB',
    items: 'Terapi Bekam Full Body & Herbal Jamu',
    amount: 200000,
    bankName: 'BCA',
    status: 'Lunas & Terverifikasi',
    refNumber: '9527120260506181910586TPP8156955000',
    notes: 'Pembayaran e-Wallet DANA via BCA Mobile Berhasil',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_23.07.34__1__c42b7841.jpeg'
  },
  {
    id: 'trf-006',
    customerName: 'Muhammad Fakhri Waliyuddin',
    senderName: 'Muhammad Fakhri Waliyuddin (SeaBank: 901081718181)',
    receiverName: 'Dnid Praxxxxxxx Sanxxxx (DANA: 08996342009)',
    location: 'Bogor',
    date: '04 Nov 2026, 08:15 WIB',
    items: 'Sesi Bekam Panggilan Home Care + Ongkir Transport',
    amount: 200000,
    bankName: 'DANA / E-Wallet',
    status: 'Lunas & Terverifikasi',
    refNumber: '20261104SSPIIDJAF010050948350',
    notes: 'Rincian Transaksi Selesai via SeaBank ke DANA',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_23.07.34_ae8679ea.jpeg'
  }
];
