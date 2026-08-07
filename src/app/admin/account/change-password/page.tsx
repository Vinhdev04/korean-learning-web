'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/core/hooks/useAxiosService';
import { crypto } from '@/lib/index';
import { toast } from 'react-toastify';
import Spinner from '@/components/ui/Spinner';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Form from '@/components/form/Form';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import ComponentCard from '@/components/common/ComponentCard';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import { useRouter } from 'next/navigation';
import { encryptForClient } from '@/lib/rsa-encrypt';

export default function ChangePassword() {
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get('id');
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const router = useRouter();

  // Independent visibility toggle for password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(!!encryptedId);

  useEffect(() => {
    if (encryptedId) {
      const decryptedId = crypto.decrypt(encryptedId);
      if (decryptedId) {
        getById(+decryptedId);
      } else {
        toast.error('Invalid ID');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [encryptedId]);

  const getById = async (id: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post('account/get-by-id', {
        data: { id: id },
      });
      if (res.data?.data) {
        setFormData({ password: '', confirmPassword: '', ...res.data.data });
      } else {
        // toast.error("No data found for the provided ID");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching account data');
    } finally {
      setLoading(false);
    }
  };

  // Get cookie value function
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // Lấy user_id từ cookie
    const userID = getCookie('user_id');
    if (!userID) {
      //toast.error("User ID not found in cookie.");
      return;
    }
    // Mã hóa userID
    const encryptedId = crypto.encrypt(formData.id);
    router.push(`/admin/account/process?id=${encryptedId}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!formData.password.trim()) {
      newErrors.password = 'requirePassword';
    } else if (formData.password.trim().length < 6) {
      newErrors.password = 'passwordTooShort';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'unmatchedPassword';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.password) toast.error(newErrors.password);
      if (newErrors.confirmPassword) toast.error(newErrors.confirmPassword);
      return;
    }

    try {
      if (encryptedId) {
        const encryptedPassword = encryptForClient(formData.password);
        const dataToSubmit = { id: formData.id, new_password: encryptedPassword };
        const res = await axiosInstance.post('account/change-password', { data: dataToSubmit });
        toast.success(res.data.error_cont);
      } else {
        toast.error('Không tìm thấy thông tin người dùng.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      toast.error('Lỗi khi thay đổi mật khẩu.');
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle={'changePassword'} />
      <ComponentCard isShowHeader={false} className="mt-4 w-[90%] mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-[70%] mx-auto">
            <Form onSubmit={handleSubmit}>
              <div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="password" className="pl-1">
                    Mật khẩu mới
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu mới"
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      error={!!errors.password}
                      hint={errors.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 cursor-pointer right-4 top-3"
                    >
                      {showPassword ? (
                        <EyeIcon className={'fill-gray-500 dark:fill-gray-400'} />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                  <Label htmlFor="confirmPassword" className="pl-1 pt-6">
                    Xác nhận mật khẩu mới
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu mới"
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      error={!!errors.confirmPassword}
                      hint={errors.confirmPassword}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute z-30 cursor-pointer right-4 top-3"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <div onClick={handleBack}>
                  <Button variant="primary" onClick={handleBack}>
                    Quay lại
                  </Button>
                </div>
                <Button variant="submit">Đổi mật khẩu</Button>
              </div>
            </Form>
          </div>
        )}
      </ComponentCard>
    </div>
  );
}
