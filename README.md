# TuanPC - Portfolio & Tools

Portfolio website và các công cụ hữu ích được xây dựng với Next.js 14, TypeScript, và Tailwind CSS.

## Tính năng

- 🏠 Trang chủ giới thiệu
- 📅 Đếm ngày ra quân (Countdown timer)
- 🎨 UI/UX hiện đại với Tailwind CSS và Ant Design
- 📱 Responsive design
- ⚡ Performance optimized
- 🛡️ Error boundaries
- 🧪 Unit tests

## Công nghệ sử dụng

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, SCSS, Styled Components
- **UI Library**: Ant Design
- **Date Handling**: Day.js
- **Testing**: Jest, React Testing Library

## Cài đặt

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local với các giá trị thực tế
```

## Chạy dự án

```bash
# Development mode
npm run dev

# Build production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests với watch mode
npm run test:watch

# Run tests với coverage
npm run test:coverage
```

## Cấu trúc dự án

```
app/
├── components/          # Reusable components
│   ├── ErrorBoundary/   # Error boundary component
│   ├── icons/           # Icon components
│   ├── select/          # Select component
│   └── Spinner/         # Loading component
├── hooks/               # Custom React hooks
│   ├── useCurrentDateTime.ts
│   ├── useDateCalculations.ts
│   ├── useLocalStorage.ts
│   └── useRealTimeCountdown.ts
├── lib/                 # Utilities và constants
│   ├── constants.ts
│   ├── formatNumberByLocale.ts
│   ├── types.ts
│   └── utils.ts
└── (pages)/             # Pages
    ├── demngayraquan/   # Countdown page
    └── layout.tsx       # App layout
```

## Environment Variables

Tạo file `.env.local` với các biến sau:

```env
NEXT_PUBLIC_PROFILE_GITHUB_URL=https://github.com/yourusername
NEXT_PUBLIC_PROFILE_FB_URL=https://facebook.com/yourprofile
```

## Cải thiện đã thực hiện

### Code Quality
- ✅ Error Boundary để xử lý lỗi toàn cục
- ✅ Custom Hooks để tách logic và tái sử dụng code
- ✅ Type Safety với TypeScript types rõ ràng
- ✅ JSDoc comments cho tất cả functions
- ✅ Constants file để quản lý các giá trị cố định
- ✅ Optimizations với useMemo và useCallback

### Performance
- ✅ Custom hooks để tối ưu re-renders
- ✅ Lazy loading cho images
- ✅ Proper cleanup trong useEffect

### Testing
- ✅ Jest configuration
- ✅ Unit tests cho utilities
- ✅ Test structure sẵn sàng để mở rộng

### Developer Experience
- ✅ Consistent import paths với alias
- ✅ Clear code organization
- ✅ Better error handling
- ✅ Improved loading states

## License

MIT
