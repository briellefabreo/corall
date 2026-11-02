import { Search, X, Zap, Anchor, AlertTriangle, Layers, MapPin, Archive } from 'lucide-react';
import { useCoral } from '../context/CoralContext';
import { CORCUERA_BARANGAYS } from '../data/seedData';
import { TRANSLATIONS } from '../utils/translations';

export const FilterBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedBarangay,
    setSelectedBarangay,
    showArchived,
    setShowArchived,
    filteredAnnouncements,
    language,
  } = useCoral();

  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: t.catAll, icon: Layers },
    { id: 'power', label: t.catPower, icon: Zap },
    { id: 'sea_travel', label: t.catSeaTravel, icon: Anchor },
    { id: 'disaster', label: t.catDisaster, icon: AlertTriangle },
  ];

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedBarangay !== 'all' ||
    showArchived;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedBarangay('all');
    setShowArchived(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs mb-4 space-y-3">
      {/* Search Input */}
      <div className="relative">
        <label htmlFor="announcement-search" className="sr-only">
          Search announcements, barangays, or routes
        </label>
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          id="announcement-search"
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-9 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Clear search text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary filter dropdowns row */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
        {/* Barangay dropdown */}
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <label htmlFor="barangay-select" className="sr-only">
            Filter by Corcuera Barangay
          </label>
          <select
            id="barangay-select"
            value={selectedBarangay}
            onChange={e => setSelectedBarangay(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="all">All Barangays (Corcuera)</option>
            {CORCUERA_BARANGAYS.filter(b => b !== 'All 15 Barangays').map(b => (
              <option key={b} value={b}>
                Brgy. {b}
              </option>
            ))}
          </select>
        </div>

        {/* Category-specific status dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="status-select" className="sr-only">
            Filter by Status
          </label>
          <select
            id="status-select"
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="all">All Statuses</option>
            {selectedCategory === 'power' || selectedCategory === 'all' ? (
              <optgroup label="Power Grid">
                <option value="normal">Normal Grid Operation</option>
                <option value="planned_outage">Planned Interruption</option>
                <option value="unscheduled_outage">Unscheduled Outage</option>
                <option value="partial_restoration">Partial Restoration</option>
              </optgroup>
            ) : null}
            {selectedCategory === 'sea_travel' || selectedCategory === 'all' ? (
              <optgroup label="Sea Travel">
                <option value="normal">Normal Sea Travel</option>
                <option value="trips_suspended">Trips Suspended</option>
                <option value="trips_delayed">Trips Delayed</option>
                <option value="resumed">Trips Resumed</option>
              </optgroup>
            ) : null}
            {selectedCategory === 'disaster' || selectedCategory === 'all' ? (
              <optgroup label="Disaster">
                <option value="white_alert">Normal (White Alert)</option>
                <option value="blue_alert">Advisory (Blue Alert)</option>
                <option value="red_alert">Severe (Red Alert)</option>
              </optgroup>
            ) : null}
          </select>
        </div>

        {/* Archived Toggle */}
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition cursor-pointer ml-auto ${
            showArchived
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Archive className="w-3.5 h-3.5" />
          <span>{showArchived ? 'Showing Archived' : 'Show Archived'}</span>
        </button>

        {/* Reset Filter Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-sky-600 hover:text-sky-800 underline font-medium cursor-pointer"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span>
          Showing <strong>{filteredAnnouncements.length}</strong> {showArchived ? 'archived' : 'published'} announcement{filteredAnnouncements.length === 1 ? '' : 's'}
        </span>
        {hasActiveFilters && (
          <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[10px] font-medium">
            Filtered View
          </span>
        )}
      </div>
    </div>
  );
};
