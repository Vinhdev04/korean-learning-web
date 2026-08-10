# 🇰🇷 KOREAN LEARNING WEB - Nền tảng tự học Tiếng Hàn & Luyện thi TOPIK

Nền tảng website hiện đại giúp học viên tự học tiếng Hàn trực tuyến toàn diện, học lý thuyết bài bản, xem video bài giảng có phụ đề song ngữ và luyện tập tương tác thông minh.

---

## 🌟 Tính năng nổi bật

### Dành cho Học viên (Web Homepage Experience)
*   **Trang chủ ấn tượng**: Thiết kế Split-screen (50/50) hiện đại, minh họa học thuật sinh động, và bảng Bento Grid 3 tính năng cốt lõi.
*   **Lộ trình học bài bản**: Hiển thị lộ trình từ Sơ cấp đến Cao cấp kèm các đối tác liên kết từ trường Đại học hàng đầu Hàn Quốc (Seoul, Yonsei, Korea, Sogang).
*   **Học tập qua Video bài giảng**: Trình phát video tích hợp phụ đề song ngữ Hàn - Việt cùng thanh ghi chú nhanh (Quick Notes) lưu trữ cục bộ.
*   **Phòng Luyện tập đa năng**:
    *   **Quiz**: Làm bài trắc nghiệm, hiển thị đáp án trực quan và giải thích ngữ pháp chi tiết.
    *   **Flashcards 3D**: Lật thẻ học từ vựng 3D, tích hợp phát âm chuẩn tiếng Hàn qua Web Speech API và ghi nhận trạng thái ôn tập Leitner.
*   **Trang cá nhân (Profile)**: Hiển thị biểu đồ cột tiến độ học tập, thống kê từ vựng và bảng huy hiệu thành tựu (Gamification).

### Dành cho Quản trị viên (Admin CMS Experience)
*   **Dashboard Tổng quan**: Thống kê số lượng học viên, khóa học và câu hỏi. Vẽ biểu đồ hoạt động gần đây và danh sách học viên mới tham gia.
*   **Quản lý người dùng**: Theo dõi danh sách tài khoản học viên/quản trị, tìm kiếm lọc nâng cao, khóa/mở khóa tài khoản, và hỗ trợ xuất báo cáo Excel.
*   **Phân quyền hệ thống**: Ma trận phân quyền chi tiết (Xem, Tạo, Sửa, Xóa, Import, Export) theo từng module chức năng cho các nhóm vai trò (Super Admin, Admin, Học Viên).
*   **Quản lý nội dung đào tạo**: Quản lý khóa học, chương học, bài giảng video, ngân hàng câu hỏi ôn tập và kho từ vựng tiếng Hàn.
*   **Báo cáo thống kê chuyên sâu**: Trực quan hóa số liệu kết quả học tập qua các biểu đồ cao cấp và nhật ký thao tác (Audit Log) bảo mật.

---

## 🛠️ Công nghệ sử dụng

*   **Framework**: Next.js 15.x (App Router)
*   **Thư viện UI**: React 19, Lucide React (Icons)
*   **Styling**: Tailwind CSS V4, Custom CSS (Sass/SCSS)
*   **Typography**: Google Fonts **Outfit** (hiển thị kiểu chữ tròn trịa, hiện đại)
*   **Design System**: Slate (Nền xám/tối thanh lịch) & Teal (Màu nhấn học thuật cao cấp)
*   **Quốc tế hóa**: Next-intl (Hỗ trợ đa ngôn ngữ vi/en)
*   **Deploy**: Sẵn sàng cấu hình deploy lên Netlify với `netlify.toml` tích hợp.

---

## 📂 Cấu trúc thư mục dự án (Project Folder Structure)

Dự án được xây dựng dựa trên Next.js 15 App Router với cấu trúc thư mục phân tách rõ ràng theo chức năng:

*   **`src/app/`**: Thư mục định tuyến chính của Next.js (App Router).
    *   **`api/auth/`**: Hệ thống các API Routes xử lý xác thực bảo mật qua HttpOnly Cookies:
        *   `login/route.ts`: Xác thực tài khoản với Supabase Auth, thiết lập cookies phiên đăng nhập.
        *   `register/route.ts`: Xử lý đăng ký và gửi mail kích hoạt tài khoản.
        *   `logout/route.ts`: Thu hồi session và xóa toàn bộ cookie liên quan.
        *   `refresh/route.ts`: Làm mới access token bằng refresh token.
        *   `callback/route.ts`: Tiếp nhận OAuth callback của Google.
        *   `passkey-login/route.ts`: Cấp session đăng nhập sinh trắc học trực tiếp.
    *   **`admin/`**: Các trang quản trị hệ thống Admin CMS (Dashboard, Users, Roles, Courses, Lessons, Questions, Vocabulary, Analytics, Settings, Audit logs).
    *   **`[locale]/`**: Các trang giao diện dành cho học viên đa ngôn ngữ (Trang chủ Portal, Danh sách khóa học, Chi tiết bài giảng, Phòng Luyện tập Quiz/Flashcard, Trang cá nhân Profile).
*   **`src/components/`**: Chứa các UI Components dùng chung (Header, Footer, form Inputs, Label, Button, các Confirm Modals).
*   **`src/service/`**: Chứa các dịch vụ gọi API và trung gian điều khiển:
    *   `authService.ts`: Điều phối đăng nhập, đăng ký và đăng xuất của học viên.
    *   `passkeyService.ts`: Tích hợp **WebAuthn API** để đăng ký và xác thực vân tay/FaceID trên thiết bị.
*   **`src/core/`**: Cấu hình cơ sở hạ tầng, cơ sở dữ liệu Supabase, định nghĩa mã lỗi và Logger tùy chỉnh.
*   **`src/middleware.ts`**: Server-side Middleware bảo vệ các tuyến đường `/admin` thông qua kiểm tra JWT cookies an toàn.

---

## 📂 Cấu trúc quản lý tiến độ (Project Management)

Tiến độ phát triển và các đầu việc của dự án được quản lý chi tiết trong thư mục `Process/`:
*   `Process/Sprint_1/ui_web_homepage.md`: Kế hoạch và các task phát triển giao diện phía học viên (Web Homepage).
*   `Process/Sprint_2/ui_cms.md`: Kế hoạch phát triển giao diện quản trị (Admin CMS), tích hợp các đề xuất biểu đồ thống kê chuyên sâu kèm hình ảnh mockup minh họa trực tiếp.
*   `Process/Sprint_3/tasks.md`: Nhật ký hoàn thành hệ thống xác thực Supabase Auth, bảo mật HttpOnly Cookies, Google OAuth và đăng nhập vân tay/FaceID.

---

## 🚀 Khởi chạy Dự án

### Yêu cầu hệ thống
*   Node.js 18.x hoặc mới hơn (khuyên dùng Node.js 20.x trở lên)
*   Trình quản lý gói: `npm` hoặc `bun`

### Cài đặt và Chạy Development
1.  Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    # hoặc dùng bun
    bun install
    ```
2.  Khởi chạy máy chủ phát triển cục bộ:
    ```bash
    npm run dev
    # hoặc dùng bun
    bun run dev
    ```
3.  Truy cập ứng dụng tại: `http://localhost:4001` (Cấu hình mặc định cổng 4001).

### 💡 Tài khoản giả lập phục vụ kiểm thử nhanh (Bypass Login)
Khi ở màn hình đăng nhập `/login`, bạn có thể nhập các tài khoản sau để chuyển thẳng vào giao diện test mà không cần kết nối cơ sở dữ liệu:
*   **Tài khoản Admin CMS**: gõ tên đăng nhập `admin` / mật khẩu bất kỳ.
*   **Tài khoản Học viên**: gõ tên đăng nhập `user` / mật khẩu bất kỳ.
*   *Hệ thống cũng hiển thị bảng bấm nhanh (Click-to-fill) trực tiếp trên giao diện màn hình đăng nhập để hỗ trợ tối đa việc kiểm thử.*

---

## 📝 Giấy phép
Dự án được phát hành và sở hữu dưới bản quyền của **KOREAN LEARNING**.
