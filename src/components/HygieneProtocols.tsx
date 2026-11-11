import React from 'react';
import { Trash2, Sparkles, Award, Droplets, CheckCircle, ShieldCheck } from 'lucide-react';
import { THERAPIST_INFO } from '../data/treatments';

export const HygieneProtocols: React.FC = () => {
  const protocols = [
    {
      icon: <Trash2 className="w-6 h-6 text-emerald-600" />,
      title: 'Jarum Lancet 100% Sekali Pakai',
      desc: 'Segel jarum lancet steril selalu dibuka langsung di hadapan pasien sebelum terapi dan langsung dibuang ke wadah pembuangan jarum (tidak pernah dipakai ulang).'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      title: 'Kop Tersterilisasi & Higienis',
      desc: 'Setiap gelas kop melalui pencucian deterjen medis, perendaman disinfektan antiseptik berstandar kesehatan, dan dikeringkan secara higienis sebelum digunakan.'
    },
    {
      icon: <Droplets className="w-6 h-6 text-emerald-600" />,
      title: 'Minyak Herba Alami Berkualitas',
      desc: 'Menggunakan minyak zaitun murni dan minyak herba hangat pilihan yang higienis untuk menjaga kelembapan kulit, melancarkan seluncur, dan antibakteri alami.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Sarung Tangan Medis Sekali Pakai',
      desc: 'Terapis wajib mengenakan sarung tangan medis non-alergenik sekali pakai serta menjaga kebersihan tangan selama proses bekam basah maupun kering.'
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: 'Praktisi Bersertifikat dan Bersanad',
      desc: 'Terapis ikhwan kami merupakan praktisi yang telah lulus sertifikasi kompetensi bekam serta memiliki sanad bekam aswaja yang jelas dan terpercaya.'
    }
  ];

  return (
    <section id="sterilitas" className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Higienitas &amp; Keamanan Terjamin
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Standar Higienitas Medis &amp; Sanad Keilmuan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Kesehatan dan kenyamanan Anda adalah amanah terbesar kami. Di Bekam Bogor, kami menjamin peralatan steril sekali pakai dan penanganan langsung oleh praktisi terapis bersertifikat resmi dengan standar higienis SOP medis.
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-300 group shadow-2xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}

          {/* Special Banner Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-700 text-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-2">
                Khusus Ikhwan (Laki-laki)
              </div>
              <h3 className="text-base font-bold mb-2">Pelayanan Amanah &amp; Terjaga Privasi</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Ditangani khusus untuk pasien pria oleh terapis ikhwan berpengalaman. Cek tekanan darah (tensi) diberikan secara gratis sebelum terapi.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center gap-2 text-xs text-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Gratis Cek Tensi Darah</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
