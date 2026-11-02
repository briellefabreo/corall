import React from 'react';
import { 
  X, 
  Globe, 
  Eye, 
  Volume2, 
  RotateCcw, 
  Trash2, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Sliders,
  BellRing,
  Info
} from 'lucide-react';
import { useCoral } from '../context/CoralContext';
import { TRANSLATIONS } from '../utils/translations';
import { Language } from '../types/coral';

interface SettingsModalProps {
  onClose: () => void;
  onReplaySplash: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onReplaySplash }) => {
  const { 
    language, 
    setLanguage, 
    accessibility, 
    setAccessibility, 
    playTestTone,
    announcements,
    notifications,
    pushEnabled,
    togglePushNotifications
  } = useCoral();

  const t = TRANSLATIONS[language];

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleClearCache = () => {
    if (window.confirm(t.clearCacheConfirm)) {
      localStorage.removeItem('coral_announcements_v1');
      localStorage.removeItem('coral_audit_logs_v1');
      localStorage.removeItem('coral_notifications_v1');
      window.location.reload();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-sky-900 to-cyan-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sliders className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-base font-bold leading-tight">
                {t.settingsTitle}
              </h2>
              <p className="text-[11px] text-sky-200">
                Corcuera, Romblon • Simara Island
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-6 overflow-y-auto divide-y divide-slate-100 flex-1">
          {/* Section 1: Language Selection */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <Globe className="w-4 h-4 text-sky-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.languageSelect}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* English */}
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  language === 'en'
                    ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg">🇺🇸</span>
                  {language === 'en' && <Check className="w-4 h-4 text-sky-600" />}
                </div>
                <div>
                  <p className="text-xs font-bold">English</p>
                  <p className="text-[10px] text-slate-500">Standard</p>
                </div>
              </button>

              {/* Filipino */}
              <button
                type="button"
                onClick={() => handleLanguageChange('fil')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  language === 'fil'
                    ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg">🇵🇭</span>
                  {language === 'fil' && <Check className="w-4 h-4 text-sky-600" />}
                </div>
                <div>
                  <p className="text-xs font-bold">Filipino</p>
                  <p className="text-[10px] text-slate-500">Tagalog</p>
                </div>
              </button>

              {/* Asi */}
              <button
                type="button"
                onClick={() => handleLanguageChange('asi')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  language === 'asi'
                    ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg">🏝️</span>
                  {language === 'asi' && <Check className="w-4 h-4 text-sky-600" />}
                </div>
                <div>
                  <p className="text-xs font-bold">Asi</p>
                  <p className="text-[10px] text-sky-700 font-medium">Simaranhon</p>
                </div>
              </button>
            </div>
          </section>

          {/* Section 2: Accessibility & Display */}
          <section className="pt-4 space-y-4">
            <div className="flex items-center gap-2 text-slate-800">
              <Eye className="w-4 h-4 text-sky-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.accessibilityOptions}
              </h3>
            </div>

            {/* Font Size Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>{t.fontSize}</span>
                <span className="text-[11px] text-slate-500">
                  {accessibility.fontSize === 'normal' && t.fontNormal}
                  {accessibility.fontSize === 'large' && t.fontLarge}
                  {accessibility.fontSize === 'xl' && t.fontXLarge}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAccessibility(prev => ({ ...prev, fontSize: 'normal' }))}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition cursor-pointer ${
                    accessibility.fontSize === 'normal'
                      ? 'bg-sky-700 text-white border-sky-700 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Aa Regular
                </button>
                <button
                  type="button"
                  onClick={() => setAccessibility(prev => ({ ...prev, fontSize: 'large' }))}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium text-center transition cursor-pointer ${
                    accessibility.fontSize === 'large'
                      ? 'bg-sky-700 text-white border-sky-700 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Aa Large
                </button>
                <button
                  type="button"
                  onClick={() => setAccessibility(prev => ({ ...prev, fontSize: 'xl' }))}
                  className={`py-2 px-3 rounded-xl border text-base font-bold text-center transition cursor-pointer ${
                    accessibility.fontSize === 'xl'
                      ? 'bg-sky-700 text-white border-sky-700 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Aa XL
                </button>
              </div>
            </div>

            {/* High Contrast Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="pr-3">
                <p className="text-xs font-bold text-slate-800">{t.highContrast}</p>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{t.highContrastDesc}</p>
              </div>
              <button
                type="button"
                onClick={() => setAccessibility(prev => ({ ...prev, highContrast: !prev.highContrast }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  accessibility.highContrast ? 'bg-sky-700' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={accessibility.highContrast}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    accessibility.highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Audio Alerts & Test Chime */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">{t.soundAlerts}</p>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{t.soundAlertsDesc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAccessibility(prev => ({ ...prev, soundAlerts: !prev.soundAlerts }))}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    accessibility.soundAlerts ? 'bg-sky-700' : 'bg-slate-300'
                  }`}
                  role="switch"
                  aria-checked={accessibility.soundAlerts}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      accessibility.soundAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              
              {/* Test Sound Button */}
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={playTestTone}
                  className="px-3 py-1 bg-white hover:bg-slate-100 text-sky-800 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t.testSound}</span>
                </button>
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="pr-3">
                <p className="text-xs font-bold text-slate-800">{t.reducedMotion}</p>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{t.reducedMotionDesc}</p>
              </div>
              <button
                type="button"
                onClick={() => setAccessibility(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  accessibility.reducedMotion ? 'bg-sky-700' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={accessibility.reducedMotion}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    accessibility.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Section 3: Notification & Presentation Helpers */}
          <section className="pt-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <Sparkles className="w-4 h-4 text-sky-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Presentation & Animation
              </h3>
            </div>

            {/* Replay Opening Animation */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onReplaySplash();
              }}
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 hover:border-sky-300 text-left flex items-center justify-between transition cursor-pointer group"
            >
              <div>
                <p className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600 group-hover:scale-110 transition" />
                  <span>{t.replaySplash}</span>
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {t.replaySplashDesc}
                </p>
              </div>
              <span className="text-[11px] font-bold text-sky-700 bg-white px-2.5 py-1 rounded-lg border border-sky-200">
                Demo
              </span>
            </button>
          </section>

          {/* Section 4: Offline Storage & Diagnostics */}
          <section className="pt-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.storageDiagnostics}
              </h3>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>{t.cachedCount}:</span>
                <span className="font-bold text-slate-900">{announcements.length} reports</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Local Notifications:</span>
                <span className="font-bold text-slate-900">{notifications.length} items</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Target Island:</span>
                <span className="font-bold text-sky-800">Simara (Corcuera, Romblon)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClearCache}
              className="w-full py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.clearCache}</span>
            </button>
          </section>

          {/* Section 5: Student Capstone Note */}
          <section className="pt-4">
            <div className="p-3 bg-sky-950 text-white rounded-2xl text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <Info className="w-3.5 h-3.5" />
                <span>CORAL Student Capstone Project</span>
              </div>
              <p className="text-sky-200 leading-relaxed">
                Developed for Corcuera, Romblon in partnership with simulated official bulletins from TIELCO, PCG Sub-station Corcuera, and Corcuera MDRRMO.
              </p>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
