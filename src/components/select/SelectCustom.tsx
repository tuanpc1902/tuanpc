import { memo, useCallback } from 'react';
import { Select } from 'antd';
import type { SelectCustomProps, SelectOption } from '~alias~/lib/types';

/**
 * Custom Select component with optimized rendering
 */
const SelectCustom = memo(function SelectCustom({
  onSelect,
  options,
  defaultValue = 'all',
}: SelectCustomProps) {
  const handleSelect = useCallback((value: string) => {
    onSelect(value);
  }, [onSelect]);

  return (
    <Select
      onSelect={handleSelect}
      defaultValue={defaultValue}
      showSearch={false}
      style={{ width: 150 }}
      placeholder="Chọn hiển thị"
      options={options as SelectOption[]}
      aria-label="Chọn loại hiển thị đếm ngược"
    />
  );
});

SelectCustom.displayName = 'SelectCustom';

export default SelectCustom;
