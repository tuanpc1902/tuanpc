import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useDateCalculations } from '~alias~/hooks/useDateCalculations';
import { useCurrentDateTime } from '~alias~/hooks/useCurrentDateTime';
import { useRealTimeCountdown } from '~alias~/hooks/useRealTimeCountdown';
import { useLocalStorage } from '~alias~/hooks/useLocalStorage';
import { SELECT_OPTIONS, STORAGE_KEYS, DATE_FORMATS } from '~alias~/lib/constants';
import MetaTags from '~alias~/components/common/MetaTags';
import CountdownItems from './CountdownItems';
import DatePickerCustom from './DatePickerCustom';
import SelectCustom from '~alias~/components/select/SelectCustom';
import Loading from '~alias~/components/Spinner/Loading';
import './DemNgayRaQuan.styles.scss';

const META_DESCRIPTION = 'Công cụ đếm ngày ra quân - Tính toán thời gian còn lại đến một ngày cụ thể.';
const META_KEYWORDS = 'đếm ngày, countdown, đếm ngược, ra quân, tính ngày';

function DemNgayRaQuan() {
  const [targetDate, setTargetDate] = useLocalStorage<string>(
    STORAGE_KEYS.DEM_NGAY_RA_QUAN_TARGET_DATE,
    dayjs().format(DATE_FORMATS.STORAGE)
  );
  const [display, setDisplay] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const currentDate = useCurrentDateTime();
  const count = useDateCalculations(isMounted ? targetDate : '');
  const realTime = useRealTimeCountdown(isMounted ? targetDate : '');

  const formattedTargetDate = useMemo(() => {
    if (!targetDate || !dayjs(targetDate).isValid()) return '';
    return dayjs(targetDate).format(DATE_FORMATS.DISPLAY);
  }, [targetDate]);

  const onDatePickerChangeCustom = useCallback(
    (date: Dayjs | null, dateString: string | null) => {
      if (dateString && date?.isValid()) {
        const formattedDate = date.format(DATE_FORMATS.STORAGE);
        if (formattedDate !== targetDate) {
          setTargetDate(formattedDate);
        }
      }
    },
    [setTargetDate, targetDate]
  );

  const onSelectChange = useCallback((e: string) => {
    setDisplay(prev => prev !== e ? e : prev);
  }, []);

  const isLoading = useMemo(
    () => !isMounted || !targetDate || !currentDate.date || !currentDate.time || !formattedTargetDate,
    [isMounted, targetDate, currentDate.date, currentDate.time, formattedTargetDate]
  );

  if (isLoading) {
    return (
      <>
        <MetaTags
          title="Đếm ngày ra quân - tuanpc"
          description={META_DESCRIPTION}
          keywords={META_KEYWORDS}
        />
        <div className="countdown-page-container">
          <div className="countdown-content-wrapper">
            <Loading fullScreen tip="Đang tải..." />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MetaTags
        title="Đếm ngày ra quân - tuanpc"
        description={META_DESCRIPTION}
        keywords={META_KEYWORDS}
        canonicalUrl={typeof window !== 'undefined' ? `${window.location.origin}/demngayraquan` : ''}
        ogTitle="Đếm ngày ra quân - tuanpc"
        ogDescription={META_DESCRIPTION}
      />
      <div className="countdown-page-container" id="demNgayRaQuan" role="main">
        <div className="countdown-content-wrapper">
          <div className="controls-bar">
            <div className="control-group">
              <label htmlFor="date-picker" className="control-label">Ngày đích</label>
              <div className="countdown-date-picker" id="date-picker">
                <DatePickerCustom
                  defaultValue={targetDate}
                  onDateChange={onDatePickerChangeCustom}
                  size="large"
                />
              </div>
            </div>
            
            <div className="control-group">
              <label className="control-label">Chế độ hiển thị</label>
              <div className="countdown-select">
                <SelectCustom
                  options={SELECT_OPTIONS}
                  onSelect={onSelectChange}
                  defaultValue="all"
                />
              </div>
            </div>
          </div>
          
          <div className="hero-section">
            <h1 className="hero-title">Còn bao lâu đến ngày</h1>
            <div className="target-date-hero">{formattedTargetDate}</div>
          </div>
          
          <section className="countdown-display" role="region" aria-label="Countdown results">
            <CountdownItems display={display} count={count} realTime={realTime} />
          </section>
          
          <div className="info-section" role="status" aria-live="polite" aria-atomic="true">
            <div className="info-label">Ngày giờ hiện tại</div>
            <div className="info-time">
              <time id="date" dateTime={dayjs().format('YYYY-MM-DD')}>{currentDate.date}</time>
              <span className="info-separator" aria-hidden="true">•</span>
              <time id="time">{currentDate.time}</time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const DemNgayRaQuanPage = memo(DemNgayRaQuan);
export default DemNgayRaQuanPage;
