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
  const [currentDate, setCurrentDate] = useState({ date: '', time: '' });
  const [targetDate, setTargetDate] = useState<string>('');
  const [count, setCount] = useState({
    days: '',
    weeks: '',
    months: '',
    daysOfWeeks: '',
    weeksOfMonths: '',
    dayOfMonths: '',
  });

  // update current date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate({
        date: dayjs().locale('vi').format('dddd, DD [tháng] MM [năm] YYYY'),
        time: dayjs().format('HH [giờ] mm [phút] ss [giây]'),
      });
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // load targetDate from localStorage on component mount
  useEffect(() => {
    const storageDate = localStorage.getItem('demNgayRaQuanTargetDate');
    if (storageDate && dayjs(storageDate).isValid()) {
      setTargetDate(dayjs(storageDate).format('YYYY-MM-DD'));
    } else {
      setTargetDate(dayjs().format('YYYY-MM-DD'));
    }
  }, []);

  // update count whenever targetDate changes
  useEffect(() => {
    if (dayjs(targetDate).isValid()) {
      localStorage.setItem(
        'demNgayRaQuanTargetDate',
        dayjs(targetDate).format('YYYY-MM-DD')
      );
    }

    // hanel count calculation with dayjs
    let result = {
      days: dayjs(targetDate).diff(dayjs(), 'days'),
      weeks: Math.floor(dayjs(targetDate).diff(dayjs(), 'days') / 7),
      months: dayjs(targetDate).diff(dayjs(), 'months'),
    };

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
    const dayOfMonths = days - months * 30 - weeksOfMonths * 7;

    setCount({
      days: result.days >= 0 ? String(result.days) : '0',
      weeks: result.weeks >= 0 ? String(result.weeks) : '0',
      months: result.months >= 0 ? String(result.months) : '0',
      daysOfWeeks: dayOfWeeks >= 0 ? String(dayOfWeeks) : '0',
      weeksOfMonths: weeksOfMonths >= 0 ? String(weeksOfMonths) : '0',
      dayOfMonths: dayOfMonths >= 0 ? String(dayOfMonths) : '0',
    });
  }, [targetDate]);

  // handle date change from DatePickerCustom
  const onDatePickerChangeCustom = (date: any, dateString: string | null) => {
    if (dateString) {
      setTargetDate(date);
    }
  };

  return (
    targetDate && currentDate.date && currentDate.time && (
      <SpaceCustom id="demNgayRaQuan" className={'flex flex-col'}>
        <div className="title text-4xl font-[700] m-10 !text-[#ff7675] sm:text-5xl md:text-6xl lg:text-7xl text-center">
          Bao lâu đến ngày {dayjs(targetDate).format('DD-MM-YYYY')}
        </div>
        <div className="datepicker flex flex-col items-center justify-center text-xl font-semibold mb-5">
          <div className="selectDateLabel mb-5 text-2xl">Chọn ngày</div>
          {targetDate && (
            <DatePickerCustom
              className={''}
              defaultValue={targetDate}
              onDateChange={onDatePickerChangeCustom}
              size={'large'}
            />
          )}
        </div>

        <span className="subTitle text-2xl">Còn</span>

        <div className="counting flex flex-col items-center justify-center font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          {count.days && (
            <div className="countdown p-4 text-[#fd79a8]">
              <span id="dayCount">{count.days}</span>
              <span id="dayLabel"> ngày</span>
            </div>
          )}
          {count.weeks && (
            <div className="countdown p-4 text-[#00cec9]">
              <span id="weekCount">{count.weeks}</span>
              <span id="weekLabel"> tuần {count.daysOfWeeks} ngày</span>
            </div>
          )}
          {count.months && (
            <div className="countdown p-4 text-[#ffeaa7]">
              <span id="monthCount">{count.months}</span>
              <span id="monthLabel">
                {' '}
                tháng {count.weeksOfMonths} tuần {count.dayOfMonths} ngày
              </span>
            </div>
          )}
        </div>
        {currentDate.date && currentDate.time && (
          <div className="today flex max-xs:flex max-xs:flex-col gap-2.5 items-center justify-center font-medium text-center mt-10 mb-5 text-[#9fa1a1] ">
            <span id="date">{currentDate.date}</span>
            <span
              id="pipe"
              className="hidden xs:block sm:block md:block lg:block xl:block 2xl:block p-2"
            >
              {' '}
              |{' '}
            </span>
            <span id="time" className="clock">
              {currentDate.time}
            </span>
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
    )
  );
}
