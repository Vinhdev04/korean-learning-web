
import ForgotPasswordForm from '@/components/auth/ResetPassword';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS CHIPS - Reset Password',
  description: 'Khôi phục mật khẩu CMS CHIPS',
};

export default function ResetPasswordPage() {
  return <ForgotPasswordForm />;
}
