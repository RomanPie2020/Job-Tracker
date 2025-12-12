"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "uk" | "en";

interface Translations {
  // Navbar
  jobTracker: string;
  signOut: string;
  
  // Dashboard
  myApplications: string;
  trackAndManage: string;
  addJob: string;
  
  // Board columns (статуси вакансій)
  applied: string;
  screening: string;
  interview: string;
  offer: string;
  rejected: string;
  noJobsYet: string;
  
  // Add Job Modal
  addNewJob: string;
  trackNewJob: string;
  jobTitle: string;
  companyName: string;
  notes: string;
  cancel: string;
  
  // Chart
  applicationStatusOverview: string;
  noDataYet: string;
  
  // Settings
  theme: string;
  language: string;
  darkMode: string;
  lightMode: string;
  ukrainian: string;
  english: string;
}

// Статуси які зберігаються в БД англійською
export type JobStatusKey = "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";

const translations: Record<Language, Translations> = {
  uk: {
    // Navbar
    jobTracker: "Трекер Вакансій",
    signOut: "Вийти",
    
    // Dashboard
    myApplications: "Мої Заявки",
    trackAndManage: "Відстежуйте та керуйте своїми заявками на роботу",
    addJob: "Додати вакансію",
    
    // Board columns
    applied: "Подано",
    screening: "Скринінг",
    interview: "Співбесіда",
    offer: "Пропозиція",
    rejected: "Відхилено",
    noJobsYet: "Поки немає вакансій",
    
    // Add Job Modal
    addNewJob: "Додати нову вакансію",
    trackNewJob: "Відстежуйте нову заявку. Заповніть деталі нижче.",
    jobTitle: "Назва посади",
    companyName: "Компанія",
    notes: "Нотатки",
    cancel: "Скасувати",
    
    // Chart
    applicationStatusOverview: "Огляд статусу заявок",
    noDataYet: "Поки немає даних. Додайте вакансії для перегляду статистики.",
    
    // Settings
    theme: "Тема",
    language: "Мова",
    darkMode: "Темна",
    lightMode: "Світла",
    ukrainian: "Українська",
    english: "English",
  },
  en: {
    // Navbar
    jobTracker: "Job Tracker",
    signOut: "Sign out",
    
    // Dashboard
    myApplications: "My Applications",
    trackAndManage: "Track and manage your job applications",
    addJob: "Add Job",
    
    // Board columns
    applied: "Applied",
    screening: "Screening",
    interview: "Interview",
    offer: "Offer",
    rejected: "Rejected",
    noJobsYet: "No jobs yet",
    
    // Add Job Modal
    addNewJob: "Add New Job Application",
    trackNewJob: "Track a new job application. Fill in the details below.",
    jobTitle: "Job Title",
    companyName: "Company",
    notes: "Notes",
    cancel: "Cancel",
    
    // Chart
    applicationStatusOverview: "Application Status Overview",
    noDataYet: "No data to display yet. Add some job applications to see statistics.",
    
    // Settings
    theme: "Theme",
    language: "Language",
    darkMode: "Dark",
    lightMode: "Light",
    ukrainian: "Українська",
    english: "English",
  },
};

// Хелпер для перекладу статусів вакансій
export function getStatusLabel(status: JobStatusKey, t: Translations): string {
  const statusMap: Record<JobStatusKey, keyof Translations> = {
    Applied: "applied",
    Screening: "screening",
    Interview: "interview",
    Offer: "offer",
    Rejected: "rejected",
  };
  return t[statusMap[status]];
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("uk");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && (savedLang === "uk" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "uk" ? "en" : "uk"));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
