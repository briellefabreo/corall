import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAnnouncementSource,
  filterAnnouncements,
  formatFreshness,
  getStatusDisplay,
  createCorrection,
  getCommunityStatusSummary,
} from './coralLogic';
import { Announcement } from '../types/coral';

const sampleAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    category: 'power',
    title: 'Emergency Power Interruption Feeder 1',
    summary: 'TIELCO linesman team replacing broken crossarm in Poblacion.',
    content: 'Full details on power interruption...',
    status: 'unscheduled_outage',
    isUrgent: true,
    isCorrection: false,
    isArchived: false,
    affectedBarangays: ['Poblacion', 'Alegria'],
    affectedFeeders: ['Feeder 1'],
    source: {
      organization: 'TIELCO Corcuera Sub-Office',
      issuanceTime: '2026-11-01T10:00:00Z',
      verificationMethod: 'Signed VHF log by Station In-charge',
      publishedByAdmin: 'Engr. R. Fabellon',
    },
    publishedAt: '2026-11-01T10:05:00Z',
    updatedAt: '2026-11-01T10:05:00Z',
    revisionHistory: [],
  },
  {
    id: 'ann-2',
    category: 'sea_travel',
    title: 'Calatrava - Corcuera Trips Suspended',
    summary: 'Gale Warning hoisted by PAGASA; sea condition rough.',
    content: 'Passenger boats are not cleared to sail...',
    status: 'trips_suspended',
    isUrgent: true,
    isCorrection: false,
    isArchived: false,
    affectedBarangays: ['All 15 Barangays'],
    affectedRoutes: ['Calatrava - Corcuera', 'San Agustin - Corcuera'],
    source: {
      organization: 'Philippine Coast Guard Sub-Station Corcuera',
      issuanceTime: '2026-11-01T06:00:00Z',
      verificationMethod: 'Official Notice PCG-CGS-ROM-2026-88',
      publishedByAdmin: 'PO2 M. Mortel',
    },
    publishedAt: '2026-11-01T06:15:00Z',
    updatedAt: '2026-11-01T06:15:00Z',
    revisionHistory: [],
  },
  {
    id: 'ann-3',
    category: 'disaster',
    title: 'Typhoon Preparedness Advisory (Blue Alert)',
    summary: 'MDRRMO Corcuera activates EOC on Blue Alert.',
    content: 'Fisherfolk advised not to venture to sea...',
    status: 'blue_alert',
    isUrgent: false,
    isCorrection: false,
    isArchived: false,
    affectedBarangays: ['All 15 Barangays'],
    source: {
      organization: 'MDRRMO Corcuera',
      issuanceTime: '2026-11-01T08:00:00Z',
      verificationMethod: 'Executive Order / Emergency Ops Advisory',
      publishedByAdmin: 'A. Fallore',
    },
    publishedAt: '2026-11-01T08:30:00Z',
    updatedAt: '2026-11-01T08:30:00Z',
    revisionHistory: [],
  },
  {
    id: 'ann-4',
    category: 'power',
    title: 'Past Feeder 2 Maintenance (Archived)',
    summary: 'Clearing of bamboo trees along feeder lines.',
    content: 'Completed maintenance notice.',
    status: 'normal',
    isUrgent: false,
    isCorrection: false,
    isArchived: true,
    affectedBarangays: ['Gobon', 'Guimbirayan'],
    source: {
      organization: 'TIELCO Corcuera Sub-Office',
      issuanceTime: '2026-10-25T08:00:00Z',
      verificationMethod: 'Official maintenance log',
      publishedByAdmin: 'Engr. R. Fabellon',
    },
    publishedAt: '2026-10-25T08:30:00Z',
    updatedAt: '2026-10-25T14:30:00Z',
    revisionHistory: [],
  },
];

test('validateAnnouncementSource requires complete and valid source information', () => {
  // Missing all fields
  const invalidResult = validateAnnouncementSource({});
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.length >= 4);

  // Partial fields
  const partial = validateAnnouncementSource({
    organization: 'TIELCO',
    issuanceTime: 'invalid-date',
    verificationMethod: 'ok',
    publishedByAdmin: '',
  });
  assert.equal(partial.valid, false);

  // Complete and valid
  const validResult = validateAnnouncementSource({
    organization: 'MDRRMO Corcuera',
    issuanceTime: '2026-11-01T12:00:00Z',
    verificationMethod: 'Radio dispatch from LGU EOC',
    publishedByAdmin: 'Officer Juan Perez',
  });
  assert.equal(validResult.valid, true);
  assert.equal(validResult.errors.length, 0);
});

test('filterAnnouncements filters correctly by category, status, query, and archive', () => {
  // Category filter
  const powerOnly = filterAnnouncements(sampleAnnouncements, { category: 'power' });
  assert.equal(powerOnly.length, 1);
  assert.equal(powerOnly[0].id, 'ann-1');

  // Search query
  const queryResult = filterAnnouncements(sampleAnnouncements, { query: 'Gale Warning' });
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].id, 'ann-2');

  // Barangay filter
  const poblacionMatch = filterAnnouncements(sampleAnnouncements, { barangay: 'Poblacion' });
  // ann-1 explicitly has Poblacion, ann-2 and ann-3 have All 15 Barangays which matches
  assert.ok(poblacionMatch.length >= 1);

  // Archived toggle
  const archived = filterAnnouncements(sampleAnnouncements, { showArchived: true });
  assert.equal(archived.length, 1);
  assert.equal(archived[0].id, 'ann-4');
});

test('formatFreshness formats relative time appropriately', () => {
  const refNow = new Date('2026-11-01T12:00:00Z');
  
  assert.equal(formatFreshness('2026-11-01T11:59:40Z', refNow), 'Just now');
  assert.equal(formatFreshness('2026-11-01T11:58:30Z', refNow), '1 minute ago');
  assert.equal(formatFreshness('2026-11-01T11:30:00Z', refNow), '30 minutes ago');
  assert.equal(formatFreshness('2026-11-01T09:00:00Z', refNow), '3 hours ago');
});

test('getStatusDisplay produces correct labels and badges', () => {
  const powerOutage = getStatusDisplay('power', 'unscheduled_outage');
  assert.equal(powerOutage.label, 'Unscheduled Power Outage');
  assert.equal(powerOutage.isAlert, true);

  const seaSuspended = getStatusDisplay('sea_travel', 'trips_suspended');
  assert.equal(seaSuspended.label, 'Trips Suspended (No Sail)');
  assert.equal(seaSuspended.isAlert, true);

  const disasterBlue = getStatusDisplay('disaster', 'blue_alert');
  assert.equal(disasterBlue.label, 'Monitoring / Advisory (Blue)');
});

test('createCorrection records reason and updates revisionHistory', () => {
  const original = sampleAnnouncements[0];
  const corrected = createCorrection(
    original,
    { title: 'Emergency Power Interruption Feeder 1 - EXTENDED' },
    'Admin Test',
    'Restoration postponed due to sudden thunderstorm'
  );

  assert.equal(corrected.isCorrection, true);
  assert.equal(corrected.correctionReason, 'Restoration postponed due to sudden thunderstorm');
  assert.equal(corrected.title, 'Emergency Power Interruption Feeder 1 - EXTENDED');
  assert.equal(corrected.revisionHistory.length, 1);
  assert.equal(corrected.revisionHistory[0].action, 'corrected');
});

test('getCommunityStatusSummary aggregates high-level status for Simara island', () => {
  const summary = getCommunityStatusSummary(sampleAnnouncements);
  assert.equal(summary.activePowerInterruption, true);
  assert.equal(summary.seaTravelSuspended, true);
  assert.equal(summary.disasterAlertActive, true);
  assert.equal(summary.urgentCount, 2);
});
