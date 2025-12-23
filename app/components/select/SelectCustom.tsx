import { Select } from "antd";
import type { SelectCustomProps, SelectOption } from '~alias~/app/lib/types';

/**
 * Custom Select component với search và filter
 * @param props - Props của SelectCustom
 * @param props.onSelect - Callback khi chọn option
 * @param props.options - Danh sách options
 * @param props.defaultValue - Giá trị mặc định
 */
export default function SelectCustom({
  onSelect,
  options,
  defaultValue = 'all',
}: SelectCustomProps) {
  return (
    <Select
      onSelect={onSelect}
      defaultValue={defaultValue}
      showSearch={{
        optionFilterProp: 'label',
        filterSort: (optionA, optionB) =>
          (optionA?.key ?? '').toLowerCase().localeCompare(
            (optionB?.key ?? '').toLowerCase()
          ),
      }}
      style={{ width: 100 }}
      placeholder="Chọn hiển thị"
      options={options as SelectOption[]}
    />
  );
}