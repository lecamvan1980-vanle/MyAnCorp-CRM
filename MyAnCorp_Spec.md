<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Okie, bước tiếp theo Dựa trên PRD và tài liệu xác nhận tính năng đã chốt, hãy tạo một Design Brief hoàn chỉnh.

Yêu cầu phong cách: tự sáng tạo một chuyên gia UX UI
Design Brief cần có:

1. Color palette
2. Typography
3. Layout structure cho các trang.
4. Component style: Card, Button, Input, Badge, Sidebar, Kanban card
5. Dữ liệu mẫu:

- 6 khách hàng tiềm năng: tên người thật Việt Nam, công ty thật, phân khúc và sản phẩm quan tâm khác nhau, giá trị đơn hàng dự kiến bằng VND
- 5 công việc: liên quan ngành, có priority và deadline thực tế
- 3 danh sách khách hàng: tên phù hợp với cách phân nhóm.
PRD ở trên
Feature Confirmation ở trên

Dưới đây là Design Brief cho web app CRM Myan Corp, dựa trên PRD và tài liệu xác nhận tính năng đã chốt, đồng thời tham chiếu bối cảnh Myan Corp phân phối thiết bị y tế, xe lăn, dụng cụ hỗ trợ vận động, đai nẹp, vớ y khoa, thiết bị phòng bệnh…[^1][^2][^3]

***

## 1. Color palette

Định hướng: cảm giác **y tế – tin cậy – sạch – hiện đại**, bám tinh thần xanh/trắng của Myan Corp và ngành thiết bị y tế.[^2][^1]

**Nhóm màu chính**

- Primary 500 – Xanh Myan: `#0084A8`
    - Dùng cho: nút chính (primary button), link quan trọng, trạng thái đang chọn.
- Primary 700 – Xanh đậm: `#00566F`
    - Dùng cho: header, hover button, text nhấn mạnh trên nền sáng.
- Secondary – Xanh lá nhẹ (sức khỏe): `#1C7C54`
    - Dùng cho: trạng thái “Thành công”, KPI tốt, badge “Won”.
- Accent – Cam cảnh báo: `#F97316`
    - Dùng cho: trạng thái “Quá hạn”, “Lost”, thông báo cảnh báo nhẹ.

**Nhóm màu nền và đường viền**

- Background app: `#F5F7FA`
- Surface (card, bảng, modal): `#FFFFFF`
- Border nhẹ: `#E0E6ED`
- Divider mảnh: `#D1D5DB`

**Nhóm màu chữ**

- Text chính: `#111827`
- Text thứ cấp (mô tả, label nhỏ): `#6B7280`
- Text disabled: `#9CA3AF`
- Link: màu primary 500, khi hover dùng primary 700.

**Màu trạng thái**

- Success: `#16A34A` (nút/label thành công, badge “Đã thanh toán / Won”).
- Warning: `#FACC15` (cảnh báo nhẹ).
- Error: `#DC2626` (lỗi, trường bắt buộc chưa điền).
- Info: `#0EA5E9` (thông tin bổ sung).

***

## 2. Typography

**Font đề xuất**

- Font chính: **Inter** (hoặc Roboto nếu cần tính hệ thống cao) – dễ đọc, hiện đại, phù hợp UI.
- Font fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

**Thang chữ**

- H1 (tiêu đề trang): 24px, đậm, dùng ít (ví dụ “Dashboard”, “Danh sách khách hàng”).
- H2 (tiêu đề khối): 18px, đậm, dùng cho tên section (ví dụ “Cơ hội đang mở”, “Công việc hôm nay”).
- H3 (tiêu đề nhỏ trong card): 16px, đậm (tên khách hàng, tên cơ hội).
- Body: 14px, trọng lượng thường, dùng cho nội dung, mô tả, label.
- Caption / Meta: 12px, dùng cho thời gian, trạng thái, thông tin phụ.

**Nguyên tắc sử dụng**

- Dùng một font duy nhất cho toàn hệ thống để tạo cảm giác thống nhất.
- Hạn chế chữ in hoa toàn bộ, chỉ dùng cho badge hoặc label ngắn (VD: “VIP”, “WON”).
- Khoảng cách dòng:
    - Heading: line-height 1.3
    - Body: line-height 1.5

***

## 3. Layout structure cho các trang chính

### 3.1 Khung layout chung

- **Top Bar** (chiều cao ~56px):
    - Logo Myan Corp bên trái.
    - Tên trang ở giữa hoặc trái (VD: “Dashboard”, “Khách hàng”).
    - Bên phải: icon thông báo (sau này), tên người dùng và menu tài khoản (Profile, Đăng xuất).
- **Sidebar trái** (rộng ~240px):
    - Mục điều hướng chính:
        - Dashboard
        - Khách hàng
        - Cơ hội (Kanban)
        - Công việc
        - Thanh toán (simple)
        - Cài đặt (chỉ Admin)
    - Item đang chọn có nền Primary rất nhạt + viền trái primary 500.
- **Content area**:
    - Toàn bộ nội dung nằm trong vùng này, có padding 24px, nền `#F5F7FA`.
    - Mỗi khối nội dung nằm trong card trắng, có shadow nhẹ.

***

### 3.2 Trang Dashboard

**Mục tiêu**: giúp mỗi vai trò thấy nhanh tình hình tổng quan trong tuần/tháng.

**Layout**

- Hàng 1:
    - H1: “Dashboard”
    - Bên phải: bộ lọc thời gian (7 ngày, 30 ngày, tùy chọn).
- Hàng 2 – Các KPI card (4 card, mỗi card 1/4 chiều ngang):
    - “Khách hàng mới” (số lượng).
    - “Cơ hội đang mở”.
    - “Tổng giá trị cơ hội mở”.
    - “Công việc đến hạn hôm nay/tuần này”.
- Hàng 3:
    - Trái: Biểu đồ tròn “Cơ cấu khách hàng theo phân khúc” (Khách lẻ / Đại lý / VIP).
    - Phải: Danh sách “Top 5 cơ hội gần đây” (tên khách hàng, phân khúc, giá trị, giai đoạn).
- Hàng 4:
    - Bảng “Công việc sắp đến hạn” (5–10 dòng).

***

### 3.3 Trang “Danh sách khách hàng”

**Mục tiêu**: cho phép sales, trưởng nhóm, admin xem và thao tác trên khách hàng.

**Layout**

- Header:
    - H1: “Khách hàng”
    - Bên phải: nút “Thêm khách hàng”, nút “Upload CSV”, nút “Xuất CSV”.
- Thanh filter ngang (dưới header):
    - Ô tìm kiếm tên khách hàng / công ty.
    - Filter phân khúc (dropdown: Tất cả / Khách lẻ / Đại lý / VIP).
    - Filter sản phẩm quan tâm (multi-select).
    - Filter người phụ trách (Trưởng nhóm/Admin).
- Bảng dữ liệu (table):
    - Cột đề xuất:
        - Tên khách hàng / công ty
        - Phân khúc (badge màu)
        - Sản phẩm quan tâm (badge nhỏ)
        - Người phụ trách
        - Giá trị cơ hội mở (tổng ước tính)
        - Trạng thái (Tiềm năng / Đang giao dịch / Tạm ngưng)
        - Action (Xem chi tiết).
- Modal “Thêm/Sửa khách hàng”:
    - Chia thành 2 cột:
        - Cột trái: thông tin cơ bản (tên, loại khách, liên hệ, khu vực).
        - Cột phải: phân khúc, sản phẩm quan tâm (multi-select), người phụ trách, ghi chú.

***

### 3.4 Trang “Cơ hội” – Kanban

**Mục tiêu**: quản lý pipeline cơ hội dạng trực quan.

**Layout**

- Header:
    - H1: “Cơ hội bán hàng”
    - Bên phải: nút “Tạo cơ hội”.
- Filter ngang:
    - Filter theo người phụ trách (Sales).
    - Filter theo phân khúc khách hàng.
    - Filter theo sản phẩm quan tâm.
- Vùng Kanban:
    - 6 cột (New, Đang tiếp cận, Đã báo giá, Chờ quyết định, Won, Lost).
    - Mỗi cột độ rộng linh hoạt, scroll ngang nếu không đủ.
    - Bên trong là các Kanban card (xem phần Components).
- Click card mở Slide-over panel bên phải:
    - Thông tin chi tiết cơ hội: khách hàng, giá trị, sản phẩm, lịch sử, công việc liên quan.

***

### 3.5 Trang “Công việc”

**Mục tiêu**: giúp sales quản lý việc cần làm; trưởng nhóm nhìn được việc của team.

**Layout**

- Header:
    - H1: “Công việc”
    - Bên phải: nút “Thêm công việc”.
- Filter:
    - Tìm theo tiêu đề.
    - Lọc theo trạng thái (Chưa bắt đầu / Đang làm / Hoàn thành / Quá hạn).
    - Lọc theo deadline (hôm nay / tuần này / tháng này).
- Danh sách:
    - Có thể chọn giữa dạng bảng (Table) hoặc dạng “My tasks today” (card list).
    - Cột: Tên công việc, Ưu tiên, Deadline, Liên quan đến (Khách hàng/Cơ hội), Trạng thái, Người phụ trách.

***

### 3.6 Trang “Cài đặt”

**Mục tiêu**: Admin quản lý danh mục và người dùng.

**Layout**

- Sidebar phụ bên trái (trong trang Cài đặt):
    - Người dùng \& vai trò
    - Phân khúc khách hàng
    - Danh mục sản phẩm
    - Giai đoạn cơ hội
- Vùng nội dung:
    - Mỗi mục hiển thị dạng bảng + modal tạo/sửa.

***

## 4. Component style

### 4.1 Card

- Nền: `#FFFFFF`
- Bo góc: 8px
- Bóng nhẹ: 0 1px 2px rgba(15, 23, 42, 0.05)
- Padding: 16–20px
- Title (H3): 16px, đậm; mô tả 14px, text thứ cấp.
- Trạng thái hover: viền `#E5E7EB`, shadow nhỉnh hơn nhẹ.


### 4.2 Button

- **Primary button**:
    - Nền: Primary 500 (`#0084A8`)
    - Chữ: trắng
    - Bo góc: 6px
    - Padding: 8px 16px
    - Hover: Primary 700 (`#00566F`)
    - Disabled: nền `#9CA3AF`, chữ `#F9FAFB`.
- **Secondary button**:
    - Nền: trắng
    - Viền: `#D1D5DB`
    - Chữ: `#111827`
    - Hover: nền `#F3F4F6`.
- **Text button**:
    - Không viền, chữ màu primary 500, dùng cho hành động phụ (VD: “Xem tất cả”).


### 4.3 Input (Text field / Select)

- Nền: trắng
- Viền: `#D1D5DB` (1px)
- Bo góc: 6px
- Padding: 8px 12px
- Focus: viền primary 500, shadow nhẹ.
- Label: 12px, text thứ cấp; trường bắt buộc có dấu “*” màu đỏ.


### 4.4 Badge (phân khúc, trạng thái)

- Kiểu pill (bo góc 999px).
- Padding ngang 8px, dọc 2–4px.
- Ví dụ:
    - Khách lẻ: nền `#DBEAFE`, chữ `#1D4ED8`.
    - Đại lý: nền `#DCFCE7`, chữ `#15803D`.
    - VIP: nền `#FEF3C7`, chữ `#B45309`.
    - Won: nền `#DCFCE7`, chữ `#166534`.
    - Lost: nền `#FEE2E2`, chữ `#B91C1C`.
    - Quá hạn: nền `#FEF3C7`, chữ `#92400E`.


### 4.5 Sidebar

- Nền sidebar: `#0F172A` hoặc xanh đậm gần primary 700, chữ trắng.
- Item:
    - Cao 40–44px, padding ngang 16px.
    - Item đang chọn: nền `rgba(255,255,255,0.08)`, thanh highlight 3px bên trái màu primary 500.
    - Chữ: 14px, medium; icon nếu có nên đơn giản, một màu.


### 4.6 Kanban card (Cơ hội)

- Card nhỏ, chiều rộng khoảng 260–280px.
- Nội dung:
    - Line 1: Tên khách hàng (đậm) + badge phân khúc.
    - Line 2: Sản phẩm chính (text 12–14px).
    - Line 3: Giá trị ước tính (in đậm, format VND).
    - Line 4: Metadata (người phụ trách, số ngày ở giai đoạn) dạng text mờ.
- Nền: trắng, viền `#E5E7EB`, bo góc 8px, shadow nhẹ.
- Hover: nâng nhẹ (shadow tăng), con trỏ dạng “grab” khi kéo.

***

## 5. Dữ liệu mẫu

### 5.1 6 khách hàng tiềm năng (sample data)

| Tên khách hàng | Công ty | Phân khúc | Sản phẩm quan tâm | Giá trị đơn hàng dự kiến (VND) |
| :-- | :-- | :-- | :-- | :-- |
| Nguyễn Thị Mai | Nhà thuốc Long Châu – Chi nhánh Quang Trung | Đại lý | Đai nẹp y tế, vớ y khoa (phòng ngừa suy giãn tĩnh mạch cho khách văn phòng)[^3] | 180.000.000 |
| Trần Văn Hùng | Phòng khám Đa khoa Hoàn Mỹ Gò Vấp | VIP | Xe lăn và dụng cụ hỗ trợ vận động cho bệnh nhân sau mổ và người cao tuổi[^2] | 320.000.000 |
| Lê Thu Trang | Công ty TNHH Thiết Bị Y Tế An Phát | Đại lý | Đai nẹp phục hồi chức năng, thiết bị phòng bệnh cho bệnh viện tuyến huyện[^4][^2] | 450.000.000 |
| Phạm Quốc Dũng | Bệnh viện Nhân Dân 115 | VIP | Xe lăn nằm, dụng cụ tập phục hồi chức năng sau phẫu thuật xương khớp[^2] | 600.000.000 |
| Vũ Minh Anh | Khách lẻ (cá nhân, làm văn phòng) | Khách lẻ | Đai lưng sinh học, vớ y khoa phòng ngừa đau lưng và suy giãn tĩnh mạch[^3][^5] | 5.500.000 |
| Đoàn Hải Nam | Siêu thị Thiết bị Y tế Thanh Tuấn | Đại lý | Xe lăn du lịch, ghế vệ sinh, gậy chống cho người cao tuổi[^2] | 220.000.000 |

> Lưu ý: đây là dữ liệu mô phỏng cho mục đích thiết kế giao diện; giá trị đơn hàng có thể điều chỉnh cho phù hợp thực tế.

***

### 5.2 5 công việc mẫu

| Tên công việc | Liên quan | Priority | Deadline | Ghi chú |
| :-- | :-- | :-- | :-- | :-- |
| Gọi tư vấn đai nẹp lưng cho Nhà thuốc Long Châu Quang Trung | Khách hàng: Nguyễn Thị Mai | Cao | 30/06/2026 | Xác nhận nhu cầu nhập thử 3 mã đai nẹp bán chạy cho nhóm khách văn phòng. |
| Demo xe lăn linh hoạt tại Phòng khám Hoàn Mỹ Gò Vấp | Khách hàng: Trần Văn Hùng | Cao | 02/07/2026 | Mang 2 mẫu xe lăn linh hoạt và 1 mẫu xe lăn du lịch để demo cho khoa phục hồi chức năng. |
| Gửi báo giá combo thiết bị phòng bệnh cho An Phát | Khách hàng: Lê Thu Trang | Trung bình | 05/07/2026 | Gói gồm xe lăn, ghế vệ sinh, dụng cụ tập cho 3 phòng bệnh chuẩn. |
| Follow‑up hợp đồng cung cấp xe lăn cho BV Nhân Dân 115 | Cơ hội: Xe lăn cho khoa Nội tổng hợp | Cao | 01/07/2026 | Kiểm tra tiến độ phê duyệt, đề xuất bổ sung điều khoản bảo hành. |
| Cập nhật feedback khách lẻ về đai lưng sinh học | Khách hàng: Vũ Minh Anh | Thấp | 03/07/2026 | Gọi lại sau 2 tuần sử dụng để ghi nhận trải nghiệm, làm case study. |


***

### 5.3 3 danh sách khách hàng (list mẫu)

Các danh sách này dùng cho tính năng lọc/nhóm trong UI (ví dụ saved filters, segment):

1. **Đại lý thiết bị y tế khu vực TP.HCM**
    - Điều kiện lọc:
        - Phân khúc: Đại lý
        - Khu vực: TP.HCM
    - Mục đích: phân bổ chăm sóc cho đội sales kênh đại lý tại khu vực đông dân và nhiều bệnh viện.
2. **Nhà thuốc trọng điểm miền Trung**
    - Điều kiện lọc:
        - Loại khách: Nhà thuốc
        - Khu vực: Đà Nẵng, Huế, Quảng Nam, Quảng Ngãi
        - Phân khúc: Đại lý hoặc VIP
    - Mục đích: chuẩn bị chiến dịch giới thiệu dòng đai nẹp và vớ y khoa cho khu vực miền Trung, nơi tỉ lệ bệnh lý tĩnh mạch chi dưới đang tăng (giả định hợp lý, dùng làm insight thiết kế).
3. **Khách lẻ văn phòng quan tâm đai lưng \& vớ y khoa**
    - Điều kiện lọc:
        - Phân khúc: Khách lẻ
        - Sản phẩm quan tâm: Đai lưng sinh học, vớ y khoa[^3][^5]
    - Mục đích: nhóm này phục vụ các chiến dịch nhỏ (email, telesales) hướng tới nhân viên văn phòng có nguy cơ đau lưng và suy giãn tĩnh mạch, đồng thời dùng làm mẫu để thử nghiệm tính năng CRM.

***

Design Brief này đủ chi tiết để:

- UX/UI designer bắt đầu dựng wireframe và visual design.
- Dev front‑end hiểu được cấu trúc màn hình, component, style.
- Product owner và Ban lãnh đạo dùng làm “thước đo” khi review giao diện so với PRD và tài liệu chức năng đã chốt.

<div align="center">⁂</div>

[^1]: https://myancorp.com/gioi-thieu-bk/

[^2]: https://myancorp.com/xe-lan-va-dung-cu-ho-tro/

[^3]: https://myancorp.com/vo-y-khoa/

[^4]: https://myancorp.com/dai-nep-ho-tro-y-te/

[^5]: https://myancorp.com

