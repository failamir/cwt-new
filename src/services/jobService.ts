import { api } from '../lib/api';
import type { Job } from '../lib/types';

export class JobService {
  // CREATE - Membuat job baru
  static async createJob(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job | null> {
    try {
      const data = await api.post<Job>('/jobs', jobData);
      return data;
    } catch (error) {
      console.error('Error in createJob:', error);
      return null;
    }
  }

  // READ - Mengambil semua job
  static async getAllJobs(): Promise<Job[]> {
    try {
      const data = await api.get<Job[]>('/jobs');
      return data || [];
    } catch (error) {
      console.error('Error in getAllJobs:', error);
      return [];
    }
  }

  // READ - Mengambil job berdasarkan ID
  static async getJobById(id: string): Promise<Job | null> {
    try {
      const data = await api.get<Job>(`/jobs/${id}`);
      return data;
    } catch (error) {
      console.error('Error in getJobById:', error);
      return null;
    }
  }

  // READ - Mengambil job berdasarkan department
  static async getJobsByDepartment(department: Job['department']): Promise<Job[]> {
    try {
      const data = await api.get<Job[]>(`/jobs?department=${encodeURIComponent(department)}`);
      return data || [];
    } catch (error) {
      console.error('Error in getJobsByDepartment:', error);
      return [];
    }
  }

  // READ - Mencari job berdasarkan keyword
  static async searchJobs(keyword: string): Promise<Job[]> {
    try {
      const data = await api.get<Job[]>(`/jobs/search?keyword=${encodeURIComponent(keyword)}`);
      return data || [];
    } catch (error) {
      console.error('Error in searchJobs:', error);
      return [];
    }
  }

  // UPDATE - Mengupdate job
  static async updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
    try {
      const data = await api.patch<Job>(`/jobs/${id}`, updates);
      return data;
    } catch (error) {
      console.error('Error in updateJob:', error);
      return null;
    }
  }

  // DELETE - Menghapus job
  static async deleteJob(id: string): Promise<boolean> {
    try {
      await api.del<unknown>(`/jobs/${id}`);
      return true;
    } catch (error) {
      console.error('Error in deleteJob:', error);
      return false;
    }
  }

  // READ - Mengambil job yang urgent
  static async getUrgentJobs(): Promise<Job[]> {
    try {
      const data = await api.get<Job[]>('/jobs/urgent');
      return data || [];
    } catch (error) {
      console.error('Error in getUrgentJobs:', error);
      return [];
    }
  }

  // READ - Mengambil job yang masih aktif (belum expired)
  static async getActiveJobs(): Promise<Job[]> {
    try {
      const data = await api.get<Job[]>('/jobs/active');
      return data || [];
    } catch (error) {
      console.error('Error in getActiveJobs:', error);
      return [];
    }
  }
}



