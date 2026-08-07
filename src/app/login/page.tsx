
import SignInForm from '@/components/auth/SignInForm';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'CMS CHIPS - Signin',
  description: 'Đăng nhập CMS CHIPS và quản lý nội dung của bạn một cách hiệu quả.',
};

export default function AuthPage() {
  return <SignInForm />;
}
