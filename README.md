# TuanPC - Portfolio & Tools

Portfolio website và các công cụ hữu ích được xây dựng với React, Vite, TypeScript, và Tailwind CSS.

## Tính năng

- 🏠 Trang chủ giới thiệu
- 📅 Đếm ngày ra quân (Countdown timer)
- 🎨 UI/UX hiện đại với Tailwind CSS và Ant Design
- 📱 Responsive design
- ⚡ Performance optimized với Vite
- 🛡️ Error boundaries
- 🧪 Unit tests

## Công nghệ sử dụng

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS, SCSS, Styled Components
- **UI Library**: Ant Design
- **Date Handling**: Day.js
- **Testing**: Jest, React Testing Library

## Cài đặt

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env với các giá trị thực tế
```

## Chạy dự án

```bash
# Development mode
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Clean cache
npm run clean
```

## Cấu trúc dự án

```
src/
├── components/          # Reusable components
│   ├── ErrorBoundary/   # Error boundary component
│   ├── icons/           # Icon components
│   ├── layout/          # Layout components
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
│   └── types.ts
├── pages/               # Pages
│   ├── Home.tsx         # Home page
│   └── DemNgayRaQuan/   # Countdown page
├── App.tsx              # Main app component với routing
└── main.tsx             # Entry point
```

## Environment Variables

Tạo file `.env` với các biến sau:

```env
VITE_PROFILE_GITHUB_URL=https://github.com/yourusername
VITE_PROFILE_FB_URL=https://facebook.com/yourprofile
```

**Lưu ý**: Với Vite, các biến môi trường phải có prefix `VITE_` để được expose ra client.

## Cải thiện đã thực hiện

### Code Quality
- ✅ Error Boundary để xử lý lỗi toàn cục
- ✅ Custom Hooks để tách logic và tái sử dụng code
- ✅ Type Safety với TypeScript types rõ ràng
- ✅ Constants file để quản lý các giá trị cố định
- ✅ Optimizations với useMemo và useCallback

### Performance
- ✅ Custom hooks để tối ưu re-renders
- ✅ Lazy loading cho images
- ✅ Proper cleanup trong useEffect
- ✅ Vite build tool cho fast HMR và optimized builds

### Developer Experience
- ✅ Consistent import paths với alias (`~alias~`)
- ✅ Clear code organization
- ✅ Better error handling
- ✅ Improved loading states
- ✅ Fast development với Vite HMR

## Build & Deploy

```bash
# Build for production
npm run build

# Output sẽ ở thư mục dist/
```

## License

MIT
