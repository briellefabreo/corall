import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertCircle, 
  Zap, 
  Anchor, 
  AlertTriangle, 
  Save, 
  Clock, 
  MapPin, 
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { 
  Announcement, 
  AnnouncementCategory, 
  AnnouncementStatus,
  PowerStatus,
  SeaTravelStatus,
  DisasterAlertStatus
} from '../types/coral';
import { CORCUERA_BARANGAYS, ADVISORY_IMAGE_PRESETS } from '../data/seedData';
import { useCoral } from '../context/CoralContext';

interface CreateEditAnnouncementModalProps {
  onClose: () => void;
  editAnnouncement?: Announcement | null;
}

export const CreateEditAnnouncementModal: React.FC<CreateEditAnnouncementModalProps> = ({
  onClose,
  editAnnouncement,
}) => {
  const { 
    currentAdmin, 
    publishAnnouncement, 
    updateAnnouncement, 
    publishOfficialCorrection 
  } = useCoral();

  const isEditing = !!editAnnouncement;
  const [isCorrectionMode, setIsCorrectionMode] = useState(false);
  const [correctionReason, setCorrectionReason] = useState('');

  // Form Fields
  const [category, setCategory] = useState<AnnouncementCategory>(
    editAnnouncement?.category || 'power'
  );
  const [title, setTitle] = useState(editAnnouncement?.title || '');
  const [summary, setSummary] = useState(editAnnouncement?.summary || '');
  const [content, setContent] = useState(editAnnouncement?.content || '');
  const [coverImageUrl, setCoverImageUrl] = useState(
    editAnnouncement?.coverImageUrl || ''
  );
  const [status, setStatus] = useState<AnnouncementStatus>(
    editAnnouncement?.status || 'unscheduled_outage'
  );
  const [isUrgent, setIsUrgent] = useState(editAnnouncement?.isUrgent || false);
  const [selectedBarangays, setSelectedBarangays] = useState<string[]>(
    editAnnouncement?.affectedBarangays || ['All 15 Barangays']
  );
  const [affectedRoutes, setAffectedRoutes] = useState<string>(
    editAnnouncement?.affectedRoutes?.join(', ') || ''
  );
  const [affectedFeeders, setAffectedFeeders] = useState<string>(
    editAnnouncement?.affectedFeeders?.join(', ') || ''
  );
  const [estimatedRestoration, setEstimatedRestoration] = useState(
    editAnnouncement?.estimatedRestoration || ''
  );

  // Mandatory Source Fields
  const [sourceOrg, setSourceOrg] = useState(
    editAnnouncement?.source.organization || currentAdmin?.organization || 'TIELCO Corcuera Sub-Office'
  );
  const [sourceIssuanceTime, setSourceIssuanceTime] = useState(
    editAnnouncement?.source.issuanceTime 
      ? new Date(editAnnouncement.source.issuanceTime).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [documentRef, setDocumentRef] = useState(
    editAnnouncement?.source.documentRef || ''
  );
  const [sourceUrl, setSourceUrl] = useState(
    editAnnouncement?.source.sourceUrl || ''
  );
  const [verificationMethod, setVerificationMethod] = useState(
    editAnnouncement?.source.verificationMethod || ''
  );
  const [publishedByAdmin, setPublishedByAdmin] = useState(
    editAnnouncement?.source.publishedByAdmin || currentAdmin?.name || ''
  );

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update default source when category changes (if not editing)
  useEffect(() => {
    if (!isEditing) {
      if (category === 'power') {
        setSourceOrg('TIELCO (Tablas Island Electric Cooperative Inc.) — Corcuera Sub-Office');
        setStatus('unscheduled_outage');
        setVerificationMethod('Logged in Corcuera Diesel Power Plant dispatch book and confirmed by duty linesman');
      } else if (category === 'sea_travel') {
        setSourceOrg('Philippine Coast Guard Sub-Station Corcuera');
        setStatus('trips_suspended');
        setVerificationMethod('Official weather bulletin PCG Station Commander & CGS Romblon radio broadcast');
      } else if (category === 'disaster') {
        setSourceOrg('MDRRMO Corcuera (Office of the Municipal Mayor)');
        setStatus('blue_alert');
        setVerificationMethod('Signed Executive Memorandum from Municipal Disaster Risk Reduction & Management Council');
      }
    }
  }, [category, isEditing]);

  const handleBarangayToggle = (b: string) => {
    if (b === 'All 15 Barangays') {
      setSelectedBarangays(['All 15 Barangays']);
      return;
    }
    const filtered = selectedBarangays.filter(item => item !== 'All 15 Barangays');
    if (filtered.includes(b)) {
      const next = filtered.filter(item => item !== b);
      setSelectedBarangays(next.length === 0 ? ['All 15 Barangays'] : next);
    } else {
      setSelectedBarangays([...filtered, b]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!title.trim()) errors.push('Title is required.');
    if (!summary.trim()) errors.push('Short summary is required.');
    if (!content.trim()) errors.push('Detailed announcement text is required.');
    if (!sourceOrg.trim()) errors.push('Issuing organization / source is required.');
    if (!sourceIssuanceTime) errors.push('Source issuance date and time is required.');
    if (!verificationMethod.trim() || verificationMethod.trim().length < 5) {
      errors.push('Verification method description must be at least 5 characters (e.g. VHF radio log, signed memo).');
    }
    if (!publishedByAdmin.trim()) errors.push('Responsible administrator name is required.');

    if (isEditing && isCorrectionMode && !correctionReason.trim()) {
      errors.push('Please describe the reason for this official correction.');
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    const routesArray = affectedRoutes
      ? affectedRoutes.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    const feedersArray = affectedFeeders
      ? affectedFeeders.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    if (isEditing && editAnnouncement) {
      if (isCorrectionMode) {
        publishOfficialCorrection(
          editAnnouncement.id,
          {
            category,
            title,
            summary,
            content,
            coverImageUrl: coverImageUrl || undefined,
            status,
            isUrgent,
            affectedBarangays: selectedBarangays,
            affectedRoutes: routesArray,
            affectedFeeders: feedersArray,
            estimatedRestoration: estimatedRestoration || undefined,
            source: {
              organization: sourceOrg,
              issuanceTime: new Date(sourceIssuanceTime).toISOString(),
              documentRef: documentRef || undefined,
              sourceUrl: sourceUrl || undefined,
              verificationMethod,
              publishedByAdmin,
              adminRole: currentAdmin?.role,
            },
          },
          correctionReason
        );
      } else {
        updateAnnouncement(
          editAnnouncement.id,
          {
            category,
            title,
            summary,
            content,
            coverImageUrl: coverImageUrl || undefined,
            status,
            isUrgent,
            affectedBarangays: selectedBarangays,
            affectedRoutes: routesArray,
            affectedFeeders: feedersArray,
            estimatedRestoration: estimatedRestoration || undefined,
            source: {
              organization: sourceOrg,
              issuanceTime: new Date(sourceIssuanceTime).toISOString(),
              documentRef: documentRef || undefined,
              sourceUrl: sourceUrl || undefined,
              verificationMethod,
              publishedByAdmin,
              adminRole: currentAdmin?.role,
            },
          },
          'Administrator edited announcement details.'
        );
      }
    } else {
      // Create new
      const result = publishAnnouncement({
        category,
        title,
        summary,
        content,
        coverImageUrl: coverImageUrl || undefined,
        status,
        isUrgent,
        isCorrection: false,
        isArchived: false,
        affectedBarangays: selectedBarangays,
        affectedRoutes: routesArray,
        affectedFeeders: feedersArray,
        estimatedRestoration: estimatedRestoration || undefined,
        source: {
          organization: sourceOrg,
          issuanceTime: new Date(sourceIssuanceTime).toISOString(),
          documentRef: documentRef || undefined,
          sourceUrl: sourceUrl || undefined,
          verificationMethod,
          publishedByAdmin,
          adminRole: currentAdmin?.role,
        },
      });

      if (!result.success && result.errors) {
        setFormErrors(result.errors);
        return;
      }
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-sky-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
            <h2 id="form-modal-title" className="text-base font-bold">
              {isEditing ? (isCorrectionMode ? 'Publish Official Correction' : 'Edit Announcement') : 'Publish New Verified Announcement'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          {formErrors.length > 0 && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Please complete the required fields:</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5">
                {formErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {submitSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Announcement successfully saved and synchronized!</span>
            </div>
          )}

          {/* If Editing: Toggle Correction Mode */}
          {isEditing && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-900">
                  <input
                    type="checkbox"
                    checked={isCorrectionMode}
                    onChange={e => setIsCorrectionMode(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Mark as Official Correction (Displays "REVISED NOTICE" badge)</span>
                </label>
              </div>
              {isCorrectionMode && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Official Reason for Correction <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={correctionReason}
                    onChange={e => setCorrectionReason(e.target.value)}
                    placeholder="e.g. Extended estimated restoration time by 2 hours due to severe weather"
                    className="w-full p-2 bg-white border border-amber-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Category Selector */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Announcement Category <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('power')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  category === 'power'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Power Interruption</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('sea_travel')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  category === 'sea_travel'
                    ? 'bg-sky-50 border-sky-400 text-sky-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Anchor className="w-4 h-4 text-sky-600" />
                <span>Sea Travel Status</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('disaster')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  category === 'disaster'
                    ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Disaster Advisory</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="form-title" className="block text-slate-700 font-bold mb-1">
              Title / Subject <span className="text-rose-500">*</span>
            </label>
            <input
              id="form-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Temporary Suspension of Trips: Calatrava – Corcuera Route"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Status Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="form-status" className="block text-slate-700 font-bold mb-1">
                Category Status <span className="text-rose-500">*</span>
              </label>
              <select
                id="form-status"
                value={status}
                onChange={e => setStatus(e.target.value as AnnouncementStatus)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500"
              >
                {category === 'power' && (
                  <>
                    <option value="unscheduled_outage">Unscheduled Power Outage</option>
                    <option value="planned_outage">Planned Interruption</option>
                    <option value="partial_restoration">Partial Restoration</option>
                    <option value="emergency_shutdown">Emergency Grid Shutdown</option>
                    <option value="normal">Normal Grid Operation</option>
                  </>
                )}
                {category === 'sea_travel' && (
                  <>
                    <option value="trips_suspended">Trips Suspended (Gale / Heavy Weather)</option>
                    <option value="trips_delayed">Trips Delayed</option>
                    <option value="resumed">Trips Resumed</option>
                    <option value="special_advisory">Special Marine Advisory</option>
                    <option value="normal">Normal Sea Travel</option>
                  </>
                )}
                {category === 'disaster' && (
                  <>
                    <option value="white_alert">Normal Condition (White Alert)</option>
                    <option value="blue_alert">Advisory / Monitoring (Blue Alert)</option>
                    <option value="red_alert">Severe Warning / Heightened (Red Alert)</option>
                    <option value="evacuation_ordered">Evacuation Ordered</option>
                  </>
                )}
              </select>
            </div>

            {/* Urgent Checkbox */}
            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={e => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-rose-700">Urgent Alert (Pinned to top & triggers notification)</span>
              </label>
            </div>
          </div>

          {/* Short Summary */}
          <div>
            <label htmlFor="form-summary" className="block text-slate-700 font-bold mb-1">
              Short Summary <span className="text-rose-500">*</span>
            </label>
            <input
              id="form-summary"
              type="text"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="1-2 sentences for resident push alerts and card preview"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Detailed Content */}
          <div>
            <label htmlFor="form-content" className="block text-slate-700 font-bold mb-1">
              Full Official Advisory Text <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="form-content"
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Provide complete breakdown, causes, emergency guidance, directives..."
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500 font-sans"
            />
          </div>

          {/* Advisory Picture Selection */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-slate-800 font-bold">
                Advisory Picture (Visual Banner)
              </label>
              {coverImageUrl && (
                <button
                  type="button"
                  onClick={() => setCoverImageUrl('')}
                  className="text-[11px] text-rose-600 hover:underline"
                >
                  Remove picture
                </button>
              )}
            </div>

            {/* Current Picture Preview */}
            {coverImageUrl ? (
              <div className="relative h-28 w-full rounded-lg overflow-hidden border border-slate-300">
                <img
                  src={coverImageUrl}
                  alt="Advisory banner preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                  Active Banner
                </span>
              </div>
            ) : (
              <div className="h-16 w-full rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">
                No picture selected (pick from presets below or add custom)
              </div>
            )}

            {/* Curated Presets for Current Category */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Suggested Pictures for {category === 'sea_travel' ? 'Sea Travel' : category === 'power' ? 'Power' : 'Disaster'}:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {ADVISORY_IMAGE_PRESETS.filter(p => p.category === category).map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCoverImageUrl(preset.url)}
                    className={`relative h-16 rounded-lg overflow-hidden border transition text-left cursor-pointer group ${
                      coverImageUrl === preset.url
                        ? 'ring-2 ring-sky-500 border-sky-500'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                      <span className="text-[9px] font-bold text-white leading-tight line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL or upload */}
            <div>
              <label className="block text-[11px] text-slate-600 font-medium mb-1">
                Or Custom Image URL:
              </label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={e => setCoverImageUrl(e.target.value)}
                placeholder="https://... image link"
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-[11px]"
              />
            </div>
          </div>

          {/* Affected Barangays Multi-Select */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Affected Corcuera Barangays <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg max-h-32 overflow-y-auto">
              {CORCUERA_BARANGAYS.map(b => {
                const isSelected = selectedBarangays.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleBarangayToggle(b)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category-Specific extra fields */}
          {category === 'power' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Affected Feeders / Circuits</label>
                <input
                  type="text"
                  value={affectedFeeders}
                  onChange={e => setAffectedFeeders(e.target.value)}
                  placeholder="e.g. Feeder 1 - North Simara"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Estimated Restoration Time</label>
                <input
                  type="text"
                  value={estimatedRestoration}
                  onChange={e => setEstimatedRestoration(e.target.value)}
                  placeholder="e.g. Today, approx. 17:00 PST"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          )}

          {category === 'sea_travel' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Maritime Routes Affected</label>
              <input
                type="text"
                value={affectedRoutes}
                onChange={e => setAffectedRoutes(e.target.value)}
                placeholder="e.g. Calatrava – Corcuera, San Agustin – Corcuera"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          )}

          {/* Mandatory Source Information Section */}
          <div className="p-3.5 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-300 rounded-xl space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-sky-950 text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <span>Mandatory Source Verification (Required by CORAL Protocol)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Issuing Organization / Source <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={sourceOrg}
                  onChange={e => setSourceOrg(e.target.value)}
                  placeholder="e.g. TIELCO Corcuera Sub-Office"
                  className="w-full p-2 bg-white border border-sky-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Source Issuance Date & Time <span className="text-rose-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={sourceIssuanceTime}
                  onChange={e => setSourceIssuanceTime(e.target.value)}
                  className="w-full p-2 bg-white border border-sky-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Official Document Reference</label>
                <input
                  type="text"
                  value={documentRef}
                  onChange={e => setDocumentRef(e.target.value)}
                  placeholder="e.g. PCG-SSCOR-ADV-2026-042 or Memo 2026-11"
                  className="w-full p-2 bg-white border border-sky-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Responsible Admin Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={publishedByAdmin}
                  onChange={e => setPublishedByAdmin(e.target.value)}
                  placeholder="e.g. Althea Fallore, EnP"
                  className="w-full p-2 bg-white border border-sky-200 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">
                  Verification Method / Channel on Record <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={verificationMethod}
                  onChange={e => setVerificationMethod(e.target.value)}
                  placeholder="e.g. Signed written memo received via municipal dispatch / Marine VHF Ch 16 direct radio confirmation"
                  className="w-full p-2 bg-white border border-sky-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? (isCorrectionMode ? 'Publish Correction' : 'Save Changes') : 'Publish Announcement'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
