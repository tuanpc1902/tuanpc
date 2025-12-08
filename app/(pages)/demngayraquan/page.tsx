'use client';
import './style.css';
import { useEffect, useState } from 'react';
import DatePickerCustom from './DatePickerCustom';
import dayjs from 'dayjs';

export default function DemNgayRaQuan() {
  const [currentDate, setCurrentDate] = useState({date: '', time: ''});
  const [targetDate, setTargetDate] = useState<string>('2026-01-28');
  const [count, setCount] = useState({days: '', weeks: '', months: ''});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate({
        date: dayjs().format('dddd, DD [tháng] MM [năm] YYYY'),
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
      console.log(dateString);
      setTargetDate(date);
    }
  }

  return (
    <div className="">
      <div className="title">
        Bao lâu đến ngày <span id="ngayRaQuan">{dayjs(targetDate).format('DD-MM-YYYY')}</span>
      </div>
      <div className="datepicker">
        <span className="selectDateLabel m-10">Chọn ngày</span>
        <DatePickerCustom
          className={''}
          targetDate={targetDate}
          onDateChange={onDatePickerChangeCustom}
        />
      </div>

      <span className="subTitle text-2xl m-[10px]">Còn</span>

      <div className="counting flex justify-center font-bold text-4xl">
        {(count.days) && (
        <div className="countdown p-4 text-rose-400">
          <span id="dayCount">{count.days}</span>
          <span id="dayLabel">ngày</span>
        </div>
      )}
      {(count.weeks) && (
        <div className="countdown p-4 text-yellow-400">
          <span id="weekCount">{count.weeks}</span>
          <span id="weekLabel">tuần</span>
        </div>
      )}
      {(count.months) && (
        <div className="countdown p-4 text-cyan-400">
          <span id="monthCount">{count.months}</span>
          <span id="monthLabel">tháng</span>
        </div>
      )}
      </div>
      {currentDate.date && currentDate.time && (
        <div className="today">
        <span id="date">{currentDate.date}</span>
        <span id="pipe">|</span>
        <span id="time" className="clock">{currentDate.time}</span>
        <span id="timezone"></span>
      </div>
      )}
    </div>
  );
}
