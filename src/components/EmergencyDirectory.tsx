import React from 'react';
import { 
  Phone, 
  Radio, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Zap, 
  Anchor, 
  AlertTriangle,
  Building2
} from 'lucide-react';
import { CORCUERA_EMERGENCY_CONTACTS } from '../data/seedData';
import { useCoral } from '../context/CoralContext';

export const EmergencyDirectory: React.FC = () => {
  const { setIsSourcePolicyModalOpen } = useCoral();

  const getOrgIcon = (org: string) => {
    if (org.includes('TIELCO')) return <Zap className="w-5 h-5 text-amber-600" />;
    if (org.includes('Coast Guard')) return <Anchor className="w-5 h-5 text-sky-600" />;
    if (org.includes('MDRRMO')) return <AlertTriangle className="w-5 h-5 text-rose-600" />;
    return <Building2 className="w-5 h-5 text-slate-600" />;
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-900 to-cyan-900 text-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-cyan-300" />
          <h2 className="text-base font-bold">Corcuera Official Contacts & Responders</h2>
        </div>
        <p className="text-sky-200 text-xs leading-relaxed">
          Direct communication channels with verified publishing partners in the Municipality of Corcuera (Simara Island), Romblon.
        </p>

        <button
          onClick={() => setIsSourcePolicyModalOpen(true)}
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
        >
          <span>View Source Verification Protocol</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* VHF Radio Notice for Island Residents */}
      <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3">
        <Radio className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-950">Maritime & Emergency Radio Frequencies</h4>
          <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
            During cellular network outages or extreme typhoon conditions on Simara Island, monitor <strong>Marine VHF Channel 16 (156.800 MHz)</strong> for Philippine Coast Guard advisories or <strong>145.550 MHz</strong> for Corcuera MDRRMO Operations Center.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {CORCUERA_EMERGENCY_CONTACTS.map(contact => (
          <div
            key={contact.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
                {getOrgIcon(contact.organization)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{contact.organization}</h3>
                <p className="text-slate-500 text-[11px]">{contact.role}</p>
                <p className="font-medium text-slate-700 mt-0.5">{contact.name}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-slate-600 text-[11px]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <a
                  href={`tel:${contact.contactNumber}`}
                  className="font-bold text-sky-700 hover:underline"
                >
                  {contact.contactNumber}
                </a>
                {contact.secondaryNumber && (
                  <span className="text-slate-400">/ {contact.secondaryNumber}</span>
                )}
              </div>

              {contact.channel && (
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-mono text-slate-800">{contact.channel}</span>
                </div>
              )}

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{contact.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{contact.operatingHours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
