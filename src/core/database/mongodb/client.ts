import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/korean_learning';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  console.warn('Cảnh báo: Chưa cấu hình MONGODB_URI trong biến môi trường. Đang sử dụng fallback local.');
}

/**
 * Đảm bảo tính Singleton cho kết nối MongoClient trong Next.js (hỗ trợ Hot Reload trong chế độ phát triển).
 */
if (process.env.NODE_ENV === 'development') {
  // Trong chế độ development, sử dụng một biến global để lưu trữ kết nối,
  // ngăn chặn việc tạo ra kết nối mới liên tục mỗi khi code thay đổi (hot reload).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Trong chế độ production, khởi tạo kết nối MongoClient thông thường.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Khởi tạo kết nối MongoDB clientPromise.
 * Phục vụ cho: Lưu trữ thông tin Streak học tập, bài tập, điểm số và tiến trình của học viên.
 */
export default clientPromise;
