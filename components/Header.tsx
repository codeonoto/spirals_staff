'use client';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const serverIP = 'smc.infirals.in';

  // Live Status Fetching Logic
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
        const data = await res.json();
        if (data.online) {
          setOnlinePlayers(data.players?.online || 0);
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch (error) {
        console.error('Failed to fetch server status', error);
        setIsOnline(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Har 1 minute mein update hoga
    return () => clearInterval(interval);
  }, []);

  // Click to Copy IP Feature
  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    // Aap yahan ek toast bhi add kar sakte hain
    alert('Server IP Copied: ' + serverIP);
  };

  return (
    <nav className='fixed top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/10 h-20 group transition-colors duration-300 hover:border-primary/50'>
      <div className='absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10'>
        <div className='flex items-center justify-between h-full'>
          {/* 1. LEFT: Logo */}
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='h-10 w-10 sm:h-20 sm:w-20 '>
              <img
                src='/infxminecraft2.png'
                alt='Infirals Logo'
                className='w-full h-full object-contain p-1'
              />
            </div>
          </div>

          {/* 2. CENTER: Dynamic Server IP & Status */}
          <div className='hidden md:flex items-center'>
            <div
              // onClick={copyToClipboard}
              className='bg-black/60 px-4 ml-16 -mr-6 lg:px-12 py-1 border border-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-2 lg:gap-3 cursor-pointer group/ip'>
              <span
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-pulse shadow-[0_0_8px_#39D339] ${isOnline ? 'bg-primary' : 'bg-red-500 shadow-[0_0_8px_#ff0000]'}`}></span>
              <span className='font-pixel text-xl lg:text-2xl text-primary group-hover/ip:text-white transition-colors'>
                {serverIP}
              </span>
              <span className='text-xs text-gray-400 font-display ml-2'>
                {isOnline ? `${onlinePlayers ?? 0} Online` : 'Offline'}
              </span>
            </div>
          </div>

          {/* 3. RIGHT: Auth */}
          <div className='flex items-center'>
            {isLoaded &&
              (isSignedIn ? (
                <div className='flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 sm:pr-4 '>
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
