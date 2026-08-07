import { createClient } from '@supabase/supabase-js';

// Đọc các biến môi trường cấu hình kết nối Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

/**
 * Khởi tạo và xuất Supabase Client dùng chung.
 * Phục vụ cho: Xác thực (Auth), Realtime Chat (AI Assistant), và Storage (Lưu trữ ảnh/video).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
