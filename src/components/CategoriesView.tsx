import React from 'react';
import { Zap, Anchor, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCoral } from '../context/CoralContext';

export const CategoriesView: React.FC = () => {
  const { setSelectedCategory, setActiveTab, announcements } = useCoral();

  const powerCount = announcements.filter(a => a.category === 'power' && !a.isArchived).length;
  const seaCount = announcements.filter(a => a.category === 'sea_travel' && !a.isArchived).length;
  const disasterCount = announcements.filter(a => a.category === 'disaster' && !a.isArchived).length;

  const handleSelectCategory = (cat: 'power' | 'sea_travel' | 'disaster') => {
    setSelectedCategory(cat);
    setActiveTab('feed');
  };

  return (
    <div className="space-y-4 p-1 text-xs">
      <div className="bg-sky-900 text-white p-4 rounded-2xl shadow-sm">
        <h2 className="text-base font-bold">Three Core Announcement Categories</h2>
        <p className="text-sky-200 text-xs mt-1 leading-relaxed">
          CORAL provides Corcuera residents with organized, verified access to information published by designated local authorities.
        </p>
      </div>

      <div className="space-y-3">
        {/* Category 1: Power */}
        <div 
          onClick={() => handleSelectCategory('power')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:border-amber-400 transition cursor-pointer group space-y-2"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition">
                  1. Power Interruption Information
                </h3>
                <p className="text-[11px] text-slate-500">
                  TIELCO Corcuera Sub-Office & NPC-SPUG Plant
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              {powerCount} active
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed text-xs">
            Comprehensive updates on scheduled preventive maintenance, unscheduled blackouts, fallen wire hazards, feeder line clearing along Feeder 1 & Feeder 2 circuits, and verified restoration timelines.
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[11px]">
            <span>Feeders: Feeder 1 (North Simara), Feeder 2 (Poblacion Loop)</span>
            <span className="text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition">
              <span>View Notices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Category 2: Sea Travel */}
        <div 
          onClick={() => handleSelectCategory('sea_travel')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:border-sky-400 transition cursor-pointer group space-y-2"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800">
                <Anchor className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-800 transition">
                  2. Sea Travel Status Information
                </h3>
                <p className="text-[11px] text-slate-500">
                  Philippine Coast Guard Sub-Station Corcuera & CGS Romblon
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
              {seaCount} active
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed text-xs">
            Timely travel status across crucial island sea routes: Calatrava – Corcuera, San Agustin – Corcuera, and Romblon Island. Displays gale warnings, vessel trip suspensions, wave height alerts, and official Coast Guard resumption clearances.
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[11px]">
            <span>Channels: Marine VHF Channel 16 & CGS Romblon Bulletins</span>
            <span className="text-sky-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition">
              <span>View Notices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Category 3: Disaster */}
        <div 
          onClick={() => handleSelectCategory('disaster')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:border-rose-400 transition cursor-pointer group space-y-2"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-800">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-800 transition">
                  3. Disaster Advisories
                </h3>
                <p className="text-[11px] text-slate-500">
                  MDRRMO Corcuera (Office of the Municipal Mayor)
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
              {disasterCount} active
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed text-xs">
            Municipal Disaster Risk Reduction directives, PAGASA Tropical Cyclone Wind Signals (TCWS #1 to #5), storm surge alerts, designated evacuation centers, and emergency relief distribution points for all 15 barangays.
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[11px]">
            <span>Alert Levels: White Alert (Normal), Blue (Monitoring), Red (Evacuate)</span>
            <span className="text-rose-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition">
              <span>View Notices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
