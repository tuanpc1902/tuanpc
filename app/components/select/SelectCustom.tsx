import { Select } from "antd";
import { BaseOptionType } from "antd/es/select";

type SelectCustomProps = {
  onSelect: (e: any) => void,
  options: BaseOptionType[]
}

export default function SelectCustom(props: SelectCustomProps){
  const {onSelect, options} = props
  return (
    <Select
    onSelect={onSelect}
    defaultValue={'Tất cả'}
    showSearch={{
      optionFilterProp: 'label',
      filterSort: (optionA, optionB) =>
        (optionA?.key ?? '').toLowerCase().localeCompare((optionB?.key ?? '').toLowerCase()),
    }}
    style={{ width: 100 }}
    placeholder="Search to Select"
    options={options}
  />
  )
  
}