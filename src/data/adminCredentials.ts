/**
 * CORAL AUTHORIZED ADMINISTRATOR CREDENTIALS
 * 
 * PAALALA PARA SA MGA ESTUDYANTE / DEVELOPERS:
 * Dito niyo papalitan ang mga username at password ng mga awtoridad.
 * Walang public sign-up ang mga residente para hindi makapag-post ang kahit sino.
 * Ibigay lamang ang username at password sa mga lehitimong opisyal (MDRRMO, TIELCO, Coast Guard).
 */

export interface AuthorizedAccount {
  username: string;
  pin: string; // Secret Password or PIN
  name: string;
  role: string;
  organization: string;
}

export const AUTHORIZED_ADMIN_ACCOUNTS: AuthorizedAccount[] = [
  {
    // Municipal Disaster Risk Reduction & Management Office
    username: 'mdrrmo_admin',
    pin: 'Simara2026!', // <-- PALITAN ANG PASSWORD NA ITO
    name: 'Althea Fallore, EnP',
    role: 'MDRRMO Officer / Municipal Administrator',
    organization: 'MDRRMO Corcuera (LGU)',
  },
  {
    // Tablas Island Electric Cooperative Inc. (Power)
    username: 'tielco_corcuera',
    pin: 'TielcoPower2026', // <-- PALITAN ANG PASSWORD NA ITO
    name: 'Engr. Reynaldo Fabellon',
    role: 'TIELCO Field Supervisor & CORAL Liaison',
    organization: 'TIELCO Corcuera Sub-Office',
  },
  {
    // Philippine Coast Guard Sub-Station Corcuera (Sea Travel)
    username: 'pcg_corcuera',
    pin: 'CoastGuard@Simara', // <-- PALITAN ANG PASSWORD NA ITO
    name: 'PO2 Marlon Mortel, PCG',
    role: 'Coast Guard Sub-Station Commander',
    organization: 'Philippine Coast Guard Sub-Station Corcuera',
  },
  {
    // Master Student Developer Account (Para sa inyong defense at testing)
    username: 'coral_dev',
    pin: 'AdminCoral2026', // <-- PALITAN ANG PASSWORD NA ITO
    name: 'CORAL Student Dev Team',
    role: 'Lead System Developer / Administrator',
    organization: 'CORAL Project Research Group',
  },
];
