export type AnnouncementCategory = 'power' | 'sea_travel' | 'disaster';

export type PowerStatus = 
  | 'normal'
  | 'planned_outage'
  | 'unscheduled_outage'
  | 'partial_restoration'
  | 'emergency_shutdown';

export type SeaTravelStatus =
  | 'normal'
  | 'trips_suspended'
  | 'trips_delayed'
  | 'special_advisory'
  | 'resumed';

export type DisasterAlertStatus =
  | 'white_alert' // Normal / low risk
  | 'blue_alert'  // Monitoring / advisory
  | 'red_alert'   // Heightened alert / Storm warning
  | 'evacuation_ordered';

export type AnnouncementStatus = PowerStatus | SeaTravelStatus | DisasterAlertStatus;

export interface SourceInformation {
  organization: string; // e.g., "TIELCO Corcuera Sub-Office", "PCG Sub-Station Corcuera", "MDRRMO Corcuera"
  issuanceTime: string; // ISO format
  documentRef?: string; // e.g., "Advisory No. 2026-08", "Gale Warning #04"
  sourceUrl?: string;
  verificationMethod: string; // e.g., "Direct VHF Radio confirmation from PCG Duty Officer"
  publishedByAdmin: string; // Name of authorized administrator
  adminRole?: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document';
  name: string;
  url: string;
  size: string;
}

export interface RevisionHistoryItem {
  id: string;
  timestamp: string;
  adminName: string;
  action: 'created' | 'published' | 'updated' | 'corrected' | 'archived' | 'status_changed';
  summary: string;
  note?: string;
}

export interface Announcement {
  id: string;
  category: AnnouncementCategory;
  title: string;
  summary: string;
  content: string;
  status: AnnouncementStatus;
  isUrgent: boolean;
  isCorrection: boolean;
  correctionReason?: string;
  isArchived: boolean;
  affectedBarangays: string[];
  affectedRoutes?: string[]; // For sea travel
  affectedFeeders?: string[]; // For power
  alertLevelBadge?: string;
  estimatedRestoration?: string;
  source: SourceInformation;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  attachments?: Attachment[];
  coverImageUrl?: string;
  revisionHistory: RevisionHistoryItem[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  announcementId: string;
  announcementTitle: string;
  category: AnnouncementCategory;
  details: string;
}

export interface InAppNotification {
  id: string;
  announcementId: string;
  category: AnnouncementCategory;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isUrgent: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  organization: string;
  contactNumber: string;
  secondaryNumber?: string;
  channel?: string; // e.g., VHF Marine Channel 16
  location: string;
  operatingHours: string;
}

export type Language = 'en' | 'fil' | 'asi';

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xl';
  highContrast: boolean;
  soundAlerts: boolean;
  reducedMotion: boolean;
  categoryNotifications: {
    power: boolean;
    sea_travel: boolean;
    disaster: boolean;
  };
}
