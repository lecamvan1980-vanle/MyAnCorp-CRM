<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Tôi đồng ý bảng spec, feature, design brief bạn đã làm. Tuy nhiên, PRD của tôi hình như vẫn còn xác nhận google. Vui lòng viết lại PRD sao cho tất cả các bản tôi sẽ xuất ra là SPEC, feature, deasin và PRD đồng nhất về nội dung.

Dưới đây là bản **PRD đã được viết lại**, loại bỏ hoàn toàn xác thực Google và đồng bộ với SPEC, Feature Confirmation và Design Brief hiện tại.

***

# 1. Bối cảnh và mục tiêu sản phẩm

## 1.1 Bối cảnh doanh nghiệp

My An Corp (Myan Corp) là Công ty Cổ phần có trụ sở tại TP. Hồ Chí Minh, hoạt động trong lĩnh vực Đầu tư – Thương mại – Dịch vụ, trong đó mảng nhập khẩu, phân phối và bán lẻ thiết bị y tế là hoạt động cốt lõi.[^1]

Danh mục sản phẩm của Myan Corp bao gồm xe lăn, dụng cụ hỗ trợ vận động cho người bị hạn chế chức năng vận động (dụng cụ tập, gậy, nạng, ghế vệ sinh…), đai nẹp y tế, vớ y khoa, thiết bị phòng bệnh… hướng đến người bệnh, người cao tuổi, người khuyết tật và các cơ sở y tế.[^2][^3][^4]

Điều này cho thấy Myan Corp làm việc với mạng lưới khách hàng rộng, gồm nhà thuốc, cửa hàng thiết bị y tế, phòng khám, bệnh viện, đại lý và khách lẻ.

## 1.2 Vấn đề hiện tại (giả định hợp lý)

- Thông tin khách hàng và khách hàng tiềm năng đang được lưu trữ phân tán (file Excel cá nhân, Zalo, sổ tay, email).
- Chưa có một hệ thống tập trung để theo dõi pipeline cơ hội bán hàng; khó biết ở mỗi thời điểm đang có bao nhiêu cơ hội, đang ở giai đoạn nào, do ai phụ trách.
- Phân công trách nhiệm khách hàng giữa các nhân viên sales chưa được số hóa rõ ràng, dễ dẫn đến chồng chéo hoặc bỏ sót chăm sóc.
- Quản lý cấp trung và Ban lãnh đạo khó có bức tranh tổng quan nhanh về tình hình khách hàng, cơ hội và công việc của đội ngũ trong ngắn hạn (90 ngày).


## 1.3 Mục tiêu của CRM giai đoạn 1

- Tạo một hệ thống CRM nền tảng giúp:
    - Tập trung hóa dữ liệu khách hàng và khách hàng tiềm năng.
    - Quản lý cơ hội bán hàng theo dạng Kanban kéo thả, trực quan.
    - Quản lý công việc của nhân viên sales, tránh bỏ sót hoạt động chăm sóc.
    - Cung cấp dashboard đơn giản cho Trưởng nhóm và Ban lãnh đạo theo dõi các chỉ số chính.
- Đảm bảo hệ thống đủ đơn giản để triển khai thực tế trong vòng 90 ngày, nhưng vẫn đặt nền tảng vững chắc để mở rộng ở các giai đoạn sau (marketing, bảo hành, tích hợp ERP…).

***

# 2. Chân dung người dùng

## 2.1 Admin hệ thống

- Quản lý hệ thống CRM từ góc độ vận hành và bảo mật.
- Tạo và quản lý tài khoản người dùng; gán vai trò (Admin, Trưởng nhóm, Sales).
- Cấu hình danh mục (phân khúc, sản phẩm, giai đoạn cơ hội).
- Hỗ trợ xử lý các trường hợp đặc biệt: chuyển khách hàng sang sales khác, khoá tài khoản, v.v.


## 2.2 Trưởng nhóm kinh doanh

- Quản lý một đội sales theo khu vực hoặc kênh (nhà thuốc, đại lý, bệnh viện).
- Cần xem toàn bộ khách hàng và cơ hội của nhóm, biết ai đang phụ trách, cơ hội nào bị “kẹt”.
- Phân bổ khách hàng tiềm năng cho sales, theo dõi công việc và kết quả của từng người.


## 2.3 Nhân viên kinh doanh (Sales)

- Trực tiếp tiếp cận và chăm sóc khách hàng (nhà thuốc, đại lý, bệnh viện, khách lẻ).
- Cần một công cụ đơn giản để:
    - Quản lý danh sách khách hàng của mình.
    - Tạo và cập nhật cơ hội bán hàng.
    - Quản lý công việc hằng ngày (gọi, gặp, gửi báo giá, theo dõi).

***

# 3. Danh sách module giai đoạn 1

1. Dashboard tổng quan
2. Khách hàng (Customer)
3. Cơ hội bán hàng (Opportunity – Kanban)
4. Công việc (Task)
5. Thanh toán (Payment – mức đơn giản)
6. Cài đặt (Settings: Users, Roles, Danh mục)
7. Danh mục sản phẩm (Products - Mở rộng)
8. Quản lý Nhập kho (Inventory - Mở rộng)
9. Xác thực & tài khoản (Auth & Account)

***

# 4. User flow chính

## 4.1 Sales xử lý khách hàng mới

1. Sales đăng nhập bằng email + mật khẩu.
2. Vào “Khách hàng” → bấm “Thêm khách hàng”.
3. Nhập thông tin: tên, công ty, liên hệ, phân khúc (Khách lẻ/Đại lý/VIP), sản phẩm quan tâm, khu vực, …
4. Hệ thống tạo khách hàng mới, gán owner là sales hiện tại.
5. Sales bấm “Tạo cơ hội” ngay trên hồ sơ khách hàng, nhập giá trị và giai đoạn “Mới”.
6. Sales tạo công việc đầu tiên (gọi tư vấn, gửi báo giá, hẹn demo…).
7. Sau khi thực hiện, sales cập nhật công việc, chuyển cơ hội sang giai đoạn tiếp theo bằng kéo thả trên Kanban.

## 4.2 Trưởng nhóm theo dõi pipeline

1. Trưởng nhóm đăng nhập.
2. Vào “Dashboard” xem tổng quan: số khách hàng mới, số cơ hội mở, công việc sắp đến hạn.
3. Vào “Cơ hội” → dùng filter theo “Người phụ trách = Sales A”.
4. Kiểm tra các cơ hội đang ở “Đã báo giá” quá lâu, mở chi tiết để xem lịch sử.
5. Giao thêm công việc follow‑up cho Sales A hoặc điều chỉnh người phụ trách nếu cần.

## 4.3 Admin import dữ liệu khách hàng

1. Admin đăng nhập.
2. Vào “Khách hàng” → “Upload CSV”.
3. Chọn file CSV, map cột với trường hệ thống.
4. Hệ thống báo các dòng nghi trùng (theo email/số điện thoại) và cho phép bỏ qua hoặc xử lý.
5. Sau khi import, Admin/Trưởng nhóm gán owner cho các khách hàng mới nếu chưa được gán.

***

# 5. Danh sách data fields chính

## 5.1 User (Người dùng)

- id
- email (unique)
- mật khẩu (băm, không lưu dạng thô)
- họ tên
- vai trò (Admin / Trưởng nhóm / Sales)
- nhóm/khu vực phụ trách (tuỳ chọn)
- trạng thái (active / inactive)
- ngày tạo, ngày cập nhật


## 5.2 Customer (Khách hàng)

- id
- tên khách hàng (cá nhân hoặc tổ chức)
- tên công ty (nếu có)
- phân khúc (Khách lẻ / Đại lý / VIP)
- loại khách (nhà thuốc, đại lý thiết bị y tế, phòng khám, bệnh viện, khách lẻ…)
- người liên hệ chính
- số điện thoại liên hệ
- email liên hệ
- địa chỉ
- khu vực (tỉnh/thành, vùng bán hàng)
- sản phẩm quan tâm (danh sách product_id) – ví dụ: xe lăn, đai nẹp y tế, vớ y khoa, thiết bị phòng bệnh…[^3][^4][^2]
- owner_id (người phụ trách)
- trạng thái khách hàng (tiềm năng / đang giao dịch / tạm ngưng / ngừng hợp tác)
- ngày tạo, ngày cập nhật


## 5.3 Product (Sản phẩm)

- id
- tên sản phẩm
- nhóm sản phẩm (xe lăn và dụng cụ hỗ trợ, đai nẹp y tế, vớ y khoa, thiết bị phòng bệnh, phục hồi chức năng…)[^4][^2][^3]
- mã sản phẩm nội bộ (nếu có)
- mô tả ngắn
- trạng thái (active / inactive)


## 5.4 Opportunity (Cơ hội)

- id
- customer_id
- tên cơ hội
- mô tả ngắn
- sản phẩm chính (product_id)
- danh sách sản phẩm liên quan (tùy chọn)
- giá trị ước tính (VND)
- giai đoạn (stage: New, Đang tiếp cận, Đã báo giá, Chờ quyết định, Won, Lost)
- xác suất (tuỳ chọn, không bắt buộc giai đoạn 1)
- owner_id
- ngày dự kiến chốt
- lý do thắng/thua (text)
- ngày tạo, ngày cập nhật


## 5.5 Task (Công việc)

- id
- tiêu đề
- mô tả
- loại công việc (gọi điện, gặp trực tiếp, gửi email, gửi báo giá, follow‑up…)
- mức ưu tiên (Thấp / Trung bình / Cao)
- trạng thái (Chưa bắt đầu / Đang làm / Hoàn thành / Quá hạn)
- ngày đến hạn
- ngày hoàn thành (nếu có)
- owner_id
- customer_id (tuỳ chọn)
- opportunity_id (tuỳ chọn)
- ngày tạo, ngày cập nhật


## 5.6 ActivityLog (Lịch sử hoạt động)

- id
- loại hoạt động (tạo khách hàng, cập nhật khách hàng, tạo cơ hội, chuyển giai đoạn, tạo công việc, cập nhật công việc…)
- mô tả
- actor_id (người thực hiện)
- customer_id (tuỳ chọn)
- opportunity_id (tuỳ chọn)
- thời gian thực hiện


## 5.7 PaymentRecord (Thanh toán đơn giản)

- id
- opportunity_id
- trạng thái thanh toán (Chưa thanh toán / Đã thanh toán một phần / Đã thanh toán)
- mã đơn hàng / hóa đơn (text)
- số tiền đã thanh toán (tuỳ chọn)
- ghi chú
- ngày cập nhật gần nhất

***

# 6. Quy tắc phân quyền

## 6.1 Theo vai trò

- **Admin**
    - Toàn quyền với người dùng, phân quyền, danh mục, dữ liệu khách hàng, cơ hội, công việc, thanh toán.
- **Trưởng nhóm**
    - Toàn quyền xem/chỉnh sửa dữ liệu thuộc nhóm mình (các khách hàng, cơ hội, công việc có owner là sales trong nhóm).
- **Sales**
    - Chỉ xem/chỉnh sửa dữ liệu do mình phụ trách hoặc được chia sẻ.


## 6.2 Theo bản ghi (row‑level)

- Khách hàng, Cơ hội, Công việc, Thanh toán:
    - Admin: đọc/ghi toàn bộ.
    - Trưởng nhóm: đọc/ghi bản ghi của sales trong nhóm.
    - Sales: đọc/ghi bản ghi có owner_id = chính mình (hoặc được share).
- Người dùng:
    - Admin: quản lý toàn bộ.
    - Trưởng nhóm / Sales: chỉ xem và chỉnh sửa hồ sơ cá nhân (trừ vai trò và quyền).


## 6.3 Mục tiêu

- Bảo vệ dữ liệu khách hàng là tài sản của Myan Corp.
- Tránh chồng chéo trách nhiệm giữa các sales.
- Vẫn đảm bảo quản lý thấy được bức tranh tổng thể để điều hành.

***

# 7. Yêu cầu giao diện và phong cách thiết kế (tóm tắt, đồng bộ Design Brief)

- Phong cách: y tế – tin cậy – hiện đại – rõ ràng; bám tông xanh/trắng giống hình ảnh Myan Corp.[^3][^1]
- Color palette: primary xanh Myan, nền sáng, chữ đậm dễ đọc, màu trạng thái đơn giản (success, warning, error).
- Typography: một font sans-serif hiện đại (Inter/Roboto), cỡ chữ thân thiện (Body 14px, Heading 16–24px).
- Layout:
    - Sidebar trái cho điều hướng.
    - Top bar trên cho logo, tên trang, tài khoản.
    - Content area chia theo card.
- Component:
    - Card (bo góc, shadow nhẹ).
    - Button (primary/secondary, rõ ràng).
    - Input (label, placeholder rõ, highlight khi focus).
    - Badge (phân khúc, trạng thái).
    - Sidebar (màu đậm, item active có highlight).
    - Kanban card (thông tin tóm tắt, kéo thả mượt).

(Chi tiết đã được trình bày trong Design Brief và không lặp lại toàn bộ ở đây.)

***

# 8. Yêu cầu kỹ thuật mức cao

- Web app CRM chạy trên nền web, tương thích tốt với trình duyệt hiện đại.
- Dữ liệu được lưu trên cơ sở dữ liệu đám mây, hỗ trợ vận hành thật và mở rộng.
- Tách rõ:
    - Tầng giao diện (frontend).
    - Tầng dữ liệu và nghiệp vụ (backend / dịch vụ cloud).
- Quan tâm:
    - Bảo mật truy cập (HTTPS, bảo vệ mật khẩu).
    - Phân quyền ở cấp dữ liệu theo vai trò.
    - Khả năng import/export CSV ổn định.

***

# 9. Tiêu chí nghiệm thu giai đoạn 1

1. **Đăng ký / Đăng nhập / Quên mật khẩu**
    - Người dùng đăng ký và đăng nhập được bằng email + mật khẩu.
    - Quên mật khẩu hoạt động và đặt được mật khẩu mới.
    - Không tạo được hai tài khoản dùng chung một email.
2. **Khách hàng**
    - Thêm/sửa khách hàng với đầy đủ trường bắt buộc.
    - Gán được phân khúc và sản phẩm quan tâm.
    - Upload được danh sách khách hàng từ CSV mẫu.
    - Xuất được danh sách khách hàng ra CSV theo bộ lọc.
3. **Cơ hội – Kanban**
    - Tạo cơ hội gắn với khách hàng.
    - Xem cơ hội theo dạng Kanban với các giai đoạn chuẩn.
    - Kéo thả thẻ cơ hội giữa các cột và giai đoạn được cập nhật chính xác.
4. **Công việc**
    - Tạo công việc gắn với khách hàng hoặc cơ hội.
    - Cập nhật trạng thái, tự đánh dấu “Quá hạn” khi trễ.
    - Mỗi người dùng xem được danh sách công việc của mình.
5. **Thanh toán đơn giản**
    - Gắn trạng thái thanh toán cho cơ hội.
    - Ghi chú mã đơn hàng/hóa đơn.
6. **Dashboard \& báo cáo cơ bản**
    - Dashboard hiển thị đúng các chỉ số cơ bản (khách hàng mới, cơ hội mở, công việc đến hạn, biểu đồ phân khúc).
    - Báo cáo danh sách khách hàng/cơ hội lọc được theo phân khúc, khu vực, người phụ trách.
7. **Quản lý Sản phẩm & Nhập kho (Mở rộng)**
    - Quản lý danh sách thiết bị y tế (mã, tên, giá).
    - Cập nhật số lượng nhập kho, vị trí lưu trữ.
8. **Phân quyền**
    - Sales chỉ nhìn thấy dữ liệu của mình.
    - Trưởng nhóm nhìn thêm dữ liệu của sales trong nhóm.
    - Admin nhìn được toàn bộ.

***

# 10. Yêu cầu xác thực và quản lý tài khoản (đã loại Google, đồng bộ với SPEC)

- Chỉ sử dụng **email + mật khẩu** cho đăng ký và đăng nhập trong giai đoạn 1.
- Mỗi email tương ứng với **một** tài khoản duy nhất:
    - Khi đăng ký, nếu email đã tồn tại, hệ thống báo lỗi và không cho tạo thêm.
- Quên mật khẩu / đặt lại mật khẩu được hỗ trợ.
- Vai trò và quyền truy cập:
    - Gắn với User (theo email).
    - Không thay đổi khi người dùng đổi mật khẩu.
- Không có xác thực bằng Google hoặc bất kỳ phương thức đăng nhập bên thứ ba nào trong giai đoạn 1.

***

Với bản PRD này, toàn bộ:

- **PRD**
- **Bảng SPEC chức năng**
- **Tài liệu xác nhận tính năng**
- **Design Brief**

đều thống nhất về phạm vi và cách xác thực (chỉ email + mật khẩu, không có Google), phù hợp để bạn xuất bản và dùng làm “single source of truth” cho dự án CRM Myan Corp.
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://myancorp.com/gioi-thieu-bk/

[^2]: https://myancorp.com/xe-lan-va-dung-cu-ho-tro/

[^3]: https://myancorp.com

[^4]: https://myancorp.com/vo-y-khoa/

[^5]: https://syt.gialai.gov.vn/vi/news/kham-chua-benh-15/80-nguoi-khuyet-tat-tai-7-xa-du-an-duoc-nhan-dung-cu-tro-giup-tu-du-an-hoa-nhap-2b-3271.html

[^6]: https://www.nguoikhuyettathcm.org

[^7]: https://nhandan.vn/them-co-hoi-hoa-nhap-cho-nguoi-khuyet-tat-post914190.html

[^8]: http://trungtamytequan6.medinet.gov.vn/chuyen-muc/thu-tuc-cap-muc-huong-bao-hiem-y-te-cho-nguoi-khuyet-tat-nhu-the-nao-cmobile16708-153271.aspx

[^9]: https://www.oucru.org/wp-content/uploads/2020/06/ThтФЬтФдng-tin-c╤БтХС╨╖n-thi╤БтХСтФРt-cho-ngтХЮтЦС╤БтХЧ╨нi-khuy╤БтХСтФРt-t╤БтХС╨╜t-khu-v╤БтХЧтЦТc-phтФЬ╨╜a-Nam-Vi╤БтХЧ╨Чt-Nam.pdf

[^10]: https://dienbandong.danang.gov.vn/tin-tuc-su-kien/mot-so-chinh-sach-tro-giup-xa-hoi-tren-dia-ban-thanh-pho-co-hieu-luc-tu-ngay-01-01-2026.html

[^11]: https://sieuthixelan.vn

[^12]: http://baohiemxahoidientu.vn/bhxh/dieu-kien-huong-tro-cap-nguoi-khuyet-tat.html

[^13]: https://myancorp.com/xe-lan-va-dung-cu-ho-tro/xe-day/

[^14]: https://www.facebook.com/groups/469690474361250/posts/1685976662732619/

[^15]: https://www.youtube.com/watch?v=5FgC0vX_IYA

[^16]: https://phcn-online.com/intervention/xe-lan/

[^17]: https://www.facebook.com/TruyenHinhCongAn/videos/an-ninh-với-cuộc-sống-trung-tâm-bảo-trợ-xã-hội-nơi-sưởi-ấm-những-phận-đời-bất-hạ/769876259534751/

