import { api } from '../lib/api';
import type { Application } from '../lib/types';

export class ApplicationService {
  // CREATE - Membuat application baru
  static async createApplication(applicationData: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application | null> {
    try {
      const data = await api.post<Application>('/applications', applicationData);
      return data;
    } catch (error) {
      console.error('Error in createApplication:', error);
      return null;
    }
  }

  // READ - Mengambil semua application
  static async getAllApplications(): Promise<Application[]> {
    try {
      const data = await api.get<Application[]>('/applications');
      return data || [];
    } catch (error) {
      console.error('Error in getAllApplications:', error);
      return [];
    }
  }

  // READ - Mengambil application berdasarkan ID
  static async getApplicationById(id: string): Promise<Application | null> {
    try {
      const data = await api.get<Application>(`/applications/${id}`);
      return data;
    } catch (error) {
      console.error('Error in getApplicationById:', error);
      return null;
    }
  }

  // READ - Mengambil application berdasarkan user ID
  static async getApplicationsByUserId(userId: string): Promise<Application[]> {
    try {
      const data = await api.get<Application[]>(`/applications/by-user/${encodeURIComponent(userId)}`);
      return data || [];
    } catch (error) {
      console.error('Error in getApplicationsByUserId:', error);
      return [];
    }
  }

  // READ - Mengambil application berdasarkan job ID
  static async getApplicationsByJobId(jobId: string): Promise<Application[]> {
    try {
      const data = await api.get<Application[]>(`/applications/by-job/${encodeURIComponent(jobId)}`);
      return data || [];
    } catch (error) {
      console.error('Error in getApplicationsByJobId:', error);
      return [];
    }
  }

  // READ - Mengambil application berdasarkan status
  static async getApplicationsByStatus(status: Application['status']): Promise<Application[]> {
    try {
      // No direct endpoint; fallback to admin list + filter client-side if needed
      const all = await api.get<Application[]>('/applications');
      return (all || []).filter(app => app.status === status);
    } catch (error) {
      console.error('Error in getApplicationsByStatus:', error);
      return [];
    }
  }

  // UPDATE - Mengupdate application
  static async updateApplication(id: string, updates: Partial<Application>): Promise<Application | null> {
    try {
      const data = await api.patch<Application>(`/applications/${id}`, updates);
      return data;
    } catch (error) {
      console.error('Error in updateApplication:', error);
      return null;
    }
  }

  // UPDATE - Mengupdate status application
  static async updateApplicationStatus(id: string, status: Application['status']): Promise<Application | null> {
    try {
      const data = await api.patch<Application>(`/applications/${id}/status`, { status });
      return data;
    } catch (error) {
      console.error('Error in updateApplicationStatus:', error);
      return null;
    }
  }

  // DELETE - Menghapus application
  static async deleteApplication(id: string): Promise<boolean> {
    try {
      await api.del<unknown>(`/applications/${id}`);
      return true;
    } catch (error) {
      console.error('Error in deleteApplication:', error);
      return false;
    }
  }

  // READ - Mengambil statistik application
  static async getApplicationStats(): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    shortlisted: number;
  }> {
    try {
      const stats = await api.get<{ total: number; pending: number; approved: number; rejected: number; shortlisted: number; }>(`/applications/stats`);
      return stats;
    } catch (error) {
      console.error('Error in getApplicationStats:', error);
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        shortlisted: 0,
      };
    }
  }
}



