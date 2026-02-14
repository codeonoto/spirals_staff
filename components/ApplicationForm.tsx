'use client';
import React, { useState } from 'react';

interface ApplicationFormProps {
  onBack: () => void;
  onComplete: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [formData, setFormData] = useState({
    ign: '',
    age: '',
    platform: '',
    otherPlatform: '',
    answers: {} as Record<number, string>,
    mcqs: {} as Record<number, number>,
  });

  const mcqQuestions = [
    {
      q: 'What is the primary command to check block history?',
      h: 'Block ki history check karne ki main command kya hai?',
      options: ['/history', '/co inspect', '/check', '/blockinfo'],
      correct: 1,
    },
    {
      q: 'A player is using minor abusive language for the first time. Protocol?',
      h: 'Player pehli baar halki gali de raha hai, kya karoge?',
      options: ['Permanent Ban', 'IP Ban', 'Formal Warning', 'Ignore'],
      correct: 2,
    },
    {
      q: 'Which rank is responsible for managing other staff members?',
      h: 'Baaki staff ko manage karne ki zimmedari kis rank ki hai?',
      options: ['Helper', 'Moderator', 'Administrator', 'Builder'],
      correct: 2,
    },
    {
      q: 'You see a player flying in a survival zone. First action?',
      h: 'Survival mein kisi ko udte dekha, sabse pehle kya karoge?',
      options: [
        'Ban immediately',
        'Teleport and ask',
        'Start recording evidence',
        'Kill them',
      ],
      correct: 2,
    },
    {
      q: 'What should you do if a player reports a grief but has no proof?',
      h: 'Player ne grief report kiya par proof nahi hai, tab kya karoge?',
      options: [
        'Ignore it',
        'Check logs via CoreProtect',
        'Trust the reporter',
        'Ban the suspect',
      ],
      correct: 1,
    },
    {
      q: 'Is sharing staff-only information with friends allowed?',
      h: 'Kya staff ki secret baatein doston ko batana allowed hai?',
      options: [
        'Yes, if they are trusted',
        'Only with permission',
        'Strictly Forbidden',
        'Only on Discord',
      ],
      correct: 2,
    },
    {
      q: 'What is the maximum warning limit before a temporary mute?',
      h: 'Mute hone se pehle zyada se zyada kitni warnings mil sakti hain?',
      options: ['1 Warning', '3 Warnings', '5 Warnings', 'No Warnings'],
      correct: 1,
    },
    {
      q: 'Correct command to temporarily ban a player for 1 day?',
      h: 'Player ko 1 din ke liye ban karne ki sahi command kya hai?',
      options: ['/ban 1d', '/tempban 1d', '/ban-temp 24h', '/kick 1d'],
      correct: 1,
    },
    {
      q: 'A player is spamming emojis in chat. How do you respond?',
      h: 'Koi chat mein emojis spam kar raha hai, kaise handle karoge?',
      options: ['Ban', 'Mute/Warning', 'De-op them', 'Kick'],
      correct: 1,
    },
    {
      q: 'Where should staff disputes be handled?',
      h: 'Staff ke aapsi jhagde kahan solve hone chahiye?',
      options: [
        'Public Chat',
        'Global Discord',
        'Staff Private Channel',
        'Direct Messages',
      ],
      correct: 2,
    },
  ];

  const scenarioQuestions = [
    {
      q: 'A player is spamming promotional links. Describe your exact command sequence.',
      h: 'Ek player links spam kar raha hai. Aap konsi commands use karenge?',
    },
    {
      q: 'You suspect a player is using X-ray to find diamonds. How do you verify this?',
      h: 'Aapko shak hai koi X-ray kar raha hai. Aap verify kaise karenge?',
    },
    {
      q: 'Two players are arguing about a stolen item with no proof. How do you mediate?',
      h: 'Do log chori ke liye lad rahe hain par proof nahi hai. Kaise handle karoge?',
    },
    {
      q: "An 'Administrator' from another server joins and asks for OP. How do you react?",
      h: 'Dusre server ka Admin join karke OP maang raha hai. Kya karoge?',
    },
    {
      q: 'You made a mistake and banned the wrong player. What are your next steps?',
      h: 'Galti se galat player ban ho gaya. Ab aap kya karenge?',
    },
  ];

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleNext = () => {
    if (step === 1) {
      const ageNum = parseInt(formData.age);
      if (!formData.ign || !formData.age || !formData.platform) {
        showToast('PLEASE FILL ALL FIELDS!', 'error');
        return;
      }
      if (ageNum < 14 || ageNum > 35) {
        showToast('AGE MUST BE BETWEEN 14 AND 35!', 'error');
        return;
      }
      if (formData.platform === 'Other' && !formData.otherPlatform) {
        showToast('PLEASE SPECIFY YOUR PLATFORM!', 'error');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    const answeredCount = Object.keys(formData.mcqs).length;
    if (answeredCount < 10) {
      showToast(`PLEASE COMPLETE ALL MCQS! (${answeredCount}/10)`, 'error');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const writtenData = scenarioQuestions.map((sq, i) => ({
      question: sq.q,
      answer: formData.answers[i + 1] || 'No answer provided',
    }));

    const mcqData = mcqQuestions.map((item, i) => ({
      question: item.q,
      selected: item.options[formData.mcqs[i + 1]] || 'None',
      isCorrect: formData.mcqs[i + 1] === item.correct,
    }));

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ign: formData.ign,
          age: formData.age,
          platform:
            formData.platform === 'Other'
              ? formData.otherPlatform
              : formData.platform,
          writtenData,
          mcqData,
          totalScore: mcqData.filter((m) => m.isCorrect).length,
        }),
      });

      if (response.ok) {
        showToast('PROTOCOL SUBMITTED SUCCESSFULLY!', 'success');
        setTimeout(() => onComplete(), 2000);
      } else {
        const err = await response.json();
        showToast(err.error || 'SUBMISSION FAILED!', 'error');
        setIsSubmitting(false);
      }
    } catch (error) {
      showToast('NETWORK ERROR!', 'error');
      setIsSubmitting(false);
    }
  };

  const renderBasics = () => (
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4'>
      <div className='bg-primary/5 p-4 border-l-4 border-primary'>
        <p className='text-primary font-pixel text-lg uppercase'>
          Protocol Alpha: Identity
        </p>
      </div>
      <div className='grid md:grid-cols-2 gap-8'>
        <div className='space-y-2'>
          <label className='font-pixel text-xl text-zinc-300 uppercase'>
            Minecraft Game Tag
          </label>
          <input
            className='w-full bg-black/40 border-2 border-white/10 p-4 text-white focus:border-primary outline-none shadow-mc-slot'
            placeholder='e.g. Steve_MC'
            value={formData.ign}
            onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
          />
        </div>
        <div className='space-y-2'>
          <label className='font-pixel text-xl text-zinc-300 uppercase'>
            Age (14-35)
          </label>
          <input
            type='number'
            className='w-full bg-black/40 border-2 border-white/10 p-4 text-white focus:border-primary outline-none shadow-mc-slot'
            placeholder='18'
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
      </div>

      <div className='space-y-4'>
        <label className='font-pixel text-xl text-zinc-300 uppercase'>
          Which Edition/Platform?
        </label>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {[
            'Premium/Cracked Java Edition',
            'Pocket/Bedrock Edition',
            'Pojav/Mojo Launcher',
            'Other',
          ].map((plt) => (
            <button
              key={plt}
              type='button'
              onClick={() => setFormData({ ...formData, platform: plt })}
              className={`p-3 text-left border-2 transition-all font-display text-sm flex items-center gap-3 ${formData.platform === plt ? 'bg-primary/20 border-primary text-white' : 'bg-black/40 border-white/10 text-zinc-400'}`}>
              <div
                className={`w-4 h-4 rounded-full border-2 ${formData.platform === plt ? 'border-primary bg-primary' : 'border-zinc-600'}`}
              />
              {plt}
            </button>
          ))}
        </div>
        {formData.platform === 'Other' && (
          <input
            className='w-full bg-black/40 border-2 border-primary/50 p-4 font-mono text-white focus:border-primary outline-none mt-2 animate-in fade-in zoom-in duration-200'
            placeholder='Specify platform...'
            value={formData.otherPlatform}
            onChange={(e) =>
              setFormData({ ...formData, otherPlatform: e.target.value })
            }
          />
        )}
      </div>
    </div>
  );

  const renderScenarios = () => (
    <div className='space-y-12 animate-in fade-in slide-in-from-bottom-4'>
      <p className='text-zinc-400 font-pixel text-2xl border-b border-white/5 pb-2 uppercase'>
        Section 2: Situational Protocols
      </p>
      {scenarioQuestions.map((sq, idx) => (
        <div
          key={idx}
          className='space-y-2'>
          <div className='flex items-baseline gap-3'>
            <span className='font-pixel text-2xl text-primary'>
              0{idx + 1}.
            </span>
            <label className='text-lg font-medium text-gray-200 font-display'>
              {sq.q}
            </label>
          </div>
          <p className='text-zinc-500 text-xs italic ml-9'>{sq.h}</p>
          <textarea
            className='w-full bg-[#121212] border-2 border-[#3d3d3d] text-gray-300 p-5 font-mono text-sm focus:border-primary outline-none h-32'
            placeholder='> Write here...'
            value={formData.answers[idx + 1] || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                answers: { ...formData.answers, [idx + 1]: e.target.value },
              })
            }
          />
        </div>
      ))}
    </div>
  );

  const renderExam = () => (
    <div className='space-y-12 animate-in fade-in slide-in-from-bottom-4'>
      <p className='text-zinc-400 font-pixel text-2xl border-b border-white/5 pb-2 uppercase'>
        Final Section: Knowledge Test
      </p>
      {mcqQuestions.map((item, qIdx) => (
        <div
          key={qIdx}
          className='space-y-4'>
          <p className='font-pixel text-2xl text-white'>
            Q{qIdx + 1}. {item.q}
          </p>
          <p className='text-zinc-500 text-xs italic'>{item.h}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {item.options.map((opt, oIdx) => {
              const isSelected = formData.mcqs[qIdx + 1] === oIdx;
              return (
                <button
                  key={oIdx}
                  type='button'
                  onClick={() =>
                    setFormData({
                      ...formData,
                      mcqs: { ...formData.mcqs, [qIdx + 1]: oIdx },
                    })
                  }
                  className={`p-4 text-left border-2 transition-all flex items-center gap-4 ${isSelected ? 'bg-primary/20 border-primary text-white' : 'bg-black/40 border-white/10 text-zinc-400'}`}>
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'border-primary bg-primary' : 'border-zinc-600'}`}
                  />
                  <span className='font-display text-sm'>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='container pt-32 mx-auto px-4 py-12 max-w-4xl relative'>
      {toast && (
        <div
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] border-2 px-8 py-4 font-pixel text-xl shadow-2xl animate-in slide-in-from-top-4 duration-300 ${toast.type === 'success' ? 'bg-[#1a2f1a] border-primary text-primary shadow-[0_0_20px_#80ff1f]' : 'bg-[#2a0e0e] border-red-500 text-red-500 shadow-[0_0_20px_#ff0000]'}`}>
          {toast.message}
        </div>
      )}

      <div
        className={`relative bg-[#1e1e1e]/90 backdrop-blur-md p-6 sm:p-10 border-2 border-white/10 shadow-2xl rounded-sm ${isSubmitting ? 'opacity-60' : ''}`}>
        {step === 1 && renderBasics()}
        {step === 2 && renderScenarios()}
        {step === 3 && renderExam()}

        <div className='mt-14 flex justify-between gap-4 border-t border-white/5 pt-8'>
          <button
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            disabled={isSubmitting}
            className='bg-[#c6c6c6] text-[#373737] font-pixel text-2xl px-10 py-3 rounded-sm shadow-mc-outset active:translate-y-1 transition-all'>
            BACK
          </button>
          <button
            onClick={step < 3 ? handleNext : handleSubmit}
            disabled={isSubmitting}
            className='bg-primary text-black font-pixel text-2xl px-12 py-3 rounded-sm shadow-mc-btn ml-auto active:translate-y-1 transition-all'>
            {isSubmitting
              ? 'UPLOADING...'
              : step === 3
                ? 'SUBMIT PROTOCOL'
                : 'CONTINUE MISSION'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
