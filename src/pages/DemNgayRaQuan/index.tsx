import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import dayjs, { Dayjs } from 'dayjs';
import { Link } from 'react-router-dom';
import { HomeIcon } from '~alias~/components/icons/icons';
import { useDateCalculations } from '~alias~/hooks/useDateCalculations';
import { useCurrentDateTime } from '~alias~/hooks/useCurrentDateTime';
import { useRealTimeCountdown } from '~alias~/hooks/useRealTimeCountdown';
import { useLocalStorage } from '~alias~/hooks/useLocalStorage';
import { SELECT_OPTIONS, STORAGE_KEYS, DATE_FORMATS } from '~alias~/lib/constants';
import CountdownItems from './CountdownItems';
import DatePickerCustom from './DatePickerCustom';
import SelectCustom from '~alias~/components/select/SelectCustom';
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
      <>
        <Helmet>
          <title>Đếm ngày ra quân - tuanpc</title>
        </Helmet>
        <Container>
          <ContentWrapper>
            <LoadingText>Đang tải...</LoadingText>
          </ContentWrapper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Đếm ngày ra quân - tuanpc</title>
      </Helmet>
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
            <Link to="/">
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
    </>
  );
}

const DemNgayRaQuanPage = memo(DemNgayRaQuan);
export default DemNgayRaQuanPage;
