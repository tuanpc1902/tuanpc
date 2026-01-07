'use client';
import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import Link from 'next/link';
import { HomeIcon } from '~alias~/app/components/icons/icons';
import { useDateCalculations } from '~alias~/app/hooks/useDateCalculations';
import { useCurrentDateTime } from '~alias~/app/hooks/useCurrentDateTime';
import { useRealTimeCountdown } from '~alias~/app/hooks/useRealTimeCountdown';
import { useLocalStorage } from '~alias~/app/hooks/useLocalStorage';
import { SELECT_OPTIONS, STORAGE_KEYS, DATE_FORMATS } from '~alias~/app/lib/constants';
import CountdownItems from './CountdownItems';

// Lazy load components for better performance
const DatePickerCustom = dynamic(() => import('./DatePickerCustom'), {
  ssr: false,
  loading: () => <div style={{ height: '40px', width: '100%' }} />,
});

const SelectCustom = dynamic(() => import('~alias~/app/components/select/SelectCustom'), {
  ssr: false,
  loading: () => <div style={{ height: '40px', width: '100%' }} />,
});
import {
  Container,
  ContentWrapper,
  Title,
  DatePickerSection,
  SectionLabel,
  SubTitle,
  CountdownCard,
  CountdownItem,
  CurrentDateSection,
  CurrentDateLabel,
  CurrentDateTime,
  Separator,
  ButtonWrapper,
  StyledDatePicker,
  StyledSelect,
  LoadingText,
  HomeButton,
} from './styles';

/**
 * Component đếm ngày ra quân
 * Cho phép người dùng chọn ngày và xem thời gian còn lại
 */
function DemNgayRaQuan() {
  const defaultDate = useMemo(() => dayjs().format(DATE_FORMATS.STORAGE), []);
  const [targetDate, setTargetDate] = useLocalStorage<string>(
    STORAGE_KEYS.DEM_NGAY_RA_QUAN_TARGET_DATE,
    defaultDate
  );
  const [display, setDisplay] = useState<string>('all');
  const [isMounted, setIsMounted] = useState(false);
  
  // Đảm bảo component đã mount trước khi render content từ localStorage
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const currentDate = useCurrentDateTime();
  const count = useDateCalculations(isMounted ? targetDate : '');
  const realTime = useRealTimeCountdown(isMounted ? targetDate : '');

  // Memoize formatted date để tránh format lại nhiều lần
  const formattedTargetDate = useMemo(() => {
    if (!targetDate || !dayjs(targetDate).isValid()) {
      return '';
    }
    return dayjs(targetDate).format(DATE_FORMATS.DISPLAY);
  }, [targetDate]);

  // Handle date change from DatePickerCustom
  const onDatePickerChangeCustom = useCallback(
    (date: Dayjs | null, dateString: string | null) => {
      if (dateString && date && date.isValid()) {
        const formatted = date.format(DATE_FORMATS.STORAGE);
        setTargetDate(formatted);
      }
    },
    [setTargetDate]
  );

  const onSelectChange = useCallback((e: string) => {
    setDisplay(e);
  }, []);

  // Show loading state while initializing hoặc chưa mount (tránh hydration mismatch)
  const isLoading = useMemo(
    () => !isMounted || !targetDate || !currentDate.date || !currentDate.time || !formattedTargetDate,
    [isMounted, targetDate, currentDate.date, currentDate.time, formattedTargetDate]
  );
  
  // Không render gì cả cho đến khi đã mount (tránh hydration mismatch)
  if (!isMounted) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingText>Đang tải...</LoadingText>
        </ContentWrapper>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingText>Đang tải...</LoadingText>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container id="demNgayRaQuan">
      <ContentWrapper>
        <Title>
          Bao lâu đến ngày {formattedTargetDate}?
        </Title>
        
        <DatePickerSection>
          <SectionLabel>Chọn ngày</SectionLabel>
          <StyledDatePicker>
            <DatePickerCustom
              defaultValue={targetDate}
              onDateChange={onDatePickerChangeCustom}
              size={'large'}
            />
          </StyledDatePicker>
        </DatePickerSection>
        
        <SubTitle>Còn lại</SubTitle>
        
        <StyledSelect>
          <SelectCustom
            options={SELECT_OPTIONS}
            onSelect={onSelectChange}
            defaultValue="all"
          />
        </StyledSelect>
        
        <CountdownCard>
          <CountdownItems display={display} count={count} realTime={realTime} />
        </CountdownCard>
        
        <CurrentDateSection>
          <CurrentDateLabel>Hôm nay là:</CurrentDateLabel>
          <CurrentDateTime>
            <span id="date">{currentDate.date}</span>
            <Separator>|</Separator>
            <span id="time">{currentDate.time}</span>
          </CurrentDateTime>
        </CurrentDateSection>
        
        <ButtonWrapper>
          <Link href="/">
            <HomeButton
              type="primary"
              size="large"
              danger
              icon={<HomeIcon className={'calendar-icon'} />}
            >
              Trang chủ
            </HomeButton>
          </Link>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  );
}

export default memo(DemNgayRaQuan);
