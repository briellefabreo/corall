import { 
  Bell, 
  RotateCw, 
  Smartphone, 
  Monitor, 
  Wifi, 
  WifiOff, 
  ShieldCheck,
  Settings
} from 'lucide-react';
import { useCoral } from '../context/CoralContext';
import { formatFreshness } from '../utils/coralLogic';
import { TRANSLATIONS } from '../utils/translations';

export const Header: React.FC = () => {
  const {
    isOnline,
    toggleNetworkSimulation,
    lastSynced,
    isSyncing,
    syncNow,
    unreadNotificationCount,
    setIsNotificationModalOpen,
    setIsSettingsOpen,
    isAndroidFrame,
    setIsAndroidFrame,
    setIsSourcePolicyModalOpen,
    currentAdmin,
    setActiveTab,
    language,
  } = useCoral();

  const t = TRANSLATIONS[language];

  return (
    <header className="bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-900 text-white shadow-md sticky top-0 z-40">
      {/* Top utility bar */}
      <div className="px-4 py-1.5 bg-black/20 text-xs flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Online / Offline status badge */}
          <button
            onClick={toggleNetworkSimulation}
            title="Click to toggle network simulation (test offline mode)"
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
              isOnline
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {isOnline ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <Wifi className="w-3 h-3" />
                <span>Live Online</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <WifiOff className="w-3 h-3" />
                <span>Offline (Cached Data)</span>
              </>
            )}
          </button>

          <span className="text-sky-200/60 hidden sm:inline">•</span>

          {/* Sync indicator */}
          <div className="flex items-center gap-1.5 text-sky-200/80 text-[11px]">
            <span>Synced: {formatFreshness(lastSynced)}</span>
            <button
              onClick={syncNow}
              disabled={isSyncing}
              title="Synchronize announcements now"
              className="p-0.5 hover:text-white transition disabled:opacity-50"
            >
              <RotateCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-300' : ''}`} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Policy link */}
          <button
            onClick={() => setIsSourcePolicyModalOpen(true)}
            className="flex items-center gap-1 text-[11px] text-sky-200 hover:text-white transition cursor-pointer"
            title="Publishing Standards & Verification Protocols"
          >
            <ShieldCheck className="w-3 h-3 text-cyan-300" />
            <span className="hidden xs:inline">Sources Policy</span>
          </button>
        </div>
      </div>

      {/* Main header row */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 
            PAALALA PARA SA LOGO:
            Upang palitan ang logo, ilagay ang inyong picture sa folder na /public/ (hal. /public/logo.png)
            at palitan ang src="/coral-icon.svg" sa src="/logo.png" sa linya sa ibaba:
          */}
          <img
            src="/coral-icon.svg"
            alt="CORAL Logo"
            className="w-10 h-10 rounded-xl shadow-md border border-white/20 p-0.5 bg-sky-950 object-contain"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">{t.appName}</h1>
              <span className="text-[10px] uppercase font-semibold tracking-wider bg-cyan-400 text-sky-950 px-1.5 py-0.5 rounded">
                {t.locationTag}
              </span>
            </div>
            <p className="text-[11px] text-sky-200 mt-0.5 leading-tight">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Settings & Accessibility Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title={t.settings}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-sky-100 hover:text-white transition cursor-pointer"
            aria-label={t.settings}
          >
            <Settings className="w-5 h-5 text-cyan-300" />
          </button>

          {/* View toggle (Android Frame vs Responsive Fullscreen) */}
          <button
            onClick={() => setIsAndroidFrame(prev => !prev)}
            title={isAndroidFrame ? t.wideView : t.mobileView}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-sky-100 transition text-xs flex items-center gap-1.5 cursor-pointer"
            aria-label="Toggle Android frame"
          >
            {isAndroidFrame ? (
              <>
                <Monitor className="w-4 h-4 text-cyan-300" />
                <span className="hidden md:inline text-[11px]">{t.wideView}</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-cyan-300" />
                <span className="hidden md:inline text-[11px]">{t.mobileView}</span>
              </>
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Notification center"
          >
            <Bell className="w-5 h-5 text-sky-100" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Admin Indicator */}
          {currentAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-medium cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Admin: {currentAdmin.name.split(' ')[0]}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
