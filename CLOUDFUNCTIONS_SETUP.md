# Cloud Functions Setup Guide

Hướng dẫn thiết lập Firebase Cloud Functions để thêm server-side validation, rate limiting, và audit logging.

## Bước 1: Cài đặt Firebase CLI

```bash
npm install -g firebase-tools
```

Login vào Firebase:
```bash
firebase login
```

## Bước 2: Initialize Firebase Functions

```bash
cd firebase/functions
npm install
```

## Bước 3: Deploy Security Rules

Deploy Firestore Security Rules (không cần functions):

```bash
firebase deploy --only firestore:rules
```

Hoặc deploy tất cả:

```bash
firebase deploy --only firestore
```

## Bước 4: Deploy Cloud Functions (Optional)

Nếu bạn muốn sử dụng Cloud Functions cho validation và rate limiting phức tạp hơn:

```bash
cd firebase/functions
npm install
npm run build
firebase deploy --only functions
```

## Cloud Functions Features

### 1. **validateProjectOnWrite**
- Validate project data khi write vào Firestore
- Check tất cả fields, types, lengths
- Throw error nếu validation fails

### 2. **rateLimitOnWrite**
- Server-side rate limiting
- Track operations per user
- 50 operations per minute limit
- Store rate limit data trong Firestore collection `rate_limits`

### 3. **createAuditLogOnWrite**
- Tự động tạo audit log khi có write operations
- Track tất cả changes (before/after)
- Không cần client-side audit logging nữa

### 4. **sanitizeProjectOnWrite**
- Auto-sanitize project data trước khi save
- Remove script tags và event handlers
- Ensure data safety

## Cấu hình

### Firestore Rules (`firestore.rules`)

Security Rules đã được cấu hình với:
- ✅ Public read access
- ✅ Authenticated write only
- ✅ Validation trong rules
- ✅ XSS prevention checks
- ✅ Audit logs protection

### Firestore Indexes (`firestore.indexes.json`)

Đã tạo indexes cho audit logs:
- Index by userId + timestamp
- Index by resourceType + timestamp
- Index by action + timestamp

Để deploy indexes:

```bash
firebase deploy --only firestore:indexes
```

## Testing

### Test Security Rules

1. Vào Firebase Console > Firestore Database
2. Vào tab "Rules" > "Rules playground"
3. Test các scenarios:
   - Read without auth (should allow)
   - Write without auth (should deny)
   - Write with invalid data (should deny)
   - Write with valid data and auth (should allow)

### Test Cloud Functions

1. Deploy functions:
   ```bash
   firebase deploy --only functions
   ```

2. Monitor logs:
   ```bash
   firebase functions:log
   ```

3. Test locally (optional):
   ```bash
   firebase emulators:start
   ```

## Production Deployment

1. **Deploy Security Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Deploy Indexes**:
   ```bash
   firebase deploy --only firestore:indexes
   ```

3. **Deploy Functions** (optional):
   ```bash
   cd firebase/functions
   npm install
   npm run build
   firebase deploy --only functions
   ```

## Monitoring

- **Security Rules**: Vào Firebase Console > Firestore > Rules để xem và test
- **Functions**: Vào Firebase Console > Functions để xem logs và metrics
- **Audit Logs**: Vào Firestore Database > `audit_logs` collection

## Cost Considerations

- **Security Rules**: Free (no cost)
- **Cloud Functions**: Pay per invocation (first 2 million invocations/month free)
- **Firestore**: Standard pricing for reads/writes

## Tùy chọn: Chỉ dùng Security Rules (Recommended)

Nếu bạn muốn đơn giản hóa và giảm cost, chỉ cần deploy Security Rules:

```bash
firebase deploy --only firestore:rules
```

Security Rules sẽ:
- ✅ Validate data structure
- ✅ Enforce authentication
- ✅ Prevent XSS
- ✅ Allow/deny operations

Cloud Functions là optional và chỉ cần nếu bạn muốn:
- Server-side rate limiting (more accurate)
- Complex validation logic
- Auto-sanitization
- Automatic audit logging
