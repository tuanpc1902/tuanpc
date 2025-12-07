'use client';
import { Metadata } from 'next';
import './style.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import 'moment/locale/vi';
import { DatePicker, Radio, Space } from 'antd';


// export const metadata: Metadata = {
//   title:
//     "tuanpc | Đếm ngày ra quân",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function DemNgayRaQuan() {
  const [currentDate, setCurrentDate] = useState({date: '', time: ''});
  const [targetDate, setTargetDate] = useState('');
  const [dayCount, setDayCount] = useState('');
  const [weekCount, setWeekCount] = useState('');
  const [monthCount, setMonthCount] = useState('');
  
  useEffect(() => {
    moment().locale('vi'); // Set locale to Vietnamese
    momentTimezone().tz('Asia/Ho_Chi_Minh'); // Set timezone to Ho Chi Minh
    // Set a target date (for example purposes, you can change this)
    setTargetDate(moment('2026-01-28').format('DD-MM-YYYY')); // Example target date

    const intervalId = setInterval(() => {
      setCurrentDate({
        date: moment().format('dddd, DD [tháng] MM [năm] YYYY'),
        time: moment().format('HH [giờ] mm [phút] ss [giây]')
      })
      
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    setDayCount(
        moment('2026-01-28').diff(moment(), 'days').toString()
      );
      setWeekCount(
        Math.floor(moment('2026-01-28').diff(moment(), 'days') / 7).toString()
      );
      setMonthCount(
        moment('2026-01-28').diff(moment(), 'months').toString()
      );
  }, [currentDate]);

  return (
    <div className="">
      <div className="title">
        Bao lâu đến ngày <span id="ngayRaQuan">{targetDate}</span>
      </div>
      <div className="datepicker">
        <span className="selectDateLabel">Chọn ngày</span>
        <input id="ngayRaQuanDatePicker" className="form-control" type="date" />
        <DatePicker about='' defaultValue={currentDate.date} />
      </div>

      {/* <div className="timeZone">{moment().day}</div> */}

      <span className="subTitle">Còn</span>

      <div className="result">
        <div id="days-count">{dayCount} ngày</div>
        <div id="weeks-count">{weekCount} tuần</div>
        <div id="months-count">{monthCount} tháng</div>
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
