'use client';
import { useState, useEffect, useCallback } from 'react';
import DatePickerCustom from './DatePickerCustom';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import { Button, Space } from 'antd';
import Link from 'next/link';
import { HomeIcon } from '~alias~/app/components/icons/icons';
import styled from 'styled-components';
import SelectCustom from '~alias~/app/components/select/SelectCustom';
import { useDateCalculations } from '~alias~/app/hooks/useDateCalculations';
import { useCurrentDateTime } from '~alias~/app/hooks/useCurrentDateTime';
import { useRealTimeCountdown } from '~alias~/app/hooks/useRealTimeCountdown';
import { useLocalStorage } from '~alias~/app/hooks/useLocalStorage';
import { SELECT_OPTIONS, STORAGE_KEYS, DATE_FORMATS } from '~alias~/app/lib/constants';

const SpaceStyled = styled(Space)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

/**
 * Component đếm ngày ra quân
 * Cho phép người dùng chọn ngày và xem thời gian còn lại
 */
export default function DemNgayRaQuan() {
  const [targetDate, setTargetDate] = useLocalStorage<string>(
    STORAGE_KEYS.DEM_NGAY_RA_QUAN_TARGET_DATE,
    dayjs().format(DATE_FORMATS.STORAGE)
  );
  const [display, setDisplay] = useState<string>('all');
  
  const currentDate = useCurrentDateTime();
  const count = useDateCalculations(targetDate);
  const realTime = useRealTimeCountdown(targetDate);

  // Initialize display on mount
  useEffect(() => {
    setDisplay('all');
  }, []);

  // Validate and update targetDate when it changes
  useEffect(() => {
    if (targetDate && dayjs(targetDate).isValid()) {
      const formatted = dayjs(targetDate).format(DATE_FORMATS.STORAGE);
      if (formatted !== targetDate) {
        setTargetDate(formatted);
      }
    } else {
      setTargetDate(dayjs().format(DATE_FORMATS.STORAGE));
    }
  }, [targetDate, setTargetDate]);

  // Handle date change from DatePickerCustom
  const onDatePickerChangeCustom = useCallback(
    (date: Dayjs | null, dateString: string | null) => {
      if (dateString && date && date.isValid()) {
        setTargetDate(date.format(DATE_FORMATS.STORAGE));
      }
    },
    [setTargetDate]
  );

  const onSelectChange = useCallback((e: string) => {
    setDisplay(e);
  }, []);

  // Show loading state while initializing
  if (!targetDate || !currentDate.date || !currentDate.time) {
    return null;
  }

  return (
    <SpaceStyled id="demNgayRaQuan" className={'flex flex-col'}>
      <div className="title text-4xl font-[700] m-10 !text-[#ff7675] sm:text-5xl md:text-6xl lg:text-7xl text-center">
        Bao lâu đến ngày {dayjs(targetDate).format(DATE_FORMATS.DISPLAY)}
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
      
      <SelectCustom
        options={SELECT_OPTIONS}
        onSelect={onSelectChange}
        defaultValue="all"
      />
      
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
  );
}
