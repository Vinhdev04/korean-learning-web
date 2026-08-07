import axios from 'axios';

export interface ServerError {
  error_cont: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Hàm lấy giá trị cookie
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

// Khởi tạo axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Interceptor Request xử lý FormData & JSON
axiosInstance.interceptors.request.use(
  config => {
    const token = getCookie('token');
    const userId = getCookie('user_id') || '0';

    // Thêm token vào header
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // ✅ Nếu là FormData thì append vào FormData
    if (config.data instanceof FormData) {
      config.data.append('user_id', userId);
      config.data.append('lang', 'vi');
      config.data.append('trans_code', '');
    }

    // ✅ Nếu là JSON object (post thông thường)
    else if (
      config.method === 'post' &&
      config.data &&
      typeof config.data === 'object' &&
      !(config.data instanceof FormData)
    ) {
      config.data = {
        ...config.data,
        user_id: Number(userId),
        lang: 'vi',
        trans_code: '',
      };
    }

    return config;
  },
  error => Promise.reject(error)
);

// ✅ Tạo query string object
export function createParams<T>(params: Record<string, T>) {
  const filtered = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, T>
    );

  return filtered;
}

export default axiosInstance;
