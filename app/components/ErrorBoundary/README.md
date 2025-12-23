# ErrorBoundary Component

ErrorBoundary component để bắt và xử lý lỗi trong React component tree.

## Cách sử dụng

### Basic Usage

```tsx
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function MyPage() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### Với Custom Fallback

```tsx
<ErrorBoundary fallback={<div>Custom error message</div>}>
  <YourComponent />
</ErrorBoundary>
```

## Cách Test

### 1. Unit Tests

Chạy unit tests:

```bash
npm test -- ErrorBoundary.test
```

Tests bao gồm:
- ✅ Render children khi không có lỗi
- ✅ Hiển thị error UI khi có lỗi
- ✅ Hiển thị custom fallback
- ✅ Reset error state
- ✅ Log errors to console

### 2. Integration Tests

Chạy integration tests:

```bash
npm test -- ErrorBoundary.integration
```

### 3. Test trên UI (Browser) ⭐

**Cách nhanh nhất để test ErrorBoundary:**

1. **Khởi động dev server:**
   ```bash
   npm run dev
   ```

2. **Truy cập test page:**
   ```
   http://localhost:3000/test-error-boundary
   ```

3. **Test các scenarios:**
   - Click "Trigger Error" để xem ErrorBoundary bắt lỗi
   - Click "Thử lại" để reset error state
   - Click "Reset Component" để remount component
   - Test Custom Fallback để xem custom error UI

**Test page đã được tạo sẵn tại:** `app/test-error-boundary/page.tsx`

### 4. Test trong Browser Console

Bạn cũng có thể test bằng cách trigger error trong browser console:

```javascript
// Trong browser console
throw new Error('Test error');
```

## Lưu ý

⚠️ **ErrorBoundary chỉ bắt được:**
- Errors trong render methods
- Errors trong lifecycle methods
- Errors trong constructors

❌ **ErrorBoundary KHÔNG bắt được:**
- Event handlers (dùng try-catch)
- Async code (setTimeout, promises)
- Errors trong ErrorBoundary chính nó
- Server-side rendering errors

## Best Practices

1. Đặt ErrorBoundary ở nhiều levels khác nhau
2. Sử dụng custom fallback cho từng section
3. Log errors để tracking (Sentry, LogRocket, etc.)
4. Test ErrorBoundary trong development

