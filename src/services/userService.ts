import { api } from '../lib/api';
import type { User } from '../lib/types';

export class UserService {
  // CREATE - Membuat user baru
  static async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
    try {
      // Admin create via API (reuse update with missing id or implement if needed)
      const data = await api.post<User>('/register', {
        email: userData.email,
        password: 'ChangeMe123!',
        full_name: userData.full_name,
        phone: userData.phone,
      });
      return (data as any).user ?? (data as unknown as User);
    } catch (error) {
      console.error('Error in createUser:', error);
      return null;
    }
  }

  // READ - Mengambil semua user
  static async getAllUsers(): Promise<User[]> {
    try {
      const data = await api.get<User[]>('/users');
      return data || [];
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      return [];
    }
  }

  // READ - Mengambil user berdasarkan ID
  static async getUserById(id: string): Promise<User | null> {
    try {
      const data = await api.get<User>(`/users/${id}`);
      return data;
    } catch (error) {
      console.error('Error in getUserById:', error);
      return null;
    }
  }

  // READ - Mengambil user berdasarkan email
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const results = await api.get<User[]>(`/users/search?keyword=${encodeURIComponent(email)}`);
      return results?.find(u => u.email === email) || null;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return null;
    }
  }

  // READ - Mengambil user berdasarkan role
  static async getUsersByRole(role: User['role']): Promise<User[]> {
    try {
      const data = await api.get<User[]>('/users');
      return (data || []).filter(u => u.role === role);
    } catch (error) {
      console.error('Error in getUsersByRole:', error);
      return [];
    }
  }

  // UPDATE - Mengupdate user
  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const data = await api.patch<User>(`/users/${id}`, updates);
      return data;
    } catch (error) {
      console.error('Error in updateUser:', error);
      return null;
    }
  }

  // UPDATE - Mengupdate role user
  static async updateUserRole(id: string, role: User['role']): Promise<User | null> {
    try {
      const data = await api.patch<User>(`/users/${id}`, { role });
      return data;
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      return null;
    }
  }

  // DELETE - Menghapus user
  static async deleteUser(id: string): Promise<boolean> {
    try {
      await api.del<unknown>(`/users/${id}`);
      return true;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      return false;
    }
  }

  // READ - Mengambil statistik user
  static async getUserStats(): Promise<{
    total: number;
    admin: number;
    user: number;
  }> {
    try {
      const stats = await api.get<{ total: number; admin: number; user: number }>(`/users/stats`);
      return stats;
    } catch (error) {
      console.error('Error in getUserStats:', error);
      return {
        total: 0,
        admin: 0,
        user: 0,
      };
    }
  }

  // READ - Mencari user berdasarkan keyword
  static async searchUsers(keyword: string): Promise<User[]> {
    try {
      const data = await api.get<User[]>(`/users/search?keyword=${encodeURIComponent(keyword)}`);
      return data || [];
    } catch (error) {
      console.error('Error in searchUsers:', error);
      return [];
    }
  }
}



