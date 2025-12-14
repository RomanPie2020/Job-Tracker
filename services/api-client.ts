import { ICreateJobData, IJob, TJobStatus } from '@/shared/types/job-types'
import axios, { AxiosError } from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

export const jobsApi = {
  getAll: async (): Promise<IJob[]> => {
    const response = await apiClient.get<IJob[]>('/jobs')
    return response.data
  },

  create: async (jobData: ICreateJobData): Promise<IJob[]> => {
    const response = await apiClient.post<IJob[]>('/jobs', jobData)
    return response.data
  },

  update: async (job: IJob): Promise<IJob[]> => {
    const response = await apiClient.put<IJob[]>('/jobs', job)
    return response.data
  },

  updateStatus: async (id: string, status: TJobStatus): Promise<IJob[]> => {
    const response = await apiClient.put<IJob[]>('/jobs', { id, status })
    return response.data
  },

  delete: async (id: string): Promise<IJob[]> => {
    const response = await apiClient.delete<IJob[]>('/jobs', {
      params: { id },
    })
    return response.data
  },
}
