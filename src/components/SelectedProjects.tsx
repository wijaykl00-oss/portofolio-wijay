import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';

export const SelectedProjects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header with Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between mb-10 pb-4 border-b border-slate-800/80"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Selected Projects</span>
          </h2>
        </div>
        <a
          href="#gallery"
          className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <span>View Archive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>

      {/* Projects Grid with Staggered Scroll Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {FEATURED_PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ 
              duration: 0.65, 
              delay: idx * 0.15, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="group relative rounded-3xl overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between border border-slate-800/90 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40"
          >
            {/* Top Project Preview */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
              />
              
              {/* Highlight Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-transparent to-transparent opacity-90" />

              {project.metrics && (
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-500/40 text-[11px] font-mono text-purple-200 shadow-md">
                  {project.metrics}
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>{project.categoryLabel}</span>
                  <span className="text-purple-400">{project.year}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/40 text-purple-300 border border-purple-800/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="text-xs font-semibold text-white hover:text-purple-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Live demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0e1017] border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-1">
                  {activeProject.categoryLabel} · {activeProject.year}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-black">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-relaxed">{activeProject.description}</p>

              {activeProject.challenge && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">The Problem</h4>
                  <p className="text-xs sm:text-sm text-slate-300">{activeProject.challenge}</p>
                </div>
              )}

              {activeProject.solution && (
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40">
                  <h4 className="text-xs font-mono uppercase text-purple-300 mb-1">Architectural Solution</h4>
                  <p className="text-xs sm:text-sm text-purple-200">{activeProject.solution}</p>
                </div>
              )}

              <div className="pt-4 flex flex-wrap gap-2">
                {activeProject.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
