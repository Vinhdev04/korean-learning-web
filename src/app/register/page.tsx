import SignUpForm from '@/components/auth/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hàn Quốc Học - Đăng ký tài khoản',
  description: 'Đăng ký tài khoản miễn phí và tham gia học tiếng Hàn trực tuyến toàn diện.',
};

/**
 * Route page Đăng ký của dự án
 *
 * @returns Component SignUpForm hoàn chỉnh
 */
export default function RegisterPage() {
  return <SignUpForm />;
}
