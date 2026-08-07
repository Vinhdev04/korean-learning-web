"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/core/hooks/useAxiosService";
import { crypto } from "@/lib/index";
import { toast } from "react-toastify";
import Spinner from "@/components/ui/Spinner";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import ComponentCard from "@/components/common/ComponentCard";
import Select from "@/components/form/Select";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { useRouter } from "next/navigation";
import { pick } from "lodash";
import { generateLinkFromName } from "@/lib/generateLinkFromText";

export interface Page {
  id: number;
  name: string;
  user_nm: string;
  avatar: string | { src: string; name: string; type: string; old: string; del: string; size?: object }; // Sửa dòng này
  password: string;
  status: string;
  phone: string;
  permission_level: string;
  email: string;
  del_flag: string;
}

const parentOptions = [
  { value: "0", label: "User" },
  { value: "1", label: "Admin" },
];

export default function Process() {
  const [avatarUploaded, setAvatarUploaded] = useState<boolean>(false);
  const [avatarRemoved, setAvatarRemoved] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("id");
  const [formData, setFormData] = useState<Page>({
    id: 0,
    name: "",
    user_nm: "",
    avatar: "",
    password: "",
    status: '0',
    del_flag: '0',
    phone: "",
    permission_level: "",
    email: "",
  });
  const [errors, setErrors] = useState<{
    [key in keyof Partial<Page>]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(!!encryptedId);
  useEffect(() => {
    if (encryptedId) {
      const decryptedId = crypto.decrypt(encryptedId);
      if (decryptedId) {
        getById(+decryptedId);
      } else {
        toast.error("Invalid ID");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [encryptedId]);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  const getById = async (id: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("account/get-by-id", {
        data: { id: id },
      });
      // Sau khi lấy dữ liệu từ DB:
      if (res.data?.data) {
        setFormData(prev => ({
          ...prev,
          ...res.data.data,
          avatar: res.data.data.avatar
            ? { old: res.data.data.avatar, src: "", name: "", type: "", del: "" }
            : "",
        }));
      } else {
        // toast.error("No data found for the provided ID");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching account data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Cập nhật form data
    setFormData((prev) => ({
      ...prev,
      [name === "name" ? "name" : name]: value,
      ...(name === "name"
        ? { link: generateLinkFromName(value) }
        : {}),
    }));

    // Validate theo trường cụ thể
    switch (name) {
      case "name":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, name: "requireName" }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.name;
            return newErrors;
          });
        }
        break;
      case "user_nm":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, user_nm: "requireUsername" }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.user_nm;
            return newErrors;
          });
        }
        break;
      case "email":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, email: "requireEmail" }));
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setErrors((prev) => ({ ...prev, email: "invalidEmail" }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.email;
            return newErrors;
          });
        }

        break;
      case "phone":
        const isValid = /^\d+$/.test(value);
        if (value && !isValid) {
          setErrors((prev) => ({
            ...prev,
            phone: "invalidPhoneFormat",
          }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.phone;
            return newErrors;
          });
        }
        break;

      case "password":
        if (value && !value.trim()) {
          setErrors((prev) => ({ ...prev, password: "requirePassword" }));
        }
        else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.password;
            return newErrors;
          });
        }
      default:
        break;
    }
  };
  const validateForm = () => {
    const newErrors: { [key in keyof Partial<Page>]: string } = {};

    // Tên
    if (!formData.name.trim()) {
      newErrors.name = "requireName";
    }

    // Tên người dùng
    if (!formData.user_nm.trim()) {
      newErrors.user_nm = "requireUsername";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "requireEmail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "invalidEmail";
    }

    // Số điện thoại (nếu có nhập)
    const isValid = /^0\d{9,10}$/.test(formData.phone);
    if (formData.phone && !isValid) {
      newErrors.phone = "invalidPhoneFormat";
    }

    if (!encryptedId) {
      if (!formData.password.trim()) {
        newErrors.password = "requirePassword";
      } else if (formData.password.trim().length < 6) {
        newErrors.password = "passwordTooShort";
      }
    } else {
      if (formData.password && formData.password.trim().length < 6) {
        newErrors.password = "passwordTooShort";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại các trường dữ liệu.");
      return;
    }
    try {
      // Nếu có id thì cập nhật, không có thì thêm mới
      if (!formData.password) {
        formData.password = '';
      }

      let avatarToSubmit = formData.avatar;
      // Nếu user nhấn gỡ avatar (không upload mới)
      if (
        avatarRemoved && !avatarUploaded &&
        typeof avatarToSubmit === "object" &&
        avatarToSubmit.src === "" &&
        avatarToSubmit.old
      ) {
        avatarToSubmit = {
          src: "",
          name: "",
          type: "",
          old: avatarToSubmit.old,
          del: avatarToSubmit.old
        };
      }
      // Nếu upload mới thì set del = old
      else if (
        typeof avatarToSubmit === "object" &&
        avatarToSubmit.src &&
        avatarToSubmit.old
      ) {
        avatarToSubmit = { ...avatarToSubmit, del: avatarToSubmit.old };
      }

      if (encryptedId) {
        const dataToSubmit = {
          ...pick(formData, [
            'id',
            'name',
            'user_nm',
            'password',
            'phone',
            'permission_level',
            'email',
          ]),
          avatar: avatarToSubmit,
        };
        const res = await axiosInstance.post("account/update", { data: dataToSubmit });
        toast.success(res.data.error_cont);
        // Update formData với dữ liệu mới
        if (formData.id) {
          await getById(formData.id);
        }
        setAvatarUploaded(false);
        setAvatarRemoved(false);
      } else {
        const dataToSubmit = {
          ...pick(formData, [
            'name',
            'user_nm',
            'password',
            'phone',
            'permission_level',
            'email',
          ]),
          avatar: avatarToSubmit,
        };
        const res = await axiosInstance.post("account/insert", {
          data: dataToSubmit,
        });
        const encryptedId = crypto.encrypt(res.data.data.id);
        router.push(`/admin/account/process?id=${encryptedId}`);
        toast.success(res.data.error_cont);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  const handleChangePassword = () => {
    // Check if userID is available in sessionStorage
    const userID = getCookie('user_id');
    if (!userID) {
      toast.error("User ID not found in session storage.");
      return;
    }
    // Encrypt the userID
    const encryptedId = crypto.encrypt(formData.id.toString());
    router.push(`/admin/account/change-password?id=${encryptedId}`);
  }

  const handleAvatarUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        avatar: {
          src: e.target?.result as string,
          name: file.name,
          type: file.type,
          old: typeof prev.avatar === "object" ? prev.avatar.old : "",
          del: "",
          size: {}
        },
      }));
      setAvatarUploaded(true);
    };
    reader.readAsDataURL(file);
  };
  const handleAvatarRemove = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: typeof prev.avatar === "object"
        ? { ...prev.avatar, src: "", name: "", type: "" }
        : prev.avatar,
    }));
    setAvatarUploaded(false);
    setAvatarRemoved(true);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle={encryptedId ? "update" : "insert"} />
      <ComponentCard isShowHeader={false}>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center h-full min-h-[300px]">

                  <div>
                    {/* Nếu đã upload mới thì show preview upload */}
                    {avatarUploaded && formData.avatar && typeof formData.avatar === "object" ? (
                      <div className="relative w-40 h-40 flex flex-col items-center">
                        <img
                          src={formData.avatar.src}
                          alt="avatar"
                          className="rounded-full object-cover"
                        />
                        <button
                          type="button"
                          className="font-bold absolute top-0 right-0 rounded-full text-red-500 p-1 text-2xl"
                          onClick={handleAvatarRemove}
                          style={{ transform: "translate(40%, -40%)" }}
                          aria-label="Xóa ảnh đại diện"
                        >
                          &#10005;
                        </button>
                      </div>
                    ) : (
                      // Nếu chưa upload mới, show avatar hiện tại nếu có
                      !avatarUploaded && !avatarRemoved && formData.avatar && typeof formData.avatar === "object" && formData.avatar.old !== "" ? (
                        <div className="relative w-40 h-40 flex flex-col items-center">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}public/uploads/avatar/${formData.avatar.old}`}
                            alt="avatar"
                            className="rounded-full object-cover"
                          />
                          <button
                            type="button"
                            className="font-bold absolute top-0 right-0 rounded-full text-red-500 p-1 text-xl"
                            onClick={handleAvatarRemove}
                            style={{ transform: "translate(40%, -40%)" }}
                            aria-label="Xóa ảnh đại diện"
                          >
                            &#10005;
                          </button>
                        </div>
                      ) : (
                        // Nếu chưa có avatar, show box upload
                        <div className="flex items-center justify-center w-35 h-35 bg-gray-200">
                          <DropzoneComponent
                            
                            onFileUpload={handleAvatarUpload}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <Label className="mt-5">Ảnh đại diện</Label>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="name">Tên người dùng</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      placeholder="Nhập tên người dùng"
                      onChange={handleInputChange}
                      error={!!errors.name}
                      hint={errors.name}
                    />
                  </div>
                  <div>
                    <Label htmlFor="user_nm">Tên đăng nhập</Label>
                    <Input
                      type="text"
                      name="user_nm"
                      id="user_nm"
                      value={formData.user_nm}
                      placeholder="Nhập tên đăng nhập"
                      onChange={handleInputChange}
                      error={!!errors.user_nm}
                      hint={errors.user_nm}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      value={formData.email}
                      placeholder="Nhập email"
                      onChange={handleInputChange}
                      error={!!errors.email}
                      hint={errors.email}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      placeholder="Nhập số điện thoại"
                      onChange={handleInputChange}
                      error={!!errors.phone}
                      hint={errors.phone}
                    />
                  </div>
                  {!encryptedId && (
                    <div>
                      <Label htmlFor="password">Mật khẩu</Label>
                      <Input
                        type="text"
                        name="password"
                        id="password"
                        value={formData.password}
                        placeholder="Nhập mật khẩu"
                        onChange={handleInputChange}
                        error={!!errors.password}
                        hint={errors.password}
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="permission_level">Loại tài khoản</Label>
                    <Select
                      options={parentOptions}
                      placeholder="Chọn quyền"
                      defaultValue={formData.permission_level.toString()}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          permission_level: value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              {encryptedId && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-blue-500 mt-4 hover:underline hover:text-red-500"
                    onClick={handleChangePassword}>
                    Đổi mật khẩu
                  </button>
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Button variant="submit">Save</Button>
              </div>
            </Form>
          </div>

        )}
      </ComponentCard>
    </div>
  );
}
