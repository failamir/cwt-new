import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fsyduuykydvlvoksmlnj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeWR1dXlreWR2bHZva3NtbG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTc3NjQsImV4cCI6MjA3MjIzMzc2NH0.9xj5q_OjLbQ_9fqWhWOEoZTfoKXXP99aDyP3Bfhy8JY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipe data untuk tabel
export interface Job {
  id?: string;
  title: string;
  department: 'deck' | 'hotel' | 'engine';
  company: string;
  location: string;
  urgent: boolean;
  date_posted: string;
  expiration_date: string;
  experience: string;
  gender: string;
  requirements: string[];
  salary?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Application {
  id?: string;
  job_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'shortlisted';
  personal_details: any;
  pre_screening: any;
  screening: any;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  full_name?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}
