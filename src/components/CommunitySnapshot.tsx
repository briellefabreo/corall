import { Zap, Anchor, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCoral } from '../context/CoralContext';
import { TRANSLATIONS } from '../utils/translations';

export const CommunitySnapshot: React.FC = () => {
  const { announcements, setSelectedCategory, language } = useCoral();
  const t = TRANSLATIONS[language];

  const activeItems = announcements.filter(a => !a.isArchived);

  // Power status
  const powerOutage = activeItems.find(
    a => a.category === 'power' && ['unscheduled_outage', 'planned_outage', 'emergency_shutdown'].includes(a.status)
  );

  // Sea travel status
  const seaSuspension = activeItems.find(
    a => a.category === 'sea_travel' && ['trips_suspended', 'trips_delayed'].includes(a.status)
  );

  // Disaster advisory status
  const disasterAlert = activeItems.find(
    a => a.category === 'disaster' && ['blue_alert', 'red_alert', 'evacuation_ordered'].includes(a.status)
  );

  return (
    <section className="mb-4" aria-label="Simara Island Status Overview">
      <div className="flex items-center justify-between mb-2 px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
          <span>{t.snapshotTitle}</span>
        </h2>
        <span className="text-[11px] text-slate-400">Official Municipal Feeds</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* 1. Power Status Card */}
        <button
          onClick={() => setSelectedCategory('power')}
          className={`p-3 rounded-xl border text-left transition relative overflow-hidden group shadow-xs cursor-pointer ${
            powerOutage
              ? 'bg-rose-50/80 border-rose-200 hover:border-rose-300'
              : 'bg-emerald-50/80 border-emerald-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  powerOutage ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{t.catPower}</p>
                <p
                  className={`text-sm font-bold leading-tight ${
                    powerOutage ? 'text-rose-900' : 'text-emerald-900'
                  }`}
                >
                  {powerOutage ? t.powerInterruption : t.powerNormal}
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
          </div>

          <p className="mt-2 text-xs text-slate-600 line-clamp-1">
            {powerOutage
              ? `${powerOutage.affectedBarangays.join(', ')}: ${powerOutage.title}`
              : 'NPC-SPUG & TIELCO feeders energized'}
          </p>
          <p className="mt-1 text-[10px] text-slate-400 font-medium">Source: TIELCO Corcuera</p>
        </button>

        {/* 2. Sea Travel Status Card */}
        <button
          onClick={() => setSelectedCategory('sea_travel')}
          className={`p-3 rounded-xl border text-left transition relative overflow-hidden group shadow-xs ${
            seaSuspension
              ? 'bg-amber-50/80 border-amber-200 hover:border-amber-300'
              : 'bg-sky-50/80 border-sky-200 hover:border-sky-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  seaSuspension ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
                }`}
              >
                <Anchor className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{t.catSeaTravel}</p>
                <p
                  className={`text-sm font-bold leading-tight ${
                    seaSuspension ? 'text-amber-900' : 'text-sky-900'
                  }`}
                >
                  {seaSuspension ? t.seaSuspended : t.seaNormal}
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
          </div>

          <p className="mt-2 text-xs text-slate-600 line-clamp-1">
            {seaSuspension
              ? `${seaSuspension.alertLevelBadge || 'Advisory'}: Calatrava & San Agustin routes`
              : 'Calatrava – Corcuera daylight banca routes open'}
          </p>
          <p className="mt-1 text-[10px] text-slate-400 font-medium">Source: PCG Sub-Station Corcuera</p>
        </button>

        {/* 3. Disaster Advisory Status Card */}
        <button
          onClick={() => setSelectedCategory('disaster')}
          className={`p-3 rounded-xl border text-left transition relative overflow-hidden group shadow-xs cursor-pointer ${
            disasterAlert
              ? 'bg-rose-50/80 border-rose-200 hover:border-rose-300'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${
                  disasterAlert ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{t.catDisaster}</p>
                <p
                  className={`text-sm font-bold leading-tight ${
                    disasterAlert ? 'text-rose-900' : 'text-slate-800'
                  }`}
                >
                  {disasterAlert ? t.disasterAlert : t.disasterLow}
                </p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
          </div>

          <p className="mt-2 text-xs text-slate-600 line-clamp-1">
            {disasterAlert
              ? disasterAlert.summary
              : 'Corcuera EOC on standby. No storm signals raised'}
          </p>
          <p className="mt-1 text-[10px] text-slate-400 font-medium">Source: MDRRMO Corcuera</p>
        </button>
      </div>
    </section>
  );
};
