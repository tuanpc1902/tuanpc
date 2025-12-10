'use client';
import { useEffect, useState } from 'react';
import DatePickerCustom from './DatePickerCustom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Button, Space } from 'antd';
import Link from 'next/link';
import { HomeIcon } from '~alias~/app/components/icons/icons';
import styled from 'styled-components';

const SpaceCustom = styled(Space)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function DemNgayRaQuan() {
  const [currentDate, setCurrentDate] = useState({date: '', time: ''});
  const [targetDate, setTargetDate] = useState<string>('2026-01-28');
  const [count, setCount] = useState({days: '', weeks: '', months: ''});

  useEffect(() => {
    const storedDate = localStorage.getItem('demNgayRaQuanTargetDate');
    if (storedDate) {
      setTargetDate(storedDate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('demNgayRaQuanTargetDate', dayjs(targetDate).format('YYYY-MM-DD'));
  }, [targetDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate({
        date: dayjs().locale('vi').format('dddd, DD [tháng] MM [năm] YYYY'),
        time: dayjs().format('HH [giờ] mm [phút] ss [giây]')
      })
      
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
      setCount({
        days: dayjs(targetDate).diff(dayjs(), 'days').toString(),
        weeks: Math.floor(dayjs(targetDate).diff(dayjs(), 'days') / 7).toString(),
        months: dayjs(targetDate).diff(dayjs(), 'months').toString(),
      });
  }, [targetDate]);

  const onDatePickerChangeCustom = (date: any, dateString: string | null) => {
    if (dateString) {
      setTargetDate(date);
    }
  }

  return (
    <SpaceCustom id="demNgayRaQuan" className={''}>
      <div className="title text-4xl font-[700] m-10 !text-[#ff7675] sm:text-5xl md:text-6xl lg:text-7xl">
        Bao lâu đến ngày {dayjs(targetDate).format('DD-MM-YYYY')}
      </div>
      <div className="datepicker flex flex-col items-center justify-center text-xl font-semibold " >
        <div className="selectDateLabel mb-5 text-2xl">Chọn ngày</div>
        <DatePickerCustom
          className={''}
          targetDate={targetDate}
          onDateChange={onDatePickerChangeCustom}
          size={'large'}
        />
      </div>

      <span className="subTitle text-2xl m-[10px]">Còn</span>

      <div className="counting flex justify-center font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        {(count.days) && (
        <div className="countdown p-4 text-[#fd79a8]">
          <span id="dayCount">{count.days}</span>
          <span id="dayLabel"> ngày</span>
        </div>
      )}
      {(count.weeks) && (
        <div className="countdown p-4 text-[#00cec9]">
          <span id="weekCount">{count.weeks}</span>
          <span id="weekLabel"> tuần</span>
        </div>
      )}
      {(count.months) && (
        <div className="countdown p-4 text-[#ffeaa7]">
          <span id="monthCount">{count.months}</span>
          <span id="monthLabel"> tháng</span>
        </div>
      )}
      </div>
      {currentDate.date && currentDate.time && (
        <div className="today">
        <span id="date">{currentDate.date}</span>
        <span id="pipe"> | </span>
        <span id="time" className="clock">{currentDate.time}</span>
        <span id="timezone"></span>
      </div>
      )}
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
    </SpaceCustom>
  );
}
