import React, { useState } from 'react';
import { CoralProvider, useCoral } from './context/CoralContext';
import { AndroidFrame } from './components/AndroidFrame';
import { Header } from './components/Header';
import { CommunitySnapshot } from './components/CommunitySnapshot';
import { FilterBar } from './components/FilterBar';
import { AnnouncementCard } from './components/AnnouncementCard';
import { AnnouncementDetailModal } from './components/AnnouncementDetailModal';
import { CreateEditAnnouncementModal } from './components/CreateEditAnnouncementModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { SettingsModal } from './components/SettingsModal';
import { SplashScreen } from './components/SplashScreen';
import { SourcePolicyModal } from './components/SourcePolicyModal';
import { InaccuracyReportModal } from './components/InaccuracyReportModal';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { CategoriesView } from './components/CategoriesView';
import { AdminPortal } from './components/AdminPortal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { SearchX, WifiOff } from 'lucide-react';
import { TRANSLATIONS } from './utils/translations';

const MainContent: React.FC<{ onReplaySplash: () => void }> = ({ onReplaySplash }) => {
  const {
    activeTab,
    filteredAnnouncements,
    selectedAnnouncement,
    setSelectedAnnouncement,
    isCreateModalOpen,
    setIsCreateModalOpen,
    announcementToEdit,
    setAnnouncementToEdit,
    isNotificationModalOpen,
    setIsNotificationModalOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    isSourcePolicyModalOpen,
    setIsSourcePolicyModalOpen,
    isReportModalOpen,
    setIsReportModalOpen,
    isOnline,
    syncNow,
    isSyncing,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStatus,
    setSelectedBarangay,
    setShowArchived,
    language,
    accessibility,
  } = useCoral();

  const t = TRANSLATIONS[language];

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedBarangay('all');
    setShowArchived(false);
  };

  const getFontSizeClass = () => {
    switch (accessibility.fontSize) {
      case 'large':
        return 'coral-font-large';
      case 'xl':
        return 'coral-font-xl';
      default:
        return 'coral-font-normal';
    }
  };

  return (
    <div className={`flex flex-col min-h-full ${getFontSizeClass()} ${accessibility.highContrast ? 'coral-high-contrast' : ''}`}>
      {/* App Header */}
      <Header />

      {/* Offline banner if disconnected */}
      {!isOnline && (
        <div 
          role="status"
          aria-live="polite"
          className="bg-amber-600 text-white px-4 py-2 text-xs flex items-center justify-between shadow-xs sticky top-[72px] z-30"
        >
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span className="font-semibold">
              {t.offlineBanner}
            </span>
          </div>
          <button
            onClick={syncNow}
            disabled={isSyncing}
            className="text-[11px] underline font-bold hover:text-amber-100 cursor-pointer"
          >
            {t.retryConnection}
          </button>
        </div>
      )}

      {/* Main Tab Views */}
      <main className="p-3 sm:p-4 flex-1">
        {/* PWA Install Banner */}
        <PWAInstallBanner />

        {/* Tab 1: Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-3">
            {/* 3 Categories Snapshot */}
            <CommunitySnapshot />

            {/* Search & Filter Bar */}
            <FilterBar />

            {/* Announcement Feed List */}
            {filteredAnnouncements.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <SearchX className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">{t.noAnnouncementsFound}</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {t.noAnnouncementsDesc}
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  {t.clearFilters}
                </button>
              </div>
            ) : (
              <section aria-label="Published Community Announcements">
                {filteredAnnouncements.map(item => (
                  <AnnouncementCard key={item.id} announcement={item} />
                ))}
              </section>
            )}
          </div>
        )}

        {/* Tab 2: Categories */}
        {activeTab === 'categories' && <CategoriesView />}

        {/* Tab 3: Directory */}
        {activeTab === 'directory' && <EmergencyDirectory />}

        {/* Tab 4: Admin */}
        {activeTab === 'admin' && <AdminPortal />}
      </main>

      {/* Modals */}
      {selectedAnnouncement && (
        <AnnouncementDetailModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}

      {isCreateModalOpen && (
        <CreateEditAnnouncementModal
          editAnnouncement={announcementToEdit}
          onClose={() => {
            setIsCreateModalOpen(false);
            setAnnouncementToEdit(null);
          }}
        />
      )}

      {isNotificationModalOpen && (
        <NotificationCenterModal onClose={() => setIsNotificationModalOpen(false)} />
      )}

      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          onReplaySplash={onReplaySplash}
        />
      )}

      {isSourcePolicyModalOpen && (
        <SourcePolicyModal onClose={() => setIsSourcePolicyModalOpen(false)} />
      )}

      {isReportModalOpen && (
        <InaccuracyReportModal
          announcementTitle={selectedAnnouncement?.title}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <CoralProvider>
      {/* Animated Splash Screen with Logo and Opening Setup */}
      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      )}

      <AndroidFrame>
        <MainContent onReplaySplash={() => setShowSplash(true)} />
      </AndroidFrame>
    </CoralProvider>
  );
}
