import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  X, 
  Maximize2, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GALLERY_ITEMS } from '../data/portfolioData';
import { GalleryItem } from '../types/portfolio';

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_gallery_items');
      return saved ? JSON.parse(saved) : GALLERY_ITEMS;
    } catch {
      return GALLERY_ITEMS;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New design work form state
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newCategory, setNewCategory] = useState<'uiux' | 'mobile' | 'branding' | 'engineering' | 'visual3d'>('uiux');
  const [newYear, setNewYear] = useState('2025');
  const [newDescription, setNewDescription] = useState('');
  const [newImpact, setNewImpact] = useState('');
  const [newTools, setNewTools] = useState('Figma, React');
  const [newImageUrl, setNewImageUrl] = useState('');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'uiux', label: 'UI/UX & Web' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'branding', label: 'Brand Systems' },
    { id: 'engineering', label: 'Design Engineering' },
    { id: 'visual3d', label: 'Visual & 3D' },
  ];

  // Filtering
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Modal navigation
  const currentIndex = selectedItem ? filteredItems.findIndex(i => i.id === selectedItem.id) : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    } else if (filteredItems.length > 0) {
      setSelectedItem(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    } else if (filteredItems.length > 0) {
      setSelectedItem(filteredItems[0]);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: GalleryItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      client: newClient.trim() || 'Confidential Client',
      category: newCategory,
      categoryLabel: categories.find(c => c.id === newCategory)?.label || 'Design Work',
      year: newYear,
      image: newImageUrl.trim() || '/src/assets/images/project_saas_analytics_1791001627387.jpg',
      tags: newTools.split(',').map(t => t.trim()).filter(Boolean),
      description: newDescription.trim() || 'Custom design showcase piece.',
      impact: newImpact.trim() || 'Demonstrated outstanding visual fidelity and user engagement.',
      tools: newTools.split(',').map(t => t.trim()).filter(Boolean),
    };

    const updated = [newItem, ...items];
    setItems(updated);
    try {
      localStorage.setItem('portfolio_gallery_items', JSON.stringify(updated));
    } catch {}

    // Reset form
    setNewTitle('');
    setNewClient('');
    setNewDescription('');
    setNewImpact('');
    setNewImageUrl('');
    setIsAddModalOpen(false);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header with Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Works & Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Design Gallery & Archives
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            A curated collection of UI systems, brand languages, interactive prototypes, and production interfaces crafted over recent years.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Work to Gallery</span>
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs & Search Bar with Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80"
      >
        {/* Interactive Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, tag, or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Gallery Grid with Staggered Scroll Reveal */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
          <p className="text-slate-400 text-sm">No design works found matching the criteria.</p>
          <button
            type="button"
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs text-purple-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.55, 
                delay: (idx % 3) * 0.1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-panel glass-panel-hover flex flex-col transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                />
                
                {/* Hover Scrim & Quick Action */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-xs font-medium text-white flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>View Case Study</span>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Quiet Year & Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-white/10">
                  {item.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-purple-300 border border-white/10">
                  {item.year}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono mb-1">
                    Client: <span className="text-slate-300">{item.client}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Clean inline unboxed tags */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5 truncate">
                    {item.tools.slice(0, 3).map((tool, idx) => (
                      <React.Fragment key={idx}>
                        <span className="text-slate-400">{tool}</span>
                        {idx < Math.min(item.tools.length, 3) - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="text-purple-400 text-[11px] font-medium group-hover:underline flex items-center gap-0.5 shrink-0">
                    Open <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Interactive Lightbox / Case Study Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e1018] border border-slate-700/80 shadow-2xl shadow-purple-950/60 flex flex-col"
          >
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0e1018]/90 backdrop-blur-md border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-800/50 px-2.5 py-1 rounded-md">
                  {selectedItem.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedItem.year} · {selectedItem.client}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
                  title="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
                  title="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors ml-2"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              {/* Large Image Showcase */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-slate-800">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Impact Callout */}
              {selectedItem.impact && (
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold mb-0.5">
                      Business & Design Impact
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 font-medium">
                      {selectedItem.impact}
                    </div>
                  </div>
                </div>
              )}

              {/* Tools & Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Tools & Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Project Deliverables
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Design Work Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsAddModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-[#0e1018] border border-slate-700/80 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-400" />
                <span>Add Design Work to Portfolio</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenith Design System"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Client / Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Studio"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="uiux">UI/UX & Web</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="branding">Brand Systems</option>
                    <option value="engineering">Design Engineering</option>
                    <option value="visual3d">Visual & 3D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief overview of the design..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tools (comma separated)</label>
                <input
                  type="text"
                  placeholder="Figma, React, Tailwind, Spline"
                  value={newTools}
                  onChange={(e) => setNewTools(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Upload Work Image or Paste URL</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="block w-full text-xs text-slate-400 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 mb-2"
                />
                <input
                  type="text"
                  placeholder="Or image URL (defaults to sample design render)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-purple-500 text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-md shadow-purple-950/40"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
