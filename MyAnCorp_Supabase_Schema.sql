-- =========================================================================
-- MYAN CORP CRM - SUPABASE SQL SCHEMA
-- Lưu ý: Hãy copy toàn bộ nội dung file này và chạy trong SQL Editor của Supabase.
-- =========================================================================

-- =========================================================================
-- 1. XÓA CÁC BẢNG CŨ NẾU CÓ (Hỗ trợ chạy lại nhiều lần không lỗi)
-- =========================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS get_auth_role() CASCADE;
DROP FUNCTION IF EXISTS is_team_leader_of() CASCADE;

DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS lead_lists CASCADE;
DROP TABLE IF EXISTS lead_tags CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS pipeline_stages CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

DROP TYPE IF EXISTS lead_segment CASCADE;
DROP TYPE IF EXISTS subscription_status CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS task_priority CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- =========================================================================
-- 2. ENUMS (Kiểu dữ liệu tự định nghĩa)
-- =========================================================================
CREATE TYPE user_role AS ENUM ('admin', 'team_leader', 'sales');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed', 'overdue');
CREATE TYPE subscription_status AS ENUM ('unpaid', 'partial', 'paid');
CREATE TYPE lead_segment AS ENUM ('retail', 'dealer', 'vip'); -- Khách lẻ, Đại lý, VIP

-- =========================================================================
-- 3. TABLES SCHEMA
-- =========================================================================

-- Bảng Profiles (Mở rộng từ auth.users của Supabase)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'sales',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Teams (Nhóm kinh doanh)
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  leader_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Team Members (Thành viên nhóm)
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  UNIQUE(team_id, user_id)
);

-- Bảng Pipeline Stages (Các giai đoạn Kanban)
CREATE TABLE pipeline_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  order_index INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Leads (Khách hàng & Cơ hội)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  segment lead_segment DEFAULT 'retail',
  contact_phone TEXT,
  contact_email TEXT,
  region TEXT,
  estimated_value NUMERIC DEFAULT 0,
  stage_id UUID REFERENCES pipeline_stages(id) ON DELETE SET NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'potential', -- potential, trading, paused, won, lost
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Lead Tags (Sản phẩm quan tâm, phân loại bổ sung)
CREATE TABLE lead_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  tag_name TEXT NOT NULL 
);

-- Bảng Lead Lists (Danh sách lọc tùy chỉnh của từng cá nhân)
CREATE TABLE lead_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  filter_conditions JSONB,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Tasks (Công việc)
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT, -- call, email, meeting, quote...
  priority task_priority DEFAULT 'medium',
  status task_status DEFAULT 'todo',
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Subscriptions (Thanh toán đơn giản)
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  status subscription_status DEFAULT 'unpaid',
  order_code TEXT,
  amount_paid NUMERIC DEFAULT 0,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Activity Logs (Lịch sử hoạt động)
CREATE TABLE activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type TEXT NOT NULL,
  description TEXT,
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- 4. TẠO INDEXES (Tối ưu hiệu suất truy vấn)
-- =========================================================================
CREATE INDEX idx_leads_owner_id ON leads(owner_id);
CREATE INDEX idx_leads_stage_id ON leads(stage_id);
CREATE INDEX idx_leads_segment ON leads(segment);
CREATE INDEX idx_tasks_owner_id ON tasks(owner_id);
CREATE INDEX idx_tasks_lead_id ON tasks(lead_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_activity_logs_lead_id ON activity_logs(lead_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);

-- =========================================================================
-- 5. TRIGGER TỰ ĐỘNG TẠO HỒ SƠ (PROFILE) KHI CÓ USER MỚI
-- =========================================================================
-- Đảm bảo mỗi khi có một user mới đăng ký trên Supabase Auth,
-- hệ thống sẽ tự động tạo một dòng tương ứng trong bảng public.profiles.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), 
    'sales' -- Mặc định là sales, Admin có thể đổi sau
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email; 
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =========================================================================
-- 6. HÀM HELPER HỖ TRỢ PHÂN QUYỀN (ROW LEVEL SECURITY)
-- =========================================================================
-- Lấy Role của user hiện tại
CREATE OR REPLACE FUNCTION get_auth_role() RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Kiểm tra xem User hiện tại có phải Leader của Target User không
CREATE OR REPLACE FUNCTION is_team_leader_of(target_user_id UUID) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members tm
    JOIN teams t ON tm.team_id = t.id
    WHERE t.leader_id = auth.uid() AND tm.user_id = target_user_id
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- =========================================================================
-- 7. KÍCH HOẠT VÀ CẤU HÌNH RLS (ROW LEVEL SECURITY)
-- =========================================================================
-- Kích hoạt RLS cho các bảng chứa dữ liệu nghiệp vụ nhạy cảm
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- POLICIES CHO BẢNG LEADS
CREATE POLICY "Admin full access leads" ON leads 
FOR ALL USING (get_auth_role() = 'admin');

CREATE POLICY "Sales access own leads" ON leads 
FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Team leader access team leads" ON leads 
FOR ALL USING (get_auth_role() = 'team_leader' AND is_team_leader_of(owner_id));

-- POLICIES CHO BẢNG TASKS
CREATE POLICY "Admin full access tasks" ON tasks 
FOR ALL USING (get_auth_role() = 'admin');

CREATE POLICY "Sales access own tasks" ON tasks 
FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Team leader access team tasks" ON tasks 
FOR ALL USING (get_auth_role() = 'team_leader' AND is_team_leader_of(owner_id));

-- POLICIES CHO BẢNG ACTIVITY LOGS
CREATE POLICY "Admin full access activity_logs" ON activity_logs 
FOR ALL USING (get_auth_role() = 'admin');

CREATE POLICY "Sales access own activity_logs" ON activity_logs 
FOR ALL USING (
  EXISTS (SELECT 1 FROM leads WHERE leads.id = activity_logs.lead_id AND leads.owner_id = auth.uid())
);

CREATE POLICY "Team leader access team activity_logs" ON activity_logs 
FOR ALL USING (
  EXISTS (SELECT 1 FROM leads WHERE leads.id = activity_logs.lead_id AND get_auth_role() = 'team_leader' AND is_team_leader_of(leads.owner_id))
);

-- =========================================================================
-- 8. DỮ LIỆU MẪU (SEED DATA) BAN ĐẦU
-- =========================================================================
INSERT INTO pipeline_stages (name, order_index) VALUES 
  ('Mới', 1),
  ('Đang tư vấn', 2),
  ('Báo giá', 3),
  ('Thương thảo', 4),
  ('Chốt thành công', 5),
  ('Thất bại', 6);
