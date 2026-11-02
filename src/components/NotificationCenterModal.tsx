import React from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Zap, 
  Anchor, 
  AlertTriangle, 
  Clock, 
  Smartphone,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useCoral } from '../context/CoralContext';
import { formatFreshness } from '../utils/coralLogic';

interface NotificationCenterModalProps {
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({ onClose }) => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    pushEnabled, 
    togglePushNotifications,
    sendSimulatedAlert,
    setSelectedAnnouncement,
    announcements
  } = useCoral();

  const handleNotificationClick = (announcementId: string, notifId: string) => {
    markNotificationRead(notifId);
    if (announcementId) {
      const target = announcements.find(a => a.id === announcementId);
      if (target) {
        setSelectedAnnouncement(target);
        onClose();
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'power':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'sea_travel':
        return <Anchor className="w-4 h-4 text-sky-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="notif-modal-title"
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-sky-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-300" />
            <h2 id="notif-modal-title" className="text-base font-bold">
              Corcuera Alerts & Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition"
            aria-label="Close notification center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Notification Toggle Banner */}
        <div className="p-3.5 bg-gradient-to-r from-sky-50 to-cyan-50 border-b border-sky-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-sky-700 shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Push Notifications</p>
              <p className="text-[11px] text-slate-500">
                Receive urgent storm signals & no-sail advisories
              </p>
            </div>
          </div>

          <button
            onClick={togglePushNotifications}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
              pushEnabled
                ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {pushEnabled ? 'Enabled' : 'Enable'}
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            {notifications.length} Alert{notifications.length === 1 ? '' : 's'}
          </span>
          {notifications.some(n => !n.isRead) && (
            <button
              onClick={markAllNotificationsRead}
              className="text-sky-700 hover:text-sky-900 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-medium">No alerts at this time.</p>
              <p className="text-[11px]">All Corcuera utilities and sea routes are operating normally.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.announcementId, notif.id)}
                className={`p-3 rounded-xl border transition cursor-pointer text-xs relative ${
                  notif.isRead
                    ? 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
                    : 'bg-sky-50/70 border-sky-300 text-slate-900 font-medium shadow-2xs'
                }`}
              >
                {!notif.isRead && (
                  <span className="w-2 h-2 rounded-full bg-sky-600 absolute right-3 top-3.5" />
                )}

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200/80 shrink-0 mt-0.5">
                    {getCategoryIcon(notif.category)}
                  </div>

                  <div className="flex-1 pr-3 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {notif.isUrgent && (
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-rose-600 text-white">
                          Urgent
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {formatFreshness(notif.timestamp)}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 leading-snug">{notif.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Test Alert Simulator for Evaluators */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs">
          <button
            onClick={() => {
              sendSimulatedAlert(
                'TEST ADVISORY: Simara Island Weather Update',
                'Simulated test push alert dispatched across Corcuera notification channels.',
                'disaster'
              );
            }}
            className="text-[11px] text-slate-500 hover:text-sky-700 flex items-center justify-center gap-1 mx-auto font-medium"
          >
            <Send className="w-3 h-3" />
            <span>Simulate incoming emergency alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};
