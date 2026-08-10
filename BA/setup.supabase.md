# Hướng dẫn thiết lập và kết nối Supabase

Tài liệu này hướng dẫn cách cấu hình, kết nối và sử dụng dịch vụ Supabase (PostgreSQL Database, Authentication & Object Storage) trong dự án Next.js bằng thư viện `@supabase/supabase-js`.

---

## 1. Chuẩn bị Project trên Supabase

1. Truy cập [Supabase](https://supabase.com/) và đăng ký tài khoản (miễn phí).
2. Nhấn nút **New Project** để tạo một dự án mới:
   * Thiết lập tên dự án (ví dụ: `korean-learning`).
   * Đặt mật khẩu cơ sở dữ liệu (`Database Password`).
   * Chọn khu vực máy chủ địa lý gần bạn (ví dụ: `Singapore` hoặc `Tokyo` để tối ưu tốc độ).
3. Đợi vài phút để Supabase cấp phát dịch vụ.
4. Lấy thông tin API để kết nối:
   * Vào mục **Project Settings** (biểu tượng bánh răng ở góc trái bên dưới).
   * Chọn tab **API**.
   * Sao chép hai giá trị quan trọng:
     * **Project URL**: Địa chỉ API của dự án.
     * **Project API Anon Key**: Mã khóa công khai được sử dụng ở cả Client và Server.

---

## 2. Cấu hình biến môi trường trong Dự án

Thêm các khóa cấu hình sau vào tệp `.env` ở thư mục gốc của dự án:

```env
# URL dự án Supabase của bạn
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxxxxxxxxxx.supabase.co"

# Khóa công khai (Public Anon Key)
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 3. Code khởi tạo Supabase Client dùng chung

Để sử dụng Supabase trên cả Client Component (trình duyệt) và Server Component (máy chủ Next.js), chúng ta xây dựng một tệp utility khởi tạo đối tượng client duy nhất.

Tạo tệp tin `src/core/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Vui lòng cấu hình đầy đủ biến môi trường NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * Đối tượng Supabase Client dùng chung cho toàn bộ dự án
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 4. Ví dụ sử dụng các dịch vụ của Supabase

### A. Xác thực người dùng (Authentication) - Ở Client Component
Sử dụng Supabase Auth để xử lý đăng nhập bằng Email và Mật khẩu ở phía Client:

```typescript
"use client";

import { supabase } from '@/core/lib/supabase';
import { useState } from 'react';

export default function LoginButton() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(`Đăng nhập thất bại: ${error.message}`);
    } else {
      alert(`Đăng nhập thành công! Xin chào ${data.user?.email}`);
    }
  };

  return (
    <button onClick={handleLogin}>Đăng nhập</button>
  );
}
```

### B. Tải tệp lên Lưu trữ (Storage Upload) - Ở Server / Client
Tải tệp avatar hoặc tệp tài liệu học tập của học viên lên Supabase Storage bucket (cần tạo bucket tên là `korean-assets` trên Supabase Dashboard trước):

```typescript
import { supabase } from '@/core/lib/supabase';

/**
 * Upload file lên Supabase Storage
 * @param file Tệp tin cần upload
 * @param filePath Đường dẫn lưu trữ (ví dụ: "avatars/user-123.png")
 * @returns Đường dẫn URL công khai của tệp
 */
export async function uploadAsset(file: File, filePath: string): Promise<string | null> {
  try {
    // 1. Thực hiện upload file lên bucket 'korean-assets'
    const { data, error } = await supabase.storage
      .from('korean-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Nếu trùng tên thì ghi đè
      });

    if (error) throw error;

    // 2. Lấy đường dẫn URL công khai để hiển thị trên web
    const { data: publicUrlData } = supabase.storage
      .from('korean-assets')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error('Lỗi upload file lên Supabase Storage:', error.message);
    return null;
  }
}
```
