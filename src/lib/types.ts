export interface Job {
  id?: string;
  title: string;
  department: 'deck' | 'hotel' | 'engine';
  company: string;
  location: string;
  urgent: boolean;
  date_posted: string; // YYYY-MM-DD
  expiration_date: string; // YYYY-MM-DD
  experience: string;
  gender: 'any' | 'male' | 'female';
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
  // Optional embedded relations from API
  job?: Job;
  user?: User;
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
