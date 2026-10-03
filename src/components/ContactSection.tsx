import React, { useState } from 'react';
import { Mail, Calendar, Check, Send, X, Clock, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROFILE_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  isBookingOpen: boolean;
  onCloseBooking: () => void;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isBookingOpen,
  onCloseBooking,
  onOpenBooking,
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectScope, setProjectScope] = useState('Design & Engineering (Full-Stack)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dates = ['Tomorrow', 'Oct 6, 2026', 'Oct 7, 2026', 'Oct 8, 2026'];
  const timeSlots = ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // simulate completed booking
    }, 500);
  };

  const handleResetBooking = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onCloseBooking();
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Ready to build card with Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden glass-panel tech-grid-bg border border-purple-500/20 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl"
      >
        <div 
          aria-hidden="true" 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" 
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-emerald-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new projects</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight mb-4">
            Ready to build your next product?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Let's discuss your product challenges and engineer a clear roadmap to scale your business efficiently.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:wijaykl00@gmail.com"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-white/10 active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>

            <button
              type="button"
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all flex items-center gap-2 shadow-lg shadow-purple-900/40 active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Call</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Interactive Booking Modal */}
      {isBookingOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={onCloseBooking}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-3xl bg-[#0f111c] border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Schedule Discovery Session</h3>
                  <p className="text-xs text-slate-400">30-min strategy & product consultation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseBooking}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Meeting Requested!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                  Thank you, <span className="text-purple-300 font-medium">{name || 'there'}</span>. Calendar invite and video conferencing link has been scheduled for <span className="text-white font-mono">{selectedDate} at {selectedSlot}</span>.
                </p>
                <button
                  type="button"
                  onClick={handleResetBooking}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Date & Slot selection */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
                    <span>1. Select Date</span>
                    <span className="text-purple-400 font-mono text-[11px]">UTC+7 Jakarta Time</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dates.map((date) => (
                      <button
                        type="button"
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                          selectedDate === date
                            ? 'bg-purple-600/30 border-purple-500 text-white font-semibold shadow-sm'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">2. Select Time Slot</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-2 rounded-xl border text-center font-mono transition-all ${
                          selectedSlot === slot
                            ? 'bg-purple-600/30 border-purple-500 text-white font-semibold'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Project Scope</label>
                  <select
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Design & Engineering (Full-Stack)">Design & Engineering (Full-Stack)</option>
                    <option value="UI/UX & Product Design System">UI/UX & Product Design System</option>
                    <option value="Brand Identity & Visual Direction">Brand Identity & Visual Direction</option>
                    <option value="Advisory / Code Audit">Advisory / Code & UX Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">What are you looking to build?</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly tell me about your goals, current stage, or timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={onCloseBooking}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-900/40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm Call Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
