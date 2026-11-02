import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LogIn, 
  LogOut, 
  PlusCircle, 
  Edit3, 
  Archive, 
  RefreshCw, 
  AlertCircle, 
  FileText, 
  ListFilter, 
  Clock, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useCoral } from '../context/CoralContext';
import { Announcement, AnnouncementStatus } from '../types/coral';
import { getStatusDisplay, formatFreshness } from '../utils/coralLogic';

export const AdminPortal: React.FC = () => {
  const { 
    currentAdmin, 
    isAdmin, 
    loginAdmin, 
    logoutAdmin,
    announcements,
    setIsCreateModalOpen,
    setAnnouncementToEdit,
    archiveAnnouncement,
    restoreAnnouncement,
    quickChangeStatus,
    auditLogs
  } = useCoral();

  const [activeAdminTab, setActiveAdminTab] = useState<'announcements' | 'audit_logs'>('announcements');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError('Mangyaring ilagay ang parehong Officer Username at Password.');
      return;
    }

    const result = loginAdmin(usernameInput.trim(), passwordInput.trim());
    if (!result.success) {
      setLoginError(result.message || 'Maling username o password. Hindi pinahihintulutan ang pag-access.');
      return;
    }

    setUsernameInput('');
    setPasswordInput('');
    setLoginError('');
  };

  const handleEdit = (ann: Announcement) => {
    setAnnouncementToEdit(ann);
    setIsCreateModalOpen(true);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-lg text-xs space-y-4">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-sky-100 text-sky-800 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">CORAL Administrator Sign-In</h2>
          <p className="text-slate-500 text-xs">
            Eksklusibong portal para sa mga lehitimong opisyal ng Corcuera (MDRRMO, TIELCO, Coast Guard).
          </p>
        </div>

        {/* Security Warning Notice */}
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Pribadong Access (Walang Public Sign-Up)</span>
          </p>
          <p className="text-[11px] leading-relaxed text-amber-800">
            Ang mga residente ay maaari lamang magbasa ng mga anunsyo. Tanging mga awtorisadong opisyal na may ibinigay na secret password ang maaaring mag-publish o mag-edit ng mga ulat.
          </p>
        </div>

        {loginError && (
          <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-lg text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleManualLogin} className="space-y-3.5">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Officer Username / ID
            </label>
            <input
              type="text"
              required
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value)}
              placeholder="Halimbawa: mdrrmo_admin o tielco_corcuera"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Secret Password / Security PIN
            </label>
            <input
              type="password"
              required
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Mag-Sign In Bilang Administrator</span>
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            Ang mga credentials ay naka-configure sa <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-600">src/data/adminCredentials.ts</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-xs">
      {/* Officer Welcome Header */}
      <div className="p-4 bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-900 text-white rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold">{currentAdmin?.name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                Authorized Session
              </span>
            </div>
            <p className="text-sky-200 text-[11px]">{currentAdmin?.role} • {currentAdmin?.organization}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAnnouncementToEdit(null);
              setIsCreateModalOpen(true);
            }}
            className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-sky-950 font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
            title="Sign Out"
            aria-label="Sign out of admin session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveAdminTab('announcements')}
          className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
            activeAdminTab === 'announcements'
              ? 'bg-sky-700 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Manage Announcements ({announcements.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('audit_logs')}
          className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
            activeAdminTab === 'audit_logs'
              ? 'bg-sky-700 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Activity & Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* Announcements Tab Content */}
      {activeAdminTab === 'announcements' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2.5">
            {announcements.map(ann => {
              const statusMeta = getStatusDisplay(ann.category, ann.status);
              return (
                <div
                  key={ann.id}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-2 hover:border-slate-300 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {ann.category.replace('_', ' ')}
                      </span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusMeta.badgeClass}`}>
                        {statusMeta.label}
                      </span>
                      {ann.isCorrection && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white">
                          CORRECTED
                        </span>
                      )}
                      {ann.isArchived && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                          ARCHIVED
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-400">
                      {formatFreshness(ann.updatedAt)}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{ann.title}</h3>
                  <p className="text-slate-600 line-clamp-1">{ann.summary}</p>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500">
                      Source: <strong className="text-slate-700">{ann.source.organization}</strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(ann)}
                        className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit / Correct</span>
                      </button>

                      {/* Archive / Restore Button */}
                      <button
                        onClick={() => (ann.isArchived ? restoreAnnouncement(ann.id) : archiveAnnouncement(ann.id))}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Archive className="w-3 h-3" />
                        <span>{ann.isArchived ? 'Restore' : 'Archive'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity Audit Logs Tab */}
      {activeAdminTab === 'audit_logs' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              <span>Immutable Administrative Audit Trail</span>
            </h3>
            <span className="text-[11px] text-slate-400">Tamper-evident system log</span>
          </div>

          <div className="space-y-2">
            {auditLogs.map(log => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 font-mono text-[11px]"
              >
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-sky-800">[{log.action}]</span>
                  <span>{new Date(log.timestamp).toLocaleString('en-PH')}</span>
                </div>
                <p className="font-sans font-semibold text-slate-900">{log.announcementTitle}</p>
                <p className="font-sans text-slate-600 text-[11px]">{log.details}</p>
                <p className="font-sans text-[10px] text-slate-400">By: {log.adminName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
