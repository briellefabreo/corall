import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Layers, 
  PhoneCall, 
  ShieldCheck, 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone,
  Monitor
} from 'lucide-react';
import { useCoral } from '../context/CoralContext';

import { TRANSLATIONS } from '../utils/translations';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const { isAndroidFrame, setIsAndroidFrame, activeTab, setActiveTab, currentAdmin, language } = useCoral();
  const t = TRANSLATIONS[language];
  const [currentTime, setCurrentTime] = useState('10:45');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'feed' as const, label: t.tabFeed, icon: Home },
    { id: 'categories' as const, label: t.tabCategories, icon: Layers },
    { id: 'directory' as const, label: t.tabDirectory, icon: PhoneCall },
    { id: 'admin' as const, label: currentAdmin ? `${t.tabAdmin} ✓` : t.tabAdmin, icon: ShieldCheck },
  ];

  // If in desktop wide view
  if (!isAndroidFrame) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 pb-20">
          {children}
        </div>

        {/* Floating bottom desktop nav bar */}
        <nav 
          aria-label="Desktop primary navigation"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-full px-4 py-2 flex items-center gap-1.5 z-30"
        >
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  // Android Mobile Shell
  return (
    <div className="min-h-screen bg-slate-900 py-4 sm:py-8 px-2 flex items-center justify-center">
      {/* Outer Phone Shell */}
      <div className="relative w-full max-w-[420px] bg-black rounded-[46px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-700/80 ring-1 ring-white/10 flex flex-col h-[890px] overflow-hidden">
        
        {/* Device Earpiece speaker & punch-hole camera */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-800 rounded-full z-50" />
        
        {/* Android Status Bar */}
        <div className="h-7 bg-sky-950 text-white px-5 flex items-center justify-between text-[11px] font-semibold select-none z-40 shrink-0">
          <span>{currentTime}</span>

          {/* Camera punch hole in center */}
          <div className="w-3.5 h-3.5 bg-black rounded-full border border-slate-800/80 shadow-inner" />

          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] font-bold text-sky-300">LTE</span>
            <Wifi className="w-3.5 h-3.5 text-white" />
            <Battery className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Screen Content Area */}
        <div className="flex-1 bg-slate-100 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Android App Bottom Navigation Bar */}
          <nav 
            aria-label="Android primary navigation"
            className="bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shrink-0 z-30 shadow-md"
          >
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer relative ${
                    isActive ? 'text-sky-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                  <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Android System Gesture Bar */}
          <div className="h-4 bg-white flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-slate-400/80 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
