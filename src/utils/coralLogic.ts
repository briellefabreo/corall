import { 
  Announcement, 
  AnnouncementCategory, 
  AnnouncementStatus, 
  PowerStatus, 
  SeaTravelStatus, 
  DisasterAlertStatus, 
  SourceInformation,
  RevisionHistoryItem 
} from '../types/coral';

/**
 * Validates that all required source verification fields are present before publishing.
 */
export function validateAnnouncementSource(source: Partial<SourceInformation>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!source.organization || source.organization.trim().length === 0) {
    errors.push('Issuing organization / source is required.');
  }

  if (!source.issuanceTime || isNaN(Date.parse(source.issuanceTime))) {
    errors.push('Valid source issuance date and time is required.');
  }

  if (!source.verificationMethod || source.verificationMethod.trim().length < 5) {
    errors.push('Verification method/channel description must be at least 5 characters.');
  }

  if (!source.publishedByAdmin || source.publishedByAdmin.trim().length < 2) {
    errors.push('Responsible administrator name is required.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Filters announcements according to search term, category, status, affected barangay, and archive state.
 */
export function filterAnnouncements(
  announcements: Announcement[],
  filters: {
    query?: string;
    category?: string;
    status?: string;
    barangay?: string;
    showArchived?: boolean;
  }
): Announcement[] {
  const query = filters.query?.trim().toLowerCase() || '';
  const category = filters.category || 'all';
  const status = filters.status || 'all';
  const barangay = filters.barangay || 'all';
  const showArchived = !!filters.showArchived;

  return announcements.filter(item => {
    // Archive filtering
    if (!showArchived && item.isArchived) {
      return false;
    }
    if (showArchived && !item.isArchived) {
      return false;
    }

    // Category filter
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Status filter
    if (status !== 'all' && item.status !== status) {
      return false;
    }

    // Barangay filter
    if (barangay !== 'all') {
      const match = item.affectedBarangays.some(
        b => b.toLowerCase().includes(barangay.toLowerCase()) || b.toLowerCase().includes('all')
      );
      if (!match) return false;
    }

    // Query text match
    if (query) {
      const textToSearch = [
        item.title,
        item.summary,
        item.content,
        item.source.organization,
        ...(item.affectedBarangays || []),
        ...(item.affectedRoutes || []),
        ...(item.affectedFeeders || []),
      ]
        .join(' ')
        .toLowerCase();

      if (!textToSearch.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Returns human-readable relative time string for freshness.
 */
export function formatFreshness(timestamp: string | Date, referenceNow: Date = new Date()): string {
  const then = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  if (isNaN(then.getTime())) return 'Recently updated';

  const diffMs = referenceNow.getTime() - then.getTime();
  if (diffMs < 0) return 'Just now';

  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 45) return 'Just now';
  if (diffSec < 90) return '1 minute ago';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return then.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Returns category-specific status metadata (label, styling, alert level).
 */
export function getStatusDisplay(category: AnnouncementCategory, status: AnnouncementStatus): {
  label: string;
  colorClass: string;
  bgClass: string;
  badgeClass: string;
  isAlert: boolean;
} {
  switch (category) {
    case 'power': {
      switch (status as PowerStatus) {
        case 'normal':
          return {
            label: 'Normal Grid Operation',
            colorClass: 'text-emerald-700',
            bgClass: 'bg-emerald-50 border-emerald-200',
            badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            isAlert: false,
          };
        case 'planned_outage':
          return {
            label: 'Planned Interruption',
            colorClass: 'text-amber-700',
            bgClass: 'bg-amber-50 border-amber-200',
            badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
            isAlert: true,
          };
        case 'unscheduled_outage':
          return {
            label: 'Unscheduled Power Outage',
            colorClass: 'text-rose-700',
            bgClass: 'bg-rose-50 border-rose-200',
            badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
            isAlert: true,
          };
        case 'partial_restoration':
          return {
            label: 'Partial Restoration',
            colorClass: 'text-sky-700',
            bgClass: 'bg-sky-50 border-sky-200',
            badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
            isAlert: false,
          };
        case 'emergency_shutdown':
          return {
            label: 'Emergency Grid Shutdown',
            colorClass: 'text-red-700',
            bgClass: 'bg-red-50 border-red-200',
            badgeClass: 'bg-red-100 text-red-800 border-red-400',
            isAlert: true,
          };
        default:
          return {
            label: status,
            colorClass: 'text-slate-700',
            bgClass: 'bg-slate-50 border-slate-200',
            badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
            isAlert: false,
          };
      }
    }

    case 'sea_travel': {
      switch (status as SeaTravelStatus) {
        case 'normal':
          return {
            label: 'Normal Sea Travel',
            colorClass: 'text-emerald-700',
            bgClass: 'bg-emerald-50 border-emerald-200',
            badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            isAlert: false,
          };
        case 'trips_suspended':
          return {
            label: 'Trips Suspended (No Sail)',
            colorClass: 'text-rose-700',
            bgClass: 'bg-rose-50 border-rose-200',
            badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
            isAlert: true,
          };
        case 'trips_delayed':
          return {
            label: 'Trips Delayed / Rough Seas',
            colorClass: 'text-amber-700',
            bgClass: 'bg-amber-50 border-amber-200',
            badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
            isAlert: true,
          };
        case 'special_advisory':
          return {
            label: 'Special Marine Advisory',
            colorClass: 'text-indigo-700',
            bgClass: 'bg-indigo-50 border-indigo-200',
            badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
            isAlert: false,
          };
        case 'resumed':
          return {
            label: 'Trips Resumed',
            colorClass: 'text-teal-700',
            bgClass: 'bg-teal-50 border-teal-200',
            badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
            isAlert: false,
          };
        default:
          return {
            label: status,
            colorClass: 'text-slate-700',
            bgClass: 'bg-slate-50 border-slate-200',
            badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
            isAlert: false,
          };
      }
    }

    case 'disaster': {
      switch (status as DisasterAlertStatus) {
        case 'white_alert':
          return {
            label: 'Normal / Low Risk (White)',
            colorClass: 'text-emerald-700',
            bgClass: 'bg-emerald-50 border-emerald-200',
            badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            isAlert: false,
          };
        case 'blue_alert':
          return {
            label: 'Monitoring / Advisory (Blue)',
            colorClass: 'text-sky-700',
            bgClass: 'bg-sky-50 border-sky-200',
            badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
            isAlert: true,
          };
        case 'red_alert':
          return {
            label: 'Heightened Alert / Severe (Red)',
            colorClass: 'text-rose-700',
            bgClass: 'bg-rose-50 border-rose-200',
            badgeClass: 'bg-rose-100 text-rose-800 border-rose-400 font-semibold',
            isAlert: true,
          };
        case 'evacuation_ordered':
          return {
            label: 'Evacuation Ordered',
            colorClass: 'text-red-900',
            bgClass: 'bg-red-100 border-red-300',
            badgeClass: 'bg-red-600 text-white font-bold animate-pulse',
            isAlert: true,
          };
        default:
          return {
            label: status,
            colorClass: 'text-slate-700',
            bgClass: 'bg-slate-50 border-slate-200',
            badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
            isAlert: false,
          };
      }
    }
  }
}

/**
 * Generates an updated announcement with official correction stamp and revision history item.
 */
export function createCorrection(
  original: Announcement,
  updates: Partial<Announcement>,
  adminName: string,
  reason: string
): Announcement {
  const timestamp = new Date().toISOString();
  const historyItem: RevisionHistoryItem = {
    id: `rev-${Date.now()}`,
    timestamp,
    adminName,
    action: 'corrected',
    summary: `Official Correction: ${reason}`,
    note: `Modified fields: ${Object.keys(updates).join(', ')}`,
  };

  return {
    ...original,
    ...updates,
    isCorrection: true,
    correctionReason: reason,
    updatedAt: timestamp,
    revisionHistory: [historyItem, ...(original.revisionHistory || [])],
  };
}

/**
 * Calculates current overview snapshot for the Corcuera community dashboard.
 */
export function getCommunityStatusSummary(announcements: Announcement[]): {
  activePowerInterruption: boolean;
  powerNoticeSummary: string;
  seaTravelSuspended: boolean;
  seaNoticeSummary: string;
  disasterAlertActive: boolean;
  disasterAlertLevel: string;
  urgentCount: number;
} {
  const activeItems = announcements.filter(a => !a.isArchived);

  // Power
  const activePower = activeItems.find(
    a => a.category === 'power' && ['planned_outage', 'unscheduled_outage', 'emergency_shutdown'].includes(a.status)
  );

  // Sea Travel
  const activeSea = activeItems.find(
    a => a.category === 'sea_travel' && ['trips_suspended', 'trips_delayed'].includes(a.status)
  );

  // Disaster
  const activeDisaster = activeItems.find(
    a => a.category === 'disaster' && ['blue_alert', 'red_alert', 'evacuation_ordered'].includes(a.status)
  );

  const urgentCount = activeItems.filter(a => a.isUrgent).length;

  return {
    activePowerInterruption: !!activePower,
    powerNoticeSummary: activePower
      ? `${activePower.status === 'planned_outage' ? 'Planned Outage' : 'Unscheduled Outage'}: ${activePower.title}`
      : 'Power Grid Operating Normally',
    seaTravelSuspended: !!activeSea,
    seaNoticeSummary: activeSea
      ? `${activeSea.status === 'trips_suspended' ? 'Trips Suspended' : 'Delays Reported'}: ${activeSea.title}`
      : 'Vessels Operating Normal Schedule',
    disasterAlertActive: !!activeDisaster,
    disasterAlertLevel: activeDisaster ? activeDisaster.title : 'Low Risk / Normal Condition (White Alert)',
    urgentCount,
  };
}
