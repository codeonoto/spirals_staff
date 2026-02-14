/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingPage from '../components/LandingPage';
import ApplicationForm from '../components/ApplicationForm';
import { useUser } from '@clerk/nextjs'; // Clerk useUser hook
import { ViewState } from '../types';

export default function Home() {
  const { user, isLoaded } = useUser(); // User data load karne ke liye
  const [view, setView] = useState<ViewState>('landing');
  const [hasApplied, setHasApplied] = useState(false);

  // 1. Sync Logic: Jab page load ho, check karo user ne pehle apply kiya hai ya nahi
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.hasApplied) {
      setHasApplied(true);
    }
  }, [isLoaded, user]);

  const handleStartApplication = () => {
    setView('form');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  // 2. Completion Logic: Form submit hote hi state update karo
  const handleApplicationComplete = () => {
    setHasApplied(true);
    setView('landing');
    window.scrollTo(0, 0);
  };

  return (
    <div className='flex flex-col min-h-screen relative'>
      {/* Background Layer */}
      <div className='fixed inset-0 z-[-1]'>
        <img
          alt='Minecraft Background'
          className='w-full h-full object-cover filter blur-sm scale-105 brightness-[0.4]'
          src='https://lh3.googleusercontent.com/aida-public/AB6AXuD7sbsKa2b1_mUGwVdXNfxvl65iqnT7k15qbqdPfOrVERYrl5T-uHV_24yKFHzQpd4Xz2Z8Rcs_n93K5Bw-eTIeTj1YOLQk8DF3qnYOrEVPMFlWbsBafsYoPWcDhtV0kMrdkSW_hiecKhEdJmnbaWvcBAbhZPjcwRYXlFcYCU6uiEdOTkGxz2QOeMEib7CHFzJIpNo33FCB16ElnaLlNRjV4qf8WGNy9Gr7l9uMHzyrernecpdSm6INo2_lylRM0CrnSvOWa9zwfnyP'
          // Apni image path use karein
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-[#0a0c0a]'></div>
      </div>

      <Header />

      <main className='grow flex flex-col relative z-10'>
        {view === 'landing' ? (
          <LandingPage
            onStart={handleStartApplication}
            hasApplied={hasApplied} // Pass status to LandingPage
          />
        ) : (
          <ApplicationForm
            onBack={handleBackToLanding}
            onComplete={handleApplicationComplete} // Submit hone par status change karega
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
