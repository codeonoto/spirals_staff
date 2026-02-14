import React from 'react';

interface LeverProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Lever: React.FC<LeverProps> = ({ checked, onChange }) => {
  return (
    <div className='flex items-center gap-4 select-none'>
      <label className='relative inline-flex items-center cursor-pointer group'>
        <input
          type='checkbox'
          className='sr-only peer'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className='w-[40px] h-[40px] bg-[#4a4a4a] shadow-[inset_2px_2px_0_#2a2a2a,inset_-2px_-2px_0_#6a6a6a] relative rounded-sm border-2 border-[#1c1c1c]'>
          {/* The Handle */}
          <div
            className={`
                            absolute left-1/2 top-1/2 w-[8px] h-[24px] bg-[#8b6b4b] 
                            shadow-[1px_1px_0_#4a3b2b]
                            origin-bottom transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
                            ${checked ? 'translate-x-[-50%] translate-y-[-50%] rotate-45' : 'translate-x-[-50%] translate-y-[-50%] -rotate-45'}
                        `}>
            {/* Cobblestone base of handle */}
            <div className='absolute -top-[4px] -left-[2px] w-[12px] h-[12px] bg-[#727272] shadow-[inset_1px_1px_0_#929292,inset_-1px_-1px_0_#525252]'></div>
          </div>
        </div>
      </label>

      {/* Redstone Torch */}
      <div
        className={`
                    w-[8px] h-[16px] rounded-t-sm ml-2 relative transition-all duration-200
                    ${
                      checked
                        ? 'bg-[#ff0000] shadow-[0_0_8px_#ff0000,0_0_16px_#ff4444]'
                        : 'bg-[#500000]'
                    }
                `}>
        {/* Particle effects if active could go here */}
      </div>

      <div className='flex flex-col ml-2'>
        <span className='text-[10px] uppercase font-bold text-gray-500 tracking-wider font-display'>
          Signal Strength
        </span>
        <span
          className={`font-pixel text-lg ${checked ? 'text-red-500' : 'text-gray-600'}`}>
          {checked ? '15' : '0'}
        </span>
      </div>
    </div>
  );
};

export default Lever;
