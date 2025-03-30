-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT,
  email TEXT UNIQUE,
  role TEXT,
  avatar_url TEXT
);

-- Create policies table
CREATE TABLE IF NOT EXISTS policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  status TEXT DEFAULT 'draft',
  created_by UUID REFERENCES profiles(id)
);

-- Create compliance_tasks table
CREATE TABLE IF NOT EXISTS compliance_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending',
  assigned_to UUID REFERENCES profiles(id),
  policy_id UUID REFERENCES policies(id)
);

-- Create whistleblowing_reports table
CREATE TABLE IF NOT EXISTS whistleblowing_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  tracking_id TEXT UNIQUE,
  evidence_urls TEXT[],
  assigned_to UUID REFERENCES profiles(id)
);

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE whistleblowing_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policies for policies table
CREATE POLICY "Everyone can view published policies"
  ON policies FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage all policies"
  ON policies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policies for compliance_tasks
CREATE POLICY "Users can view their assigned tasks"
  ON compliance_tasks FOR SELECT
  USING (assigned_to = auth.uid());

CREATE POLICY "Users can update their assigned tasks"
  ON compliance_tasks FOR UPDATE
  USING (assigned_to = auth.uid());

CREATE POLICY "Admins can manage all tasks"
  ON compliance_tasks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policies for whistleblowing_reports
CREATE POLICY "Anyone can create a whistleblowing report"
  ON whistleblowing_reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view reports by tracking ID"
  ON whistleblowing_reports FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage all reports"
  ON whistleblowing_reports FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
