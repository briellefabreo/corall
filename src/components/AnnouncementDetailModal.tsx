import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Anchor, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Paperclip, 
  AlertCircle, 
  Share2, 
  Flag, 
  History, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Edit3, 
  Archive, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { Announcement, AnnouncementStatus } from '../types/coral';
import { getStatusDisplay, formatFreshness } from '../utils/coralLogic';
import { useCoral } from '../context/CoralContext';

interface AnnouncementDetailModalProps {
  announcement: Announcement;
  onClose: () => void;
}

export const AnnouncementDetailModal: React.FC<AnnouncementDetailModalProps> = ({ announcement, onClose }) => {
  const { 
    currentAdmin, 
    isAdmin, 
    setAnnouncementToEdit, 
    setIsCreateModalOpen,
    archiveAnnouncement,
    restoreAnnouncement,
    quickChangeStatus,
    setIsReportModalOpen
  } = useCoral();

  const [copied, setCopied] = useState(false);
  const [selectedAttachmentUrl, setSelectedAttachmentUrl] = useState<string | null>(null);
  const [showStatusChanger, setShowStatusChanger] = useState(false);

  const statusMeta = getStatusDisplay(announcement.category, announcement.status);

  const getCategoryMeta = (cat: Announcement['category']) => {
    switch (cat) {
      case 'power':
        return { label: 'Power Interruption Information', icon: Zap, color: 'text-amber-600 bg-amber-50' };
      case 'sea_travel':
        return { label: 'Sea Travel Status Information', icon: Anchor, color: 'text-sky-600 bg-sky-50' };
      case 'disaster':
        return { label: 'Disaster Risk Advisory', icon: AlertTriangle, color: 'text-rose-600 bg-rose-50' };
    }
  };

  const categoryMeta = getCategoryMeta(announcement.category);
  const CategoryIcon = categoryMeta.icon;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    setAnnouncementToEdit(announcement);
    setIsCreateModalOpen(true);
    onClose();
  };

  const handleArchiveToggle = () => {
    if (announcement.isArchived) {
      restoreAnnouncement(announcement.id);
    } else {
      if (confirm('Archive this announcement? It will be moved from the public active feed.')) {
        archiveAnnouncement(announcement.id, 'Archived by Administrator');
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg ${categoryMeta.color}`}>
              <CategoryIcon className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {categoryMeta.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy link to announcement"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
              aria-label="Copy announcement link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Status and Correction Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusMeta.badgeClass}`}>
                {statusMeta.label}
              </span>

              {announcement.isCorrection && (
                <span className="flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>OFFICIAL CORRECTION</span>
                </span>
              )}

              {announcement.isArchived && (
                <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium">
                  Archived Record
                </span>
              )}
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Published: {new Date(announcement.publishedAt).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
          </div>

          {/* Correction Notice Box if applicable */}
          {announcement.isCorrection && announcement.correctionReason && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">Official Revision Note:</p>
                <p className="mt-0.5">{announcement.correctionReason}</p>
              </div>
            </div>
          )}

          {/* Featured Advisory Picture */}
          {announcement.coverImageUrl && (
            <div className="relative w-full h-48 sm:h-60 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-slate-900">
              <img
                src={announcement.coverImageUrl}
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                Verified Incident Photo
              </div>
            </div>
          )}

          {/* Title */}
          <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {announcement.title}
          </h2>

          {/* Affected Locations / Routes */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Affected Barangays:</span>
                <span className="ml-1 text-slate-800">
                  {announcement.affectedBarangays.join(', ')}
                </span>
              </div>
            </div>

            {announcement.affectedRoutes && announcement.affectedRoutes.length > 0 && (
              <div className="flex items-start gap-2">
                <Anchor className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-700">Maritime Routes:</span>
                  <span className="ml-1 text-slate-800">{announcement.affectedRoutes.join(', ')}</span>
                </div>
              </div>
            )}

            {announcement.affectedFeeders && announcement.affectedFeeders.length > 0 && (
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-700">Power Feeder Circuit:</span>
                  <span className="ml-1 text-slate-800">{announcement.affectedFeeders.join(', ')}</span>
                </div>
              </div>
            )}

            {announcement.estimatedRestoration && (
              <div className="flex items-start gap-2 text-amber-900 font-semibold bg-amber-100/60 p-2 rounded-lg">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span>Estimated Restoration / Resumption:</span>
                  <span className="ml-1.5">{announcement.estimatedRestoration}</span>
                </div>
              </div>
            )}
          </div>

          {/* Full Announcement Content */}
          <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-white border border-slate-100 p-4 rounded-xl shadow-2xs">
            {announcement.content}
          </div>

          {/* Mandatory Verified Source Information Card */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-200 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <span>Verified Information Source</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Issuing Organization / Source:</span>
                <span className="font-semibold text-slate-900">{announcement.source.organization}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Source Issuance Time:</span>
                <span className="font-semibold text-slate-900">
                  {new Date(announcement.source.issuanceTime).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>

              {announcement.source.documentRef && (
                <div>
                  <span className="text-slate-500 block">Official Document Reference:</span>
                  <span className="font-mono text-slate-800 bg-white px-2 py-0.5 rounded border border-sky-200/80 inline-block">
                    {announcement.source.documentRef}
                  </span>
                </div>
              )}

              <div>
                <span className="text-slate-500 block">Publishing Administrator:</span>
                <span className="font-semibold text-slate-900">
                  {announcement.source.publishedByAdmin}
                  {announcement.source.adminRole && (
                    <span className="text-[11px] text-slate-500 block font-normal">{announcement.source.adminRole}</span>
                  )}
                </span>
              </div>

              <div className="sm:col-span-2 bg-white/80 p-2.5 rounded-lg border border-sky-100">
                <span className="text-slate-500 font-medium block">Verification Method On Record:</span>
                <span className="text-slate-700 italic">{announcement.source.verificationMethod}</span>
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                <span>Official Attachments ({announcement.attachments.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {announcement.attachments.map(att => (
                  <div
                    key={att.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-5 h-5 text-sky-600 shrink-0" />
                      <div className="truncate">
                        <p className="font-medium text-slate-800 truncate">{att.name}</p>
                        <p className="text-[10px] text-slate-400">{att.size} • {att.type.toUpperCase()}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedAttachmentUrl(att.url)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-sky-700 font-medium text-xs shrink-0"
                    >
                      Preview
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revision History & Transparency Log */}
          {announcement.revisionHistory && announcement.revisionHistory.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>Announcement Revision History</span>
              </h3>

              <div className="border-l-2 border-sky-200 pl-3 ml-2 space-y-3 text-xs">
                {announcement.revisionHistory.map((hist, idx) => (
                  <div key={hist.id || idx} className="relative">
                    <span className="w-2 h-2 rounded-full bg-sky-500 absolute -left-[17px] top-1.5" />
                    <div className="text-[11px] text-slate-400 font-medium">
                      {new Date(hist.timestamp).toLocaleString('en-PH', { dateStyle: 'short', timeStyle: 'short' })}
                      <span className="mx-1">•</span>
                      <strong className="text-slate-600">{hist.adminName}</strong>
                    </div>
                    <p className="font-semibold text-slate-800">{hist.summary}</p>
                    {hist.note && <p className="text-slate-500 text-[11px]">{hist.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inaccuracy Reporting Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1.5 font-medium underline cursor-pointer"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report inaccurate published information to Corcuera Verification Desk</span>
            </button>
          </div>
        </div>

        {/* Admin Action Footer (if authenticated) */}
        {isAdmin && (
          <div className="p-3 bg-amber-50/80 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <span className="text-xs font-semibold text-amber-900">
              Admin Actions ({currentAdmin?.name}):
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-medium flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit / Correct</span>
              </button>

              <button
                onClick={handleArchiveToggle}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-medium flex items-center gap-1"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>{announcement.isArchived ? 'Restore' : 'Archive'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Attachment Preview Modal */}
      {selectedAttachmentUrl && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800">Official Document Preview</h4>
              <button
                onClick={() => setSelectedAttachmentUrl(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={selectedAttachmentUrl}
              alt="Attachment inspection"
              className="w-full h-64 object-cover rounded-xl border border-slate-200"
            />
            <p className="text-xs text-slate-500 text-center">
              Verified document stamp on file with Corcuera Municipal Operations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
