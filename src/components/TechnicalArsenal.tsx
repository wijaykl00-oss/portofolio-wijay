import React from 'react';
import { Globe, Settings, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export const TechnicalArsenal: React.FC = () => {
  return (
    <section id="arsenal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">
      {/* ========================================================
          TECHNICAL ARSENAL (Matching Image 3 with Scroll Reveal)
          ======================================================== */}
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2 mb-1.5">
          <span className="text-pink-400 font-mono font-bold text-lg">&lt;&gt;</span>
          <span>Technical Arsenal</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-normal">
          Tools and technologies I use to build the future.
        </p>
      </motion.div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Languages */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
        >
          <div>
            {/* Pink/Purple Icon */}
            <div className="w-10 h-10 rounded-xl bg-pink-950/40 border border-pink-700/40 flex items-center justify-center text-pink-400 font-mono font-bold text-sm mb-5 shadow-sm">
              &lt;/&gt;
            </div>

            <h3 className="text-base font-semibold text-white mb-4 tracking-tight">
              Languages
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                <span>TypeScript</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                <span>Python</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                <span>JavaScript</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Card 2: Web Development */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
        >
          <div>
            {/* Blue Icon */}
            <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-700/40 flex items-center justify-center text-blue-400 mb-5 shadow-sm">
              <Globe className="w-4 h-4" />
            </div>

            <h3 className="text-base font-semibold text-white mb-4 tracking-tight">
              Web Development
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Next.js / React</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Modern CSS</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Card 3: Agentic AI */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
        >
          <div>
            {/* Magenta/Purple Icon */}
            <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-700/40 flex items-center justify-center text-purple-400 mb-5 shadow-sm">
              <Radio className="w-4 h-4" />
            </div>

            <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
              Agentic AI
            </h3>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              Designing autonomous AI agents and intelligent workflows.
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                <span>Automation Flows</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                <span>LLM Integrations</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Card 4: Tools */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
        >
          <div>
            {/* Teal/Emerald Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 mb-5 shadow-sm">
              <Settings className="w-4 h-4" />
            </div>

            <h3 className="text-base font-semibold text-white mb-4 tracking-tight">
              Tools
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Git & GitHub</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Figma</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-300 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Supabase</span>
              </li>
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
