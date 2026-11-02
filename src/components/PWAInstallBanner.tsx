import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Check if in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (isInstalled || isDismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowGuide(true);
    }
  };

  return (
    <aside 
      aria-label="Install CORAL application"
      className="mb-4 bg-gradient-to-r from-cyan-950 via-sky-900 to-sky-950 text-white p-3 sm:p-3.5 rounded-2xl shadow-md border border-cyan-500/30 flex items-center justify-between gap-3 text-xs"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
          <Smartphone className="w-5 h-5 text-cyan-300" />
        </div>
        <div>
          <p className="font-bold text-white leading-tight">Install CORAL on Your Android Device</p>
          <p className="text-[11px] text-sky-200 mt-0.5">
            Works offline on Simara Island even when mobile internet is cut.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-sky-950 font-bold rounded-lg transition shadow-xs flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-lg text-sky-300 hover:text-white transition"
          aria-label="Dismiss install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl p-5 max-w-sm w-full space-y-3">
            <h3 className="font-bold text-base text-slate-900">Install CORAL App</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              1. Tap the three dots menu <strong>(⋮)</strong> or <strong>Share</strong> icon in your browser.<br />
              2. Tap <strong>"Add to Home screen"</strong> or <strong>"Install App"</strong>.<br />
              3. The CORAL icon will appear on your app launcher for fast offline access.
            </p>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2 bg-sky-700 text-white font-bold rounded-xl text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
