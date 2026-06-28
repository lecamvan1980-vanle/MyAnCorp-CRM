---
name: Myan Healthcare Interface
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#3e484d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#6e797e'
  outline-variant: '#bec8ce'
  surface-tint: '#006783'
  primary: '#006480'
  on-primary: '#ffffff'
  primary-container: '#007ea1'
  on-primary-container: '#fbfdff'
  inverse-primary: '#74d2f9'
  secondary: '#545f72'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f7'
  on-secondary-container: '#586377'
  tertiary: '#565d63'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f757c'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bce9ff'
  primary-fixed-dim: '#74d2f9'
  on-primary-fixed: '#001f2a'
  on-primary-fixed-variant: '#004d64'
  secondary-fixed: '#d8e3fa'
  secondary-fixed-dim: '#bcc7dd'
  on-secondary-fixed: '#111c2c'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  card-gap: 20px
  stack-sm: 8px
  stack-md: 16px
---

## Brand & Style

Hệ thống thiết kế tập trung vào sự tin cậy, chính xác và hiệu quả chuyên nghiệp dành riêng cho lĩnh vực quản lý thiết bị y tế. Phong cách chủ đạo là **Modern Corporate (Doanh nghiệp Hiện đại)**, đề cao sự sạch sẽ và tối giản để giảm bớt gánh nặng nhận thức cho người dùng khi xử lý dữ liệu phức tạp.

**Cảm hứng thiết kế:**
- **Sự minh bạch:** Sử dụng không gian trắng (white space) rộng rãi và phân cấp thông tin rõ ràng.
- **Sự tin cậy:** Màu sắc và hình khối được tính toán để tạo cảm giác vững chãi, an tâm.
- **Tính hệ thống:** Mọi thành phần được module hóa cao độ, đảm bảo tính nhất quán trên toàn bộ ứng dụng CRM.

Giao diện hướng tới sự chuyên nghiệp tuyệt đối, giúp nhân viên y tế và quản lý thiết bị vận hành hệ thống một cách trơn tru, ít sai sót nhất.

## Colors

Bảng màu được xây dựng dựa trên sắc xanh đặc trưng của doanh nghiệp, kết hợp với các tông màu trung tính lạnh để tạo ra môi trường làm việc dịu mắt và chuyên nghiệp.

- **Primary (Xanh Myan - #0084A8):** Sử dụng cho các hành động chính, trạng thái active và nhận diện thương hiệu cốt lõi.
- **Background (#F5F7FA):** Màu nền chính của ứng dụng, tạo sự tách biệt nhẹ nhàng với các khối nội dung màu trắng.
- **Surface (White - #FFFFFF):** Sử dụng cho các thẻ (cards), bảng biểu và các vùng chứa nội dung chính.
- **Neutral/Text:** Màu xám đậm (#2D3748) cho văn bản chính và xám nhạt hơn cho các thông tin phụ trợ.
- **Semantic Colors:** Sử dụng các tông màu xanh lá, đỏ và vàng có độ bão hòa vừa phải để thông báo trạng thái thiết bị mà không gây cảm giác báo động quá mức.

## Typography

Hệ thống sử dụng duy nhất font family **Inter** nhờ tính đa dụng, khả năng hiển thị con số rõ ràng và phong cách hiện đại.

- **Cấu trúc:** Phân cấp rõ rệt giữa tiêu đề và nội dung để người dùng dễ dàng quét nhanh dữ liệu thiết bị.
- **Ưu tiên:** Độ tương phản về trọng lượng (font weight) được sử dụng thay vì thay đổi quá nhiều về kích thước font để giữ sự tinh tế.
- **Số liệu:** Đối với các bảng dữ liệu kỹ thuật, ưu tiên sử dụng `body-md` với các biến thể `tabular-nums` để các con số thẳng hàng, dễ so sánh.

## Layout & Spacing

Hệ thống sử dụng **Fluid Grid (Lưới linh hoạt)** 12 cột cho phiên bản Desktop để tối ưu hóa không gian hiển thị báo cáo và danh sách thiết bị.

- **Nguyên tắc Spacing:** Dựa trên hệ số 4px (4, 8, 12, 16, 24, 32...).
- **Margins:** Lề ngoài cùng của trang web được cố định ở mức 24px trên Desktop và 16px trên Mobile.
- **Phân tách:** Sử dụng khoảng trắng thay vì đường kẻ phân cách bất cứ khi nào có thể để giữ giao diện thoáng đãng.
- **Mobile Adaptive:** Trên các thiết bị di động, hệ thống tự động chuyển về bố cục 1 cột, các nút bấm chính được kéo dài toàn chiều ngang (full-width) để dễ dàng thao tác bằng ngón tay cái.

## Elevation & Depth

Giao diện sử dụng phương pháp **Tonal Layers** kết hợp với bóng đổ cực nhẹ để tạo chiều sâu mà không làm mất đi tính phẳng và hiện đại.

- **Bóng đổ (Shadows):** Chỉ sử dụng cho các thẻ (cards) và menu thả xuống (dropdowns). Chỉ số shadow rất thấp: `0px 2px 4px rgba(0, 0, 0, 0.05)`.
- **Phân tầng:**
    - **Mức 0 (Nền):** #F5F7FA.
    - **Mức 1 (Thẻ nội dung):** Màu trắng, có shadow nhẹ và viền (border) 1px màu #E2E8F0.
    - **Mức 2 (Popovers/Modals):** Nổi bật hẳn lên với bóng đổ đổ đậm hơn một chút để tập trung sự chú ý.
- **Tương tác:** Khi di chuột qua (hover) các thẻ có khả năng tương tác, shadow có thể đậm hơn một chút để tạo phản hồi thị giác.

## Shapes

Hệ thống hình khối sử dụng các góc bo tròn nhỏ, tạo cảm giác chuyên nghiệp nhưng vẫn đủ mềm mại, dễ gần.

- **Thẻ nội dung (Cards):** Bo góc 8px (rounded-lg) để tạo sự vững chãi cho các khối thông tin lớn.
- **Nút bấm & Ô nhập liệu:** Bo góc 6px để đồng bộ hóa các thành phần điều khiển, tạo sự sắc sảo hơn so với các khối nội dung.
- **Trạng thái (Badges):** Có thể sử dụng bo góc hoàn toàn (pill-shaped) để phân biệt rõ ràng với các nút bấm chức năng.

## Components

**1. Nút bấm (Buttons):**
- **Primary:** Nền xanh #0084A8, chữ trắng. Bo góc 6px.
- **Secondary:** Viền xanh #0084A8, nền trắng, chữ xanh.
- **Ghost:** Không nền, chữ xanh hoặc xám đậm, dùng cho các hành động phụ.

**2. Ô nhập liệu (Input Fields):**
- Trạng thái bình thường: Viền màu xám nhạt (#E2E8F0), bo góc 6px.
- Trạng thái Focus: Viền chuyển sang màu xanh Myan (#0084A8) với hiệu ứng bóng mờ (ring) nhẹ xung quanh.
- Label nằm phía trên ô nhập liệu, sử dụng `label-sm` màu xám đậm.

**3. Thẻ (Cards):**
- Nền trắng tuyệt đối (#FFFFFF), bo góc 8px.
- Shadow cực mỏng để tách biệt với nền xám nhạt của ứng dụng.
- Padding chuẩn bên trong là 20px hoặc 24px.

**4. Bảng dữ liệu (Data Tables):**
- Header bảng có nền xám cực nhạt (#EDF2F7) hoặc trắng với đường kẻ dưới đậm hơn.
- Các dòng xen kẽ (Zebra striping) hoặc sử dụng đường kẻ ngang mảnh 1px màu #F1F5F9.

**5. Trạng thái thiết bị (Status Chips):**
- Sử dụng các chip nhỏ với màu nền nhạt (light tint) của màu trạng thái (ví dụ: nền đỏ nhạt, chữ đỏ đậm cho thiết bị đang hỏng).