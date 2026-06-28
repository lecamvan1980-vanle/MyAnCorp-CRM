<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Oh, từ PRD ra được 1 bảng tài liệu gồm các nội dung : "Tài liệu cần có:

1. Tóm tắt hệ thống bằng ngôn ngữ kinh doanh
2. Danh sách tính năng có trong giai đoạn 1
3. Danh sách tính năng không có trong giai đoạn 1 và các giai đoạn sau, dạng bảng.
4. Timeline dự kiến theo từng giai đoạn
Yêu cầu: Viết dễ hiểu. Không dùng từ kỹ thuật. Không dùng icon. Trình bày rõ để người đọc ra quyết định nhanh
Trong danh sách tính năng giai đoạn 1, bắt buộc phải thể hiện rõ:

- Đăng ký / đăng nhập bằng email + mật khẩu
- Quên mật khẩu / đặt lại mật khẩu
- Phân quyền 3 lớp: Admin / Trưởng nhóm / Sales
- Không tạo trùng tài khoản nếu cùng một người dùng đăng nhập bằng nhiều cách". Tuy nhiên, bảng này bạn đã làm và còn google auther. Do vậy, hãy viết lại sao cho thống nhất PRD, SPEC, design brief bảng mới nhất đã được duyệt

Dưới đây là **tài liệu xác nhận tính năng** đã được viết lại, thống nhất với PRD, SPEC và Design Brief mới nhất (chỉ dùng email + mật khẩu, không còn Google).

***

## 1. Tóm tắt hệ thống bằng ngôn ngữ kinh doanh

Myan Corp hiện đang nhập khẩu và phân phối nhiều dòng sản phẩm thiết bị y tế như xe lăn, dụng cụ hỗ trợ vận động, đai nẹp y tế, vớ y khoa, thiết bị phòng bệnh… cho người bệnh, người cao tuổi, người khuyết tật, nhà thuốc, đại lý, phòng khám và bệnh viện.[^1][^2][^3]

Hệ thống CRM giai đoạn 1 được xây dựng để:

- Tập trung hóa danh sách khách hàng và khách hàng tiềm năng, tránh tình trạng dữ liệu nằm rải rác ở file cá nhân, điện thoại, Zalo.
- Quản lý cơ hội bán hàng theo từng giai đoạn, thể hiện bằng bảng kéo thả (Kanban), giúp Trưởng nhóm và Ban lãnh đạo nhìn nhanh pipeline.
- Quản lý công việc hằng ngày của nhân viên sales (gọi điện, gặp khách, gửi báo giá, follow‑up), giảm nguy cơ bỏ sót chăm sóc.
- Cung cấp một dashboard đơn giản nhưng đủ thông tin: số lượng khách hàng, cơ hội, công việc, phân khúc khách hàng để lãnh đạo ra quyết định kịp thời.

Hệ thống được thiết kế **đơn giản, rõ ràng, dễ dùng** để triển khai nhanh trong 90 ngày, nhưng vẫn có nền tảng dữ liệu vững chắc cho việc mở rộng ở các giai đoạn sau (marketing, bảo hành, tích hợp hệ thống khác).

***

## 2. Danh sách tính năng có trong giai đoạn 1

### 2.1 Tài khoản \& đăng nhập

- **Đăng ký tài khoản bằng email + mật khẩu**
Mỗi nhân viên hoặc quản lý có thể được cấp tài khoản với email và mật khẩu, dùng để truy cập CRM.
- **Đăng nhập bằng email + mật khẩu**
Người dùng truy cập hệ thống bằng đúng email và mật khẩu đã được cấp hoặc đăng ký.
- **Quên mật khẩu / đặt lại mật khẩu**
Nếu quên mật khẩu, người dùng có thể yêu cầu đặt lại; tránh gián đoạn công việc.
- **Không tạo trùng tài khoản nếu cùng một người dùng đăng nhập bằng nhiều cách “nội bộ”**
Ý nghĩa trong bối cảnh hiện tại (không còn Google):
    - Một người có thể được tạo tài khoản bởi Admin **hoặc** tự đăng ký.
    - Dù tạo bằng cách nào, nếu dùng **cùng một email**, hệ thống vẫn phải coi đó là **một người dùng duy nhất**, không được tạo hai tài khoản trùng email.


### 2.2 Phân quyền

- **Phân quyền 3 lớp: Admin / Trưởng nhóm / Sales**
    - Admin: quản lý toàn hệ thống, toàn bộ dữ liệu và người dùng.
    - Trưởng nhóm: quản lý dữ liệu của nhóm mình (các sales do mình quản lý).
    - Sales: chỉ xem và làm việc với khách hàng, cơ hội, công việc của chính mình.


### 2.3 Khách hàng

- Thêm, sửa, cập nhật khách hàng tiềm năng và khách hàng hiện hữu.
- Gắn phân khúc khách hàng: Khách lẻ, Đại lý, VIP.
- Gắn sản phẩm quan tâm (ví dụ: xe lăn, đai nẹp, vớ y khoa, thiết bị phòng bệnh…).[^2][^3][^4]
- Upload danh sách khách hàng từ file CSV.
- Xuất danh sách khách hàng ra file CSV sau khi lọc.


### 2.4 Cơ hội bán hàng (Kanban)

- Tạo cơ hội bán hàng gắn với từng khách hàng, có giá trị ước tính, sản phẩm chính, ngày dự kiến chốt.
- Hiển thị cơ hội theo dạng bảng Kanban với các cột giai đoạn: Mới, Đang tiếp cận, Đã báo giá, Chờ quyết định, Thắng, Thua.
- Kéo thả cơ hội giữa các cột để cập nhật giai đoạn.
- Ghi nhận lý do Thắng/Thua khi kết thúc cơ hội.


### 2.5 Công việc

- Tạo công việc gắn với khách hàng hoặc cơ hội (ví dụ: gọi lại, hẹn gặp, gửi báo giá).
- Quản lý trạng thái công việc: Chưa bắt đầu, Đang làm, Hoàn thành, Quá hạn.
- Mỗi nhân viên xem được danh sách công việc của mình; Trưởng nhóm xem được công việc của cả nhóm.


### 2.6 Thanh toán (mức cơ bản)

- Ghi nhận trạng thái thanh toán cho từng cơ hội: Chưa thanh toán, Thanh toán một phần, Đã thanh toán.
- Ghi chú mã đơn hàng, mã hóa đơn nếu có.
- Không thay thế hệ thống kế toán hoặc ERP, chỉ để nắm được bức tranh tổng quan trên từng cơ hội.


### 2.7 Dashboard \& báo cáo

- Dashboard hiển thị:
    - Số khách hàng mới.
    - Số cơ hội đang mở và phân bố theo giai đoạn.
    - Số công việc đến hạn.
    - Cơ cấu khách hàng theo phân khúc (Khách lẻ, Đại lý, VIP).
- Báo cáo danh sách khách hàng và cơ hội dưới dạng bảng, có bộ lọc theo phân khúc, khu vực, người phụ trách, giai đoạn.


### 2.8 Cài đặt & danh mục

- Quản lý người dùng và vai trò (Admin, Trưởng nhóm, Sales).
- Thiết lập danh mục phân khúc khách hàng.
- Thiết lập danh mục sản phẩm (xe lăn, đai nẹp, vớ y khoa, thiết bị phòng bệnh, v.v.).[^3][^4][^2]
- Thiết lập danh sách giai đoạn cơ hội (các cột trên Kanban).

### 2.9 Quản lý Sản phẩm (Mở rộng)

- Xem và tìm kiếm danh sách các sản phẩm (thiết bị y tế) do công ty phân phối.
- Quản lý thông tin chi tiết: mã sản phẩm, mô tả, giá.

### 2.10 Quản lý Nhập kho (Mở rộng)

- Xem thông tin số lượng tồn kho hiện tại của từng sản phẩm.
- Theo dõi lịch sử nhập xuất cơ bản.


***

## 3. Danh sách tính năng không có trong giai đoạn 1 và định hướng các giai đoạn sau

Bảng này làm rõ **những gì chắc chắn chưa làm** trong giai đoạn 1 để tránh kỳ vọng vượt phạm vi.


| Nhóm tính năng | Mô tả ngắn | Có trong GĐ1? | Dự kiến giai đoạn |
| :-- | :-- | :-- | :-- |
| Tự động hóa marketing | Gửi email/SMS hàng loạt, kịch bản nuôi dưỡng khách hàng tự động | Không | Giai đoạn 2 trở đi |
| Chấm điểm cơ hội nâng cao | Chấm điểm mức độ tiềm năng dựa trên dữ liệu lịch sử, giúp ưu tiên xử lý | Không | Giai đoạn 3 |
| Tích hợp hệ thống kế toán / ERP | Đồng bộ hóa đơn, công nợ, tồn kho với hệ thống kế toán/ERP | Không | Giai đoạn 2–3 |
| Quản lý tồn kho | Theo dõi tồn kho từng mã sản phẩm, từng kho/chi nhánh | Không | Ngoài phạm vi GĐ1 (có thể cân nhắc sau) |
| Quản lý hợp đồng, phê duyệt nhiều cấp | Quản lý hợp đồng, chiết khấu, điều khoản đặc biệt với quy trình phê duyệt nhiều cấp | Không | Giai đoạn 2–3 |
| Quản lý bảo hành chi tiết | Theo dõi bảo hành theo số seri, lịch sử sửa chữa, thay thế linh kiện | Không | Giai đoạn 2–3 |
| Ứng dụng di động riêng | App di động cài trên iOS/Android cho sales | Không | Giai đoạn 2 trở đi |
| Báo cáo phân tích nâng cao | Phân tích sâu theo sản phẩm, khu vực, kênh, khách hàng, lợi nhuận | Không | Giai đoạn 2–3 |
| Dashboard phân tích thời gian gần thực | Bảng điều khiển phân tích nhiều chiều, cập nhật gần thời gian thực | Không | Giai đoạn 3 |
| Tích hợp tổng đài, ghi âm cuộc gọi | Kết nối CRM với tổng đài, lưu nội dung và số lượng cuộc gọi chăm sóc khách hàng | Không | Giai đoạn 2–3 |
| Chatbot / live chat trên website | Nhận lead tự động từ website vào CRM qua chat trực tuyến | Không | Giai đoạn 2–3 |
| Hệ thống chăm sóc khách hàng sau bán (ticket) | Quản lý yêu cầu hỗ trợ, khiếu nại, thời hạn xử lý sau bán hàng | Không | Giai đoạn 2–3 |
| Tự động hóa quy trình nội bộ phức tạp | Luồng phê duyệt liên quan nhiều phòng ban (kinh doanh, kế toán, kho, vận chuyển…) | Không | Giai đoạn 3 |


***

## 4. Timeline dự kiến theo từng giai đoạn

### Giai đoạn 1 – CRM nền tảng (0 – 3 tháng)

**Mục tiêu:** Hoàn thành hệ thống CRM vận hành được với đầy đủ các tính năng đã liệt kê ở Mục 2.

- **Tháng 1**
    - Chốt phạm vi chi tiết (khớp với tài liệu này).
    - Thiết kế giao diện chính theo Design Brief đã thống nhất.
    - Bắt đầu phát triển chức năng cốt lõi (khách hàng, cơ hội, công việc, đăng nhập, phân quyền).
- **Tháng 2**
    - Hoàn thiện các module: Khách hàng, Cơ hội (Kanban), Công việc, Thanh toán cơ bản, Cài đặt, Dashboard.
    - Kiểm thử nội bộ theo từng vai trò: Admin, Trưởng nhóm, Sales.
    - Điều chỉnh giao diện, trải nghiệm theo phản hồi ban đầu.
- **Tháng 3**
    - Chạy thử với dữ liệu thật có kiểm soát (một nhóm sales).
    - Ghi nhận lỗi, vấn đề trải nghiệm, tối ưu hiệu suất.
    - Đào tạo người dùng chính, hoàn thiện tài liệu hướng dẫn.
    - Nghiệm thu giai đoạn 1 dựa trên các tiêu chí đã nêu trong PRD.


### Giai đoạn 2 – Mở rộng quản trị \& kết nối (sau giai đoạn 1, 3 – 6 tháng)

**Định hướng:**

- Bổ sung một số báo cáo phân tích sâu hơn.
- Xem xét tích hợp từng phần với hệ thống kế toán/ERP (nếu Myan Corp đã có sẵn).
- Từng bước chuẩn bị cho tự động hóa marketing đơn giản.

Thời điểm và phạm vi cụ thể sẽ được quyết định sau ít nhất 1–2 tháng vận hành thực tế giai đoạn 1.

### Giai đoạn 3 – Tự động hóa \& tối ưu (sau 6 – 12 tháng)

**Định hướng:**

- Tự động hóa quy trình nội bộ, phân tích dữ liệu sâu (chấm điểm cơ hội, tối ưu kênh, tối ưu sản phẩm).
- Xem xét triển khai ứng dụng di động riêng khi nhu cầu và nguồn lực phù hợp.

Giai đoạn 3 chỉ nên khởi động khi:

- Dữ liệu giai đoạn 1–2 đủ “sạch” và ổn định.
- Đội ngũ đã sử dụng CRM thành thói quen.
- Ban lãnh đạo đánh giá rõ được giá trị và muốn đầu tư thêm.

***

Với tài liệu này:

- **PRD** đã được chỉnh sửa để chỉ sử dụng email + mật khẩu, không còn xác thực Google.
- **Bảng SPEC**, **Design Brief** và **tài liệu xác nhận tính năng** (bản này) **đồng nhất** về:
    - Phạm vi tính năng giai đoạn 1.
    - Cách đăng nhập và quản lý tài khoản.
    - Cấu trúc phân quyền 3 lớp: Admin / Trưởng nhóm / Sales.
    - Các tính năng để dành cho giai đoạn sau.

Bạn có thể dùng tài liệu này trực tiếp cho Ban lãnh đạo để **ra quyết định phê duyệt phạm vi và lộ trình giai đoạn 1**.

<div align="center">⁂</div>

[^1]: https://myancorp.com/gioi-thieu-bk/

[^2]: https://myancorp.com/xe-lan-va-dung-cu-ho-tro/

[^3]: https://myancorp.com/vo-y-khoa/

[^4]: https://myancorp.com

