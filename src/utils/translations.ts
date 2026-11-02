import { Language } from '../types/coral';

export interface Translations {
  appName: string;
  appTagline: string;
  locationTag: string;
  
  // Navigation tabs
  tabFeed: string;
  tabCategories: string;
  tabDirectory: string;
  tabAdmin: string;
  
  // Header & Status
  liveOnline: string;
  offlineCached: string;
  synced: string;
  sourcesPolicy: string;
  settings: string;
  wideView: string;
  mobileView: string;
  offlineBanner: string;
  retryConnection: string;
  
  // Categories
  catPower: string;
  catSeaTravel: string;
  catDisaster: string;
  catAll: string;
  
  // Search & Filters
  searchPlaceholder: string;
  filterAllBarangays: string;
  filterArchived: string;
  filterActiveOnly: string;
  clearFilters: string;
  noAnnouncementsFound: string;
  noAnnouncementsDesc: string;
  
  // Card elements
  urgentBadge: string;
  officialCorrection: string;
  verifiedSource: string;
  viewDetails: string;
  affectedArea: string;
  published: string;
  issuingOffice: string;
  
  // Community Snapshot
  snapshotTitle: string;
  snapshotSubtitle: string;
  powerNormal: string;
  powerInterruption: string;
  seaNormal: string;
  seaSuspended: string;
  disasterLow: string;
  disasterAlert: string;
  
  // Settings & Accessibility
  settingsTitle: string;
  languageSelect: string;
  accessibilityOptions: string;
  fontSize: string;
  fontNormal: string;
  fontLarge: string;
  fontXLarge: string;
  highContrast: string;
  highContrastDesc: string;
  soundAlerts: string;
  soundAlertsDesc: string;
  testSound: string;
  reducedMotion: string;
  reducedMotionDesc: string;
  replaySplash: string;
  replaySplashDesc: string;
  storageDiagnostics: string;
  cachedCount: string;
  clearCache: string;
  clearCacheConfirm: string;
  
  // Onboarding
  welcomeTitle: string;
  welcomeSubtitle: string;
  chooseLanguage: string;
  setupPreferences: string;
  getStarted: string;
  skip: string;
  residentAccessNote: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'CORAL',
    appTagline: 'Corcuera Community Reports & Alerts Link',
    locationTag: 'Simara Island',
    
    tabFeed: 'Reports Feed',
    tabCategories: 'Categories',
    tabDirectory: 'Directory',
    tabAdmin: 'Admin Portal',
    
    liveOnline: 'Live Online',
    offlineCached: 'Offline (Cached Data)',
    synced: 'Synced',
    sourcesPolicy: 'Sources Policy',
    settings: 'Settings',
    wideView: 'Wide View',
    mobileView: 'Mobile View',
    offlineBanner: 'Offline Mode — Serving previously downloaded Corcuera announcements.',
    retryConnection: 'Retry Connection',
    
    catPower: 'Power Interruption',
    catSeaTravel: 'Sea Travel Status',
    catDisaster: 'Disaster Advisory',
    catAll: 'All Categories',
    
    searchPlaceholder: 'Search advisories, barangays, advisories...',
    filterAllBarangays: 'All 15 Barangays',
    filterArchived: 'Archived Reports',
    filterActiveOnly: 'Active Only',
    clearFilters: 'Clear All Filters',
    noAnnouncementsFound: 'No Announcements Found',
    noAnnouncementsDesc: 'No published reports match your current filters or search term in Corcuera.',
    
    urgentBadge: 'URGENT',
    officialCorrection: 'Official Correction',
    verifiedSource: 'Verified Source',
    viewDetails: 'View Details',
    affectedArea: 'Affected',
    published: 'Published',
    issuingOffice: 'Issuing Office',
    
    snapshotTitle: 'Simara Island Status Overview',
    snapshotSubtitle: 'Real-time verified status across three essential community services',
    powerNormal: 'Power Grid Normal',
    powerInterruption: 'Active Outage Reported',
    seaNormal: 'Sea Trips Cleared',
    seaSuspended: 'Trips Suspended (No Sail)',
    disasterLow: 'Normal / White Alert',
    disasterAlert: 'Advisory / Alert Active',
    
    settingsTitle: 'Settings & Accessibility',
    languageSelect: 'Application Language',
    accessibilityOptions: 'Accessibility & Visuals',
    fontSize: 'Text Font Size',
    fontNormal: 'Standard (100%)',
    fontLarge: 'Large (115%)',
    fontXLarge: 'Extra Large (130%)',
    highContrast: 'High Contrast Mode',
    highContrastDesc: 'Increases border sharpness and text contrast for outdoor island sunlight',
    soundAlerts: 'Audio Alert Chimes',
    soundAlertsDesc: 'Play sound when high-priority warnings are received',
    testSound: 'Test Alert Tone',
    reducedMotion: 'Reduce Animations',
    reducedMotionDesc: 'Minimizes motion and transitions for smoother performance',
    replaySplash: 'Replay Opening Animation',
    replaySplashDesc: 'Show the CORAL animated splash screen and logo intro',
    storageDiagnostics: 'Offline Cache & Storage',
    cachedCount: 'Cached Reports in Device',
    clearCache: 'Purge Offline Cache',
    clearCacheConfirm: 'Are you sure you want to reset offline storage? Fresh data will be downloaded upon reconnecting.',
    
    welcomeTitle: 'Welcome to CORAL',
    welcomeSubtitle: 'Your verified community advisory and emergency link for Simara Island, Corcuera, Romblon.',
    chooseLanguage: 'Choose Preferred Language / Pumili ng Wika',
    setupPreferences: 'Quick Setup & Preferences',
    getStarted: 'Get Started',
    skip: 'Skip Intro',
    residentAccessNote: 'Free resident browsing without registration required.',
  },
  
  fil: {
    appName: 'CORAL',
    appTagline: 'Ugnayan ng Ulat at Alerto sa Komunidad ng Corcuera',
    locationTag: 'Isla ng Simara',
    
    tabFeed: 'Mga Ulat',
    tabCategories: 'Kategorya',
    tabDirectory: 'Direktoryo',
    tabAdmin: 'Portal ng Admin',
    
    liveOnline: 'Konektado Online',
    offlineCached: 'Offline (Nakatagong Datos)',
    synced: 'Na-update',
    sourcesPolicy: 'Patakaran sa Datos',
    settings: 'Mga Setting',
    wideView: 'Malapad na View',
    mobileView: 'Mobile View',
    offlineBanner: 'Offline Mode — Ipinapakita ang dating nai-download na mga ulat ng Corcuera.',
    retryConnection: 'Subukang Kumonekta',
    
    catPower: 'Abiso sa Kuryente',
    catSeaTravel: 'Biyaheng Pandagat',
    catDisaster: 'Babala sa Sakuna',
    catAll: 'Lahat ng Kategorya',
    
    searchPlaceholder: 'Maghanap ng ulat, barangay, paksa...',
    filterAllBarangays: 'Lahat ng 15 Barangay',
    filterArchived: 'Mga Lumang Ulat (Archived)',
    filterActiveOnly: 'Kasalukuyang Ulat Lamang',
    clearFilters: 'Alisin ang mga Filter',
    noAnnouncementsFound: 'Walang Natagpuang Ulat',
    noAnnouncementsDesc: 'Walang ulat na tumutugma sa iyong hinahanap sa Corcuera sa ngayon.',
    
    urgentBadge: 'APORAHAN / URGENT',
    officialCorrection: 'Opisyal na Pagwawasto',
    verifiedSource: 'Beripikadong Tanggapan',
    viewDetails: 'Tingnan ang Detalye',
    affectedArea: 'Apektado',
    published: 'Nailathala',
    issuingOffice: 'Naglabas na Tanggapan',
    
    snapshotTitle: 'Pangkalahatang Katayuan sa Simara',
    snapshotSubtitle: 'Beripikadong ulat sa tatlong pangunahing serbisyo ng komunidad',
    powerNormal: 'Normal ang Suplay ng Kuryente',
    powerInterruption: 'May Ulat na Walang Kuryente',
    seaNormal: 'Bukas ang Biyahe sa Dagat',
    seaSuspended: 'Kanselado ang Biyahe (No Sail)',
    disasterLow: 'Payapa / Normal (White Alert)',
    disasterAlert: 'May Babala / Nakataas na Alerto',
    
    settingsTitle: 'Mga Setting at Accessibility',
    languageSelect: 'Wika ng Aplikasyon',
    accessibilityOptions: 'Accessibility at Hitsura',
    fontSize: 'Laki ng Letra (Font Size)',
    fontNormal: 'Karaniwan (100%)',
    fontLarge: 'Malaki (115%)',
    fontXLarge: 'Napakalaki (130%)',
    highContrast: 'High Contrast Mode',
    highContrastDesc: 'Pinalalakas ang kulay at gilid para malinaw mabasa sa maliwanag na sikat ng araw',
    soundAlerts: 'Tunog ng Alerto',
    soundAlertsDesc: 'Tumunog kapag may natanggap na importanteng babala',
    testSound: 'Subukan ang Tunog',
    reducedMotion: 'Bawasan ang Animasyon',
    reducedMotionDesc: 'Bawasan ang paggalaw ng mga elemento para sa mas mabilis na takbo',
    replaySplash: 'Ulitin ang Pagbukas na Animasyon',
    replaySplashDesc: 'Ipakita muli ang intro na animasyon ng logo at CORAL beacon',
    storageDiagnostics: 'Pansamantalang Taguan (Offline Cache)',
    cachedCount: 'Nai-save na Ulat sa Device',
    clearCache: 'Linisin ang Offline Cache',
    clearCacheConfirm: 'Sigurado ka bang nais mong linisin ang nakatagong datos? Muling magda-download ang app kapag nagka-internet.',
    
    welcomeTitle: 'Maligayang Pagdating sa CORAL',
    welcomeSubtitle: 'Ang opisyal na beripikadong link ng mga ulat at alerto para sa Isla ng Simara, Corcuera, Romblon.',
    chooseLanguage: 'Pumili ng Wika',
    setupPreferences: 'Mabilisang Setup at Kagustuhan',
    getStarted: 'Magsimula Na',
    skip: 'Laktawan',
    residentAccessNote: 'Libreng access para sa mga mamamayan nang hindi kinakailangang mag-sign up o magparehistro.',
  },
  
  asi: {
    appName: 'CORAL',
    appTagline: 'Pasuguan kag Pahibalo it Banwa it Corcuera',
    locationTag: 'Isla it Simara',
    
    tabFeed: 'Mga Pahibalo',
    tabCategories: 'Kategorya',
    tabDirectory: 'Direktoryo',
    tabAdmin: 'Portal it Admin',
    
    liveOnline: 'Konektado sa Internet',
    offlineCached: 'Offline (Nakadaeum nga Datos)',
    synced: 'Na-update',
    sourcesPolicy: 'Patakaran it Datos',
    settings: 'Mga Setting',
    wideView: 'Haeapad nga View',
    mobileView: 'Mobile View',
    offlineBanner: 'Offline Mode — Ginapakita ang mga daan nga pahibalo sa banwa it Corcuera.',
    retryConnection: 'Testingan Magkonek',
    
    catPower: 'Pahibalo sa Koryente',
    catSeaTravel: 'Byahe sa Dagat',
    catDisaster: 'Katalagman kag Bagyo',
    catAll: 'Tanan nga Kategorya',
    
    searchPlaceholder: 'Mag-usoy it pahibalo, barangay, topiko...',
    filterAllBarangays: 'Tanan nga 15 Barangay',
    filterArchived: 'Mga Daan nga Pahibalo',
    filterActiveOnly: 'Bag-o Lamang',
    clearFilters: 'Hawanhon ang Filter',
    noAnnouncementsFound: 'Uwa it Nakita nga Pahibalo',
    noAnnouncementsDesc: 'Uwa it pahibalo nga nagasibu sa imo gina-usoy sa Corcuera sa karon.',
    
    urgentBadge: 'APURADO / URGENT',
    officialCorrection: 'Koreksyon it Opisina',
    verifiedSource: 'Beripikado nga Opisina',
    viewDetails: 'Tan-awon ang Detalye',
    affectedArea: 'Apektado nga Lugar',
    published: 'Ginpagwa',
    issuingOffice: 'Nagpagwa nga Opisina',
    
    snapshotTitle: 'Kamutangan sa Isla it Simara',
    snapshotSubtitle: 'Beripikado nga ulat sa tatlo ka mayor nga serbisyo sa banwa',
    powerNormal: 'Normal ang Koryente',
    powerInterruption: 'May Patay it Koryente',
    seaNormal: 'Bukas ang Byahe sa Dagat',
    seaSuspended: 'Kanselado ang Byahe (Bawal Magbyahe)',
    disasterLow: 'Mahipos / Normal (White Alert)',
    disasterAlert: 'May Alerto sa Bagyo / Panahon',
    
    settingsTitle: 'Mga Setting kag Accessibility',
    languageSelect: 'Hambal / Lenggwahe it App',
    accessibilityOptions: 'Accessibility kag Hitsura',
    fontSize: 'Kabaeay it Letra (Font Size)',
    fontNormal: 'Normal (100%)',
    fontLarge: 'Mabahoe (115%)',
    fontXLarge: 'Pinakamabahoe (130%)',
    highContrast: 'High Contrast Mode',
    highContrastDesc: 'Pina-itso kag gina-klaro ang bueo para madali mabasa sa init sa baybay o bangka',
    soundAlerts: 'Tugtog it Alerto',
    soundAlertsDesc: 'Maghugong o magtugtog pag may apurado nga pahibalo',
    testSound: 'Testingan ang Tugtog',
    reducedMotion: 'Buhinan ang Animasyon',
    reducedMotionDesc: 'Pahipuson ang paggiho it mga disenyo para mas dasig ang app',
    replaySplash: 'Uliton ang Intro nga Animasyon',
    replaySplashDesc: 'Ipakita liwat ang pagsiga kag animasyon it CORAL logo',
    storageDiagnostics: 'Taguan it Datos (Offline Cache)',
    cachedCount: 'Pahibalo nga Nakatago sa Device',
    clearCache: 'Hawanhon ang Offline Cache',
    clearCacheConfirm: 'Sigurado ka bala nga hawahon ang nakatago nga datos? Mada-download liwat pag may koneksyon na.',
    
    welcomeTitle: 'Maayo nga Pag-abot sa CORAL',
    welcomeSubtitle: 'Ang opisyal nga tulay it mga pahibalo kag alerto para sa Isla it Simara, Corcuera, Romblon.',
    chooseLanguage: 'Pili it Hambal / Language',
    setupPreferences: 'Madasig nga Setup',
    getStarted: 'Mag-umpisa Na',
    skip: 'Laktawan',
    residentAccessNote: 'Libre para sa mga pumuluyo maskin uwa it rehistro o account.',
  },
};
