'use client';
import { useEffect, useState } from 'react';
import DatePickerCustom from './DatePickerCustom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Button, Space } from 'antd';
import Link from 'next/link';
import { HomeIcon } from '~alias~/app/components/icons/icons';
import styled from 'styled-components';
import CalcRemainTime from './CalcRemainTime';
import FormatNumberByLocale from '~alias~/app/hooks/FormatNumberByLocale';
import useCapitalizeFirst from './../../hooks/useCapitalizeFirst';
import SelectCustom from '~alias~/app/components/select/SelectCustom';

const SpaceStyled = styled(Space)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const selectOptions = [
  {
    key: '1',
    value: 'all',
    label: 'Tất cả',
  },
  {
    key: '2',
    value: 'day',
    label: 'Ngày',
  },
  {
    key: '3',
    value: 'week',
    label: 'Tuần',
  },
  {
    key: '4',
    value: 'month',
    label: 'Tháng',
  },
  {
    key: '5',
    value: 'hour',
    label: 'Giờ',
  },
];

export default function DemNgayRaQuan() {
  const [currentDate, setCurrentDate] = useState({ date: '', time: '' });
  const [targetDate, setTargetDate] = useState<string>('');
  const [display, setDisplay] = useState<string>('');
  const [count, setCount] = useState({
    days: '',
    weeks: '',
    months: '',
    daysOfWeeks: '',
    weeksOfMonths: '',
    dayOfMonths: '',
  });
  const [realTime, setRealTime] = useState('');

  // update current date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const text = dayjs()
        .locale('vi')
        .format('dddd, DD [tháng] MM [năm] YYYY');
      const date = text.charAt(0).toUpperCase() + text.slice(1);
      setCurrentDate({
        date: date,
        time: dayjs().format('HH [giờ] mm [phút] ss [giây]'),
      });
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const calcRealtime = CalcRemainTime(targetDate);
      const hours = FormatNumberByLocale({ value: calcRealtime.hours });
      const minutes = calcRealtime.minutes;
      const seconds = calcRealtime.seconds;
      setRealTime(`${hours} giờ ${minutes} phút ${seconds} giây`);
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [targetDate]);

  // load targetDate from localStorage on component mount
  useEffect(() => {
    const storageDate = localStorage.getItem('demNgayRaQuanTargetDate');
    if (storageDate && dayjs(storageDate).isValid()) {
      setTargetDate(dayjs(storageDate).format('YYYY-MM-DD'));
    } else {
      setTargetDate(dayjs().format('YYYY-MM-DD'));
    }
    setDisplay('all');
  }, []);

  // update count whenever targetDate changes
  useEffect(() => {
    if (dayjs(targetDate).isValid()) {
      localStorage.setItem(
        'demNgayRaQuanTargetDate',
        dayjs(targetDate).format('YYYY-MM-DD')
      );
    }

    const dayjsTarget = dayjs(targetDate);
    const dayjsNow = dayjs();
    // handle days
    const days = dayjsTarget.diff(dayjsNow, 'days');
    // handle weeks
    const weeks = Math.floor(days / 7);
    // handle months
    const months = dayjsTarget.diff(dayjsNow, 'months');
    // handle dayOfWeeks
    const dayOfWeeks = days % 7;
    // handle weeksOfMonths
    const weeksOfMonths = Math.floor((days - months * 30) / 7);
    // handle dayOfMonths
    const dayOfMonths =
      days - months * dayjs().daysInMonth() - weeksOfMonths * 7;

    setCount({
      days: days >= 0 ? String(days) : '0',
      weeks: weeks >= 0 ? String(weeks) : '0',
      months: months >= 0 ? String(months) : '0',
      daysOfWeeks: dayOfWeeks >= 0 ? String(dayOfWeeks) : '0',
      weeksOfMonths: weeksOfMonths >= 0 ? String(weeksOfMonths) : '0',
      dayOfMonths: dayOfMonths >= 0 ? String(dayOfMonths) : '0',
    });
  }, [targetDate]);

  // handle date change from DatePickerCustom
  const onDatePickerChangeCustom = (date: any, dateString: string | null) => {
    if (dateString) setTargetDate(date);
  };

  const onSelectChange = (e: string) => {
    setDisplay(e);
  };

  return (
    targetDate &&
    currentDate.date &&
    currentDate.time && (
      <SpaceStyled id="demNgayRaQuan" className={'flex flex-col'}>
        <div className="title text-4xl font-[700] m-10 !text-[#ff7675] sm:text-5xl md:text-6xl lg:text-7xl text-center">
          Bao lâu đến ngày {dayjs(targetDate).format('DD-MM-YYYY')}
        </div>
        <div className="flex flex-col items-center justify-center text-xl font-semibold mb-5">
          <div className="selectDateLabel mb-5 text-2xl">Chọn ngày</div>
          <DatePickerCustom
            defaultValue={targetDate}
            onDateChange={onDatePickerChangeCustom}
            size={'large'}
          />
        </div>
        <span className="subTitle text-2xl">Còn</span>
        <SelectCustom options={selectOptions} onSelect={onSelectChange} />
        <div className="counting flex flex-col items-center justify-center font-bold sm:text-3xl md:text-4xl lg:text-5xl [&>div]:p-4">
          {(display === 'all' || display === 'day') && (
            <div className="text-[#fd79a8]">{`${count.days} ngày`}</div>
          )}
          {(display === 'all' || display === 'week') && (
            <div className="text-[#00cec9]">{`${count.weeks} tuần ${count.daysOfWeeks} ngày`}</div>
          )}
          {(display === 'all' || display === 'month') && (
            <div className="text-[#ffeaa7]">{`${count.months} tháng ${count.weeksOfMonths} tuần ${count.dayOfMonths} ngày`}</div>
          )}
          {(display === 'all' || display === 'hour') && (
            <div className="text-[#ff7675]">{realTime}</div>
          )}
        </div>
        <div className="todayLabel mt-[2rem] text-[#9fa1a1]">Hôm nay là:</div>
        <div className="today flex max-xs:flex max-xs:flex-col gap-2.5 items-center justify-center font-medium text-center mb-5 text-[#9fa1a1] ">
          <span id="date">{currentDate.date}</span>
          <span
            id="pipe"
            className="hidden xs:block sm:block md:block lg:block xl:block 2xl:block p-2"
          >
            {` | `}
          </span>
          <span id="time">{currentDate.time}</span>
        </div>
        <Space>
          <Link href="/">
            <Button
              type="primary"
              className="p-10 m-10 text-[18px] font-bold"
              danger
              icon={<HomeIcon className={'calendar-icon'} />}
              size={'large'}
            >
              Trang chủ
            </Button>
          </Link>
        </Space>
      </SpaceStyled>
    )
  );
}
