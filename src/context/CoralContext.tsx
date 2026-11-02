import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Announcement, 
  AuditLogEntry, 
  InAppNotification, 
  AnnouncementCategory, 
  AnnouncementStatus,
  Language,
  AccessibilitySettings
} from '../types/coral';
import { 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_AUDIT_LOGS 
} from '../data/seedData';
import { 
  filterAnnouncements, 
  createCorrection, 
  validateAnnouncementSource 
} from '../utils/coralLogic';
import { AUTHORIZED_ADMIN_ACCOUNTS } from '../data/adminCredentials';
import { playAlertChime, triggerHaptic } from '../utils/soundEffects';

interface AdminUser {
  name: string;
  role: string;
  organization: string;
}

interface CoralContextType {
  announcements: Announcement[];
  filteredAnnouncements: Announcement[];
  auditLogs: AuditLogEntry[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  selectedBarangay: string;
  setSelectedBarangay: (b: string) => void;
  showArchived: boolean;
  setShowArchived: (show: boolean) => void;
  selectedAnnouncement: Announcement | null;
  setSelectedAnnouncement: (a: Announcement | null) => void;
  
  // Modals & Navigation
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  announcementToEdit: Announcement | null;
  setAnnouncementToEdit: (a: Announcement | null) => void;
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isAuditLogOpen: boolean;
  setIsAuditLogOpen: (open: boolean) => void;
  isSourcePolicyModalOpen: boolean;
  setIsSourcePolicyModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  
  // Language & Accessibility
  language: Language;
  setLanguage: (lang: Language) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  playTestTone: () => void;
  
  // Frame layout
  isAndroidFrame: boolean;
  setIsAndroidFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: 'feed' | 'categories' | 'directory' | 'admin';
  setActiveTab: (tab: 'feed' | 'categories' | 'directory' | 'admin') => void;
  
  // Synchronization & Network
  isOnline: boolean;
  toggleNetworkSimulation: () => void;
  lastSynced: Date;
  isSyncing: boolean;
  syncNow: () => void;
  
  // Admin authentication
  currentAdmin: AdminUser | null;
  isAdmin: boolean;
  loginAdmin: (username: string, pin: string) => { success: boolean; message?: string };
  logoutAdmin: () => void;
  
  // Actions
  publishAnnouncement: (data: Omit<Announcement, 'id' | 'publishedAt' | 'updatedAt' | 'revisionHistory'>) => { success: boolean; errors?: string[] };
  updateAnnouncement: (id: string, updates: Partial<Announcement>, editNote?: string) => void;
  publishOfficialCorrection: (id: string, updates: Partial<Announcement>, reason: string) => void;
  archiveAnnouncement: (id: string, reason?: string) => void;
  restoreAnnouncement: (id: string) => void;
  quickChangeStatus: (id: string, newStatus: AnnouncementStatus, note?: string) => void;
  
  // Notifications
  notifications: InAppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  pushEnabled: boolean;
  togglePushNotifications: () => void;
  sendSimulatedAlert: (title: string, body: string, category: AnnouncementCategory) => void;
}

const CoralContext = createContext<CoralContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ANNOUNCEMENTS: 'coral_announcements_v1',
  AUDIT_LOGS: 'coral_audit_logs_v1',
  NOTIFICATIONS: 'coral_notifications_v1',
  ADMIN: 'coral_admin_session_v1',
  LAST_SYNC: 'coral_last_sync_v1',
  PUSH_PREF: 'coral_push_pref_v1',
  CUSTOM_LOGO: 'coral_custom_logo_v1',
};

export const CoralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial announcements from localStorage if cached, or seed
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) {
        const parsed: Announcement[] = JSON.parse(saved);
        // Ensure coverImageUrl is present from seeds if missing
        return parsed.map(item => {
          if (!item.coverImageUrl) {
            const seed = INITIAL_ANNOUNCEMENTS.find(s => s.id === item.id);
            if (seed?.coverImageUrl) {
              return { ...item, coverImageUrl: seed.coverImageUrl };
            }
          }
          return item;
        });
      }
    } catch {
      // ignore
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<InAppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'notif-1',
        announcementId: 'ann-coral-001',
        category: 'sea_travel',
        title: 'Trips Suspended: Calatrava – Corcuera',
        message: 'Gale Warning #03: All passenger banca trips temporarily suspended by PCG.',
        timestamp: '2026-11-01T06:45:00.000Z',
        isRead: false,
        isUrgent: true,
      },
      {
        id: 'notif-2',
        announcementId: 'ann-coral-002',
        category: 'power',
        title: 'Emergency Power Interruption: Feeder 1',
        message: 'Taclobo, Mangansag, Marigondon affected. Tree fell across 13.2kV line.',
        timestamp: '2026-11-01T08:30:00.000Z',
        isRead: false,
        isUrgent: true,
      },
      {
        id: 'notif-3',
        announcementId: 'ann-coral-003',
        category: 'disaster',
        title: 'MDRRMO Blue Alert Activated',
        message: 'Tropical Depression monitoring 24/7. Coastal barangays advised.',
        timestamp: '2026-11-01T07:30:00.000Z',
        isRead: true,
        isUrgent: false,
      },
    ];
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [lastSynced, setLastSynced] = useState<Date>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      if (saved) return new Date(saved);
    } catch {
      // ignore
    }
    return new Date();
  });

  const [pushEnabled, setPushEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PUSH_PREF) === 'true';
    } catch {
      return false;
    }
  });

  // Filters & UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedBarangay, setSelectedBarangay] = useState<string>('all');
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Modals & Navigation
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [announcementToEdit, setAnnouncementToEdit] = useState<Announcement | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [isSourcePolicyModalOpen, setIsSourcePolicyModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Language & Accessibility Preferences with persistence
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('coral_lang_v1');
      if (saved === 'en' || saved === 'fil' || saved === 'asi') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('coral_lang_v1', lang);
    } catch {
      // ignore
    }
  };

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('coral_accessibility_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      fontSize: 'normal',
      highContrast: false,
      soundAlerts: true,
      reducedMotion: false,
      categoryNotifications: {
        power: true,
        sea_travel: true,
        disaster: true,
      },
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('coral_accessibility_v1', JSON.stringify(accessibility));
    } catch {
      // ignore
    }
  }, [accessibility]);

  const playTestTone = () => {
    playAlertChime(true);
    triggerHaptic(true);
  };

  // Layout view: default to Android Frame for authentic mobile experience, can toggle to wide view
  const [isAndroidFrame, setIsAndroidFrame] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'categories' | 'directory' | 'admin'>('feed');

  // Network Simulation & Real Connectivity
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Save to localStorage whenever state changes for true offline persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.warn('Storage quota or error', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Storage quota or error', e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage quota or error', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      if (currentAdmin) {
        localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(currentAdmin));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN);
      }
    } catch (e) {
      console.warn('Storage quota or error', e);
    }
  }, [currentAdmin]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleNetworkSimulation = () => {
    setIsOnline(prev => !prev);
  };

  const syncNow = () => {
    if (!isOnline) {
      alert('Device is currently offline. Operating on cached announcements.');
      return;
    }
    setIsSyncing(true);
    setTimeout(() => {
      const now = new Date();
      setLastSynced(now);
      setIsSyncing(false);
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, now.toISOString());
    }, 600);
  };

  // Admin login with strict credential and password verification
  const loginAdmin = (username: string, pin: string): { success: boolean; message?: string } => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPin = pin.trim();

    if (!cleanUser || !cleanPin) {
      return { success: false, message: 'Please enter both your officer username and secret password/PIN.' };
    }

    const matchedAccount = AUTHORIZED_ADMIN_ACCOUNTS.find(
      acc => acc.username.toLowerCase() === cleanUser
    );

    if (!matchedAccount) {
      return { 
        success: false, 
        message: 'Invalid username. Only authorized municipal, utility, and maritime officers are permitted.' 
      };
    }

    if (matchedAccount.pin !== cleanPin) {
      return { 
        success: false, 
        message: 'Incorrect security password or PIN. Access denied.' 
      };
    }

    const adminObj: AdminUser = {
      name: matchedAccount.name,
      role: matchedAccount.role,
      organization: matchedAccount.organization,
    };

    setCurrentAdmin(adminObj);
    return { success: true };
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
  };

  // Add audit log entry
  const recordAudit = (action: string, annId: string, annTitle: string, category: AnnouncementCategory, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      adminName: currentAdmin?.name || 'Authorized Admin',
      action,
      announcementId: annId,
      announcementTitle: annTitle,
      category,
      details,
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Publish announcement
  const publishAnnouncement = (
    data: Omit<Announcement, 'id' | 'publishedAt' | 'updatedAt' | 'revisionHistory'>
  ): { success: boolean; errors?: string[] } => {
    // Validate source requirements
    const validation = validateAnnouncementSource(data.source);
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }

    const now = new Date().toISOString();
    const newId = `ann-coral-${Date.now()}`;
    const newAnnouncement: Announcement = {
      ...data,
      id: newId,
      publishedAt: now,
      updatedAt: now,
      revisionHistory: [
        {
          id: `rev-${Date.now()}`,
          timestamp: now,
          adminName: data.source.publishedByAdmin,
          action: 'published',
          summary: `Initial publication by ${data.source.publishedByAdmin} (${data.source.organization}).`,
        },
      ],
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);

    // Record audit
    recordAudit(
      'PUBLISHED',
      newId,
      data.title,
      data.category,
      `Source: ${data.source.organization}. Verification: ${data.source.verificationMethod}`
    );

    // If urgent or alert, trigger notification
    if (data.isUrgent) {
      sendSimulatedAlert(
        data.title,
        data.summary,
        data.category
      );
    }

    return { success: true };
  };

  // Edit announcement
  const updateAnnouncement = (id: string, updates: Partial<Announcement>, editNote?: string) => {
    const now = new Date().toISOString();
    setAnnouncements(prev =>
      prev.map(ann => {
        if (ann.id !== id) return ann;
        const newHistItem = {
          id: `rev-${Date.now()}`,
          timestamp: now,
          adminName: currentAdmin?.name || 'Administrator',
          action: 'updated' as const,
          summary: editNote || `Updated fields: ${Object.keys(updates).join(', ')}`,
        };
        return {
          ...ann,
          ...updates,
          updatedAt: now,
          revisionHistory: [newHistItem, ...(ann.revisionHistory || [])],
        };
      })
    );

    const target = announcements.find(a => a.id === id);
    if (target) {
      recordAudit(
        'UPDATED',
        id,
        updates.title || target.title,
        target.category,
        editNote || `Modified fields: ${Object.keys(updates).join(', ')}`
      );
    }
  };

  // Publish official correction
  const publishOfficialCorrection = (id: string, updates: Partial<Announcement>, reason: string) => {
    setAnnouncements(prev =>
      prev.map(ann => {
        if (ann.id !== id) return ann;
        return createCorrection(ann, updates, currentAdmin?.name || 'Administrator', reason);
      })
    );

    const target = announcements.find(a => a.id === id);
    if (target) {
      recordAudit(
        'PUBLISHED_CORRECTION',
        id,
        updates.title || target.title,
        target.category,
        `Official Correction Reason: ${reason}`
      );

      // Trigger notification for official correction
      sendSimulatedAlert(
        `OFFICIAL CORRECTION: ${updates.title || target.title}`,
        reason,
        target.category
      );
    }
  };

  // Archive announcement
  const archiveAnnouncement = (id: string, reason?: string) => {
    const now = new Date().toISOString();
    setAnnouncements(prev =>
      prev.map(ann => {
        if (ann.id !== id) return ann;
        const newHistItem = {
          id: `rev-${Date.now()}`,
          timestamp: now,
          adminName: currentAdmin?.name || 'Administrator',
          action: 'archived' as const,
          summary: reason || 'Archived from public active feed.',
        };
        return {
          ...ann,
          isArchived: true,
          updatedAt: now,
          revisionHistory: [newHistItem, ...(ann.revisionHistory || [])],
        };
      })
    );

    const target = announcements.find(a => a.id === id);
    if (target) {
      recordAudit('ARCHIVED', id, target.title, target.category, reason || 'Archived announcement');
    }
  };

  // Restore announcement
  const restoreAnnouncement = (id: string) => {
    const now = new Date().toISOString();
    setAnnouncements(prev =>
      prev.map(ann => {
        if (ann.id !== id) return ann;
        const newHistItem = {
          id: `rev-${Date.now()}`,
          timestamp: now,
          adminName: currentAdmin?.name || 'Administrator',
          action: 'published' as const,
          summary: 'Restored to active public feed.',
        };
        return {
          ...ann,
          isArchived: false,
          updatedAt: now,
          revisionHistory: [newHistItem, ...(ann.revisionHistory || [])],
        };
      })
    );

    const target = announcements.find(a => a.id === id);
    if (target) {
      recordAudit('RESTORED', id, target.title, target.category, 'Restored to active announcements');
    }
  };

  // Quick Change Status
  const quickChangeStatus = (id: string, newStatus: AnnouncementStatus, note?: string) => {
    const now = new Date().toISOString();
    setAnnouncements(prev =>
      prev.map(ann => {
        if (ann.id !== id) return ann;
        const newHistItem = {
          id: `rev-${Date.now()}`,
          timestamp: now,
          adminName: currentAdmin?.name || 'Administrator',
          action: 'status_changed' as const,
          summary: `Status changed from ${ann.status} to ${newStatus}. ${note || ''}`.trim(),
        };
        return {
          ...ann,
          status: newStatus,
          updatedAt: now,
          revisionHistory: [newHistItem, ...(ann.revisionHistory || [])],
        };
      })
    );

    const target = announcements.find(a => a.id === id);
    if (target) {
      recordAudit('STATUS_CHANGE', id, target.title, target.category, `Changed status to ${newStatus}. ${note || ''}`);
    }
  };

  // Notification helpers
  const sendSimulatedAlert = (title: string, body: string, category: AnnouncementCategory) => {
    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      announcementId: '',
      category,
      title,
      message: body,
      timestamp: new Date().toISOString(),
      isRead: false,
      isUrgent: true,
    };
    setNotifications(prev => [newNotif, ...prev]);

    if (accessibility.soundAlerts) {
      playAlertChime(true);
      triggerHaptic(true);
    }

    // Native browser push notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`CORAL [${category.toUpperCase().replace('_', ' ')}]`, {
          body: `${title}: ${body}`,
          icon: '/coral-icon.svg',
        });
      } catch {
        // ignore
      }
    }
  };

  const togglePushNotifications = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
          setPushEnabled(true);
          localStorage.setItem(STORAGE_KEYS.PUSH_PREF, 'true');
          sendSimulatedAlert(
            'CORAL Push Notifications Enabled',
            'You will receive urgent sea travel suspensions, power outages, and disaster advisories for Corcuera.',
            'disaster'
          );
        } else {
          setPushEnabled(false);
          localStorage.setItem(STORAGE_KEYS.PUSH_PREF, 'false');
        }
      } else if (Notification.permission === 'granted') {
        const nextState = !pushEnabled;
        setPushEnabled(nextState);
        localStorage.setItem(STORAGE_KEYS.PUSH_PREF, String(nextState));
      }
    } else {
      setPushEnabled(prev => !prev);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  // Filtered list
  const filteredAnnouncements = useMemo(() => {
    return filterAnnouncements(announcements, {
      query: searchQuery,
      category: selectedCategory,
      status: selectedStatus,
      barangay: selectedBarangay,
      showArchived,
    });
  }, [announcements, searchQuery, selectedCategory, selectedStatus, selectedBarangay, showArchived]);

  return (
    <CoralContext.Provider
      value={{
        announcements,
        filteredAnnouncements,
        auditLogs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        selectedBarangay,
        setSelectedBarangay,
        showArchived,
        setShowArchived,
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
        isAuditLogOpen,
        setIsAuditLogOpen,
        isSourcePolicyModalOpen,
        setIsSourcePolicyModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,

        language,
        setLanguage,
        accessibility,
        setAccessibility,
        playTestTone,

        isAndroidFrame,
        setIsAndroidFrame,
        activeTab,
        setActiveTab,

        isOnline,
        toggleNetworkSimulation,
        lastSynced,
        isSyncing,
        syncNow,

        currentAdmin,
        isAdmin: !!currentAdmin,
        loginAdmin,
        logoutAdmin,

        publishAnnouncement,
        updateAnnouncement,
        publishOfficialCorrection,
        archiveAnnouncement,
        restoreAnnouncement,
        quickChangeStatus,

        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        pushEnabled,
        togglePushNotifications,
        sendSimulatedAlert,
      }}
    >
      {children}
    </CoralContext.Provider>
  );
};

export const useCoral = (): CoralContextType => {
  const context = useContext(CoralContext);
  if (!context) {
    throw new Error('useCoral must be used within a CoralProvider');
  }
  return context;
};
