/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingPage from '../components/LandingPage';
import ApplicationForm from '../components/ApplicationForm';
import LoadingScreen from '../components/LoadingScreen'; // Import naya component
import { useUser } from '@clerk/nextjs';
import { ViewState } from '../types';

export default function Home() {
  const { user, isLoaded } = useUser();
  const [view, setView] = useState<ViewState>('landing');
  const [hasApplied, setHasApplied] = useState(false);
  // NEW: Initial App Loading State
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.hasApplied) {
      setHasApplied(true);
    }
  }, [isLoaded, user]);

  return (
    <div className='flex flex-col min-h-screen relative'>
      {/* 1. Loading Screen Layer */}
      {isAppLoading && (
        <LoadingScreen onFinished={() => setIsAppLoading(false)} />
      )}

      {/* Content only starts appearing when loading is done */}
      <div
        className={`transition-opacity duration-700 ${isAppLoading ? 'opacity-0' : 'opacity-100'}`}>
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
