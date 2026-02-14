'use client';
import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinished, 500); // Thoda pause karke gayab hoga
          return 100;
        }
        // Random speed for realistic loading
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className='fixed inset-0 z-[9999] bg-[#EF323D] flex flex-col items-center justify-center overflow-hidden'>
      {/* Centered Logo Placeholder */}
      <div className='mb-12 animate-pulse scale-110 sm:scale-150'>
        <img
          src='/infxminecraft2.png'
          alt='Loading Logo'
          className='h-32 w-auto object-contain drop-shadow-2xl'
        />
      </div>

      {/* Progress Bar Container */}
      <div className='w-64 sm:w-96 h-1 bg-black/20 relative rounded-full overflow-hidden border border-white/10 shadow-inner'>
        {/* Modern Minecraft Loading Progress */}
        <div
          className='h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <div className='mt-4 font-pixel text-xl text-white tracking-[0.2em] opacity-80'>
        RECRUITMENT PROTOCOL {progress}%
      </div>

      {/* Decorative Corners */}
      <div className='absolute bottom-8 right-8 font-pixel text-white/40 text-sm'>
        SPIRALS MC
      </div>
    </div>
  );
};

export default LoadingScreen;
