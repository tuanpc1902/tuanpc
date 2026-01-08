# Cloudflare Pages Deployment

Dự án này đã được cấu hình để deploy lên Cloudflare Pages.

## Cấu hình Build

- **Build command**: `npm run build`
- **Build output directory**: `.next` (mặc định của Next.js)
- **Node version**: 18.x hoặc 20.x (Cloudflare Pages tự động chọn)

## Environment Variables

Nếu bạn cần cấu hình environment variables trong Cloudflare Pages:

1. Vào **Settings** > **Environment variables**
2. Thêm các biến sau nếu cần:
   - `NEXT_PUBLIC_PROFILE_GITHUB_URL`
   - `NEXT_PUBLIC_PROFILE_FB_URL`

## Deploy

### Cách 1: Deploy qua GitHub (Khuyến nghị)

1. Đảm bảo code đã được push lên GitHub
2. Vào [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Chọn **Pages** > **Create a project**
4. Kết nối repository GitHub của bạn
5. Cloudflare sẽ tự động phát hiện Next.js và cấu hình build
6. Click **Save and Deploy**

### Cách 2: Deploy qua Wrangler CLI

```bash
# Cài đặt Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy .next
```

## Lưu ý

- Cloudflare Pages tự động phát hiện Next.js framework
- Build output sẽ được tạo trong thư mục `.next`
- ESLint errors sẽ không chặn build (đã cấu hình `ignoreDuringBuilds: true`)
