import { Announcement, AuditLogEntry, EmergencyContact } from '../types/coral';

export const CORCUERA_BARANGAYS = [
  'All 15 Barangays',
  'Poblacion',
  'Alegria',
  'Bagong Silang',
  'Colong-Colong',
  'Gobon',
  'Guimbirayan',
  'Mabini',
  'Mahaba',
  'Mangansag',
  'Marigondon',
  'San Agustin',
  'San Roque',
  'Taclobo',
  'Labnig',
  'Tag-ani',
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-coral-001',
    category: 'sea_travel',
    title: 'TEMPORARY SUSPENSION OF SEA TRAVEL: Calatrava – Corcuera (Simara) Route',
    summary: 'All motor banca and passenger vessel trips between Calatrava and Corcuera are temporarily suspended due to Gale Warning No. 03 issued by PAGASA.',
    content: `Due to the prevailing Northeast Monsoon (Amihan) and Gale Warning No. 03 issued by PAGASA, strong to gale-force winds are causing rough to very rough sea conditions with wave heights reaching 2.8 to 4.2 meters in the Tablas Strait and coastal waters of Romblon.

In accordance with Philippine Coast Guard Memorandum Circular No. 02-13 (Guidelines on Movement of Vessels During Heavy Weather), all sea travel for motor bancas, passenger vessels, and fishing bancas on the Calatrava – Corcuera and San Agustin – Corcuera routes are TEMPORARILY SUSPENDED until further notice.

Affected passengers are advised not to proceed to the ports. Resumption of trips will be announced as soon as sea and weather conditions improve and an official clearance is issued by CGS Romblon.`,
    status: 'trips_suspended',
    isUrgent: true,
    isCorrection: false,
    isArchived: false,
    affectedBarangays: ['All 15 Barangays'],
    affectedRoutes: ['Calatrava – Corcuera', 'San Agustin – Corcuera', 'Corcuera – Romblon'],
    alertLevelBadge: 'Gale Warning #03',
    source: {
      organization: 'Philippine Coast Guard Sub-Station Corcuera',
      issuanceTime: '2026-11-01T06:30:00.000Z',
      documentRef: 'PCG-SSCOR-ADV-2026-042',
      verificationMethod: 'Direct official radio dispatch from Station Commander & signed advisory on file',
      publishedByAdmin: 'PO2 Marlon Mortel, PCG',
      adminRole: 'Coast Guard Liaison / CORAL Verified Admin',
    },
    publishedAt: '2026-11-01T06:45:00.000Z',
    updatedAt: '2026-11-01T06:45:00.000Z',
    coverImageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80',
    attachments: [
      {
        id: 'att-01',
        type: 'document',
        name: 'PCG_Sea_Travel_Suspension_Advisory_42.pdf',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        size: '420 KB',
      },
    ],
    revisionHistory: [
      {
        id: 'rev-01',
        timestamp: '2026-11-01T06:45:00.000Z',
        adminName: 'PO2 Marlon Mortel, PCG',
        action: 'published',
        summary: 'Initial publication of sea travel suspension notice.',
      },
    ],
  },
  {
    id: 'ann-coral-002',
    category: 'power',
    title: 'Emergency Power Interruption: Feeder 1 (North Simara Circuit)',
    summary: 'Unscheduled blackout affecting Barangays Mangansag, Marigondon, Taclobo, and Labnig due to an uprooted tree falling across the 13.2kV primary line.',
    content: `TIELCO Corcuera Sub-Office advises our member-consumer-owners (MCOs) that an unscheduled power interruption is currently ongoing along Feeder 1 (North Simara Circuit).

CAUSE: Strong gusts of wind uprooted a wild acacia tree along the provincial road in Sitio Ilaya, Barangay Taclobo, severing two spans of 13.2kV aluminum conductor line and damaging crossarm insulator pin #14.

CREW ACTION: The emergency line maintenance and clearing crew from the NPC-SPUG Corcuera Diesel Power Plant has been deployed to the site. Line isolation is in progress.

ESTIMATED RESTORATION: Service is targeted to be partially energized by 16:30 today once line clearing and conductor splicing are completed. Member-consumers are advised to exercise caution and treat all downed wires as strictly energized.`,
    status: 'unscheduled_outage',
    isUrgent: true,
    isCorrection: true,
    correctionReason: 'Extended estimated restoration time from 14:00 to 16:30 due to additional fallen branches discovered near the ridge.',
    isArchived: false,
    affectedBarangays: ['Mangansag', 'Marigondon', 'Taclobo', 'Labnig'],
    affectedFeeders: ['Feeder 1 - North Simara (Circuit 13.2kV)'],
    estimatedRestoration: 'Today, approx. 16:30 PST',
    source: {
      organization: 'TIELCO (Tablas Island Electric Cooperative Inc.) — Corcuera Sub-Office',
      issuanceTime: '2026-11-01T08:15:00.000Z',
      documentRef: 'TIELCO-COR-EMERG-2026-11',
      verificationMethod: 'Emergency incident logbook signed by Officer-in-Charge Linesman',
      publishedByAdmin: 'Engr. Reynaldo Fabellon',
      adminRole: 'TIELCO Field Supervisor & CORAL Admin',
    },
    publishedAt: '2026-11-01T08:30:00.000Z',
    updatedAt: '2026-11-01T10:15:00.000Z',
    coverImageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80',
    attachments: [
      {
        id: 'att-02',
        type: 'image',
        name: 'Damage_Inspection_Taclobo_Site.jpg',
        url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
        size: '1.2 MB',
      },
    ],
    revisionHistory: [
      {
        id: 'rev-02b',
        timestamp: '2026-11-01T10:15:00.000Z',
        adminName: 'Engr. Reynaldo Fabellon',
        action: 'corrected',
        summary: 'Official Correction: Extended estimated restoration time from 14:00 to 16:30 due to additional fallen branches.',
        note: 'Updated estimatedRestoration and content.',
      },
      {
        id: 'rev-02a',
        timestamp: '2026-11-01T08:30:00.000Z',
        adminName: 'Engr. Reynaldo Fabellon',
        action: 'published',
        summary: 'Initial publication of emergency feeder line outage.',
      },
    ],
  },
  {
    id: 'ann-coral-003',
    category: 'disaster',
    title: 'MDRRMO Blue Alert Advisory: Tropical Depression Monitoring & Preparedness',
    summary: 'Corcuera Municipal Disaster Risk Reduction & Management Council activates Blue Alert status. 24/7 EOC monitoring and prepositioning of relief supplies initiated.',
    content: `The Municipal Disaster Risk Reduction and Management Council (MDRRMC) of Corcuera, Romblon hereby raises its alert level to BLUE ALERT in view of the Tropical Depression currently moving across the Philippine Sea, enhancing the Northeast Monsoon across Southern Luzon and the MIMAROPA region.

DIRECTIVES FOR BARANGAY DISASTER COMMITTEES (BDRRMC):
1. All 15 Barangay Captains are directed to convene their respective BDRRMCs and activate round-the-clock monitoring of coastal and flood-prone sitios.
2. Evacuation centers at Corcuera National High School, Simara Central Elementary School, and Barangay Halls must be inspected and readied for potential preemptive evacuation if weather escalates.
3. Fishermen with bancas below 3 gross tonnage are strictly prohibited from fishing or venturing out to sea.
4. Emergency power generators and medical supplies at the Rural Health Unit (RHU) Poblacion have been prepositioned.

HOTLINES: MDRRMO Operations Center: 0919-876-5432 / VHF Frequency 145.550 MHz.`,
    status: 'blue_alert',
    isUrgent: false,
    isCorrection: false,
    isArchived: false,
    affectedBarangays: ['All 15 Barangays'],
    alertLevelBadge: 'Blue Alert (EOC Active)',
    source: {
      organization: 'MDRRMO Corcuera (Office of the Municipal Mayor)',
      issuanceTime: '2026-11-01T07:00:00.000Z',
      documentRef: 'MDRRMC Memorandum Order No. 2026-19',
      verificationMethod: 'Signed Executive Memorandum from Municipal Mayor / MDRRMO Officer',
      publishedByAdmin: 'Althea Fallore, EnP',
      adminRole: 'MDRRMO Officer / Municipal System Admin',
    },
    publishedAt: '2026-11-01T07:30:00.000Z',
    updatedAt: '2026-11-01T07:30:00.000Z',
    coverImageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=900&q=80',
    attachments: [
      {
        id: 'att-03',
        type: 'document',
        name: 'MDRRMO_Memo_Order_2026_19.pdf',
        url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
        size: '560 KB',
      },
    ],
    revisionHistory: [
      {
        id: 'rev-03',
        timestamp: '2026-11-01T07:30:00.000Z',
        adminName: 'Althea Fallore, EnP',
        action: 'published',
        summary: 'Published MDRRMO Blue Alert Memorandum.',
      },
    ],
  },
  {
    id: 'ann-coral-004',
    category: 'power',
    title: 'NOTICE OF SCHEDULED MAINTENANCE: Feeder 2 Loop & Substation Breaker Testing',
    summary: 'Scheduled 5-hour interruption on Saturday for Feeder 2 (Poblacion, Alegria, Bagong Silang, Colong-Colong) for line clearing and transformer preventive check.',
    content: `Notice to all TIELCO member-consumers in Corcuera:

TIELCO Engineering and Maintenance Department will conduct comprehensive line re-tensioning, replacement of aged pin-type insulators, and preventive maintenance on the 500kVA substation step-down bank.

SCHEDULE:
• Date: Saturday, November 7, 2026
• Time: 08:00 AM to 01:00 PM (5 hours)
• Affected Areas: Barangay Poblacion, Alegria, Bagong Silang, Colong-Colong, and Gobon.

All commercial establishments, cold storage facilities, and health centers in Poblacion are requested to prepare backup generators. Power will be restored without prior notice as soon as works are safely finished.`,
    status: 'planned_outage',
    isUrgent: false,
    isCorrection: false,
    isArchived: false,
    affectedBarangays: ['Poblacion', 'Alegria', 'Bagong Silang', 'Colong-Colong', 'Gobon'],
    affectedFeeders: ['Feeder 2 Loop (Poblacion Circuit)'],
    estimatedRestoration: 'Saturday, Nov 7, 13:00 PST',
    source: {
      organization: 'TIELCO (Tablas Island Electric Cooperative Inc.) — Engineering Dept',
      issuanceTime: '2026-10-31T14:00:00.000Z',
      documentRef: 'TIELCO-MAINT-SCHED-2026-44',
      verificationMethod: 'Official signed bulletin received via TIELCO Area Office Courier',
      publishedByAdmin: 'Engr. Reynaldo Fabellon',
      adminRole: 'TIELCO Field Supervisor',
    },
    publishedAt: '2026-10-31T15:00:00.000Z',
    updatedAt: '2026-10-31T15:00:00.000Z',
    coverImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=900&q=80',
    attachments: [
      {
        id: 'att-04',
        type: 'image',
        name: 'TIELCO_Feeder2_Maintenance_Map.png',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
        size: '890 KB',
      },
    ],
    revisionHistory: [
      {
        id: 'rev-04',
        timestamp: '2026-10-31T15:00:00.000Z',
        adminName: 'Engr. Reynaldo Fabellon',
        action: 'published',
        summary: 'Scheduled outage notice published 7 days in advance.',
      },
    ],
  },
  {
    id: 'ann-coral-005',
    category: 'sea_travel',
    title: 'RESUMPTION: San Agustin – Corcuera RORO Cargo Operations (Previous Advisory)',
    summary: 'Cargo and commercial motorized banca operations have resumed following the lifting of Gale Warning No. 02 earlier this week.',
    content: `Vessel operators and passengers are hereby notified that CGS Romblon has cleared daylight sea travel between San Agustin Port and Corcuera Port for vessels of 15 GT and above.

Operators are reminded to strictly enforce passenger manifest records and ensure 100% life jacket compliance prior to departure.`,
    status: 'resumed',
    isUrgent: false,
    isCorrection: false,
    isArchived: true,
    affectedBarangays: ['All 15 Barangays'],
    affectedRoutes: ['San Agustin – Corcuera'],
    source: {
      organization: 'Philippine Coast Guard Sub-Station Corcuera',
      issuanceTime: '2026-10-28T09:00:00.000Z',
      documentRef: 'PCG-SSCOR-ADV-2026-039',
      verificationMethod: 'Coast Guard Station clearance order broadcast on VHF Ch 16',
      publishedByAdmin: 'PO2 Marlon Mortel, PCG',
    },
    publishedAt: '2026-10-28T09:30:00.000Z',
    updatedAt: '2026-10-29T18:00:00.000Z',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    revisionHistory: [
      {
        id: 'rev-05b',
        timestamp: '2026-10-29T18:00:00.000Z',
        adminName: 'PO2 Marlon Mortel, PCG',
        action: 'archived',
        summary: 'Archived after 48 hours of normal sailing operations.',
      },
      {
        id: 'rev-05a',
        timestamp: '2026-10-28T09:30:00.000Z',
        adminName: 'PO2 Marlon Mortel, PCG',
        action: 'published',
        summary: 'Trip resumption advisory published.',
      },
    ],
  },
];

export const ADVISORY_IMAGE_PRESETS = [
  {
    category: 'sea_travel',
    label: 'Rough Seas / Gale Warning',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'sea_travel',
    label: 'Calm Island Waters / Port Sailing',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'sea_travel',
    label: 'Coast Guard Patrol / Vessel Dock',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'power',
    label: 'Linemen Repairing Electric Lines',
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'power',
    label: 'Substation & Transformer Testing',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'power',
    label: 'Corcuera Diesel Power Plant / GenSet',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'disaster',
    label: 'Tropical Disturbance / Storm Clouds',
    url: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'disaster',
    label: 'Disaster Emergency Operations & Relief',
    url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'disaster',
    label: 'Barangay Evacuation & Public Safety',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80',
  },
];

/**
 * CORCUERA COMMUNITY EMERGENCY & AUTHORITY DIRECTORY
 * 
 * PAALALA PARA SA MGA ESTUDYANTE:
 * Dito niyo i-e-edit ang mga detalye ng directory kung may bago o tamang
 * contact numbers, pangalan ng opisyal, o lokasyon sa Corcuera, Romblon.
 * I-edit lamang ang contactNumber, name, organization, o location sa ibaba:
 */
export const CORCUERA_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ec-1',
    organization: 'MDRRMO Corcuera Emergency Operations Center',
    name: 'Althea Fallore, EnP (MDRRMO Officer)',
    role: 'Disaster Risk Reduction & Management',
    contactNumber: '+63 919 876 5432', // <-- I-edit ang contact number dito
    secondaryNumber: '+63 928 123 4567',
    channel: 'VHF Frequency: 145.550 MHz (Simara EOC)',
    location: 'Municipal Hall Compound, Poblacion, Corcuera',
    operatingHours: '24/7 Emergency Operations',
  },
  {
    id: 'ec-2',
    organization: 'Philippine Coast Guard Sub-Station Corcuera',
    name: 'PO2 Marlon Mortel, PCG (Commander)',
    role: 'Maritime Safety & Sea Travel Clearance',
    contactNumber: '+63 917 554 9912', // <-- I-edit ang contact number dito
    channel: 'Marine VHF Channel 16 (156.800 MHz)',
    location: 'Port of Corcuera, Barangay Poblacion',
    operatingHours: '24/7 Maritime Watch',
  },
  {
    id: 'ec-3',
    organization: 'TIELCO Corcuera Sub-Office (Power Distribution)',
    name: 'Engr. Reynaldo Fabellon (Field Supervisor)',
    role: 'Power Outages & Grid Emergencies',
    contactNumber: '+63 920 443 1120', // <-- I-edit ang contact number dito
    secondaryNumber: '+63 918 901 2234',
    location: 'NPC-SPUG Plant Road, Barangay Gobon',
    operatingHours: '07:00 AM – 06:00 PM (Emergency Line Duty 24/7)',
  },
  {
    id: 'ec-4',
    organization: 'Corcuera Rural Health Unit (RHU) & Birthing Facility',
    name: 'Dr. Maria Elena Ramirez, MHO',
    role: 'Medical Emergencies & Patient Care',
    contactNumber: '+63 921 778 3344', // <-- I-edit ang contact number dito
    location: 'Sitio Centro, Barangay Poblacion',
    operatingHours: '24/7 Emergency Triage',
  },
  {
    id: 'ec-5',
    organization: 'Philippine National Police — Corcuera Municipal Police Station',
    name: 'PMAJ Joseph F. Ramos (Chief of Police)',
    role: 'Law Enforcement & Peace & Order',
    contactNumber: '+63 998 598 6201', // <-- I-edit ang contact number dito
    location: 'Poblacion, Corcuera, Romblon',
    operatingHours: '24/7 Police Assistance',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-01',
    timestamp: '2026-11-01T10:15:00.000Z',
    adminName: 'Engr. Reynaldo Fabellon',
    action: 'PUBLISHED_CORRECTION',
    announcementId: 'ann-coral-002',
    announcementTitle: 'Emergency Power Interruption: Feeder 1',
    category: 'power',
    details: 'Reason: Extended estimated restoration time from 14:00 to 16:30 due to additional fallen branches.',
  },
  {
    id: 'log-02',
    timestamp: '2026-11-01T08:30:00.000Z',
    adminName: 'Engr. Reynaldo Fabellon',
    action: 'PUBLISHED',
    announcementId: 'ann-coral-002',
    announcementTitle: 'Emergency Power Interruption: Feeder 1',
    category: 'power',
    details: 'Initial publication. Verified via Emergency Incident Logbook.',
  },
  {
    id: 'log-03',
    timestamp: '2026-11-01T07:30:00.000Z',
    adminName: 'Althea Fallore, EnP',
    action: 'PUBLISHED',
    announcementId: 'ann-coral-003',
    announcementTitle: 'MDRRMO Blue Alert Advisory: Tropical Depression Monitoring',
    category: 'disaster',
    details: 'Verified via MDRRMC Memorandum Order No. 2026-19.',
  },
  {
    id: 'log-04',
    timestamp: '2026-11-01T06:45:00.000Z',
    adminName: 'PO2 Marlon Mortel, PCG',
    action: 'PUBLISHED',
    announcementId: 'ann-coral-001',
    announcementTitle: 'TEMPORARY SUSPENSION OF SEA TRAVEL: Calatrava – Corcuera',
    category: 'sea_travel',
    details: 'Verified via PCG-SSCOR-ADV-2026-042 and CGS Romblon Gale Warning.',
  },
];
