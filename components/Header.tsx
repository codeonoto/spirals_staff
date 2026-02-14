'use client';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import React from 'react';

const Header: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <nav className='fixed top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/10 h-20 group transition-colors duration-300 hover:border-primary/50'>
      <div className='absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10'>
        {/* Responsive Flexbox/Grid Layout */}
        <div className='flex items-center justify-between h-full'>
          {/* 1. LEFT: Logo (Icon hamesha dikhega, Text sirf Tablet/Desktop par) */}
          {/* <div className='flex items-center gap-3 sm:gap-4'>
            <div className='h-10 w-10 sm:h-12 sm:w-12 bg-[#212121] flex items-center justify-center border-2 border-gray-700 shadow-lg rounded-sm group-hover:scale-110 transition-transform duration-300'>
              <span className='material-icons text-primary text-xl sm:text-2xl'>
                security
              </span>
            </div>
            <span className='font-pixel text-2xl sm:text-4xl text-white tracking-wide drop-shadow-md hidden md:block'>
              SPIRALS <span className='text-primary'>MC</span>
            </span>
          </div> */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {/* Logo Container - Infirals Logo */}
            <div className='h-10 w-10 sm:h-20 sm:w-20 '>
              <img
                src='/infxminecraft2.png' // Aapne logo file public folder mein isi naam se save karni hai
                alt='Infirals Logo'
                className='w-full h-full object-contain p-1'
              />
            </div>

            {/* Text Branding - Synced with Infirals Identity */}
            {/* <span className='font-pixel text-2xl sm:text-4xl text-white tracking-wide drop-shadow-md hidden md:block'>
              <span className='text-primary'> </span>
            </span> */}
          </div>

          {/* 2. CENTER: Server IP (Sirf Tablet/Desktop par dikhega) */}
          <div className='hidden md:flex items-center '>
            <div className='bg-black/60 px-4 ml-14 lg:px-12 py-1 border border-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-2 lg:gap-3 cursor-pointer group/ip'>
              <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#39D339]'></span>
              <span className='font-pixel text-xl lg:text-2xl text-primary group-hover/ip:text-white transition-colors'>
                smc.infirals.in
              </span>
              <span className='text-xs text-gray-400 font-display ml-2'>
                69 Online
              </span>
            </div>
          </div>

          {/* 3. RIGHT: Auth (Profile ya Register button) */}
          <div className='flex items-center'>
            {isLoaded &&
              (isSignedIn ? (
                <div className='flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 sm:pr-4 '>
                  {/* Username sirf mobile se upar dikhega */}
                  <div className='text-right hidden sm:block'>
                    <p className='font-pixel text-lg sm:text-xl leading-none text-white'>
                      {user?.username || 'Player'}
                    </p>
                    <p className='text-[8px] sm:text-[10px] font-display text-primary uppercase tracking-tighter'>
                      logged in
                    </p>
                  </div>
                  <UserButton
                    afterSignOutUrl='/'
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          'h-8 w-8 sm:h-9 sm:w-9 rounded-sm border-2 border-primary shadow-sm',
                      },
                    }}
                  />
                </div>
              ) : (
                <SignInButton mode='modal'>
                  <button className='bg-primary border-b-4 border-primary-dark text-black font-pixel text-lg sm:text-2xl px-4 sm:px-6 py-1.5 sm:py-2 rounded-sm shadow-mc-btn hover:translate-y-0.5 active:translate-y-1 transition-all uppercase tracking-wider'>
                    Register
                  </button>
                </SignInButton>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
