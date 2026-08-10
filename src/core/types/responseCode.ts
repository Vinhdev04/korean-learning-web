/**
 * Enum định nghĩa mã phản hồi hệ thống (System Response Codes)
 * Phục vụ giao tiếp đồng bộ giữa Backend (BE) và Frontend (FE).
 */
export enum ResponseCode {
  // Nhóm hệ thống chung
  SYS_SUCCESS = 'SYS-000', // Thao tác thành công chung
  SYS_ERROR = 'SYS-999', // Lỗi hệ thống không xác định

  // Nhóm xác thực tài khoản (Auth)
  AUTH_SUCCESS = 'AUTH-000', // Đăng nhập thành công
  AUTH_FAILED = 'AUTH-001', // Sai tài khoản hoặc mật khẩu
  AUTH_EXPIRED = 'AUTH-002', // Phiên làm việc đã hết hạn
  AUTH_DENIED = 'AUTH-003', // Không có quyền truy cập
  AUTH_LOGOUT = 'AUTH-004', // Đăng xuất thành công

  // Nhóm khóa học (Course)
  COURSE_SAVE_SUCCESS = 'CRS-000', // Lưu thông tin khóa học thành công
  COURSE_SAVE_FAILED = 'CRS-001', // Lỗi khi tạo/sửa khóa học
  COURSE_DELETE_SUCCESS = 'CRS-002', // Xóa khóa học thành công

  // Nhóm bài giảng (Lesson)
  LESSON_SAVE_SUCCESS = 'LES-000', // Lưu bài giảng thành công
  LESSON_DELETE_SUCCESS = 'LES-002', // Xóa bài giảng thành công

  // Nhóm từ vựng (Vocabulary)
  VOCAB_IMPORT_SUCCESS = 'VOC-000', // Nhập Excel từ vựng thành công
  VOCAB_DELETE_SUCCESS = 'VOC-002', // Xóa từ vựng thành công
}

/**
 * Danh sách thông điệp mặc định tương ứng với từng mã phản hồi
 */
export const ResponseMessage: Record<ResponseCode, string> = {
  [ResponseCode.SYS_SUCCESS]: 'Thao tác thực hiện thành công.',
  [ResponseCode.SYS_ERROR]: 'Đã xảy ra lỗi hệ thống. Vui lòng liên hệ quản trị viên.',

  [ResponseCode.AUTH_SUCCESS]: 'Đăng nhập vào hệ thống thành công.',
  [ResponseCode.AUTH_FAILED]: 'Tài khoản hoặc mật khẩu không chính xác.',
  [ResponseCode.AUTH_EXPIRED]: 'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.',
  [ResponseCode.AUTH_DENIED]: 'Bạn không có quyền truy cập vào chức năng này.',
  [ResponseCode.AUTH_LOGOUT]: 'Đăng xuất khỏi hệ thống thành công.',

  [ResponseCode.COURSE_SAVE_SUCCESS]: 'Lưu thông tin khóa học thành công.',
  [ResponseCode.COURSE_SAVE_FAILED]: 'Lỗi lưu thông tin khóa học.',
  [ResponseCode.COURSE_DELETE_SUCCESS]: 'Đã xóa khóa học khỏi hệ thống.',

  [ResponseCode.LESSON_SAVE_SUCCESS]: 'Cập nhật thông tin bài giảng thành công.',
  [ResponseCode.LESSON_DELETE_SUCCESS]: 'Đã xóa bài giảng thành công.',

  [ResponseCode.VOCAB_IMPORT_SUCCESS]: 'Nhập dữ liệu từ vựng từ tệp Excel thành công.',
  [ResponseCode.VOCAB_DELETE_SUCCESS]: 'Đã xóa từ vựng khỏi kho lưu trữ.',
};

/**
 * Định dạng thông điệp hiển thị lên UI kèm mã lỗi
 * @param code Mã phản hồi ResponseCode
 * @param customMessage Thông điệp tùy biến (nếu có, nếu không sẽ dùng mặc định)
 * @returns Chuỗi thông báo có cấu trúc [Mã lỗi] Thông điệp
 */
export function formatSystemMessage(code: ResponseCode, customMessage?: string): string {
  const baseMessage = customMessage || ResponseMessage[code] || 'Thao tác không xác định.';
  return `[${code}] ${baseMessage}`;
}
