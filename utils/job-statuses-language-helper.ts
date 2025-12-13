import { ITranslations, TJobStatusKey } from '@/shared/types/language-types'

export function getJobStatusLabel(
  status: TJobStatusKey,
  t: ITranslations
): string {
  const statusMap: Record<TJobStatusKey, keyof ITranslations> = {
    Applied: 'applied',
    Screening: 'screening',
    Interview: 'interview',
    Offer: 'offer',
    Rejected: 'rejected',
  }
  return t[statusMap[status]]
}
