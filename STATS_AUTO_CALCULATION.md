# Tính năng tự động tính toán thống kê / Stats Auto-Calculation Feature

## Tổng quan / Overview

Tính năng này cho phép các giá trị thống kê trên trang chủ được tự động tính toán từ dữ liệu thực tế thay vì phải nhập thủ công, giúp đảm bảo tính chính xác và giảm thiểu công việc bảo trì.

This feature allows statistics values on the homepage to be automatically calculated from actual data instead of manual entry, ensuring accuracy and reducing maintenance work.

---

## Các thay đổi / Changes Made

### 1. **Cấu hình Constants** (`src/lib/constants.ts`)

Thêm các trường cấu hình mới:

```typescript
STAT_START_YEAR: '2022',              // Năm bắt đầu làm việc
STAT_PROJECTS_AUTO: 'true',           // Bật/tắt tự động đếm dự án
STAT_PROJECTS_VALUE: '10+',           // Giá trị thủ công khi tắt auto
STAT_TECHNOLOGIES_AUTO: 'true',       // Bật/tắt tự động đếm công nghệ
STAT_TECHNOLOGIES_VALUE: '15+',       // Giá trị thủ công khi tắt auto
STAT_STATUS_VALUE: 'Active',          // Giá trị trạng thái (luôn thủ công)
```

### 2. **DataContext Type Update** (`src/contexts/DataContext.tsx`)

Cập nhật kiểu dữ liệu constants để hỗ trợ các trường động từ Firestore:

```typescript
interface DataContextType {
  constants: typeof ENV_VARS & Record<string, string>;
  // ... other fields
}
```

### 3. **Home Page Logic** (`src/pages/Home.tsx`)

Triển khai logic tự động tính toán:

```typescript
const stats = useMemo(() => {
  const startYear = parseInt(constants.STAT_START_YEAR || '2022', 10);
  const currentYear = new Date().getFullYear();
  const yearsExperience = Math.max(0, currentYear - startYear);
  
  const visibleProjects = projects.filter(p => !p.hidden);
  const projectsCount = visibleProjects.length;
  
  const uniqueTags = new Set<string>();
  visibleProjects.forEach(project => {
    project.tags.forEach(tag => uniqueTags.add(tag));
  });
  const techCount = uniqueTags.size;

  return {
    years: yearsExperience === 0 ? '<1' : `${yearsExperience}+`,
    projects: constants.STAT_PROJECTS_AUTO === 'true' 
      ? `${projectsCount}+` 
      : (constants.STAT_PROJECTS_VALUE || `${projectsCount}+`),
    technologies: constants.STAT_TECHNOLOGIES_AUTO === 'true' 
      ? `${techCount}+` 
      : (constants.STAT_TECHNOLOGIES_VALUE || `${techCount}+`),
    status: constants.STAT_STATUS_VALUE || 'Active',
  };
}, [constants, projects]);
```

**Cách tính:**
- **Years (Năm kinh nghiệm)**: `currentYear - STAT_START_YEAR` (luôn tự động)
- **Projects (Dự án)**: Đếm số projects có `hidden: false` (có thể chuyển sang thủ công)
- **Technologies (Công nghệ)**: Đếm số unique tags từ các projects visible (có thể chuyển sang thủ công)
- **Status (Trạng thái)**: Luôn nhập thủ công

### 4. **Stats Manager UI** (`src/components/admin/StatsManager.tsx`)

Giao diện quản lý với các tính năng:

#### a. Form Fields:
- **Start Year** (`InputNumber`): Năm bắt đầu làm việc (2022 mặc định)
- **Projects** (`Switch` + `Input`): Toggle auto/manual + input thủ công
- **Technologies** (`Switch` + `Input`): Toggle auto/manual + input thủ công  
- **Status** (`Input`): Chỉ nhập thủ công

#### b. Auto-calculation Preview:
```typescript
const autoValues = useMemo(() => {
  const startYear = parseInt(watchedValues.STAT_START_YEAR || constants.STAT_START_YEAR || '2022', 10);
  const currentYear = new Date().getFullYear();
  const yearsExperience = Math.max(0, currentYear - startYear);
  
  const visibleProjects = projects.filter(p => !p.hidden);
  const projectsCount = visibleProjects.length;
  
  const uniqueTags = new Set<string>();
  visibleProjects.forEach(project => {
    project.tags.forEach(tag => uniqueTags.add(tag));
  });
  const techCount = uniqueTags.size;
  
  return {
    years: yearsExperience === 0 ? '<1' : `${yearsExperience}+`,
    projects: `${projectsCount}+`,
    technologies: `${techCount}+`,
  };
}, [watchedValues.STAT_START_YEAR, constants.STAT_START_YEAR, projects]);
```

#### c. Conditional Rendering:
- Khi **Auto mode ON**: Hiển thị preview với icon ⚡ (Thunder) màu xanh lá
- Khi **Auto mode OFF**: Hiển thị input field với icon ✏️ (Edit) màu xanh dương

#### d. Save Logic:
```typescript
const handleSave = async () => {
  const values = await form.validateFields();
  
  const updateData = {
    ...values,
    STAT_PROJECTS_AUTO: values.STAT_PROJECTS_AUTO ? 'true' : 'false',
    STAT_TECHNOLOGIES_AUTO: values.STAT_TECHNOLOGIES_AUTO ? 'true' : 'false',
    STAT_START_YEAR: values.STAT_START_YEAR.toString(),
  };
  
  Object.entries(updateData).forEach(([key, value]) => {
    updateConstants(key, value as string);
  });
};
```

### 5. **Styling Updates** (`src/components/admin/StatsManager.styles.scss`)

Thêm style cho preview mode badge:

```scss
.preview-mode {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  font-size: 0.75rem;
  
  span {
    opacity: 0.7;
  }
}
```

---

## Cách sử dụng / Usage

### Admin Panel:

1. Truy cập **Stats Manager** trong admin panel
2. **Năm bắt đầu**: Nhập năm bắt đầu làm việc (VD: 2022)
3. **Dự án & Công nghệ**:
   - Bật switch ⚡ để tự động tính từ dữ liệu
   - Tắt switch để nhập thủ công
4. **Trạng thái**: Nhập giá trị mong muốn (VD: "Active", "Available")
5. Click **Save Changes**

### Preview Section:

- Hiển thị real-time preview của các giá trị
- Badge màu xanh lá (⚡ Auto) cho chế độ tự động
- Badge màu xanh dương (✏️ Manual) cho chế độ thủ công
- Years luôn là Auto (tự động tính từ start year)

---

## Ưu điểm / Benefits

### 1. **Tự động cập nhật**
- Số liệu luôn chính xác với dữ liệu thực tế
- Không cần cập nhật thủ công khi thêm/xóa projects
- Số năm kinh nghiệm tự động tăng theo thời gian

### 2. **Linh hoạt**
- Có thể chuyển giữa auto/manual cho từng stat
- Vẫn giữ khả năng override thủ công khi cần
- Dễ dàng điều chỉnh qua admin panel

### 3. **Trải nghiệm tốt**
- Preview real-time khi chỉnh sửa
- Badge indicators rõ ràng cho từng mode
- Validation đầy đủ

### 4. **Bảo trì dễ dàng**
- Giảm thiểu công việc cập nhật thủ công
- Code maintainable với useMemo optimization
- Type-safe với TypeScript

---

## Technical Details

### Performance Optimizations:

1. **useMemo** cho stats calculation:
   - Chỉ recalculate khi `constants` hoặc `projects` thay đổi
   - Tránh tính toán không cần thiết

2. **useCallback** cho translation function:
   - Memoize function để tránh re-render không cần thiết

3. **Form.useWatch** trong StatsManager:
   - Real-time preview không cần re-render toàn bộ form

### Type Safety:

```typescript
// DataContext với Record<string, string> cho dynamic constants
constants: typeof ENV_VARS & Record<string, string>;

// Form validation với proper rules
rules={[
  {
    required: !watchedValues.STAT_PROJECTS_AUTO,
    message: 'Please enter value',
  },
]}
```

### Data Flow:

```
Firestore Constants
      ↓
  DataContext
      ↓
   Home.tsx (useMemo calculation)
      ↓
   Display Stats
```

```
Admin Panel Form
      ↓
 handleSave (convert booleans → strings)
      ↓
 updateConstants (Firestore update)
      ↓
 DataContext sync (real-time listener)
      ↓
 Home.tsx re-render (with new stats)
```

---

## Testing Checklist

- [x] ✅ Years tự động tăng dựa trên start year
- [x] ✅ Projects count cập nhật khi add/remove/hide projects
- [x] ✅ Technologies count cập nhật khi thay đổi tags
- [x] ✅ Toggle switch giữa auto/manual hoạt động
- [x] ✅ Manual input value được lưu và hiển thị đúng
- [x] ✅ Preview real-time hiển thị giá trị chính xác
- [x] ✅ Badge indicators hiển thị đúng mode
- [x] ✅ Form validation hoạt động (required khi manual)
- [x] ✅ Firestore sync 2-way (save → read → update UI)
- [x] ✅ TypeScript không có lỗi
- [x] ✅ Responsive trên mobile

---

## Future Enhancements

Có thể mở rộng thêm:

1. **More auto calculations:**
   - Total commits từ GitHub API
   - Total lines of code
   - Average project completion time

2. **Custom formulas:**
   - Admin có thể tự định nghĩa công thức tính
   - Support cho operations: +, -, *, /, %

3. **Historical tracking:**
   - Lưu lịch sử thay đổi stats
   - Hiển thị biểu đồ tăng trưởng

4. **Smart suggestions:**
   - AI suggest giá trị based on patterns
   - Anomaly detection (sudden drops/spikes)

---

## Files Modified

1. ✅ `src/lib/constants.ts` - Added STAT_* fields
2. ✅ `src/contexts/DataContext.tsx` - Updated constants type
3. ✅ `src/pages/Home.tsx` - Implemented auto-calculation logic
4. ✅ `src/components/admin/StatsManager.tsx` - Full UI rewrite
5. ✅ `src/components/admin/StatsManager.styles.scss` - Added preview-mode styles

---

## Conclusion

Tính năng tự động tính toán thống kê giúp trang portfolio luôn hiển thị thông tin chính xác mà không cần can thiệp thủ công thường xuyên. Với giao diện quản lý trực quan và khả năng chuyển đổi linh hoạt giữa auto/manual, tính năng này vừa tiết kiệm thời gian vừa đảm bảo độ tin cậy của dữ liệu.

The stats auto-calculation feature ensures the portfolio always displays accurate information without frequent manual intervention. With an intuitive management interface and flexible switching between auto/manual modes, this feature saves time while maintaining data reliability.

---

**Version:** 1.0.0  
**Date:** 2024  
**Author:** tuanpc
