# Sistem CRUD CWT dengan Supabase

## Overview
Sistem CRUD (Create, Read, Update, Delete) untuk aplikasi CWT yang menggunakan Supabase sebagai backend database. Sistem ini memungkinkan admin untuk mengelola job, application, dan user dengan mudah.

## Fitur Utama

### 🎯 Manajemen Job
- **Create**: Tambah job baru dengan detail lengkap
- **Read**: Lihat semua job dengan filter dan pencarian
- **Update**: Edit job yang sudah ada
- **Delete**: Hapus job yang tidak diperlukan
- **Filter**: Filter berdasarkan department (Deck, Hotel, Engine)
- **Search**: Pencarian berdasarkan title, company, atau location
- **Status**: Tampilkan status urgent dan expired

### 📝 Manajemen Application
- **Create**: Buat application baru
- **Read**: Lihat semua application dengan detail
- **Update**: Update status application (Pending, Shortlisted, Approved, Rejected)
- **Delete**: Hapus application
- **Filter**: Filter berdasarkan status
- **Search**: Pencarian berdasarkan job title atau email user
- **Statistics**: Dashboard statistik application

### 👥 Manajemen User
- **Create**: Tambah user baru
- **Read**: Lihat semua user
- **Update**: Edit informasi user dan role
- **Delete**: Hapus user
- **Role Management**: Ubah role user (Admin/User)
- **Filter**: Filter berdasarkan role
- **Search**: Pencarian berdasarkan email atau nama

## Struktur Database

### Tabel Users
```sql
- id (UUID, Primary Key)
- email (VARCHAR, Unique)
- role (VARCHAR: 'admin' | 'user')
- full_name (VARCHAR)
- phone (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabel Jobs
```sql
- id (UUID, Primary Key)
- title (VARCHAR)
- department (VARCHAR: 'deck' | 'hotel' | 'engine')
- company (VARCHAR)
- location (VARCHAR)
- urgent (BOOLEAN)
- date_posted (DATE)
- expiration_date (DATE)
- experience (VARCHAR)
- gender (VARCHAR: 'any' | 'male' | 'female')
- requirements (TEXT[])
- salary (VARCHAR)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabel Applications
```sql
- id (UUID, Primary Key)
- job_id (UUID, Foreign Key ke Jobs)
- user_id (UUID, Foreign Key ke Users)
- status (VARCHAR: 'pending' | 'shortlisted' | 'approved' | 'rejected')
- personal_details (JSONB)
- pre_screening (JSONB)
- screening (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Setup dan Instalasi

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 2. Konfigurasi Supabase
File `src/lib/supabase.ts` sudah berisi konfigurasi dengan kredensial yang diberikan:
- URL: `https://fsyduuykydvlvoksmlnj.supabase.co`
- API Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Setup Database
Jalankan script SQL di `database/schema.sql` di Supabase SQL Editor untuk membuat tabel dan struktur yang diperlukan.

### 4. Import Komponen
```tsx
import AdminCRUDDashboard from './components/admin/AdminCRUDDashboard';
import JobCRUD from './components/admin/JobCRUD';
import ApplicationCRUD from './components/admin/ApplicationCRUD';
import UserCRUD from './components/admin/UserCRUD';
```

## Penggunaan

### Dashboard Admin
```tsx
<AdminCRUDDashboard />
```
Dashboard ini menyediakan:
- Tab navigation untuk Job, Application, dan User
- Quick stats overview
- Quick actions untuk akses cepat

### Manajemen Job
```tsx
<JobCRUD />
```
Fitur:
- Form tambah/edit job dengan validasi
- Tabel job dengan sorting dan filtering
- Action buttons untuk edit dan delete
- Status indicators (urgent, expired)

### Manajemen Application
```tsx
<ApplicationCRUD />
```
Fitur:
- Tabel application dengan detail lengkap
- Status management (Pending → Shortlisted → Approved/Rejected)
- Filter berdasarkan status
- Statistics dashboard

### Manajemen User
```tsx
<UserCRUD />
```
Fitur:
- Form tambah/edit user
- Role management (Admin/User)
- Tabel user dengan informasi lengkap
- User statistics

## Service Layer

### JobService
```tsx
import { JobService } from '../services/jobService';

// Create
const newJob = await JobService.createJob(jobData);

// Read
const allJobs = await JobService.getAllJobs();
const jobById = await JobService.getJobById(id);
const jobsByDept = await JobService.getJobsByDepartment('deck');

// Update
const updatedJob = await JobService.updateJob(id, updates);

// Delete
const success = await JobService.deleteJob(id);
```

### ApplicationService
```tsx
import { ApplicationService } from '../services/applicationService';

// Create
const newApp = await ApplicationService.createApplication(appData);

// Read
const allApps = await ApplicationService.getAllApplications();
const appsByUser = await ApplicationService.getApplicationsByUserId(userId);

// Update Status
const updated = await ApplicationService.updateApplicationStatus(id, 'approved');

// Statistics
const stats = await ApplicationService.getApplicationStats();
```

### UserService
```tsx
import { UserService } from '../services/userService';

// Create
const newUser = await UserService.createUser(userData);

// Read
const allUsers = await UserService.getAllUsers();
const userByEmail = await UserService.getUserByEmail(email);

// Update
const updatedUser = await UserService.updateUser(id, updates);
const roleUpdated = await UserService.updateUserRole(id, 'admin');

// Statistics
const stats = await UserService.getUserStats();
```

## Keamanan

### Row Level Security (RLS)
- Users hanya bisa melihat dan mengedit profil mereka sendiri
- Admin bisa mengakses semua data
- Jobs bisa dilihat oleh semua user (yang masih aktif)
- Applications hanya bisa dilihat oleh pemilik dan admin

### Validasi
- Form validation untuk semua input
- Type checking dengan TypeScript
- Error handling yang komprehensif

## Styling
Menggunakan Tailwind CSS untuk styling yang konsisten dan responsive:
- Color scheme yang sesuai dengan brand CWT
- Responsive design untuk mobile dan desktop
- Interactive elements dengan hover states
- Loading states dan disabled states

## Error Handling
- Try-catch blocks di semua service calls
- User-friendly error messages
- Loading states untuk feedback visual
- Confirmation dialogs untuk destructive actions

## Performance
- Database indexing untuk query yang cepat
- Pagination untuk data yang banyak
- Debounced search untuk performa yang baik
- Optimized re-renders dengan React state management

## Roadmap
- [ ] Export data ke Excel/PDF
- [ ] Bulk operations (bulk delete, bulk status update)
- [ ] Advanced filtering dan sorting
- [ ] Real-time notifications
- [ ] Audit log untuk semua perubahan
- [ ] Backup dan restore functionality
- [ ] Advanced analytics dashboard

## Troubleshooting

### Common Issues
1. **Connection Error**: Pastikan kredensial Supabase benar
2. **Permission Denied**: Check RLS policies di Supabase
3. **Table Not Found**: Jalankan script SQL untuk membuat tabel
4. **Type Errors**: Pastikan TypeScript types sesuai dengan database schema

### Debug Mode
Aktifkan console.log di browser developer tools untuk melihat error details.

## Support
Untuk bantuan teknis atau pertanyaan, silakan hubungi tim development CWT.



