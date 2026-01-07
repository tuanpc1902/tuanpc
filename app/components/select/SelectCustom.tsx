import { memo } from 'react';
import { Select } from "antd";
import type { SelectCustomProps, SelectOption } from '~alias~/app/lib/types';

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