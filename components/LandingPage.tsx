/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useUser, useClerk } from '@clerk/nextjs';

interface LandingPageProps {
  onStart: () => void;
}

interface RankNodeProps {
  rank: string;
  color: string;
  icon: string;
  desc?: string;
  isStart?: boolean;
  small?: boolean;
  isBranch?: boolean;
}

const RankNode: React.FC<RankNodeProps> = ({
  rank,
  color,
  icon,
  desc,
  isStart = false,
  small = false,
  isBranch = false,
}) => (
  <div
    className={`
  group relative transition-all duration-300 z-10 
  ${small ? 'w-48 sm:w-56' : 'w-full max-w-sm'}
  ${isBranch ? 'border-l-4 border-primary/30' : 'bg-black/40 backdrop-blur-md border border-white/10 p-1 hover:border-primary/50'}
  ${isStart ? 'shadow-[0_0_20px_rgba(57,211,57,0.1)] border-primary/20' : ''}
`}>
    <div
      className={`p-4 sm:p-6 flex ${small ? 'flex-col' : 'items-center'} gap-4 sm:gap-5 relative overflow-hidden`}>
      {/* Rule Style Gradient */}
      <div className='absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>

      {/* Icon Box with Gray Border */}
      <div
        className={`
      bg-mc-dark flex shrink-0 items-center justify-center border-2 border-gray-700 shadow-lg rounded-sm group-hover:scale-110 transition-transform duration-300
      ${small ? 'h-10 w-10 mx-auto mb-2' : 'h-14 w-14'}
    `}>
        <span
          className='material-icons text-primary'
          style={{ fontSize: small ? '20px' : '28px' }}>
          {icon}
        </span>
      </div>

      <div className={small ? 'text-center' : 'text-left'}>
        <div className='flex items-center justify-center sm:justify-start gap-2'>
          <h3
            className='font-pixel text-xl sm:text-2xl drop-shadow-md'
            style={{ color: color }}>
            {rank}
          </h3>
          {isStart && (
            <span className='text-[8px] bg-primary text-black px-1 font-bold font-pixel tracking-tighter'>
              START
            </span>
          )}
        </div>
        {!small && (
          <p className='text-gray-400 text-[10px] sm:text-xs font-display leading-tight tracking-wide mt-1'>
            {desc}
          </p>
        )}
      </div>
    </div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();

  const handleActionClick = () => {
    if (isSignedIn) {
      onStart();
    } else {
      openSignIn();
    }
  };

  return (
    <div className='relative pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 overflow-x-hidden'>
      {/* Floating 3D Items (Hidden on mobile for better focus) */}
      <div className='absolute top-32 left-5 lg:left-20 z-0 hidden lg:block opacity-80 animate-float'>
        <span className='material-symbols-outlined text-5xl lg:text-6xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]'>
          diamond
        </span>
      </div>
      <div className='absolute top-48 right-5 lg:right-20 z-0 hidden lg:block opacity-80 animate-float [animation-delay:1s]'>
        <span className='material-symbols-outlined text-5xl lg:text-6xl text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]'>
          menu_book
        </span>
      </div>

      <div className='relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-200px)]'>
        {/* Hero Text - Responsive Scaling */}
        <div className='text-center mb-8 sm:mb-10 mt-4 sm:mt-8'>
          <h1 className='font-pixel text-5xl sm:text-7xl md:text-9xl text-white mb-2 text-outline-mc tracking-widest drop-shadow-xl'>
            <span className='text-primary'>STAFF </span> RECRUITMENT!
          </h1>
          <p className='mt-4 max-w-2xl mx-auto text-base sm:text-xl md:text-2xl text-gray-200 font-pixel tracking-wide bg-black/40 py-2 px-4 sm:px-6 rounded-full border border-white/10 backdrop-blur-sm'>
            Shape the world. Enforce the rules. Become a Legend.
          </p>
        </div>

        {/* Main Action Card - Width & Padding adjustments */}
        <div className='w-full max-w-[95%] sm:max-w-lg bg-[rgba(30,30,30,0.7)] backdrop-blur-sm border-2 border-white/10 p-5 sm:p-8 rounded-sm relative shadow-mc-card'>
          {/* Corner Bolts */}
          <div className='absolute top-2 left-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 shadow-[1px_1px_0_#000]'></div>
          <div className='absolute top-2 right-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 shadow-[1px_1px_0_#000]'></div>
          <div className='absolute bottom-2 left-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 shadow-[1px_1px_0_#000]'></div>
          <div className='absolute bottom-2 right-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 shadow-[1px_1px_0_#000]'></div>

          {/* Profile Section - Responsive Flex */}
          <div className='flex flex-col sm:flex-row items-center sm:justify-between mb-6 sm:mb-8 border-b-2 border-white/5 pb-4 gap-4 sm:gap-0'>
            <div className='flex items-center gap-3 w-full sm:w-auto'>
              <div className='h-12 w-12 sm:h-14 sm:w-14 bg-black/40 border-2 border-primary rounded-sm overflow-hidden shadow-inner flex items-center justify-center shrink-0'>
                {isSignedIn ? (
                  <img
                    alt='Profile'
                    className='h-full w-full object-cover'
                    src={user?.imageUrl}
                  />
                ) : (
                  <span className='material-icons text-primary text-3xl sm:text-4xl'>
                    person
                  </span>
                )}
              </div>
              <div className='text-left'>
                <div className='font-pixel text-xl sm:text-2xl text-white leading-none shadow-black drop-shadow-sm'>
                  {isSignedIn ? user?.username : 'Guest_Player'}
                </div>
                <div className='text-[10px] text-primary font-bold uppercase tracking-wider mt-1 font-display'>
                  {isSignedIn ? 'AUTHENTICATED' : 'IDENTITY UNKNOWN'}
                </div>
              </div>
            </div>
            <div className='bg-black/50 px-3 py-1 rounded border border-white/10 w-full sm:w-auto text-center'>
              <span className='font-pixel text-base sm:text-lg text-primary animate-pulse whitespace-nowrap'>
                {isSignedIn ? 'STATUS: ONLINE' : 'STATUS: OFFLINE'}
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className='mb-8 sm:mb-10 relative mt-4 sm:mt-6'>
            <div className='w-full h-3 sm:h-3.5 bg-[#3a3a3a] border-2 border-black border-b-[#555] relative rounded-sm shadow-inner'>
              <div
                className='h-full bg-primary shadow-[inset_0px_2px_0px_rgba(255,255,255,0.3),0_0_10px_#39D339] rounded-sm relative transition-all duration-700'
                style={{ width: isSignedIn ? '60%' : '0%' }}>
                <div className='absolute top-0 left-0 w-full h-px sm:h-0.5 bg-white/40'></div>
              </div>
            </div>
            <div className='flex justify-between mt-2 px-1'>
              <span className='font-pixel text-[10px] sm:text-sm text-gray-400 uppercase tracking-tight'>
                Quest Authorization
              </span>
              <span className='font-pixel text-xs sm:text-sm text-primary'>
                {isSignedIn ? '60%' : '0%'}
              </span>
            </div>
          </div>

          {/* Dynamic Button */}
          <button
            onClick={handleActionClick}
            className='w-full bg-primary border-b-4 sm:border-b-8 border-primary-dark text-black font-pixel text-2xl sm:text-3xl py-3 sm:py-4 px-4 rounded-sm shadow-mc-btn hover:translate-y-1 active:translate-y-2 transition-all flex items-center justify-center gap-2 group'>
            {isSignedIn ? 'CONTINUE MISSION' : 'INITIALIZE LOGIN'}
            <span className='material-icons text-xl sm:text-2xl group-hover:translate-x-1 transition-transform'>
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Rules Section */}
      <div className='relative z-10 max-w-7xl mx-auto mt-12 sm:mt-20'>
        <div className='flex items-center gap-2 sm:gap-4 mb-8'>
          <div className='h-1 bg-white/10 grow rounded'></div>
          <h2 className='font-pixel text-3xl sm:text-4xl text-white text-shadow-sm text-center px-2 sm:px-4 uppercase whitespace-nowrap'>
            <span className='text-primary'>{`///`}</span> Server Rules
          </h2>
          <div className='h-1 bg-white/10 grow rounded'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
          {/* Rule Cards - Padding adjustments for mobile */}
          {[
            {
              icon: 'handshake',
              title: 'Respect',
              desc: 'Treat all players and staff with respect. Harassment and toxicity are strictly prohibited.',
            },
            {
              icon: 'gavel',
              title: 'No Griefing',
              desc: 'Destruction of builds is not allowed. All interactions are logged with zero tolerance.',
              important: true,
            },
            {
              icon: 'security',
              title: 'Security',
              desc: 'You are responsible for your account. Sharing or using compromised accounts is forbidden.',
            },
          ].map((rule, idx) => (
            <div
              key={idx}
              className={`group relative bg-black/40 backdrop-blur-md border border-white/10 p-1 hover:border-primary/50 transition-colors duration-300 ${rule.important ? 'md:-translate-y-4' : ''}`}>
              <div className='p-6 sm:p-8 h-full flex flex-col items-center text-center relative overflow-hidden'>
                {rule.important && (
                  <div className='absolute top-0 right-0 bg-primary text-black text-[10px] font-bold px-3 py-1 font-pixel shadow-lg'>
                    IMPORTANT
                  </div>
                )}
                <div className='absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                <div className='h-14 w-14 sm:h-16 sm:w-16 bg-mc-dark mb-4 flex items-center justify-center border-2 border-gray-700 shadow-lg rounded-sm group-hover:scale-110 transition-transform duration-300'>
                  <span className='material-icons text-primary text-2xl sm:text-3xl'>
                    {rule.icon}
                  </span>
                </div>
                <h3 className='font-pixel text-2xl sm:text-3xl text-white mb-2 sm:mb-3 drop-shadow-md'>
                  {rule.title}
                </h3>
                <p className='text-gray-400 text-xs sm:text-sm leading-relaxed font-display relative z-10'>
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements Section */}
      <div className='relative z-10 mt-16 sm:mt-24 bg-[#111] border-y border-white/10 py-10 sm:py- shadow-[0_0_50px_rgba(0,0,0,0.5)]'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='bg-[#1a1a1a] border border-white/5 p-6 sm:p-10 relative rounded shadow-2xl'>
            <div className='absolute -top-10 -right-10 opacity-20 transform rotate-45 hidden md:block'>
              <span className='material-symbols-outlined text-9xl text-white'>
                swords
              </span>
            </div>
            <div className='absolute -top-4 left-4 sm:-left-4 bg-primary text-black font-pixel text-lg sm:text-xl px-4 py-1 border-2 border-black transform -rotate-2 shadow-lg z-10'>
              MINIMUM REQS...
            </div>
            <ul className='space-y-3 sm:space-y-4 mt-6 sm:mt-4 relative z-10'>
              {[
                'Must be at least 14 years of age.',
                'Active on the server for at least 2 months.',
                'Working microphone and Discord account.',
                'Basic knowledge of server rules & commands.',
                'Basic common sense (sabse important 💀).',
              ].map((req, index) => (
                <li
                  key={index}
                  className='flex items-start gap-3 sm:gap-4 text-gray-300 group'>
                  <span className='h-2 w-2 bg-primary mt-2 shrink-0 group-hover:shadow-[0_0_8px_#80ff1f] transition-shadow'></span>
                  <span className='font-display text-sm sm:text-base'>
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Staff Evolution Tree - Purely Vertical */}
      <div className='relative z-10 max-w-4xl mx-auto mt-24 mb-32 px-4'>
        {/* Section Header */}
        <div className='flex items-center gap-4 mb-20'>
          <div className='h-1 bg-white/10 grow rounded'></div>
          <h2 className='font-pixel text-4xl text-white text-shadow-sm text-center px-4 uppercase'>
            <span className='text-primary'>{`///`}</span> The Staff Evolution
          </h2>
          <div className='h-1 bg-white/10 grow rounded'></div>
        </div>

        {/* Vertical Tree Container */}
        <div className='flex flex-col items-center relative'>
          {/* 1. Administrator (Top) */}
          <RankNode
            rank='Administrator'
            color='#ffaa00'
            icon='terminal'
            desc='Network leadership & technical governance of the realm.'
          />

          {/* Connection Line */}
          <div className='w-1 h-12 bg-linear-to-b from-primary/40 to-primary/20 relative'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#39D339]'></div>
          </div>

          {/* 2. Sr. Moderator */}
          <RankNode
            rank='Sr. Moderator'
            color='#ff5555'
            icon='workspace_premium'
            desc='Staff mentors & advanced dispute resolution protocols.'
          />

          {/* Connection Line */}
          <div className='w-1 h-12 bg-primary/20 relative flex items-center justify-center'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/40 rounded-full'></div>
          </div>

          {/* 3. Moderator */}
          <RankNode
            rank='Moderator'
            color='#55ff55'
            icon='shield'
            desc='Frontline guardians enforcing server protocols daily.'
          />

          {/* Connection Line */}
          <div className='w-1 h-12 bg-linear-to-b from-primary/20 to-primary/40 relative'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/60 rounded-full'></div>
          </div>

          {/* 4. Helper (Start Point) */}
          <RankNode
            rank='Helper'
            color='#55ffff'
            icon='help_center'
            desc='Citizen support & entry-level moderation duties.'
            isStart
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
