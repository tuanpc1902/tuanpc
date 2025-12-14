type props = {
  value: number;
  locale?: string | 'vi-VN'
}

export default function FormatNumberByLocale(props: props){

  const num = Number(props.value);

  if (Number.isNaN(num)) return props.value;

  return new Intl.NumberFormat(props.locale).format(num);

}