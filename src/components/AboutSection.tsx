import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Network } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80"
      >
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.24em] uppercase text-slate-300 mb-2">
            <span className="w-2.5 h-2.5 bg-purple-500 inline-block shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
            <span>TENTANG // PROFIL & PENDEKATAN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display uppercase">
            TENTANG SAYA
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-purple-400/80">
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>CORE_PHILOSOPHY.md</span>
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Formatted Bio & Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8 space-y-6"
        >
          <div className="relative rounded-3xl p-6 sm:p-8 glass-panel tech-grid-bg border border-slate-800/90 shadow-2xl space-y-5">
            {/* Ambient soft glow */}
            <div 
              aria-hidden="true" 
              className="pointer-events-none absolute -top-10 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
            />

            {/* Paragraph 1 */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Saya memiliki ketertarikan yang mendalam terhadap mekanisme kerja teknologi serta potensi pengembangannya dalam menciptakan solusi yang berdampak positif. Pendekatan belajar saya didasarkan pada{' '}
              <span className="text-white font-medium bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                implementasi praktis (hands-on approach)
              </span>
              , di mana saya merancang proyek nyata, melakukan troubleshooting secara sistematis, dan mengoptimalkan performa sistem secara berkelanjutan.
            </p>

            {/* Paragraph 2 */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Bagi saya, pengembangan perangkat lunak bukan sekadar merangkai pustaka (library) atau framework, melainkan sebuah proses{' '}
              <span className="text-purple-300 font-medium">pemecahan masalah kompleks</span> yang menuntut pemikiran komputasi logis, arsitektur yang kuat, serta efisiensi kode yang optimal.
            </p>

            {/* Paragraph 3 */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Berbekal latar belakang pendidikan di bidang{' '}
              <span className="text-white font-semibold underline decoration-purple-500/60 decoration-2 underline-offset-4">
                Teknik Komputer & Jaringan
              </span>{' '}
              serta{' '}
              <span className="text-white font-semibold underline decoration-purple-500/60 decoration-2 underline-offset-4">
                Sistem Informasi
              </span>
              , saya mampu menjembatani pemahaman mendalam tentang infrastruktur jaringan dan sistem dengan rekayasa aplikasi web modern yang andal dan terukur.
            </p>
          </div>
        </motion.div>

        {/* Right Column: 3 Core Pillars Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 space-y-4"
        >
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 flex items-start gap-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Hands-On Approach</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Troubleshooting sistematis & eksperimen aktif pada ekosistem proyek nyata.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 flex items-start gap-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Arsitektur Kuat & Bersih</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fokus efisiensi komputasi, struktur kode terstandar, dan performa tinggi.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 flex items-start gap-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Infrastruktur & Rekayasa Web</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Menjembatani jaringan fisik/cloud dengan frontend dan backend modern.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
