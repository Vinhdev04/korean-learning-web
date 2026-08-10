import { logger } from '@/core/lib/logger';
import { ResponseCode } from '@/core/types/responseCode';

/**
 * Service xử lý Đăng ký và Xác thực sinh trắc học (Passkey / FaceID)
 * Sử dụng WebAuthn API chuẩn của trình duyệt kết hợp với LocalStorage để lưu vết liên kết.
 */
export const passkeyService = {
  /**
   * Kiểm tra xem thiết bị và trình duyệt hiện tại có hỗ trợ xác thực sinh trắc học/Passkey không.
   * @returns Promise<boolean>
   */
  isSupported: async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !window.PublicKeyCredential) {
      return false;
    }
    
    // Kiểm tra xem thiết bị có hỗ trợ xác thực cục bộ (vân tay, nhận dạng khuôn mặt, v.v.)
    try {
      const available = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return available;
    } catch {
      return false;
    }
  },

  /**
   * Đăng ký khóa Passkey mới cho người dùng hiện tại
   * @param email - Địa chỉ email của tài khoản cần liên kết
   * @param fullname - Họ và tên hiển thị
   * @returns Promise<boolean> Trả về true nếu đăng ký thành công
   */
  register: async (email: string, fullname: string): Promise<boolean> => {
    try {
      logger.info('Bắt đầu quy trình tạo khóa Passkey/FaceID trên thiết bị...', { email });

      const isSupport = await passkeyService.isSupported();
      if (!isSupport) {
        throw new Error('Thi Thiết bị hoặc trình duyệt của bạn không hỗ trợ Passkey/FaceID.');
      }

      // Tạo các tham số cấu hình WebAuthn ngẫu nhiên
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const userIdBytes = crypto.getRandomValues(new Uint8Array(16));

      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: 'Korean Learning Platform',
          id: window.location.hostname,
        },
        user: {
          id: userIdBytes,
          name: email,
          displayName: fullname,
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' }, // ES256
          { alg: -257, type: 'public-key' }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform', // Chỉ dùng sinh trắc học cục bộ của thiết bị (FaceID, Windows Hello, v.v.)
          userVerification: 'required',
          residentKey: 'required',
        },
        timeout: 60000,
        attestation: 'none',
      };

      // Kích hoạt hộp thoại xác thực sinh trắc học của hệ điều hành
      const credential = (await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      })) as PublicKeyCredential;

      if (!credential) {
        throw new Error('Người dùng đã hủy quá trình đăng ký sinh trắc học.');
      }

      // Lưu trữ thông tin liên kết khóa này vào LocalStorage để giả lập kiểm tra xác thực (Mock database)
      const credentialInfo = {
        id: credential.id,
        rawId: Array.from(new Uint8Array(credential.rawId)),
        type: credential.type,
        email: email,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem(`passkey_${email}`, JSON.stringify(credentialInfo));
      
      // Lưu lại email đăng ký passkey gần nhất của thiết bị này để tự động gợi ý lúc đăng nhập
      localStorage.setItem('last_active_passkey_email', email);

      logger.success(ResponseCode.SYS_SUCCESS, { message: 'Đăng ký Passkey/FaceID thành công!', credentialId: credential.id });
      return true;
    } catch (err: any) {
      logger.error(ResponseCode.SYS_ERROR, err);
      throw err;
    }
  },

  /**
   * Xác thực và đăng nhập bằng Passkey / FaceID đã đăng ký trước đó
   * @param email - Email tài khoản muốn đăng nhập (nếu rỗng sẽ cố lấy email gần nhất)
   * @returns Promise<string> Trả về email đăng nhập nếu thành công
   */
  authenticate: async (email?: string): Promise<string> => {
    try {
      logger.info('Bắt đầu quy trình xác thực sinh trắc học đăng nhập...', { email });

      const targetEmail = email || localStorage.getItem('last_active_passkey_email');
      if (!targetEmail) {
        throw new Error('Không tìm thấy thông tin Passkey/FaceID đã đăng ký trên thiết bị này. Vui lòng đăng ký trước trong trang cá nhân.');
      }

      const passkeyDataStr = localStorage.getItem(`passkey_${targetEmail}`);
      if (!passkeyDataStr) {
        throw new Error(`Tài khoản ${targetEmail} chưa được đăng ký FaceID/Passkey trên thiết bị này.`);
      }

      const passkeyData = JSON.parse(passkeyDataStr);

      // Tạo tham số yêu cầu xác thực WebAuthn
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const rawId = new Uint8Array(passkeyData.rawId);

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        allowCredentials: [
          {
            id: rawId,
            type: 'public-key',
          },
        ],
        rpId: window.location.hostname,
        userVerification: 'required',
        timeout: 60000,
      };

      // Kích hoạt FaceID/Fingerprint trên thiết bị của người dùng
      const assertion = (await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })) as PublicKeyCredential;

      if (!assertion) {
        throw new Error('Xác thực thất bại hoặc người dùng đã hủy.');
      }

      logger.success(ResponseCode.AUTH_SUCCESS, { message: 'Xác thực sinh trắc học thành công!', email: targetEmail });
      return targetEmail;
    } catch (err: any) {
      logger.error(ResponseCode.SYS_ERROR, err);
      throw err;
    }
  },
};
