'use client';

import { useState, useEffect } from 'react';
import { Zoom, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component Toast hiển thị thông báo phía Client.
 * Cấu hình hiệu ứng Zoom mượt mà, tự động đóng nhanh (2.5s) và giới hạn
 * hiển thị tối đa 2 thông báo để tránh lỗi log/tràn màn hình (theo UI-UX Pro Max).
 *
 * @returns Component ToastContainer được cấu hình
 */
export default function ClientToast() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ToastContainer
      position="top-right" // Đưa thông báo lên góc trên bên phải trực quan
      autoClose={2500} // Tự động đóng nhanh sau 2.5s để dọn dẹp log
      hideProgressBar={false} // Hiển thị thanh chạy tiến trình mỏng mượt
      newestOnTop={true} // Tin nhắn mới luôn ở trên đầu
      closeOnClick={true}
      pauseOnFocusLoss={false} // Không dừng đếm ngược khi mất focus tab, tránh giữ toast vô hạn
      draggable={true}
      pauseOnHover={false}
      transition={Zoom} // Hiệu ứng Zoom sang trọng và nhẹ nhàng
      limit={2} // Giới hạn hiển thị 2 toasts cùng lúc để tránh spam
    />
  );
}
