'use client';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-6 sm:py-8 px-4 sm:px-6 relative z-10 group transition-colors duration-300 hover:border-primary/50'>
      {/* Rule Style Gradient Overlay (Synched with Header) */}
      <div className='absolute inset-0 bg-linear-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>

      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10'>
        {/* Left Side: Copyright & Branding (Responsive Alignment) */}
        <div className='flex flex-col items-center md:items-start gap-1 sm:gap-2'>
          <p className='font-pixel text-xl sm:text-2xl text-white tracking-wide text-center md:text-left'>
            © 2025-26 <span className='text-primary'>SPIRALS MC</span>!
          </p>
          <p className='text-gray-500 text-[10px] sm:text-xs font-display uppercase tracking-[0.2em] text-center md:text-left'>
            SHADOW OF INFIRALS.
          </p>
        </div>

        {/* Right Side: Social Links (Mobile Optimized) */}
        <div className='flex items-center gap-4'>
          <a
            href='#'
            className='bg-[#212121]/60 px-4 sm:px-5 py-2 border border-gray-700 hover:border-primary/50 hover:bg-black/60 transition-all duration-300 font-pixel text-lg sm:text-xl text-gray-400 hover:text-primary shadow-lg rounded-sm active:translate-y-0.5'>
            DISCORD!
          </a>
        </div>
      </div>

      {/* Responsive Animated Accent line at the bottom */}
      <div className='absolute bottom-0 left-0 h-[2px] bg-primary/20 w-0 group-hover:w-full transition-all duration-700 hidden sm:block'></div>
    </footer>
  );
};

export default Footer;
