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

const DatePickerCustom = dynamic(() => import('./DatePickerCustom'), {
  ssr: false,
});

const SelectCustom = dynamic(() => import('~alias~/app/components/select/SelectCustom'), {
  ssr: false,
});

import {
  Container,
  ContentWrapper,
  Title,
  DatePickerSection,
  SectionLabel,
  SubTitle,
  CountdownCard,
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
        setTargetDate(date.format(DATE_FORMATS.STORAGE));
      }
    },
    [setTargetDate]
  );

  const onSelectChange = useCallback((e: string) => {
    setDisplay(e);
  }, []);

  if (!isMounted || !targetDate || !currentDate.date || !currentDate.time || !formattedTargetDate) {
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
              size="large"
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
              icon={<HomeIcon className="calendar-icon" />}
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
