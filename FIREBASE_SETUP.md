# Firebase Setup Guide

Hướng dẫn thiết lập Firebase Firestore cho ứng dụng.

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" hoặc chọn project có sẵn
3. Điền tên project và làm theo hướng dẫn

## Bước 2: Tạo Firestore Database

1. Trong Firebase Console, chọn project của bạn
2. Vào **Firestore Database** từ menu bên trái
3. Click **Create database**
4. Chọn **Start in test mode** (hoặc production mode với rules phù hợp)
5. Chọn location cho database (gần với người dùng nhất)
6. Click **Enable**

## Bước 3: Tạo Web App

1. Trong Firebase Console, click icon **</>** (Web) để thêm web app
2. Điền tên app (ví dụ: "tuanpc-portfolio")
3. Click **Register app**
4. Copy các config values (apiKey, authDomain, projectId, etc.)

## Bước 4: Enable Firebase Authentication

1. Trong Firebase Console, vào **Authentication** từ menu bên trái
2. Click **Get started**
3. Vào tab **Sign-in method**
4. Enable các providers bạn muốn sử dụng:
   - **Email/Password**: Click và Enable
   - **Google**: Click và Enable (cần cấu hình OAuth consent screen)
5. **Quan trọng**: Thêm Authorized Domains (xem chi tiết bên dưới)
6. Lưu các thay đổi

### Thêm Authorized Domains (Quan trọng cho Production!)

Để tránh lỗi `auth/unauthorized-domain` khi deploy lên production:

1. Trong Firebase Console, vào **Authentication** > **Settings**
2. Scroll xuống phần **Authorized domains**
3. Click **Add domain**
4. Thêm các domains sau:
   - Domain production của bạn (ví dụ: `yourdomain.com`, `www.yourdomain.com`)
   - Domain staging (nếu có)
   - Domain localhost (đã có sẵn cho development)
   - Domain của hosting provider (ví dụ: `vercel.app`, `netlify.app`, `firebaseapp.com`)

**Lưu ý**:
- Firebase tự động thêm `localhost` cho development
- Cần thêm domain production **trước khi deploy**
- Không cần thêm protocol (`http://` hoặc `https://`)
- Có thể thêm subdomain (ví dụ: `www.yourdomain.com`)

## Bước 5: Tạo User Account (Tài khoản Admin)

**⚠️ Quan trọng**: Không có tài khoản mặc định. Bạn cần tự tạo tài khoản đầu tiên.

### Cách 1: Tạo qua Firebase Console (Recommended)

1. Vào **Authentication** > **Users** trong Firebase Console
2. Click **Add user** (hoặc **Add user manually**)
3. Nhập:
   - **Email**: Email của bạn (ví dụ: `admin@example.com`)
   - **Password**: Mật khẩu mạnh (tối thiểu 6 ký tự)
4. Click **Add user**
5. **Lưu lại email và password** để đăng nhập vào Admin Panel

### Cách 2: Đăng ký qua ứng dụng (Nếu có chức năng Sign Up)

Nếu bạn đã thêm chức năng đăng ký vào ứng dụng, bạn có thể:
1. Vào trang đăng ký (nếu có)
2. Điền email và password
3. Tài khoản sẽ được tạo tự động

### Cách 3: Đăng nhập với Google

1. Enable **Google Sign-In** trong Firebase Console (Bước 4)
2. Vào trang login (`/admin/login`)
3. Click **"Đăng nhập với Google"**
4. Chọn tài khoản Google của bạn
5. Tài khoản sẽ được tạo tự động lần đầu tiên

### Lưu ý

- **Không có tài khoản mặc định**: Bạn phải tạo tài khoản đầu tiên
- **Email/Password**: Cần tạo thủ công trong Firebase Console
- **Google Sign-In**: Tự động tạo tài khoản khi đăng nhập lần đầu
- **Bảo mật**: Chỉ những user đã được tạo mới có thể đăng nhập và truy cập Admin Panel

## Bước 6: Cài đặt Firebase CLI (Cho server-side security)

```bash
npm install -g firebase-tools
firebase login
```

## Bước 7: Deploy Firestore Security Rules (Quan trọng!)

Có 2 cách:

### Cách 1: Deploy từ file (Recommended)

File `firestore.rules` đã được tạo sẵn với đầy đủ validation. Deploy:

```bash
firebase deploy --only firestore:rules
```

### Cách 2: Copy vào Firebase Console

Vào **Firestore Database** > **Rules** và copy nội dung từ file `firestore.rules` vào:

**Lưu ý**: File `firestore.rules` đã có validation logic đầy đủ, bao gồm:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects collection
    match /projects/{projectId} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Translations collection
    match /translations/{docId} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Constants collection
    match /constants/{docId} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

⚠️ **Lưu ý**: 
- Rules trên cho phép mọi người **đọc** dữ liệu (public read)
- Chỉ **authenticated users** mới có thể **ghi** dữ liệu (write)
- Để thêm security hơn, bạn có thể restrict read access hoặc add role-based access control

## Bước 5: Cấu hình Environment Variables

1. Copy file `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```

2. Mở file `.env` và điền các giá trị từ Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Bước 6: Test

1. Khởi chạy ứng dụng:
   ```bash
   npm run dev
   ```

2. Kiểm tra console để đảm bảo không có lỗi Firebase
3. Thử thêm/sửa/xóa project trong admin panel
4. Kiểm tra Firebase Console > Firestore Database để xem dữ liệu

## Cấu trúc Database

Firestore sẽ tự động tạo các collections sau:
- `projects`: Chứa danh sách projects (mỗi project là một document với id là project.id)
- `translations`: Chứa translations (document id: `main`)
- `constants`: Chứa constants (document id: `main`)

## Fallback to localStorage

Nếu Firebase không được cấu hình hoặc có lỗi, ứng dụng sẽ tự động fallback về localStorage. Bạn có thể kiểm tra bằng cách:
1. Không điền Firebase config trong `.env`
2. Ứng dụng vẫn hoạt động với localStorage

## Production Security

Để bảo mật cho production, ứng dụng đã được tích hợp:

1. **Firebase Authentication**: ✅
   - Login/authentication đã được implement
   - Chỉ authenticated users mới được write

2. **Data Validation**: ✅
   - Tất cả dữ liệu được validate trước khi save
   - XSS protection với input sanitization
   - Field length và type validation

3. **Rate Limiting**: ✅
   - Client-side rate limiting: 50 operations per minute
   - Tự động block khi vượt quá limit
   - Prevents abuse và spam

4. **Audit Logging**: ✅
   - Tất cả operations được log vào Firestore collection `audit_logs`
   - Track: user, timestamp, action, resource, changes
   - Có thể xem audit logs trong Firebase Console

5. **Update Security Rules**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /projects/{projectId} {
         allow read: if true; // Public read
         allow write: if request.auth != null; // Only authenticated users
       }
       match /translations/{docId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /constants/{docId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. **Security Features Đã Implement**:

   ✅ **Client-side Validation**:
   - Validate tất cả fields trước khi save
   - Check data types, lengths, formats
   - Sanitize inputs để prevent XSS
   
   ✅ **Rate Limiting**:
   - Client-side rate limiting: 50 operations/minute
   - Tự động block khi vượt quá limit
   - Prevents abuse và spam attacks
   
   ✅ **Audit Logging**:
   - Tất cả operations được log vào `audit_logs` collection
   - Track: user, action, resource, timestamp, changes
   - Có thể query và xem audit logs trong Firestore Console

4. **View Audit Logs**:
   - Vào Firestore Console > `audit_logs` collection
   - Xem tất cả operations đã thực hiện
   - Filter theo user, action, resource type
   - Useful cho security monitoring và debugging

5. **Server-side Security (Recommended for Production)**:
   - Deploy Firestore Security Rules (file: `firestore.rules`)
   - Optional: Deploy Cloud Functions cho advanced validation
   - Xem `CLOUDFUNCTIONS_SETUP.md` để biết chi tiết

## Server-side Security Setup
`
### Option 1: Firestore Security Rules (Recommended - Free)

1. Deploy Security Rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. Security Rules Features:
   - ✅ Server-side validation
   - ✅ Authentication enforcement
   - ✅ Data structure validation
   - ✅ XSS prevention checks
   - ✅ Free (no additional cost)

### Option 2: Cloud Functions (Advanced - Optional)

Xem `CLOUDFUNCTIONS_SETUP.md` để biết chi tiết về:
- Server-side validation functions
- Advanced rate limiting
- Auto-sanitization
- Automatic audit logging

**Lưu ý**: Cloud Functions có cost (pay per invocation), nhưng có free tier (2M invocations/month).

## Troubleshooting

### Lỗi: "FirebaseError: Missing or insufficient permissions"
- Kiểm tra Security Rules trong Firestore Console
- Đảm bảo rules cho phép read/write

### Lỗi: "Firebase App named '[DEFAULT]' already exists"
- Firebase đã được initialize rồi
- Kiểm tra file `src/lib/firebase.ts`

### Dữ liệu không sync
- Kiểm tra console để xem có lỗi không
- Đảm bảo Firebase config đúng
- Kiểm tra network tab để xem Firestore requests

## Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
