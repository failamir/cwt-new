-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    full_name VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    department VARCHAR(50) NOT NULL CHECK (department IN ('deck', 'hotel', 'engine')),
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    urgent BOOLEAN DEFAULT FALSE,
    date_posted DATE NOT NULL,
    expiration_date DATE NOT NULL,
    experience VARCHAR(100) NOT NULL,
    gender VARCHAR(50) NOT NULL DEFAULT 'any' CHECK (gender IN ('any', 'male', 'female')),
    requirements TEXT[] NOT NULL DEFAULT '{}',
    salary VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'shortlisted', 'approved', 'rejected')),
    personal_details JSONB,
    pre_screening JSONB,
    screening JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_urgent ON jobs(urgent);
CREATE INDEX IF NOT EXISTS idx_jobs_expiration_date ON jobs(expiration_date);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Helper function to check if current user is admin without triggering RLS recursion
-- SECURITY DEFINER allows this function to bypass RLS on users table
CREATE OR REPLACE FUNCTION is_admin(uid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users WHERE id = uid AND role = 'admin'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION is_admin(UUID) TO PUBLIC;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO users (email, role, full_name, phone) VALUES
('admin@cwt.com', 'admin', 'Admin CWT', '+6281234567890'),
('user1@example.com', 'user', 'John Doe', '+6281234567891'),
('user2@example.com', 'user', 'Jane Smith', '+6281234567892')
ON CONFLICT (email) DO NOTHING;

INSERT INTO jobs (title, department, company, location, urgent, date_posted, expiration_date, experience, gender, requirements, salary, description) VALUES
('Chief Officer', 'deck', 'Pesiar SEA', 'International Waters', true, '2024-01-01', '2024-12-31', '5+ Years', 'any', ARRAY['Valid certificates as per STCW 2010', 'Min 5 Year Experience in the same position', 'Good English communication'], 'USD 5000-7000', 'Chief Officer position for international cruise ship'),
('Hotel Manager', 'hotel', 'Cruise Lines', 'Caribbean Route', false, '2024-01-01', '2024-06-30', '3+ Years', 'any', ARRAY['Hotel management degree', 'Cruise ship experience preferred', 'Fluent in English'], 'USD 4000-6000', 'Hotel Manager for luxury cruise ship'),
('2nd Engineer', 'engine', 'Maritime Corp', 'Southeast Asia', true, '2024-01-01', '2024-08-31', '3+ Years', 'male', ARRAY['2nd Engineer COC', 'Minimum 3 years experience', 'STCW Basic Safety Training'], 'USD 3500-5000', '2nd Engineer for cargo vessel')
ON CONFLICT DO NOTHING;

-- Create RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Allow authenticated users to create their own profile
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can create their own profile'
  ) THEN
    CREATE POLICY "Users can create their own profile" ON users
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Admins can manage all users (avoid recursion by using is_admin())
DROP POLICY IF EXISTS "Admins can view all users" ON users;
CREATE POLICY "Admins can manage all users" ON users
    FOR ALL USING ( is_admin(auth.uid()) )
    WITH CHECK ( is_admin(auth.uid()) );

-- Jobs policies
CREATE POLICY "Anyone can view active jobs" ON jobs
    FOR SELECT USING (expiration_date >= CURRENT_DATE);

DROP POLICY IF EXISTS "Admins can manage all jobs" ON jobs;
CREATE POLICY "Admins can manage all jobs" ON jobs
    FOR ALL USING ( is_admin(auth.uid()) )
    WITH CHECK ( is_admin(auth.uid()) );

-- Applications policies
CREATE POLICY "Users can view their own applications" ON applications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications" ON applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
CREATE POLICY "Admins can manage all applications" ON applications
    FOR ALL USING ( is_admin(auth.uid()) )
    WITH CHECK ( is_admin(auth.uid()) );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
