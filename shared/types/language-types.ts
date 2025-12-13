export type TLanguage = 'uk' | 'en'

export interface ITranslations {
  // Navbar
  jobTracker: string
  signOut: string

  // Dashboard
  myApplications: string
  trackAndManage: string
  addJob: string

  // Board columns (статуси вакансій)
  applied: string
  screening: string
  interview: string
  offer: string
  rejected: string
  noJobsYet: string

  // Add Job Modal
  addNewJob: string
  trackNewJob: string
  jobTitle: string
  companyName: string
  notes: string
  cancel: string

  // Chart
  applicationStatusOverview: string
  noDataYet: string

  // Settings
  theme: string
  language: string
  darkMode: string
  lightMode: string
  ukrainian: string
  english: string
}

export type TJobStatusKey =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Rejected'

export interface ILanguageContextType {
  language: TLanguage
  setLanguage: (lang: TLanguage) => void
  toggleLanguage: () => void
  t: ITranslations
}
