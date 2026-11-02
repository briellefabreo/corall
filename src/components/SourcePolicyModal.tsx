import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle, AlertOctagon, PhoneCall, HelpCircle } from 'lucide-react';

interface SourcePolicyModalProps {
  onClose: () => void;
}

export const SourcePolicyModal: React.FC<SourcePolicyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col text-xs"
      >
        <div className="px-5 py-4 border-b border-slate-200 bg-sky-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
            <h2 id="policy-modal-title" className="text-base font-bold">
              CORAL Information Governance & Publishing Standards
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition"
            aria-label="Close policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-slate-700 leading-relaxed">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-sky-950 font-medium">
            CORAL is an official information dissemination platform for Corcuera (Simara Island), Romblon. It does not independently monitor electrical grids, vessels, or weather; all announcements are verified from identified authorized partners.
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>1. Approved Sources By Category</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>Power Interruption:</strong> Tablas Island Electric Cooperative Inc. (TIELCO) Corcuera Sub-Office & National Power Corporation (NPC-SPUG) Corcuera Diesel Power Plant.
              </li>
              <li>
                <strong>Sea Travel Status:</strong> Philippine Coast Guard (PCG) Sub-Station Corcuera, Coast Guard Station Romblon, MARINA, and licensed passenger banca operators.
              </li>
              <li>
                <strong>Disaster Advisories:</strong> Municipal Disaster Risk Reduction & Management Office (MDRRMO Corcuera), Office of the Municipal Mayor, and PAGASA bulletins.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>2. Verification & Publication Responsibilities</span>
            </h3>
            <p>
              Every announcement requires designated personnel accountability before going live. The system mandates recording:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Issuing organization name and official stamp/reference number.</li>
              <li>Source issuance timestamp (when the original bulletin was signed).</li>
              <li>Verification method (e.g. Marine VHF Channel 16 confirmation, written incident log, signed Executive Memorandum).</li>
              <li>Full name and institutional role of the publishing administrator.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>3. Handling Conflicting or Outdated Information</span>
            </h3>
            <p>
              When conditions change (e.g., vessel trips resumed earlier than expected or line repairs delayed), administrators MUST NOT quietly overwrite historical text. They are required to use the <strong>"Publish Official Correction"</strong> workflow:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Applies a visible yellow <strong>"OFFICIAL CORRECTION"</strong> banner on the announcement.</li>
              <li>States the explicit reason for the modification (e.g. weather delay).</li>
              <li>Appends the modification event to the public revision history timeline.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-sky-600" />
              <span>4. Public Inaccuracy Reporting Channel</span>
            </h3>
            <p>
              If a resident observes an inaccuracy or conflicting report, they may report directly to the Municipal Operations Center at:
            </p>
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 font-mono text-[11px] space-y-0.5">
              <p>Email: verification@corcuera.gov.ph / coral.simara@gmail.com</p>
              <p>Hotline: +63 919 876 5432 (MDRRMO Corcuera Duty Officer)</p>
              <p>Radio: VHF 145.550 MHz (Simara Emergency Net)</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-bold"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
