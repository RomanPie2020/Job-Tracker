import toast from 'react-hot-toast'

export const handleApiError = <T>(
  error: unknown,
  rollback: () => void,
  errorMessage: string
) => {
  console.error(errorMessage, error)
  rollback()
  toast.error(errorMessage)
}
