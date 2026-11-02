import React, { useState } from 'react';
import { X, Flag, CheckCircle2, Send, PhoneCall } from 'lucide-react';

interface InaccuracyReportModalProps {
  onClose: () => void;
  announcementTitle?: string;
}

export const InaccuracyReportModal: React.FC<InaccuracyReportModalProps> = ({ onClose, announcementTitle }) => {
  const [reportText, setReportText] = useState('');
  const [residentContact, setResidentContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-xs"
      >
        <div className="px-5 py-4 border-b border-slate-200 bg-rose-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-rose-300" />
            <h2 id="report-modal-title" className="text-base font-bold">
              Report Inaccurate Announcement
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-rose-200 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {submitted ? (
            <div className="p-6 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-base font-bold text-slate-900">Report Transmitted</h3>
              <p className="text-slate-600 text-xs">
                Your verification report has been logged and forwarded to the Corcuera Municipal Operations Center duty officer.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-slate-600 leading-relaxed">
                Notice discrepancy in a published advisory? Tell our verification desk so administrators can contact the issuing agency (TIELCO, PCG, or MDRRMO) for immediate review.
              </p>

              {announcementTitle && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Referenced Notice:</span>
                  <p className="font-semibold text-slate-800 line-clamp-1">{announcementTitle}</p>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Observed Inaccuracy or Conflicting Info <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={reportText}
                  onChange={e => setReportText(e.target.value)}
                  placeholder="e.g. Power is already restored in Barangay Poblacion, or sea trip MB King Simara was cleared by PCG at 10:00 AM..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-rose-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Your Name or Contact Number (Optional)
                </label>
                <input
                  type="text"
                  value={residentContact}
                  onChange={e => setResidentContact(e.target.value)}
                  placeholder="e.g. 0917-xxx-xxxx (for verification callback)"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>

              <div className="p-2.5 bg-sky-50 rounded-lg border border-sky-100 flex items-center gap-2 text-sky-900 text-[11px]">
                <PhoneCall className="w-4 h-4 text-sky-700 shrink-0" />
                <span>Urgent? Call MDRRMO Operations directly at +63 919 876 5432.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Report</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
