# Kế Hoạch & Nhiệm Vụ Hôm Nay (08/08/2026)
**Dự án:** Nền Tảng Học Tiếng Hàn trực tuyến (Web Portal)
**Sprint hiện tại:** Sprint 1 & 2 (Phát triển giao diện Core UI - User)

---

## 1. Phân Tích Thiết Lập Thư Mục (Folder Setup Analysis)

Dựa trên tài liệu BA phiên bản 2.0 (`BA_Website_Hoc_Tieng_Han.docx`), cấu trúc các module học tập của Học viên (User) được thiết lập tối ưu trên Next.js App Router như sau:

### A. Module Khóa học (Courses & Lessons)
*   **Trang Danh sách khóa học:**
    *   *Đường dẫn:* `/vn/courses` hoặc `/en/courses`
    *   *Thư mục:* `src/app/[locale]/courses/page.tsx`
    *   *Nội dung:* Render danh sách các khóa học phân loại theo cấp độ TOPIK I và TOPIK II. Có bộ lọc (tab pill-shape) và loading Skeleton mượt mà.
*   **Trang Chi tiết khóa học:**
    *   *Đường dẫn:* `/courses/[id]` (ví dụ: `/courses/so-cap-1`)
    *   *Thư mục:* `src/app/[locale]/courses/[id]/page.tsx`
    *   *Nội dung:* Hiển thị chương trình học chi tiết của từng khóa học, cấu trúc theo Accordion hiển thị danh sách bài học và nút đăng ký học.
*   **Trang Chi tiết bài học (Video & Lý thuyết):**
    *   *Đường dẫn:* `/lessons/[id]` (ví dụ: `/lessons/l1`)
    *   *Thư mục:* `src/app/[locale]/lessons/[id]/page.tsx`
    *   *Nội dung:* Giao diện học tập chính gồm video bài giảng (tỷ lệ 16:9), các tab học lý thuyết, ngữ pháp, từ vựng và bảng ghi chú nhanh.

### B. Module Luyện tập (Practice)
*   **Trang Luyện tập bài học:**
    *   *Đường dẫn:* `/practice/[lessonId]` (ví dụ: `/practice/l1`)
    *   *Thư mục:* `src/app/[locale]/practice/[lessonId]/page.tsx`
    *   *Nội dung:* Không gian làm bài tương tác gồm thẻ nhớ Flashcard 3D ôn từ vựng (hiệu ứng xoay lật mặt sau), bài thi trắc nghiệm (Quiz), luyện nghe audio, và hiển thị giải thích đáp án.

### C. Module Hồ sơ & Workspace (Profile & Workspace)
*   **Trang Hồ sơ cá nhân (Profile):**
    *   *Đường dẫn:* `/profile`
    *   *Thư mục:* `src/app/[locale]/profile/page.tsx`
    *   *Nội dung:* Quản lý thông tin học viên, tiến độ học tập toàn khóa, cấp độ hiện tại, streak ngày học và các huy hiệu thành tích.
*   **Trang Không gian học tập cá nhân (Workspace):**
    *   *Đường dẫn:* `/workspace` (Cần bổ sung file page.tsx để hoàn chỉnh theo Sitemap BA)
    *   *Thư mục:* `src/app/[locale]/workspace/page.tsx`
    *   *Nội dung:* Quản lý ghi chú nhanh cá nhân, các bài học đã lưu, từ vựng yêu thích.

---

## 2. Danh Sách Nhiệm Vụ Hôm Nay (Daily Sprint Tasks)

| Mã Task | Phân Hệ | Nội Dung Tác Vụ | Trạng Thái | Ghi Chú |
| :--- | :--- | :--- | :--- | :--- |
| **SP1-UI-11** | **Base Styling & Layout** | Sửa lỗi Navbar Header bị ẩn chữ (tàng hình) trên các trang con do logic nhận nhầm locale. | `[x]` Đã xong | Đã tối ưu logic kiểm tra locale an toàn tại [Header.tsx](file:///d:/Work/Dự Án/korean-learning-web/src/components/layout/Header.tsx). |
| **SP1-UI-12** | **Base Styling & Layout** | Custom lại thông báo (Toast/Notify) sang dạng Modern Glassmorphism đẹp mắt, có hiệu ứng Zoom, giới hạn 2 toasts hiển thị tránh lỗi tràn log. | `[x]` Đã xong | Đã cập nhật [ClientToast.tsx](file:///d:/Work/Dự Án/korean-learning-web/src/components/common/ClientToast.tsx) và [styles.scss](file:///d:/Work/Dự Án/korean-learning-web/src/app/styles.scss). |
| **SP1-UI-13** | **Home Page UI** | Khắc phục lỗi lệch/méo của icon liên hệ Zalo trên Floating Panel góc dưới bên phải màn hình. | `[x]` Đã xong | Đã thiết kế lại SVG đục lỗ chữ Z sắc nét tại [FloatingActionHub.tsx](file:///d:/Work/Dự Án/korean-learning-web/src/components/layout/FloatingActionHub.tsx). |
| **SP1-QA-01** | **Tích hợp & QA** | Chạy kiểm tra linting mã nguồn (`bun run lint`) để tìm kiếm lỗi và cảnh báo bất thường trước khi commit. | `[x]` Đã xong | Kết quả linting thành công, chỉ có cảnh báo không có lỗi cú pháp. |
| **SP1-OPS-03** | **DevOps & Git** | Kiểm thử cơ chế Husky & Commitlint bằng cách thực hiện commit tin nhắn sai quy chuẩn, sau đó commit chuẩn thành công. | `[x]` Đã xong | Husky chặn commit sai thành công. Đã commit thành công với message: `feat(auth): integrate search...`. |
| **SP1-UI-14** | **Workspace UI** | Thiết lập cấu trúc cơ bản cho trang Workspace cá nhân `/workspace` để chuẩn bị cho giai đoạn tiếp theo. | `[ ]` Chưa làm | Sẽ triển khai cấu trúc file page.tsx cho Workspace. |

---

## 3. Hướng Dẫn & Kế Hoạch Tiếp Theo (Next Steps)
1.  **SP1-UI-14 (Workspace):** Tạo mới file `src/app/[locale]/workspace/page.tsx` và xây dựng giao diện lưu trữ ghi chú cá nhân cơ bản tương thích với BA mục 6.5.
2.  **Kiểm tra Responsive:** Tiếp tục tối ưu hóa responsive các trang Khóa học và Luyện tập trên thiết bị tablet/mobile để đạt độ mượt mà cao nhất.
