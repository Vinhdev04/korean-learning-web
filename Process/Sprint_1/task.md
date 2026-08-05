# Kế Hoạch Sprint 1: Phát Triển Giao Diện Người Dùng (UI/UX & Responsive)
**Dự án:** Website Học Tiếng Hàn Trực Tuyến
**Thời gian:** 1 tuần
**Mục tiêu:** Hoàn thành toàn bộ giao diện (UI) các trang cốt lõi của học viên (User) trên cả 3 nền tảng: Desktop, Tablet, Mobile đảm bảo đúng ngôn ngữ thiết kế (Tone màu Hàn Quốc: Đỏ chủ đạo + Nền Kem + Góc bo tròn mềm mại + Shadow mịn).

---

## Danh Sách Tác Vụ Chi Tiết (Sprint Backlog)

### Phân Hệ 1: Thiết Lập Nền Tảng (Base Styling)

#### `SP1-UI-01`: Cấu hình Tailwind CSS & Styling SCSS chung
* **Mô tả:** Thiết lập cấu hình hệ thống Design System chung cho toàn dự án. Định nghĩa các biến màu sắc (Korean Red, Warm Cream, Charcoal, Olive, Slate), các tokens font chữ, shadows và border radius. Tạo file stylesheet SCSS trung tâm quản lý các lớp dùng chung và hiệu ứng đặc thù (glassmorphic, active scale, transition).
* **Nội dung thực hiện:**
  1. Tạo `tailwind.config.js` mở rộng các palette màu và shadow, corner-radius.
  2. Tạo `src/styles/global.scss` định nghĩa các CSS Variables tương ứng và các class component tiện ích như `.btn-primary`, `.btn-secondary`, `.glass-card`.
  3. Tích hợp font chữ sans-serif hiện đại (như Outfit, Be Vietnam Pro).
* **Định nghĩa hoàn thành (DoD):** Biên dịch CSS thành công không lỗi; các lớp màu và class tiện ích hoạt động đúng trên môi trường kiểm thử.
* **Độ ưu tiên:** Cao (Blocker)
* **Thời gian ước tính:** 4 giờ

---

### Phân Hệ 2: Giao Diện Trang Chủ (Home Page UI)

#### `SP1-UI-02`: Phát triển Header & Hero Section (Seoul sunset style)
* **Mô tả:** Xây dựng phần đầu trang (Header) có logo biểu tượng chữ Hàn "한" trên nền đỏ bo tròn và thanh menu điều hướng. Xây dựng Banner chính (Hero Section) sử dụng ảnh hoàng hôn Seoul làm nền, có lớp phủ overlay mờ tối, headline lớn nổi bật, mô tả ngắn dưới 20 từ, và 2 nút kêu gọi hành động (CTA) không bị tràn dòng.
* **Nội dung thực hiện:**
  1. Header responsive: Desktop hiển thị đầy đủ menu và các nút Đăng nhập / Đăng ký; Mobile thu gọn vào Hamburger menu hoặc trượt nhẹ.
  2. Hero Section: Chiều cao tối thiểu `min-h-[100dvh]` hoặc `min-h-[85dvh]` đảm bảo nút CTA luôn nằm trên nếp gấp màn hình (above fold) của mọi thiết bị.
  3. Căn chỉnh khoảng cách trên (padding-top) tối đa `pt-24` trên desktop để tránh khoảng trống thừa.
* **DoD:** Hiển thị mượt mà, text không bị lỗi chính tả/AI, responsive tốt trên các kích thước màn hình.
* **Độ ưu tiên:** Cao
* **Thời gian ước tính:** 6 giờ

#### `SP1-UI-03`: Phát triển Section Thống Kê (Stats) & Khóa Học Nổi Bật (Featured Courses)
* **Mô tả:** Thiết kế khu vực hiển thị các thông số ấn tượng (Stats) bên dưới Hero banner và danh sách các lộ trình học nổi bật (TOPIK I, TOPIK II).
* **Nội dung thực hiện:**
  1. Stats Section: Thiết kế 4 khối box màu trắng ngà/kem nhạt, bo góc `rounded-2xl`, shadow cực mịn, sắp xếp grid 4 cột trên desktop, 2 cột trên tablet, và 1 cột dọc trên mobile.
  2. Course Selection Section: Headline "Chọn Lộ Trình Phù Hợp Với Bạn", tab chọn lọc (Tất cả, TOPIK I, TOPIK II) bo tròn đầy đặn (pill-shape).
  3. Thẻ khóa học (Course Card): Bo tròn `rounded-2xl` mềm mại. Chứa hình ảnh sinh động, tag cấp độ (màu xanh lá pastel nhạt), tiêu đề, số bài học/tuần, số học viên và nút "Xem chi tiết" với hiệu ứng hover nâng nhẹ (`hover:-translate-y-1 hover:shadow-lg`).
* **DoD:** Grid tự động giãn dòng chuẩn, không bị chồng chéo thông tin trên mobile; responsive 1-col trên màn hình nhỏ.
* **Độ ưu tiên:** Cao
* **Thời gian ước tính:** 6 giờ

#### `SP1-UI-04`: Xây dựng Section Phương Pháp Học & Footer
* **Mô tả:** Thiết kế 6 khối bento giới thiệu các phương pháp/tính năng vượt trội (Video bài giảng HD, Flashcard, Quiz tương tác, Progress, Note, Huy hiệu) và chân trang (Footer).
* **Nội dung thực hiện:**
  1. Grid 6 ô tính năng: Mỗi ô có icon vector với màu nền pastel dịu nhẹ tương ứng (đỏ nhạt, xanh nhạt, cam nhạt...). Tránh lặp lại layout tẻ nhạt; sử dụng bất đối xứng nhẹ.
  2. Footer: Chứa thông tin bản quyền, liên kết điều hướng nhanh, và mạng xã hội.
* **DoD:** Các ô bento căn lề chuẩn, icon sắc nét (sử dụng SVG từ Phosphor/Heroicons), Footer tương thích responsive.
* **Độ ưu tiên:** Trung bình
* **Thời gian ước tính:** 4 giờ

---

### Phân Hệ 3: Các Trang Học Tập Của Học Viên (Learning Experience UI)

#### `SP1-UI-05`: Giao diện Trang Danh Sách Khóa Học (`/courses`)
* **Mô tả:** Trang hiển thị tất cả các khóa học hiện có trong hệ thống, phân chia rõ ràng theo cấp độ TOPIK I và TOPIK II.
* **Nội dung thực hiện:**
  1. Bộ lọc khóa học (Cấp độ, Trạng thái miễn phí/trả phí) trực quan trên mobile (dạng trượt ngang).
  2. Grid hiển thị danh sách các thẻ khóa học đồng bộ thiết kế với trang chủ.
* **DoD:** Chuyển đổi bộ lọc mượt mà, căn chỉnh grid đều đặn giữa các dòng.
* **Độ ưu tiên:** Cao
* **Thời gian ước tính:** 5 giờ

#### `SP1-UI-06`: Giao diện Trang Chi Tiết Khóa Học (`/courses/[id]`)
* **Mô tả:** Trang giới thiệu tổng quan về một khóa học cụ thể, giảng viên, mục tiêu đạt được và danh sách các chương/bài học.
* **Nội dung thực hiện:**
  1. Khối thông tin chung (Hero Detail) giới thiệu khóa học.
  2. Lộ trình chương học sử dụng mô hình Accordion (nhấn để mở rộng/thu gọn danh sách bài học). Mỗi dòng bài học hiển thị biểu tượng video, lý thuyết hoặc bài tập kèm thẻ badge chỉ loại nội dung.
* **DoD:** Hiệu ứng accordion đóng/mở mượt mà, phân cấp thông tin rõ ràng từ Chương đến Bài học.
* **Độ ưu tiên:** Cao
* **Thời gian ước tính:** 6 giờ

#### `SP1-UI-07`: Giao diện Trang Học Bài (`/lessons/[id]`)
* **Mô tả:** Không gian học tập chính của học viên, tích hợp video bài giảng và nội dung bài học.
* **Nội dung thực hiện:**
  1. Split layout (50/50 hoặc 70/30): Bên trái hiển thị Trình phát video bài giảng HD (tỷ lệ 16:9 ổn định) và các tab nội dung bài học (Lý thuyết rich-text, Từ vựng, Ngữ pháp). Bên phải là danh sách bài học trong chương để chuyển bài nhanh.
  2. Tích hợp thanh ghi chú nhanh (Quick Note) trực quan giúp viết note ngay khi xem video.
* **DoD:** Responsive ẩn danh sách bài học vào thanh trượt (Drawer) trên mobile để dành toàn màn hình cho video player.
* **Độ ưu tiên:** Cao
* **Thời gian ước tính:** 8 giờ

#### `SP1-UI-08`: Giao diện Trang Luyện Tập (`/practice/[lessonId]`)
* **Mô tả:** Giao diện tương tác làm bài trắc nghiệm (Quiz) và học từ vựng qua Flashcard lật 3D.
* **Nội dung thực hiện:**
  1. Giao diện Flashcard: Hiệu ứng CSS 3D flip card mượt mà khi nhấn vào thẻ. Chứa từ vựng, phiên âm ở mặt trước và ý nghĩa, ví dụ ở mặt sau. Có nút đánh dấu "Đã thuộc" / "Chưa thuộc".
  2. Giao diện trắc nghiệm: Hiển thị câu hỏi, danh sách đáp án dạng box bo tròn dễ bấm chọn. Nút nộp bài có hiệu ứng loading khi bấm và hiện giải thích đáp án rõ ràng.
* **DoD:** Các nút bấm phản hồi tức thì (scale nhẹ 0.98), hiệu ứng lật thẻ 3D mượt mà không bị lỗi layout trên mobile.
* **Độ ưu tiên:** Cao
* **Thời gian ước tính:** 8 giờ

#### `SP1-UI-09`: Giao diện Trang Cá Nhân & Workspace Học Tập (`/profile` & `/workspace`)
* **Mô tả:** Nơi học viên quản lý tiến độ học tập, xem streak ngày học, các huy hiệu thành tích và các ghi chú, bộ sưu tập đã lưu.
* **Nội dung thực hiện:**
  1. Thống kê tiến độ: Biểu đồ đơn giản biểu diễn kết quả, lịch học cá nhân.
  2. Workspace: Sắp xếp dạng Kanban kéo-thả hoặc dạng danh sách gọn gàng (Kanban trên Desktop, tự động chuyển về dạng List tab trên Mobile).
* **DoD:** Trực quan hóa số liệu sạch sẽ, không rối mắt; các phần tử kéo thả hoạt động ổn định trên màn hình rộng.
* **Độ ưu tiên:** Trung bình
* **Thời gian ước tính:** 6 giờ

---

### Phân Hệ 4: Tích Hợp & Tối Ưu Hóa (Polishing)

#### `SP1-UI-10`: Xây dựng Trang Đăng Ký/Đăng Nhập & Tối ưu Responsive toàn hệ thống
* **Mô tả:** Giao diện đăng ký/đăng nhập tối giản, bảo mật cùng việc kiểm tra lại responsive, tối ưu khả năng truy cập (A11y) và hiệu ứng chuyển trang.
* **Nội dung thực hiện:**
  1. Trang Auth (/login, /register): Thiết kế form sạch sẽ, label rõ ràng nằm trên ô input, có nút ẩn/hiện mật khẩu, hỗ trợ login OAuth Google/Facebook.
  2. Thực hiện Pre-delivery checklist: Kiểm tra độ tương phản WCAG AA (tối thiểu 4.5:1 cho text), kiểm tra nút bấm không bị tràn dòng, kiểm tra kích thước vùng chạm (touch target >= 44x44px trên mobile).
* **DoD:** Toàn bộ dự án vượt qua đợt đánh giá giao diện trên các thiết bị mô phỏng iPhone, Android, iPad và các trình duyệt Chrome/Safari.
* **Độ ưu tiên:** Cao
* **Thời gian ước tính:** 5 giờ

---

## Tóm Tắt Ước Lượng Sprint 1
* **Tổng số tác vụ:** 10 tác vụ chính
* **Tổng thời gian ước tính:** 58 giờ (Tương đương 1 tuần làm việc tập trung của 1-2 lập trình viên Frontend)
* **Quy ước đặt mã:** `SP1-UI-[Số thứ tự]` (SP1 = Sprint 1, UI = Phát triển giao diện)
