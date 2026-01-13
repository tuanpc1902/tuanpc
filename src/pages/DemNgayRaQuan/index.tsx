import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Link } from 'react-router-dom';
import { HomeIcon } from '~alias~/components/icons/icons';
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
  HomeButton,
} from './styles';

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
        <Container>
          <ContentWrapper>
            <Loading fullScreen tip="Đang tải..." />
          </ContentWrapper>
        </Container>
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
      <Container id="demNgayRaQuan" role="main">
        <ContentWrapper>
          <Title>
            Bao lâu đến ngày {formattedTargetDate}?
          </Title>
          
          <DatePickerSection>
            <SectionLabel htmlFor="date-picker">Chọn ngày</SectionLabel>
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
          
          <CountdownCard role="region" aria-label="Countdown results">
            <CountdownItems display={display} count={count} realTime={realTime} />
          </CountdownCard>
          
          <CurrentDateSection role="status" aria-live="polite" aria-atomic="true">
            <CurrentDateLabel>Hôm nay là:</CurrentDateLabel>
            <CurrentDateTime>
              <time id="date" dateTime={dayjs().format('YYYY-MM-DD')}>{currentDate.date}</time>
              <Separator aria-hidden="true">|</Separator>
              <time id="time">{currentDate.time}</time>
            </CurrentDateTime>
          </CurrentDateSection>
          
          <ButtonWrapper>
            <Link to="/" aria-label="Quay về trang chủ">
              <HomeButton
                type="primary"
                size="large"
                danger
                icon={<HomeIcon className="calendar-icon" aria-hidden="true" />}
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
