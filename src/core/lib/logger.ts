import { ResponseCode } from '../types/responseCode';

/**
 * Tiện ích ghi Log tùy biến (Custom System Logger)
 * Hỗ trợ định dạng CSS màu sắc nổi bật trong Console và gom nhóm dữ liệu bằng console.group.
 */
export const logger = {
  /**
   * Ghi log trạng thái Thành công (Success Log) với màu cam/đỏ hoàng hôn Seoul
   * @param code Mã phản hồi ResponseCode
   * @param details Các thông tin chi tiết đi kèm cần phân tích
   */
  success: (code: ResponseCode, details?: any) => {
    console.group(
      `%c ☀️ [SUCCESS] [${code}] %c Thao tác thành công `,
      'background: linear-gradient(to right, #f97316, #e11d48); color: white; padding: 3px 8px; border-radius: 6px; font-weight: bold;',
      'color: #f97316; font-weight: bold; font-family: sans-serif;'
    );
    if (details !== undefined) {
      console.log('%c Dữ liệu chi tiết: ', 'color: #94a3b8; font-weight: bold;', details);
    }
    console.groupEnd();
  },

  /**
   * Ghi log trạng thái Lỗi (Error Log) với màu đỏ sậm nổi bật
   * @param code Mã phản hồi ResponseCode
   * @param error Đối tượng lỗi hoặc thông điệp chi tiết
   */
  error: (code: ResponseCode, error?: any) => {
    console.group(
      `%c 🚨 [ERROR] [${code}] %c Đã xảy ra lỗi hệ thống `,
      'background: #991b1b; color: #fecaca; padding: 3px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #f87171;',
      'color: #ef4444; font-weight: bold;'
    );
    if (error !== undefined) {
      console.error('%c Chi tiết lỗi (Stack): ', 'color: #fca5a5; font-weight: bold;', error);
    }
    console.groupEnd();
  },

  /**
   * Ghi log thông tin debug thông thường (Info Log)
   * @param label Tiêu đề của log
   * @param data Dữ liệu debug cần in ra
   */
  info: (label: string, data?: any) => {
    console.group(
      `%c ℹ️ [INFO] %c ${label} `,
      'background: #1e293b; color: #94a3b8; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
      'color: #38bdf8; font-weight: bold;'
    );
    if (data !== undefined) {
      console.log('Payload/State:', data);
    }
    console.groupEnd();
  },
};
