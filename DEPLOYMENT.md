# Deployment Guide

Hướng dẫn deploy ứng dụng với Firebase Security Rules và Cloud Functions.

## Prerequisites

1. **Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Firebase Project**: Đã tạo và config (xem `FIREBASE_SETUP.md`)

## Option 1: Deploy Security Rules Only (Recommended - Free)

Đây là option đơn giản nhất và **hoàn toàn miễn phí**.

### Bước 1: Initialize Firebase (lần đầu)

```bash
firebase init
```

Chọn:
- ✅ Firestore: Configure security rules and indexes files
- ❌ Functions: (skip nếu không cần)
- ❌ Hosting: (skip nếu deploy riêng)

### Bước 2: Link Firebase Project

```bash
firebase use --add
```

Chọn project của bạn từ danh sách.

### Bước 3: Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

### Bước 4: Deploy Indexes (Optional but Recommended)

```bash
firebase deploy --only firestore:indexes
```

### Xong!

Security Rules đã được deploy và sẽ:
- ✅ Validate data structure
- ✅ Enforce authentication
- ✅ Prevent unauthorized access
- ✅ Basic XSS checks

**Cost**: FREE (không có cost)

## Option 2: Deploy với Cloud Functions (Advanced)

### Bước 1: Setup Functions

```bash
cd firebase/functions
npm install
```

### Bước 2: Build Functions

```bash
npm run build
```

### Bước 3: Deploy Everything

```bash
# From project root
firebase deploy
```

Hoặc deploy riêng lẻ:

```bash
# Deploy Security Rules
firebase deploy --only firestore:rules

# Deploy Indexes
firebase deploy --only firestore:indexes

# Deploy Functions
firebase deploy --only functions
```

### Cloud Functions Features

1. **createAuditLogOnProjectsWrite**: Auto audit logging cho projects
2. **createAuditLogOnTranslationsWrite**: Auto audit logging cho translations
3. **createAuditLogOnConstantsWrite**: Auto audit logging cho constants
4. **checkRateLimit**: Callable function để check rate limit (server-side)
5. **sanitizeProjectOnWrite**: Auto sanitization (optional)

**Lưu ý**: Validation được làm trong Security Rules (không phải Cloud Functions) vì Rules chạy TRƯỚC khi write, còn Functions chạy SAU khi write.

**Cost**: Pay per invocation (first 2M invocations/month FREE)

## Testing Security Rules

### 1. Test trong Firebase Console

1. Vào Firebase Console > Firestore Database > Rules
2. Click "Rules playground"
3. Test các scenarios:
   - Read without auth: ✅ Should allow
   - Write without auth: ❌ Should deny
   - Write with auth + invalid data: ❌ Should deny
   - Write with auth + valid data: ✅ Should allow

### 2. Test trong Application

1. Đăng nhập vào admin panel
2. Thử add/edit/delete project
3. Kiểm tra validation errors nếu có
4. Xem audit logs trong Firestore Console

## Monitoring

### Security Rules
- Vào Firebase Console > Firestore Database > Rules
- Xem deployment history
- Test rules trong Rules Playground

### Cloud Functions
- Vào Firebase Console > Functions
- Xem logs: `firebase functions:log`
- Monitor invocations và errors

### Audit Logs
- Vào Firestore Database > `audit_logs` collection
- Query và filter logs
- Export logs nếu cần

## Production Checklist

- [ ] Firebase project created
- [ ] Authentication enabled
- [ ] Firestore Database created
- [ ] Security Rules deployed
- [ ] Indexes deployed (optional)
- [ ] Cloud Functions deployed (optional)
- [ ] Admin user created
- [ ] Test authentication flow
- [ ] Test write operations
- [ ] Verify audit logs
- [ ] Monitor error logs

## Rollback

Nếu có vấn đề, có thể rollback Security Rules:

```bash
# Deploy previous version
firebase deploy --only firestore:rules
```

Hoặc revert trong Firebase Console:
1. Vào Firestore Database > Rules
2. Xem deployment history
3. Rollback về version trước

## Cost Estimation

### Security Rules
- **FREE** - No cost

### Firestore
- Free tier: 50K reads/day, 20K writes/day
- Standard pricing sau free tier

### Cloud Functions
- Free tier: 2M invocations/month
- $0.40 per million invocations sau free tier

### Recommendation

- **Start with Security Rules only** (FREE)
- Add Cloud Functions nếu cần advanced features
- Monitor usage trong Firebase Console
