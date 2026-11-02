import React from 'react';
import { 
  Zap, 
  Anchor, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Paperclip, 
  AlertCircle, 
  ChevronRight,
  History,
  FileCheck
} from 'lucide-react';
import { Announcement } from '../types/coral';
import { getStatusDisplay, formatFreshness } from '../utils/coralLogic';
import { useCoral } from '../context/CoralContext';

interface AnnouncementCardProps {
  announcement: Announcement;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const { setSelectedAnnouncement } = useCoral();
  const statusMeta = getStatusDisplay(announcement.category, announcement.status);

  const getCategoryMeta = (cat: Announcement['category']) => {
    switch (cat) {
      case 'power':
        return { 
          label: 'Power Interruption', 
          icon: Zap, 
          iconBg: 'bg-amber-500 text-white',
          fallbackImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
        };
      case 'sea_travel':
        return { 
          label: 'Sea Travel Status', 
          icon: Anchor, 
          iconBg: 'bg-sky-600 text-white',
          fallbackImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80'
        };
      case 'disaster':
        return { 
          label: 'Disaster Advisory', 
          icon: AlertTriangle, 
          iconBg: 'bg-rose-600 text-white',
          fallbackImage: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=800&q=80'
        };
    }
  };

  const categoryMeta = getCategoryMeta(announcement.category);
  const CategoryIcon = categoryMeta.icon;
  const displayImage = announcement.coverImageUrl || categoryMeta.fallbackImage;

  return (
    <article 
      onClick={() => setSelectedAnnouncement(announcement)}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-md transition duration-150 mb-3.5 cursor-pointer group relative overflow-hidden flex flex-col"
    >
      {/* Visual Advisory Banner Picture */}
      <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-slate-900 shrink-0">
        <img
          src={displayImage}
          alt={announcement.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90"
          loading="lazy"
        />
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Top Badges overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Category Chip */}
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${categoryMeta.iconBg}`}>
              <CategoryIcon className="w-3 h-3" />
              <span>{categoryMeta.label}</span>
            </span>

            {/* Status Chip */}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-xs">
              {statusMeta.label}
            </span>

            {/* Urgent Chip */}
            {announcement.isUrgent && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-600 text-white tracking-wider uppercase animate-pulse shadow-xs">
                Urgent
              </span>
            )}
          </div>

          {/* Time Badge */}
          <div className="flex items-center gap-1 text-[10px] text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full font-medium">
            <Clock className="w-3 h-3" />
            <span>{formatFreshness(announcement.publishedAt)}</span>
          </div>
        </div>

        {/* Bottom Banner Title Overlay on Image */}
        <div className="absolute bottom-2 left-3 right-3 text-white z-10">
          {announcement.isCorrection && (
            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.2 rounded bg-amber-500 text-white shadow-xs mb-1">
              <AlertCircle className="w-3 h-3" />
              <span>OFFICIAL CORRECTION</span>
            </span>
          )}
          <h3 className="text-sm sm:text-base font-bold leading-snug drop-shadow-sm text-white line-clamp-2">
            {announcement.title}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 space-y-2.5">
        {/* Summary text */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {announcement.summary}
        </p>

        {/* Affected Area / Feeders / Routes */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <div className="flex items-center gap-1 text-slate-500 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700">Affected:</span>
            <span className="text-slate-600 truncate max-w-[190px]">
              {announcement.affectedBarangays.join(', ')}
            </span>
          </div>

          {announcement.affectedRoutes && announcement.affectedRoutes.length > 0 && (
            <div className="flex items-center gap-1 text-slate-500 bg-sky-50/70 border border-sky-200/70 px-2 py-0.5 rounded-md">
              <span className="font-semibold text-sky-800">Routes:</span>
              <span className="text-sky-700">{announcement.affectedRoutes.join(', ')}</span>
            </div>
          )}

          {announcement.estimatedRestoration && (
            <div className="flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-semibold">
              <span>Restoration:</span>
              <span>{announcement.estimatedRestoration}</span>
            </div>
          )}
        </div>

        {/* Verified Source Footer Box */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 min-w-0">
            <FileCheck className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 mr-1">Source:</span>
              <strong className="text-slate-800 font-semibold">{announcement.source.organization}</strong>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Verified Source" />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {announcement.attachments && announcement.attachments.length > 0 && (
              <span className="flex items-center gap-0.5 text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                <Paperclip className="w-3 h-3" />
                <span>{announcement.attachments.length}</span>
              </span>
            )}

            {announcement.revisionHistory && announcement.revisionHistory.length > 1 && (
              <span className="flex items-center gap-0.5 text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]" title="Revision history available">
                <History className="w-3 h-3" />
                <span>{announcement.revisionHistory.length}</span>
              </span>
            )}

            <span className="text-sky-600 group-hover:translate-x-0.5 transition flex items-center gap-0.5 font-bold">
              <span>Read</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
