# Kết quả & Nhật ký Tasks - Sprint 3

Báo cáo tiến trình hoàn thành các hạng mục phát triển trong **Sprint 3: Xác thực Supabase Auth, Bảo mật HttpOnly Cookies, Google OAuth, Passkey/FaceID và Rà soát giao diện UI/UX**.

---

## 🔒 1. Hệ thống Xác thực Supabase Auth & HttpOnly Cookies
*   **[NEW] API Route Đăng nhập (`/api/auth/login`)**: Nhận thông tin Email/Password, xác thực qua Supabase Auth SDK và thiết lập 3 Cookies HttpOnly bảo mật ở Client (`token` - access_token, `user_id`, `refresh_token`). Chống các lỗ hổng bảo mật XSS và CSRF.
*   **[NEW] API Route Đăng ký (`/api/auth/register`)**: Hỗ trợ đăng ký tài khoản học viên mới, liên kết Supabase Auth và tự động gửi email kích hoạt tài khoản.
*   **[NEW] API Route Đăng xuất (`/api/auth/logout`)**: Thu hồi phiên làm việc trên máy chủ Supabase Auth, đồng thời xóa bỏ hoàn toàn cookies phiên đăng nhập ở trình duyệt.
*   **[NEW] API Route Làm mới Token (`/api/auth/refresh`)**: Tự động đọc `refresh_token` từ cookie để gia hạn `access_token` mới và ghi đè cookie ngầm, giúp duy trì session của học viên mà không cần đăng nhập lại.
*   **[NEW] API Route OAuth Callback (`/api/auth/callback`)**: Điểm tiếp nhận Authorization Code chuyển hướng từ Google OAuth để hoàn tất xác thực và lưu token vào cookie.
*   **[MODIFY] Edge Middleware Routing (`src/middleware.ts`)**:
    *   Bảo vệ toàn bộ các tuyến đường quản trị `/admin` và `/[locale]/admin` trực tiếp ở tầng Server Edge. Tự động kiểm tra session cookies và redirect về `/login` nếu chưa đăng nhập.
    *   Tự động phát hiện và chuyển hướng học viên đã đăng nhập thoát khỏi trang Auth Page (`/login`, `/register`) nếu truy cập lại các đường dẫn này.
*   **[MODIFY] Client Auth Service (`src/service/authService.ts`)**: Tái cấu trúc toàn bộ logic client-side sang gọi API Routes nội bộ thay thế cho việc gọi trực tiếp Supabase Client SDK từ trình duyệt.

---

## 🔑 2. Đăng nhập Sinh trắc học (FaceID / Passkeys) & Google OAuth
*   **[NEW] Passkey Helper Service (`src/service/passkeyService.ts`)**: Tích hợp chuẩn **WebAuthn API** của trình duyệt web. Cho phép thiết bị liên kết khóa sinh trắc học cá nhân với email đăng ký.
*   **[NEW] API Route Đăng nhập Passkey (`/api/auth/passkey-login`)**: Cấp session đăng nhập và HttpOnly Cookie cho người dùng sau khi xác thực vân tay/khuôn mặt thành công trên thiết bị ở client.
*   **[MODIFY] Giao diện Đăng nhập (`SignInForm.tsx`)**:
    *   Tích hợp nút đăng nhập **Google OAuth** (quét đăng nhập trực tiếp qua tài khoản Google).
    *   Tích hợp nút đăng nhập **FaceID / Khóa**. Tự động ẩn/hiện và kiểm tra tính tương thích thiết bị thông qua `passkeyService.isSupported()`.
    *   Thêm hiệu ứng hoạt ảnh chuyển trạng thái mờ dần (**Fade Transition**) cao cấp, mượt mà khi người dùng nhấn nút đăng nhập/đăng ký hoặc đang chờ server xử lý.
*   **[MODIFY] Giao diện cá nhân ([ProfilePage](file:///d:/Work/Dự%20Án/korean-learning-web/src/app/[locale]/profile/page.tsx))**: Tích hợp thêm Card thiết lập bảo mật. Cho phép học viên bấm **Liên kết thiết bị này** để đăng ký dấu vân tay hoặc nhận diện khuôn mặt (FaceID) cục bộ thông qua trình duyệt web.

---

## 🎨 3. Rà soát UI/UX & Khắc phục lỗi Biên dịch (Bug Fixing)
*   **Fix lỗi trùng lặp import**: Gộp các import trùng lặp icon `ArrowUpRight` trong file dashboard của Admin.
*   **Fix lỗi kiểu dữ liệu (Type check)**: Ép kiểu `ease` của Framer Motion sang `as const` trong toàn bộ các component Portal (FeaturedCourses, HeroSection, StatsSection) để loại bỏ lỗi Type Easing.
*   **Fix lỗi thiếu thư viện**: Cài đặt bổ sung thư viện gốc `apexcharts` tương thích với `react-apexcharts` để hiển thị đầy đủ 5 biểu đồ báo cáo.
*   **Fix lỗi đối số của Logger**: Sửa đổi toàn bộ các hàm gọi `logger.success` và `logger.info` từ 3 đối số về đúng định dạng 2 đối số quy chuẩn của dự án.
*   **Dọn dẹp Lockfiles dư thừa**: Xóa bỏ hoàn toàn tệp `pnpm-lock.yaml` và `package-lock.json` bị lệch phiên bản cũ, giữ lại duy nhất tệp `bun.lock` đồng bộ 100% môi trường build Netlify thành công hoàn hảo.
