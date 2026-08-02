# 🇰🇷 KOREAN LEARNING WEB - Nền tảng tự học Tiếng Hàn & Luyện thi TOPIK

Nền tảng website hiện đại giúp học viên tự học tiếng Hàn trực tuyến toàn diện, học lý thuyết bài bản, xem video bài giảng có phụ đề song ngữ và luyện tập tương tác thông minh.

## 🌟 Tính năng nổi bật

### Dành cho Học viên
*   **Trang chủ ấn tượng**: Thiết kế Split-screen (50/50) hiện đại, minh họa học thuật sinh động, và bảng Bento Grid 3 tính năng cốt lõi.
*   **Lộ trình học bài bản**: Hiển thị lộ trình từ Sơ cấp đến Cao cấp kèm các đối tác liên kết từ trường Đại học hàng đầu Hàn Quốc (Seoul, Yonsei, Korea, Sogang).
*   **Học tập qua Video bài giảng**: Trình phát video tích hợp phụ đề song ngữ Hàn - Việt cùng thanh ghi chú nhanh (Quick Notes) lưu trữ cục bộ.
*   **Phòng Luyện tập đa năng**:
    *   **Quiz**: Làm bài trắc nghiệm, hiển thị đáp án trực quan và giải thích ngữ pháp chi tiết.
    *   **Flashcards 3D**: Lật thẻ học từ vựng 3D, tích hợp phát âm chuẩn tiếng Hàn qua Web Speech API và ghi nhận trạng thái ôn tập Leitner.
*   **Trang cá nhân (Profile)**: Hiển thị biểu đồ cột tiến độ học tập, thống kê từ vựng và bảng huy hiệu thành tựu (Gamification).

### Dành cho Quản trị viên (Admin CMS)
*   **Dashboard Tổng quan**: Thống kê số lượng học viên, khóa học và câu hỏi. Vẽ biểu đồ tương tác 7 ngày qua bằng cột HTML/CSS trực quan, hỗ trợ xem tooltip khi di chuột.
*   **Quản lý dữ liệu**:
    *   Quản lý khóa học, chương học và bài giảng video.
    *   Ngân hàng câu hỏi trắc nghiệm & flashcards.
    *   Quản lý thông tin học viên, phân quyền và vai trò quản trị viên.

---

## 🛠️ Công nghệ sử dụng

*   **Framework**: Next.js 15.x (App Router)
*   **Thư viện UI**: React 19, Lucide React (Icons)
*   **Styling**: Tailwind CSS V4, Custom CSS (Sass/SCSS)
*   **Typography**: Google Fonts **Outfit** (hiển thị kiểu chữ tròn trịa, hiện đại)
*   **Design System**: Slate (Nền xám/tối thanh lịch) & Teal (Màu nhấn học thuật cao cấp)
*   **Quốc tế hóa**: Next-intl (Hỗ trợ đa ngôn ngữ vi/en)

---

## 🚀 Khởi chạy Dự án

### Yêu cầu hệ thống
*   Node.js 18.x hoặc mới hơn (khuyên dùng Node.js 20.x trở lên)

### Cài đặt và Chạy Development
1.  Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    ```
2.  Khởi chạy máy chủ phát triển cục bộ:
    ```bash
    npm run dev
    ```
3.  Truy cập ứng dụng tại: `http://localhost:3000`

### 💡 Tài khoản giả lập phục vụ kiểm thử nhanh (Bypass Login)
Khi ở màn hình đăng nhập `/login`, bạn có thể nhập các tài khoản sau để chuyển thẳng vào giao diện test mà không cần kết nối cơ sở dữ liệu:
*   **Tài khoản Admin CMS**: gõ tên đăng nhập `admin` / mật khẩu bất kỳ.
*   **Tài khoản Học viên**: gõ tên đăng nhập `user` / mật khẩu bất kỳ.
*   *Hệ thống cũng hiển thị bảng bấm nhanh (Click-to-fill) trực tiếp trên giao diện màn hình đăng nhập để hỗ trợ tối đa việc kiểm thử.*

---

## 📝 Giấy phép
Dự án được phát hành và sở hữu dưới bản quyền của **KOREAN LEARNING**.
