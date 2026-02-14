/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingPage from '../components/LandingPage';
import ApplicationForm from '../components/ApplicationForm';
import { ViewState } from '../types';

export default function Home() {
  const [view, setView] = useState<ViewState>('landing');
  // New state to track if application is finished
  const [hasApplied, setHasApplied] = useState(false);

  const handleStartApplication = () => {
    setView('form');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  // Function called when the user finishes all 3 sections of the form
  const handleApplicationComplete = () => {
    setHasApplied(true);
    setView('landing'); // Wapas landing page par bhejo
    window.scrollTo(0, 0);
  };

  return (
    <div className='flex flex-col min-h-screen relative'>
      {/* Background Image Layer */}
      <div className='fixed inset-0 z-[-1]'>
        <img
          alt='Blurred Minecraft Shader Background'
          className='w-full h-full object-cover filter blur-sm scale-105 brightness-[0.4]'
          src='https://lh3.googleusercontent.com/aida-public/AB6AXuD7sbsKa2b1_mUGwVdXNfxvl65iqnT7k15qbqdPfOrVERYrl5T-uHV_24yKFHzQpd4Xz2Z8Rcs_n93K5Bw-eTIeTj1YOLQk8DF3qnYOrEVPMFlWbsBafsYoPWcDhtV0kMrdkSW_hiecKhEdJmnbaWvcBAbhZPjcwRYXlFcYCU6uiEdOTkGxz2QOeMEib7CHFzJIpNo33FCB16ElnaLlNRjV4qf8WGNy9Gr7l9uMHzyrernecpdSm6INo2_lylRM0CrnSvOWa9zwfnyP'
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-[#0a0c0a]'></div>
      </div>

      <Header />

      <main className='grow flex flex-col relative z-10'>
        {view === 'landing' ? (
          <LandingPage
            onStart={handleStartApplication}
            hasApplied={hasApplied} // Pass application status to landing page
          />
        ) : (
          <ApplicationForm
            onBack={handleBackToLanding}
            onComplete={handleApplicationComplete} // Pass completion handler
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
