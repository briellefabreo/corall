import React, { useEffect, useState } from 'react';
import { useCoral } from '../context/CoralContext';
import { TRANSLATIONS } from '../utils/translations';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Volume2 } from 'lucide-react';
import { Language } from '../types/coral';

interface SplashScreenProps {
  onComplete: () => void;
  forceShowSetup?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, forceShowSetup = false }) => {
  const { language, setLanguage, accessibility, setAccessibility, playTestTone } = useCoral();
  const [progress, setProgress] = useState(15);
  const [stepIndex, setStepIndex] = useState(0);
  const [showSetupStep, setShowSetupStep] = useState(forceShowSetup);
  const t = TRANSLATIONS[language];

  const steps = [
    'Connecting to Corcuera MDRRMO, PCG & TIELCO verified feeds...',
    'Checking cached announcements on Simara storage...',
    'Synchronizing latest power and sea travel advisories...',
    'Verified and ready for Corcuera residents!'
  ];

  useEffect(() => {
    if (showSetupStep) return;

    const timer1 = setTimeout(() => {
      setProgress(45);
      setStepIndex(1);
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(80);
      setStepIndex(2);
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStepIndex(3);
    }, 2000);

    const timer4 = setTimeout(() => {
      // Check if first-time onboarding needed
      const hasOnboarded = localStorage.getItem('coral_onboarded_v1');
      if (!hasOnboarded || forceShowSetup) {
        setShowSetupStep(true);
      } else {
        onComplete();
      }
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [showSetupStep, onComplete, forceShowSetup]);

  const handleFinishSetup = () => {
    localStorage.setItem('coral_onboarded_v1', 'true');
    onComplete();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-radial from-sky-900 via-sky-950 to-slate-950 text-white overflow-hidden p-4 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="CORAL Application Loading and Setup"
    >
      {/* Background ambient ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full border border-cyan-500/20 animate-coral-ripple" />
        <div className="absolute w-72 h-72 rounded-full border border-sky-400/20 animate-coral-ripple-delay" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto text-center flex flex-col items-center">
        {/* Animated Beacon & Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Subtle sonar glow backdrops */}
          <div className="absolute w-28 h-28 rounded-3xl bg-cyan-400/20 blur-xl animate-pulse" />
          
          <div className="relative animate-coral-beacon animate-coral-sway">
            <img
              src="/coral-icon.svg"
              alt="CORAL Logo Emblem"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-br from-sky-800 to-cyan-950 border-2 border-cyan-400/60 shadow-2xl object-contain"
            />
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white drop-shadow-md">
              CORAL
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-widest bg-cyan-400 text-sky-950 px-2 py-0.5 rounded-md shadow-xs">
              Simara
            </span>
          </div>
          <p className="text-sm font-medium text-cyan-200">
            Community Online Reports and Alerts Link
          </p>
          <p className="text-xs text-sky-300/80">
            Municipality of Corcuera, Romblon
          </p>
        </div>

        {/* Step 1: Loading Progress Mode */}
        {!showSetupStep ? (
          <div className="w-full max-w-xs space-y-4">
            {/* Progress Bar with glowing shimmer */}
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div 
                className="bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-400 h-full rounded-full transition-all duration-500 ease-out shimmer-bg"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Status ticker */}
            <p className="text-xs text-sky-200/90 font-medium h-6 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>{steps[stepIndex]}</span>
            </p>

            {/* Quick Skip button */}
            <button
              onClick={() => {
                const hasOnboarded = localStorage.getItem('coral_onboarded_v1');
                if (!hasOnboarded) {
                  setShowSetupStep(true);
                } else {
                  onComplete();
                }
              }}
              className="text-xs text-sky-300/60 hover:text-white underline pt-2 cursor-pointer transition"
            >
              Skip
            </button>
          </div>
        ) : (
          /* Step 2: Language & Quick Preferences Setup */
          <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-5 shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.setupPreferences}</span>
              </div>
              <h2 className="text-base font-bold text-white mt-1">
                {t.welcomeTitle}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.welcomeSubtitle}
              </p>
            </div>

            {/* Language Selector Buttons */}
            <div>
              <label className="block text-xs font-bold text-sky-200 mb-2">
                {t.chooseLanguage}
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                    language === 'en'
                      ? 'bg-sky-600/40 border-cyan-400 text-white shadow-xs'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🇺🇸</span>
                    <div>
                      <p className="font-bold">English</p>
                      <p className="text-[10px] text-slate-400">Official standard advisories</p>
                    </div>
                  </div>
                  {language === 'en' && <CheckCircle2 className="w-4 h-4 text-cyan-300" />}
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('fil')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                    language === 'fil'
                      ? 'bg-sky-600/40 border-cyan-400 text-white shadow-xs'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🇵🇭</span>
                    <div>
                      <p className="font-bold">Filipino (Tagalog)</p>
                      <p className="text-[10px] text-slate-400">Wikang pambansa</p>
                    </div>
                  </div>
                  {language === 'fil' && <CheckCircle2 className="w-4 h-4 text-cyan-300" />}
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('asi')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                    language === 'asi'
                      ? 'bg-sky-600/40 border-cyan-400 text-white shadow-xs'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🏝️</span>
                    <div>
                      <p className="font-bold">Asi / Simaranhon</p>
                      <p className="text-[10px] text-cyan-300/80">Lokal nga hambal sa Corcuera</p>
                    </div>
                  </div>
                  {language === 'asi' && <CheckCircle2 className="w-4 h-4 text-cyan-300" />}
                </button>
              </div>
            </div>

            {/* Quick sound toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>{t.soundAlerts}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAccessibility(prev => ({ ...prev, soundAlerts: !prev.soundAlerts }));
                  playTestTone();
                }}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  accessibility.soundAlerts ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={accessibility.soundAlerts}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    accessibility.soundAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Resident note */}
            <div className="flex items-center gap-2 bg-sky-950/60 rounded-lg p-2.5 border border-sky-800/40 text-[11px] text-cyan-200/90">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{t.residentAccessNote}</span>
            </div>

            {/* Get Started Action */}
            <button
              onClick={handleFinishSetup}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg cursor-pointer active:scale-98"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
