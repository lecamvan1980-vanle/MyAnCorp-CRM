# Thiết kế nền tảng kỹ thuật Supabase - Myan Corp CRM

Tài liệu này đặc tả thiết kế cơ sở dữ liệu, phân quyền (RLS) và quy trình xác thực cho hệ thống CRM của Myan Corp theo sát PRD và Design Brief.

## 1. Danh sách các bảng (Tables)

Dựa trên yêu cầu và các thực thể nghiệp vụ, hệ thống cần các bảng sau:
1. **profiles**: Lưu thông giải hồ sơ người dùng, vai trò (role). Một user = một profile duy nhất.
2. **teams**: Lưu thông tin nhóm kinh doanh và người trưởng nhóm (leader_id).
3. **team_members**: Bảng trung gian map nhân viên (sales) vào các nhóm (teams).
4. **pipeline_stages**: Cấu hình các giai đoạn của cơ hội bán hàng (Kanban).
5. **leads**: Quản lý thông tin khách hàng và cơ hội bán hàng. Bao gồm thông tin liên hệ, phân khúc, và giai đoạn bán hàng hiện tại.
6. **lead_tags**: Lưu các thẻ/phân loại liên quan đến leads (sản phẩm quan tâm như Xe lăn, Đai nẹp...).
7. **lead_lists**: Lưu cấu hình danh sách khách hàng (Saved Filters) của người dùng.
8. **tasks**: Quản lý công việc hằng ngày của nhân viên (gọi điện, gặp mặt...).
9. **subscriptions**: Quản lý trạng thái thanh toán đơn giản liên kết với leads.
10. **activity_logs**: Lưu lịch sử tương tác, thao tác trên hệ thống.
11. **products**: Quản lý danh mục sản phẩm (Mở rộng theo Pic3).
12. **inventory**: Quản lý nhập/xuất và tồn kho (Mở rộng theo Pic2).

---

## 2. SQL Schema Hoàn Chỉnh

```sql
-- =========================================================================
-- 1. ENUMS (Kiểu dữ liệu tự định nghĩa)
-- =========================================================================
CREATE TYPE user_role AS ENUM ('admin', 'team_leader', 'sales');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed', 'overdue');
CREATE TYPE subscription_status AS ENUM ('unpaid', 'partial', 'paid');
CREATE TYPE lead_segment AS ENUM ('retail', 'dealer', 'vip'); -- Khách lẻ, Đại lý, VIP

-- =========================================================================
-- 2. TABLES SCHEMA
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
  status TEXT DEFAULT 'potential', -- potential, trading, paused
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Lead Tags (Sản phẩm quan tâm, phân loại bổ sung)
CREATE TABLE lead_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  tag_name TEXT NOT NULL 
);

-- Bảng Lead Lists (Danh sách lọc tùy chỉnh)
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

-- Bảng Products (Danh mục sản phẩm)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  price NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Inventory (Quản lý nhập kho / tồn kho)
CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INT DEFAULT 0,
  warehouse_location TEXT,
  last_updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

```

---

## 3. Quan hệ giữa các bảng (Entity Relationships)
- `auth.users` 1 - 1 `profiles`: Mỗi user có đúng 1 profile chính.
- `profiles` 1 - N `teams`: Một user có thể làm leader của nhiều team.
- `teams` 1 - N `team_members` và `profiles` 1 - N `team_members`: Quan hệ n-n giữa user và team.
- `pipeline_stages` 1 - N `leads`: Một giai đoạn chứa nhiều cơ hội bán hàng.
- `profiles` (Sales) 1 - N `leads`: Một sales phụ trách nhiều leads.
- `leads` 1 - N `lead_tags`: Một khách hàng quan tâm nhiều sản phẩm (xe lăn, vớ y khoa...).
- `leads` 1 - N `tasks`: Một khách hàng có nhiều công việc (gọi điện, gặp mặt...).
- `leads` 1 - N `subscriptions`: Một khách hàng có thể có nhiều đợt thanh toán.
- `leads` 1 - N `activity_logs`: Ghi lại mọi tương tác trên một khách hàng.
- `products` 1 - N `inventory`: Mỗi sản phẩm có bản ghi tồn kho.

---

## 4. Indexes Cần Tạo (Tối ưu hiệu suất truy vấn)

```sql
-- Indexes hỗ trợ lọc và Dashboard
CREATE INDEX idx_leads_owner_id ON leads(owner_id);
CREATE INDEX idx_leads_stage_id ON leads(stage_id);
CREATE INDEX idx_leads_segment ON leads(segment);
CREATE INDEX idx_tasks_owner_id ON tasks(owner_id);
CREATE INDEX idx_tasks_lead_id ON tasks(lead_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_activity_logs_lead_id ON activity_logs(lead_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
```

---

## 5. Trigger tự động tạo Profile khi Đăng ký

Chống tạo trùng hồ sơ bằng cách dùng email làm định danh duy nhất (Supabase Auth mặc định unique email). Trigger sau tự động tạo/cập nhật `profiles` khi có user mới đăng ký.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), 
    'sales' -- Mặc định là sales
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email; 
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Gắn trigger vào bảng auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 6. Cách lưu Role (Phân quyền 3 lớp)

Role được lưu trực tiếp trong cột `role` của bảng `profiles` dưới dạng `ENUM ('admin', 'team_leader', 'sales')`.
- **Ưu điểm**: Nhanh, dễ truy vấn trong các RLS policies. Role đi theo `user_id` duy nhất, không phụ thuộc người dùng đổi mật khẩu hay cách đăng nhập.
- Tránh tạo bảng `user_roles` trung gian không cần thiết cho cấu trúc 3 lớp đơn giản này.

---

## 7. RLS Policies (Row Level Security)

Để phân quyền dòng dữ liệu, ta tạo hàm Helper hỗ trợ check quyền Team Leader:

```sql
-- Helper function lấy Role của user hiện tại
CREATE OR REPLACE FUNCTION get_auth_role() RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper function kiểm tra xem User hiện tại có phải Leader của Target User không
CREATE OR REPLACE FUNCTION is_team_leader_of(target_user_id UUID) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM team_members tm
    JOIN teams t ON tm.team_id = t.id
    WHERE t.leader_id = auth.uid() AND tm.user_id = target_user_id
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Kích hoạt RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- POLICIES CHO BẢNG LEADS (Áp dụng tương tự cho Tasks, Subscriptions...)
-- --------------------------------------------------------

-- 1. ADMIN: Thấy toàn bộ
CREATE POLICY "Admin full access leads" ON leads 
FOR ALL USING (get_auth_role() = 'admin');

-- 2. SALES: Thấy dữ liệu của chính mình
CREATE POLICY "Sales access own leads" ON leads 
FOR ALL USING (owner_id = auth.uid());

-- 3. TEAM LEADER: Thấy dữ liệu của nhân viên trong nhóm mình
CREATE POLICY "Team leader access team leads" ON leads 
FOR ALL USING (get_auth_role() = 'team_leader' AND is_team_leader_of(owner_id));

-- (Các bảng Tasks, Subscriptions, Activity Logs sử dụng cú pháp Policy tương tự Leads)
```

---

## 8. Seed Data (Dữ liệu mẫu Myan Corp)

```sql
-- Seed Pipeline Stages
INSERT INTO pipeline_stages (name, order_index) VALUES 
  ('Mới', 1),
  ('Đang tiếp cận', 2),
  ('Đã báo giá', 3),
  ('Chờ quyết định', 4),
  ('Won', 5),
  ('Lost', 6);

-- Giả định có 1 Admin (id_1) và 1 Sales (id_2) đã được tạo qua Supabase Auth
-- Seed Leads (Khách hàng tiềm năng Myan Corp)
INSERT INTO leads (customer_name, company_name, segment, region, estimated_value, status, owner_id) VALUES
  ('Nguyễn Thị Mai', 'Nhà thuốc Long Châu', 'dealer', 'TP.HCM', 180000000, 'potential', 'id_2'),
  ('Trần Văn Hùng', 'Phòng khám Đa khoa Hoàn Mỹ', 'vip', 'TP.HCM', 320000000, 'potential', 'id_2'),
  ('Vũ Minh Anh', 'Khách lẻ văn phòng', 'retail', 'Hà Nội', 5500000, 'potential', 'id_2');

-- Seed Lead Tags (Sản phẩm quan tâm)
-- Giả sử ID của Nguyễn Thị Mai là lead_id_1
INSERT INTO lead_tags (lead_id, tag_name) VALUES
  ('lead_id_1', 'Đai nẹp y tế'),
  ('lead_id_1', 'Vớ y khoa');

-- Seed Tasks
INSERT INTO tasks (title, description, task_type, priority, due_date, lead_id, owner_id) VALUES
  ('Gọi tư vấn đai nẹp lưng', 'Xác nhận nhu cầu nhập thử 3 mã đai nẹp bán chạy', 'call', 'high', '2026-06-30', 'lead_id_1', 'id_2');
```

---

## 9. Mô tả Flow Xác Thực & Identity

- **Đăng ký bằng Email + Password**: Người dùng hoặc Admin tạo tài khoản trên giao diện (gọi API `supabase.auth.signUp()`). Supabase tự động mã hóa mật khẩu, lưu vào `auth.users` và kích hoạt trigger tạo 1 dòng tương ứng ở `profiles`.
- **Xác nhận Email**: Tùy cấu hình Supabase (Confirm email = true/false). Nếu bật, user nhận link qua email để kích hoạt.
- **Đăng nhập bằng Email + Password**: Gọi `supabase.auth.signInWithPassword()`. Hệ thống trả về JWT Token chứa `sub` là `user_id`.
- **Quên / Đặt lại mật khẩu**: Gọi `supabase.auth.resetPasswordForEmail()`, user nhận link đổi mật khẩu. Khi đổi thành công, `user_id` giữ nguyên, không ảnh hưởng đến `profiles` hay `role`.
- **Chống tạo trùng / Identity Linking**:
  - Giai đoạn 1 PRD chốt **chỉ dùng Email + Password** (không Google).
  - Do Supabase `auth.users.email` bị ràng buộc `UNIQUE` ở cấp độ Database, nên không bao giờ có thể tạo 2 tài khoản trùng email.
  - Role và quyền đều query dựa vào `profiles.id` (khớp với `auth.users.id`). Tài khoản là duy nhất và an toàn tuyệt đối.

---

## 10. Mô tả cơ chế Phân Quyền (RLS)

Phân quyền 3 lớp được thực thi trực tiếp tại tầng Database (RLS của PostgreSQL), bảo đảm an toàn dù API bị gọi trực tiếp:
1. **Admin**: Policy kiểm tra `get_auth_role() = 'admin'`. Trả về `TRUE` cho mọi bảng, được phép xem/sửa toàn bộ dữ liệu.
2. **Sales**: Policy kiểm tra `owner_id = auth.uid()`. Sales chỉ có thể select, update, delete những Record do mình đứng tên (Khách hàng của mình, task của mình). Không thể chọc vào dữ liệu của Sales khác.
3. **Trưởng nhóm (Team Leader)**: Policy kiểm tra xem `owner_id` của Record đó có nằm trong danh sách `user_id` thuộc nhóm do Leader quản lý hay không (thông qua hàm `is_team_leader_of`). Từ đó, Leader thấy được Khách hàng, Cơ hội, Công việc của tất cả Sales trong nhóm mình. 
