import { memo } from 'react';
import { Select } from "antd";
import type { SelectCustomProps, SelectOption } from '~alias~/app/lib/types';

/**
 * Custom Select component với search và filter
 * @param props - Props của SelectCustom
 * @param props.onSelect - Callback khi chọn option
 * @param props.options - Danh sách options
 * @param props.defaultValue - Giá trị mặc định
 */
const SelectCustom = memo(function SelectCustom({
  onSelect,
  options,
  defaultValue = 'all',
}: SelectCustomProps) {
  return (
    <Select
      onSelect={onSelect}
      defaultValue={defaultValue}
      showSearch={false}
      style={{ width: 150 }}
      placeholder="Chọn hiển thị"
      options={options as SelectOption[]}
    />
  );
});

export default SelectCustom;