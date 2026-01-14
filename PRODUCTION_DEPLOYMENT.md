# Production Deployment Guide

Hướng dẫn deploy ứng dụng lên production và cấu hình Firebase.

## Pre-Deployment Checklist

### 1. Firebase Configuration

- [ ] Firebase project đã được tạo
- [ ] Firestore Database đã được tạo
- [ ] Firebase Authentication đã được enable
- [ ] **Authorized Domains đã được thêm** (quan trọng!)
- [ ] Security Rules đã được deploy
- [ ] Environment variables đã được cấu hình

### 2. Authorized Domains Setup

**⚠️ QUAN TRỌNG**: Phải thêm domain production vào Authorized Domains trước khi deploy!

1. Vào Firebase Console > **Authentication** > **Settings**
2. Scroll xuống phần **Authorized domains**
3. Click **Add domain**
4. Thêm các domains sau:

#### Nếu dùng Custom Domain:
```
yourdomain.com
www.yourdomain.com
```

#### Nếu dùng Vercel:
```
yourproject.vercel.app
yourproject.vercel.app (tự động thêm khi deploy)
```

#### Nếu dùng Netlify:
```
yourproject.netlify.app
yourproject.netlify.app (tự động thêm khi deploy)
```

#### Nếu dùng Firebase Hosting:
```
yourproject.web.app
yourproject.firebaseapp.com
```

#### Nếu dùng Cloudflare Pages:
```
yourproject.pages.dev
yourdomain.com (nếu có custom domain)
```

### 3. Environment Variables

Đảm bảo các environment variables đã được set trong hosting platform:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Common Production Issues

### 1. Error: `auth/unauthorized-domain`

**Nguyên nhân**: Domain production chưa được thêm vào Authorized Domains.

**Giải pháp**:
1. Vào Firebase Console > Authentication > Settings
2. Thêm domain production vào Authorized Domains
3. Đợi vài phút để Firebase cập nhật
4. Refresh và thử lại

**Prevention**: Luôn thêm domain vào Authorized Domains **trước khi deploy**.

### 2. Error: `Missing or insufficient permissions`

**Nguyên nhân**: Security Rules chưa được deploy hoặc không đúng.

**Giải pháp**:
```bash
firebase deploy --only firestore:rules
```

### 3. Error: Firebase config not found

**Nguyên nhân**: Environment variables chưa được set trong hosting platform.

**Giải pháp**: 
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Environment Variables
- Firebase Hosting: Firebase Console > Project Settings > Your apps

### 4. CORS Errors

**Nguyên nhân**: Firebase config không đúng hoặc domain không được authorize.

**Giải pháp**: 
- Kiểm tra `VITE_FIREBASE_AUTH_DOMAIN` có đúng không
- Đảm bảo domain đã được thêm vào Authorized Domains

## Deployment Platforms

### Vercel

1. **Connect Repository**:
   ```bash
   vercel
   ```

2. **Set Environment Variables**:
   - Vào Project Settings > Environment Variables
   - Thêm tất cả `VITE_FIREBASE_*` variables

3. **Add Authorized Domain**:
   - Lấy domain từ Vercel (ví dụ: `yourproject.vercel.app`)
   - Thêm vào Firebase Authorized Domains

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Netlify

1. **Connect Repository**:
   - Vào Netlify Dashboard
   - Click "New site from Git"

2. **Set Environment Variables**:
   - Site Settings > Environment Variables
   - Thêm tất cả `VITE_FIREBASE_*` variables

3. **Add Authorized Domain**:
   - Lấy domain từ Netlify (ví dụ: `yourproject.netlify.app`)
   - Thêm vào Firebase Authorized Domains

4. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Firebase Hosting

1. **Initialize Firebase Hosting**:
   ```bash
   firebase init hosting
   ```

2. **Set Environment Variables**:
   - Tạo file `.env.production` với Firebase config
   - Hoặc set trong Firebase Console

3. **Build and Deploy**:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

4. **Add Authorized Domain**:
   - Domain tự động: `yourproject.web.app` và `yourproject.firebaseapp.com`
   - Nếu có custom domain, thêm vào Authorized Domains

### Cloudflare Pages

1. **Connect Repository**:
   - Vào Cloudflare Dashboard > Pages
   - Connect Git repository

2. **Set Environment Variables**:
   - Settings > Environment Variables
   - Thêm tất cả `VITE_FIREBASE_*` variables

3. **Build Settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`

4. **Add Authorized Domain**:
   - Lấy domain từ Cloudflare (ví dụ: `yourproject.pages.dev`)
   - Thêm vào Firebase Authorized Domains

## Post-Deployment

### 1. Test Authentication

- [ ] Test đăng nhập với Email/Password
- [ ] Test đăng ký với Email/Password
- [ ] Test đăng nhập với Google
- [ ] Test đăng xuất
- [ ] Test Protected Routes

### 2. Test Admin Panel

- [ ] Truy cập `/admin` (phải redirect về login nếu chưa đăng nhập)
- [ ] Đăng nhập và truy cập admin panel
- [ ] Test CRUD operations (thêm/sửa/xóa projects)
- [ ] Test translations management
- [ ] Test constants management

### 3. Monitor

- [ ] Kiểm tra Firebase Console > Authentication > Users
- [ ] Kiểm tra Firestore Database > Collections
- [ ] Kiểm tra Firebase Console > Functions (nếu có)
- [ ] Kiểm tra error logs trong hosting platform

## Security Checklist

- [ ] Security Rules đã được deploy
- [ ] Authorized Domains đã được cấu hình đúng
- [ ] Environment variables không bị expose trong client code
- [ ] HTTPS được enable (tự động với các hosting platforms)
- [ ] Firebase Authentication providers đã được enable
- [ ] Audit logging đang hoạt động (nếu có)

## Troubleshooting

### Debug Production Issues

1. **Check Browser Console**:
   - Mở DevTools > Console
   - Tìm các lỗi Firebase

2. **Check Network Tab**:
   - Xem các requests đến Firebase
   - Kiểm tra status codes và error messages

3. **Check Firebase Console**:
   - Authentication > Users: Xem users đã được tạo chưa
   - Firestore Database: Xem data có được lưu không
   - Functions: Xem logs (nếu có)

4. **Check Environment Variables**:
   - Đảm bảo tất cả `VITE_FIREBASE_*` variables đã được set
   - Kiểm tra values có đúng không

## Support

Nếu gặp vấn đề:
1. Kiểm tra [Firebase Documentation](https://firebase.google.com/docs)
2. Kiểm tra [Firebase Status](https://status.firebase.google.com/)
3. Xem logs trong Firebase Console
4. Xem logs trong hosting platform
