/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveHero } from './components/InteractiveHero';
import { GlisteningRainBackground } from './components/GlisteningRainBackground';
import { AboutSection } from './components/AboutSection';
import { SelectedProjects } from './components/SelectedProjects';
import { GallerySection } from './components/GallerySection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleExploreGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200 relative overflow-x-hidden">
      {/* Ambient Glistening Rain Sparks Canvas */}
      <GlisteningRainBackground />

      {/* Top Header Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Interactive Centered Portrait & Bubble Lens */}
        <InteractiveHero
          onOpenBooking={handleOpenBooking}
          onExploreGallery={handleExploreGallery}
        />

        {/* About Section (Profil & Filosofi) */}
        <AboutSection />

        {/* Selected Featured Projects */}
        <SelectedProjects />

        {/* Design Gallery & Archives Feature */}
        <GallerySection />

        {/* Experience & Education Timelines */}
        <ExperienceTimeline />

        {/* Technical & Creative Arsenal */}
        <TechnicalArsenal />

        {/* Contact & Meeting Scheduler */}
        <ContactSection
          isBookingOpen={isBookingOpen}
          onCloseBooking={handleCloseBooking}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
