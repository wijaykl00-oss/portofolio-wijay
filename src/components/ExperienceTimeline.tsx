import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24 space-y-12">
      {/* ========================================================
          EXPERIENCES SECTION (Matching Image 1 Exactly with Scroll Reveal)
          ======================================================== */}
      <motion.div 
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden glass-panel tech-grid-bg border border-slate-800/80 p-6 sm:p-10 shadow-2xl"
      >
        {/* Soft subtle dark ambient vignette */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/3 w-[450px] h-[200px] bg-gradient-to-b from-purple-900/10 to-transparent blur-3xl rounded-full"
        />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3.5 mb-10">
          <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-center justify-center text-purple-400 shadow-md">
            <Briefcase className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Experiences
          </h2>
        </div>

        {/* Timeline items with connecting line */}
        <div className="relative z-10 pl-2 sm:pl-3 space-y-10">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-[13px] sm:left-[17px] top-3 bottom-6 w-px bg-slate-800" />

          {/* Item 1: Senior Product Engineer */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-start gap-4 sm:gap-6 group"
          >
            {/* Timeline concentric dot */}
            <div className="relative mt-1 flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-700 bg-slate-950 shrink-0 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    Senior Product Engineer
                  </h3>
                  <div className="text-xs text-slate-400 font-normal">
                    Garry Audie
                  </div>
                </div>

                <div className="self-start sm:self-center px-2.5 py-0.5 rounded bg-black/60 border border-slate-800/80 text-[11px] font-mono text-slate-400">
                  2023 — Present
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2.5 max-w-3xl">
                Leading development on internal developer tooling and dashboards. Implemented new component architecture reducing build times by 40%.
              </p>
            </div>
          </motion.div>

          {/* Item 2: Founder & CTO */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-start gap-4 sm:gap-6 group"
          >
            {/* Timeline concentric dot */}
            <div className="relative mt-1 flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-700 bg-slate-950 shrink-0 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    Founder & CTO
                  </h3>
                  <div className="text-xs text-slate-400 font-normal">
                    MetricDash
                  </div>
                </div>

                <div className="self-start sm:self-center px-2.5 py-0.5 rounded bg-black/60 border border-slate-800/80 text-[11px] font-mono text-slate-400">
                  2021 — 2023
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2.5 max-w-3xl">
                Bootstrapped privacy-focused analytics platform to $12k MRR. Managed infrastructure on AWS/Kubernetes.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ========================================================
          EDUCATION SECTION (Matching Image 2 Exactly with Scroll Reveal)
          ======================================================== */}
      <motion.div 
        id="education" 
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden glass-panel tech-grid-bg border border-slate-800/80 p-6 sm:p-10 shadow-2xl scroll-mt-24"
      >
        {/* Soft subtle dark ambient vignette */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/4 w-[400px] h-[180px] bg-gradient-to-b from-indigo-900/10 to-transparent blur-3xl rounded-full"
        />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3.5 mb-10">
          <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-blue-400 shadow-md">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Education
          </h2>
        </div>

        {/* Timeline item */}
        <div className="relative z-10 pl-2 sm:pl-3">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-start gap-4 sm:gap-6 group"
          >
            <div className="relative mt-1 flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-700 bg-slate-950 shrink-0 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    University of Computer Science
                  </h3>
                  <div className="text-xs text-slate-400 font-normal">
                    B.S. Software Engineering
                  </div>
                </div>

                <div className="self-start sm:self-center px-2.5 py-0.5 rounded bg-black/60 border border-slate-800/80 text-[11px] font-mono text-slate-400">
                  2015 — 2019
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2.5 max-w-3xl">
                Specialized in Human-Computer Interaction and Distributed Systems. Graduated with Honors.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
