# Hướng dẫn thiết lập và kết nối MongoDB

Tài liệu này hướng dẫn cách cấu hình, kết nối và sử dụng cơ sở dữ liệu MongoDB trong dự án Next.js (sử dụng thư viện chính thức `mongodb`).

---

## 1. Chuẩn bị Cơ sở dữ liệu MongoDB

### Phương án A: Sử dụng MongoDB Atlas (Khuyên dùng cho môi trường Staging/Production)
1. Truy cập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) và đăng ký tài khoản.
2. Tạo một Cluster mới (chọn gói Free Shared Cluster để thử nghiệm).
3. Cấu hình bảo mật mạng: 
   * Thêm địa chỉ IP hiện tại của bạn vào **IP Access List** (hoặc thêm `0.0.0.0/0` để cho phép kết nối từ mọi nơi).
4. Tạo tài khoản truy cập Database:
   * Vào **Database Access** -> **Add New Database User**.
   * Thiết lập Username và Password (chọn quyền `Read and write to any database`).
5. Lấy chuỗi kết nối (`Connection String`):
   * Nhấn nút **Connect** ở giao diện Cluster.
   * Chọn **Connect your application** -> chọn driver là **Node.js**.
   * Sao chép chuỗi kết nối có dạng:
     `mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority`

### Phương án B: Cài đặt MongoDB Local (Cho môi trường phát triển máy cá nhân)
1. Tải và cài đặt [MongoDB Community Server](https://www.mongodb.com/try/download/community) trên máy tính của bạn.
2. Khởi chạy service MongoDB. Chuỗi kết nối mặc định sẽ là:
   `mongodb://localhost:27017/korean_learning`

---

## 2. Cấu hình biến môi trường trong Dự án

Thêm các khóa cấu hình sau vào tệp `.env` ở thư mục gốc của dự án:

```env
# Chuỗi kết nối MongoDB (Thay thế username, password và tên database thực tế)
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/korean_learning?retryWrites=true&w=majority"

# Tên Database sử dụng chính thức
MONGODB_DB="korean_learning"
```

---

## 3. Code kết nối tối ưu trong Next.js (Singleton Pattern)

Trong môi trường phát triển (Development) của Next.js, mỗi lần lưu code (Hot Reload), máy chủ sẽ khởi chạy lại các module. Nếu viết kết nối trực tiếp thông thường, mỗi lần reload sẽ tạo ra một kết nối mới tới MongoDB dẫn đến tràn cổng kết nối (Connection Leak).

Để khắc phục, chúng ta sử dụng thiết kế **Singleton** để cache lại đối tượng client kết nối.

Tạo tệp tin `src/core/lib/mongodb.ts`:

```typescript
import { MongoClient } from 'mongodb';

/**
 * Ràng buộc kiểu dữ liệu cho thuộc tính toàn cục toàn hệ thống
 */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Vui lòng định nghĩa biến môi trường MONGODB_URI trong tệp .env');
}

if (process.env.NODE_ENV === 'development') {
  // Trong môi trường development, sử dụng biến toàn cục để giữ kết nối qua các lần hot-reload.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Trong môi trường production, khởi tạo kết nối mới bình thường.
  client = new MongoClient(uri!, options);
  clientPromise = client.connect();
}

/**
 * Trả về Promise chứa client kết nối MongoDB đã được kết nối thành công.
 */
export default clientPromise;
```

---

## 4. Ví dụ sử dụng trong Next.js Route Handler (API Router)

Tạo một API Endpoint tại `src/app/api/vocab/route.ts` để lấy danh sách từ vựng từ MongoDB:

```typescript
import { NextResponse } from 'next/server';
import clientPromise from '@/core/lib/mongodb';

/**
 * GET API: Lấy danh sách từ vựng từ MongoDB
 * @returns NextResponse JSON
 */
export async function GET() {
  try {
    // 1. Chờ kết nối tới MongoClient thành công
    const client = await clientPromise;
    
    // 2. Kết nối tới database cụ thể
    const db = client.db(process.env.MONGODB_DB || "korean_learning");
    
    // 3. Truy vấn dữ liệu từ Collection "vocabulary"
    const vocabulary = await db
      .collection("vocabulary")
      .find({})
      .limit(20)
      .toArray();
      
    return NextResponse.json({ success: true, data: vocabulary });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi kết nối cơ sở dữ liệu.' },
      { status: 500 }
    );
  }
}
```
