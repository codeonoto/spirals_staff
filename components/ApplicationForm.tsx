import React, { useState } from 'react';
import Lever from './Lever';

interface ApplicationFormProps {
  onBack: () => void;
  onComplete: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [leverChecked, setLeverChecked] = useState(false);
  const [formData, setFormData] = useState({
    ign: '',
    age: '',
    answers: {},
    mcqs: {},
  });

  // Quest Steps logic
  const renderBasics = () => (
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4'>
      <div className='bg-primary/5 p-4 border-l-4 border-primary mb-6'>
        <p className='text-primary font-pixel text-lg uppercase'>
          Protocol Alpha: Identity Verification
        </p>
        <p className='text-zinc-400 text-sm'>
          Explain: This is a test of your staff intuition. Answer with
          integrity.
        </p>
      </div>
      <div className='grid md:grid-cols-2 gap-8'>
        <div className='space-y-2'>
          <label className='font-pixel text-xl text-zinc-300'>
            MINECRAFT GAME TAG
          </label>
          <input
            className='w-full bg-black/40 border-2 border-white/10 p-4 font-mono text-white focus:border-primary outline-none transition-all'
            placeholder='e.g. Steve_MC'
            value={formData.ign}
            onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
          />
        </div>
        <div className='space-y-2'>
          <label className='font-pixel text-xl text-zinc-300'>
            CURRENT AGE
          </label>
          <input
            type='number'
            className='w-full bg-black/40 border-2 border-white/10 p-4 font-mono text-white focus:border-primary outline-none transition-all'
            placeholder='18'
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  const renderScenarios = () => (
    <div className='space-y-12 animate-in fade-in slide-in-from-bottom-4'>
      <p className='text-zinc-400 font-display italic'>
        Section 2: 5 Situational Protocols (Written Analysis)
      </p>
      {[1, 2, 3, 4, 5].map((q) => (
        <div
          key={q}
          className='relative group'>
          <div className='flex items-baseline gap-3 mb-3'>
            <span className='font-pixel text-2xl text-primary'>0{q}.</span>
            <label className='text-lg font-medium text-gray-200 font-display'>
              Incident Scenario {q}: How would you manage a priority-1 breach?
            </label>
          </div>
          <textarea
            className='w-full bg-black/40 border-2 border-[#3d3d3d] text-gray-300 p-4 font-mono text-sm focus:border-primary outline-none h-32'
            placeholder='> Record your actions...'
          />
        </div>
      ))}
    </div>
  );

  const renderExam = () => (
    <div className='space-y-12 animate-in fade-in slide-in-from-bottom-4'>
      <p className='text-zinc-400 font-display italic'>
        Final Section: 10 Knowledge Points (MCQ)
      </p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
        <div
          key={q}
          className='space-y-4'>
          <p className='font-pixel text-2xl text-white'>
            Q{q}. What is the protocol for griefing detection?
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {[
              'Option A: Immediate Ban',
              'Option B: Warning Only',
              'Option C: Investigation',
              'Option D: Ignore',
            ].map((opt, i) => (
              <button
                key={i}
                className='bg-black/40 border border-white/10 p-3 text-left hover:bg-primary/20 hover:border-primary transition-all font-display text-sm text-zinc-400 hover:text-white'>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='container pt-28 sm:pt-28 mx-auto px-4 py-12 max-w-4xl'>
      {/* Progress Tracker synced with step state */}
      <div className='mb-16 w-full flex items-center justify-between px-8 relative'>
        <div
          className={`flex flex-col items-center z-10 ${step >= 1 ? 'text-primary' : 'text-zinc-600'}`}>
          <div
            className={`w-14 h-14 bg-gui-bg border-2 flex items-center justify-center rounded-sm mb-2 ${step >= 1 ? 'border-primary' : 'border-white/10'}`}>
            <span className='material-symbols-outlined text-3xl'>map</span>
          </div>
          <span className='font-pixel text-xl'>Basics</span>
        </div>
        <div
          className={`flex-1 h-1 mx-4 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`}
        />
        <div
          className={`flex flex-col items-center z-10 ${step >= 2 ? 'text-primary' : 'text-zinc-600'}`}>
          <div
            className={`w-14 h-14 bg-gui-bg border-2 flex items-center justify-center rounded-sm mb-2 ${step >= 2 ? 'border-primary' : 'border-white/10'}`}>
            <span className='material-symbols-outlined text-3xl'>
              edit_note
            </span>
          </div>
          <span className='font-pixel text-xl'>Scenarios</span>
        </div>
        <div
          className={`flex-1 h-1 mx-4 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-white/10'}`}
        />
        <div
          className={`flex flex-col items-center z-10 ${step >= 3 ? 'text-primary' : 'text-zinc-600'}`}>
          <div
            className={`w-14 h-14 bg-gui-bg border-2 flex items-center justify-center rounded-sm mb-2 ${step >= 3 ? 'border-primary' : 'border-white/10'}`}>
            <span className='material-symbols-outlined text-3xl'>swords</span>
          </div>
          <span className='font-pixel text-xl'>Exam</span>
        </div>
      </div>

      {/* Main Form Content */}
      <div className='relative bg-gui-bg backdrop-blur-sm p-8 border-2 border-white/10 shadow-2xl rounded-sm'>
        {step === 1 && renderBasics()}
        {step === 2 && renderScenarios()}
        {step === 3 && renderExam()}

        <div className='mt-14 flex justify-between gap-4'>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className='bg-[#c6c6c6] text-[#373737] font-pixel text-xl px-8 py-3 rounded-sm shadow-mc-inset active:translate-y-1 transition-all'>
              BACK
            </button>
          )}
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : onComplete())}
            className='bg-primary text-black font-pixel text-xl px-12 py-3 rounded-sm shadow-mc-btn hover:translate-y-1 active:translate-y-2 transition-all ml-auto'>
            {step === 3 ? 'SUBMIT PROTOCOL' : 'CONTINUE MISSION'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
