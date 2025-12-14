import { ITranslations, TLanguage } from '../types/language-types'

export const translations: Record<TLanguage, ITranslations> = {
  uk: {
    // Navbar
    jobTracker: 'Трекер Вакансій',
    signOut: 'Вийти',

    // Dashboard
    myApplications: 'Мої Заявки',
    trackAndManage: 'Відстежуйте та керуйте своїми заявками на роботу',
    addJob: 'Додати вакансію',

    // Board columns
    applied: 'Подано',
    screening: 'Скринінг',
    interview: 'Співбесіда',
    offer: 'Пропозиція',
    rejected: 'Відхилено',
    noJobsYet: 'Поки немає вакансій',

    // Add Job Modal
    addNewJob: 'Додати нову вакансію',
    trackNewJob: 'Відстежуйте нову заявку. Заповніть деталі нижче.',
    jobTitle: 'Назва посади',
    companyName: 'Компанія',
    notes: 'Нотатки',
    cancel: 'Скасувати',
    
    // Edit Job Modal
    editJob: 'Редагувати вакансію',
    updateJobDetails: 'Оновіть деталі заявки нижче.',
    saveChanges: 'Зберегти зміни',

    // Delete Job Modal
    deleteJob: 'Видалити вакансію',
    deleteConfirmation: 'Ви впевнені, що хочете видалити цю заявку? Цю дію не можна скасувати.',
    delete: 'Видалити',

    // Chart
    applicationStatusOverview: 'Огляд статусу заявок',
    noDataYet: 'Поки немає даних. Додайте вакансії для перегляду статистики.',

    // Settings
    theme: 'Тема',
    language: 'Мова',
    darkMode: 'Темна',
    lightMode: 'Світла',
    ukrainian: 'Українська',
    english: 'English',
  },
  en: {
    // Navbar
    jobTracker: 'Job Tracker',
    signOut: 'Sign out',

    // Dashboard
    myApplications: 'My Applications',
    trackAndManage: 'Track and manage your job applications',
    addJob: 'Add Job',

    // Board columns
    applied: 'Applied',
    screening: 'Screening',
    interview: 'Interview',
    offer: 'Offer',
    rejected: 'Rejected',
    noJobsYet: 'No jobs yet',

    // Add Job Modal
    addNewJob: 'Add New Job Application',
    trackNewJob: 'Track a new job application. Fill in the details below.',
    jobTitle: 'Job Title',
    companyName: 'Company',
    notes: 'Notes',
    cancel: 'Cancel',

    // Edit Job Modal
    editJob: 'Edit Job Application',
    updateJobDetails: 'Update the job application details below.',
    saveChanges: 'Save Changes',

    // Delete Job Modal
    deleteJob: 'Delete Job Application',
    deleteConfirmation:
      'Are you sure you want to delete this job application? This action cannot be undone.',
    delete: 'Delete',

    // Chart
    applicationStatusOverview: 'Application Status Overview',
    noDataYet:
      'No data to display yet. Add some job applications to see statistics.',

    // Settings
    theme: 'Theme',
    language: 'Language',
    darkMode: 'Dark',
    lightMode: 'Light',
    ukrainian: 'Українська',
    english: 'English',
  },
}
