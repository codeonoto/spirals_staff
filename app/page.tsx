/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingPage from '../components/LandingPage';
import ApplicationForm from '../components/ApplicationForm';
import LoadingScreen from '../components/LoadingScreen'; // Ensure this is created
import { useUser } from '@clerk/nextjs';
import { ViewState } from '../types';

export default function Home() {
  const { user, isLoaded } = useUser();
  const [view, setView] = useState<ViewState>('landing');
  const [hasApplied, setHasApplied] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // 1. Sync Logic for Clerk Metadata
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.hasApplied) {
      setHasApplied(true);
    }
  }, [isLoaded, user]);

  // 2. SCROLL LOCK LOGIC (Fixes scroll during loading)
  useEffect(() => {
    if (isAppLoading) {
      document.body.style.overflow = 'hidden'; // Scroll lock jab loading ho
    } else {
      document.body.style.overflow = 'auto'; // Unlock jab load ho jaye
    }
    // Cleanup function to prevent bugs
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAppLoading]);

  // 3. SCROLL TO TOP FIX (Switching between Landing/Form)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  return (
    <div className='flex flex-col min-h-screen relative'>
      {/* Loading Screen Overlay */}
      {isAppLoading && (
        <LoadingScreen onFinished={() => setIsAppLoading(false)} />
      )}

      {/* Main Content Container */}
      <div
        className={`transition-opacity duration-700 ${isAppLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Image Layer */}
        <div className='fixed inset-0 z-[-1]'>
          <img
            alt='Minecraft Background'
            className='w-full h-full object-cover filter blur-sm scale-105 brightness-[0.4]'
            // src='/infxminecraft2.png'
            src='https://lh3.googleusercontent.com/aida-public/AB6AXuD7sbsKa2b1_mUGwVdXNfxvl65iqnT7k15qbqdPfOrVERYrl5T-uHV_24yKFHzQpd4Xz2Z8Rcs_n93K5Bw-eTIeTj1YOLQk8DF3qnYOrEVPMFlWbsBafsYoPWcDhtV0kMrdkSW_hiecKhEdJmnbaWvcBAbhZPjcwRYXlFcYCU6uiEdOTkGxz2QOeMEib7CHFzJIpNo33FCB16ElnaLlNRjV4qf8WGNy9Gr7l9uMHzyrernecpdSm6INo2_lylRM0CrnSvOWa9zwfnyP'
          />
          <div className='absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-[#0a0c0a]'></div>
        </div>

        <Header />

        <main className='grow flex flex-col relative z-10'>
          {view === 'landing' ? (
            <LandingPage
              onStart={() => setView('form')}
              hasApplied={hasApplied}
            />
          ) : (
            <ApplicationForm
              onBack={() => setView('landing')}
              onComplete={() => {
                setHasApplied(true);
                setView('landing');
              }}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
