import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Input, Select, message } from 'antd';
import { useDateCalculations } from '~alias~/hooks/useDateCalculations';
import { useCurrentDateTime } from '~alias~/hooks/useCurrentDateTime';
import { useRealTimeCountdown } from '~alias~/hooks/useRealTimeCountdown';
import { useLocalStorage } from '~alias~/hooks/useLocalStorage';
import { SELECT_OPTIONS, STORAGE_KEYS, DATE_FORMATS } from '~alias~/lib/constants';
import MetaTags from '~alias~/components/common/MetaTags';
import { useDataContext } from '~alias~/contexts/DataContext';
import CountdownItems from './CountdownItems';
import DatePickerCustom from './DatePickerCustom';
import SelectCustom from '~alias~/components/select/SelectCustom';
import Loading from '~alias~/components/Spinner/Loading';
import './DemNgayRaQuan.styles.scss';

const META_DESCRIPTION = 'Công cụ đếm ngày ra quân - Tính toán thời gian còn lại đến một ngày cụ thể.';
const META_KEYWORDS = 'đếm ngày, countdown, đếm ngược, ra quân, tính ngày';

interface CountdownPreset {
  id: string;
  label: string;
  date: string;
  group?: string;
  tags?: string[];
}

function DemNgayRaQuan() {
  const { projects, constants } = useDataContext();
  const [targetDate, setTargetDate] = useLocalStorage<string>(
    STORAGE_KEYS.DEM_NGAY_RA_QUAN_TARGET_DATE,
    dayjs().format(DATE_FORMATS.STORAGE)
  );
  const [presets, setPresets] = useLocalStorage<CountdownPreset[]>(
    STORAGE_KEYS.DEM_NGAY_RA_QUAN_PRESETS,
    []
  );
  const [display, setDisplay] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetGroup, setPresetGroup] = useState('');
  const [presetTags, setPresetTags] = useState('');
  const [presetGroupFilter, setPresetGroupFilter] = useState('all');
  const [hasParsedParams, setHasParsedParams] = useState(false);
  
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

  // Parse URL params once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const targetParam = params.get('target');
    const displayParam = params.get('display');

    if (targetParam && dayjs(targetParam, DATE_FORMATS.STORAGE, true).isValid()) {
      setTargetDate(targetParam);
    }
    if (displayParam && SELECT_OPTIONS.some((option) => option.value === displayParam)) {
      setDisplay(displayParam);
    }
    setHasParsedParams(true);
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasParsedParams || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    params.set('target', targetDate);
    params.set('display', display);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [display, hasParsedParams, targetDate]);

  const projectMeta = useMemo(
    () => projects.find((project) => project.link === '/demngayraquan'),
    [projects]
  );
  const metaTitle = projectMeta?.name ? `${projectMeta.name} - tuanpc` : 'Đếm ngày ra quân - tuanpc';
  const metaDescription = projectMeta?.description || META_DESCRIPTION;
  const ogImage = constants.OG_IMAGE_URL || (typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png');

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

  const onSelectChange = useCallback((value: string) => {
    setDisplay(value);
  }, []);

  const handleSavePreset = () => {
    if (!dayjs(targetDate, DATE_FORMATS.STORAGE, true).isValid()) return;
    const label = presetName.trim() || `Mốc ${formattedTargetDate}`;
    const group = presetGroup.trim();
    const tags = presetTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const newPreset: CountdownPreset = {
      id: Date.now().toString(),
      label,
      date: targetDate,
      group: group || undefined,
      tags: tags.length > 0 ? tags : undefined,
    };
    setPresets((prev) => [newPreset, ...prev]);
    setPresetName('');
    setPresetGroup('');
    setPresetTags('');
    message.success('Đã lưu mốc thời gian');
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = presets.find((item) => item.id === presetId);
    if (preset) {
      setTargetDate(preset.date);
    }
  };

  const presetGroups = useMemo(() => {
    const set = new Set(presets.map((preset) => preset.group).filter(Boolean));
    return Array.from(set).sort() as string[];
  }, [presets]);

  const visiblePresets = useMemo(() => {
    if (presetGroupFilter === 'all') return presets;
    return presets.filter((preset) => preset.group === presetGroupFilter);
  }, [presets, presetGroupFilter]);

  const handleRemovePreset = (presetId: string) => {
    setPresets((prev) => prev.filter((item) => item.id !== presetId));
    message.success('Đã xóa mốc thời gian');
  };

  const handleCopyShareLink = async () => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    params.set('target', targetDate);
    params.set('display', display);
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      message.success('Đã sao chép link chia sẻ');
    } catch (error) {
      message.error('Không thể sao chép link');
    }
  };

  const isLoading = useMemo(
    () => !isMounted || !targetDate || !currentDate.date || !currentDate.time || !formattedTargetDate,
    [isMounted, targetDate, currentDate.date, currentDate.time, formattedTargetDate]
  );

  if (isLoading) {
    return (
      <>
        <MetaTags
          title={metaTitle}
          description={metaDescription}
          keywords={META_KEYWORDS}
          ogTitle={projectMeta?.name || 'Đếm ngày ra quân'}
          ogDescription={metaDescription}
          ogImage={ogImage}
          twitterTitle={projectMeta?.name || 'Đếm ngày ra quân'}
          twitterDescription={metaDescription}
          twitterImage={ogImage}
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
        title={metaTitle}
        description={metaDescription}
        keywords={META_KEYWORDS}
        canonicalUrl={typeof window !== 'undefined' ? `${window.location.origin}/demngayraquan` : ''}
        ogTitle={projectMeta?.name || 'Đếm ngày ra quân - tuanpc'}
        ogDescription={metaDescription}
        ogImage={ogImage}
        twitterTitle={projectMeta?.name || 'Đếm ngày ra quân'}
        twitterDescription={metaDescription}
        twitterImage={ogImage}
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

          <div className="presets-bar">
            <div className="preset-actions">
              <Input
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Tên mốc (tuỳ chọn)"
                size="large"
                className="preset-input"
              />
              <Input
                value={presetGroup}
                onChange={(e) => setPresetGroup(e.target.value)}
                placeholder="Nhóm (tuỳ chọn)"
                size="large"
                className="preset-group-input"
              />
              <Input
                value={presetTags}
                onChange={(e) => setPresetTags(e.target.value)}
                placeholder="Tags (cách nhau bằng dấu phẩy)"
                size="large"
                className="preset-tags-input"
              />
              <Button type="primary" onClick={handleSavePreset} size="large">
                Lưu mốc
              </Button>
            </div>
            <div className="preset-actions">
              <Select
                placeholder="Lọc theo nhóm"
                onChange={setPresetGroupFilter}
                value={presetGroupFilter}
                size="large"
                className="preset-filter-select"
              >
                <Select.Option value="all">Tất cả nhóm</Select.Option>
                {presetGroups.map((group) => (
                  <Select.Option key={group} value={group}>
                    {group}
                  </Select.Option>
                ))}
              </Select>
              <Select
                placeholder="Chọn mốc đã lưu"
                onChange={handleSelectPreset}
                value={undefined}
                size="large"
                className="preset-select"
              >
                {visiblePresets.map((preset) => (
                  <Select.Option key={preset.id} value={preset.id}>
                    {preset.label} ({dayjs(preset.date).format(DATE_FORMATS.DISPLAY)})
                  </Select.Option>
                ))}
              </Select>
              <Button onClick={handleCopyShareLink} size="large">
                Chia sẻ
              </Button>
            </div>
          </div>

          {visiblePresets.length > 0 && (
            <div className="presets-list">
              {visiblePresets.map((preset) => (
                <div key={preset.id} className="preset-chip">
                  <button
                    type="button"
                    className="preset-chip-btn"
                    onClick={() => handleSelectPreset(preset.id)}
                  >
                    {preset.label} • {dayjs(preset.date).format(DATE_FORMATS.DISPLAY)}
                    {preset.group && <span className="preset-chip-group">#{preset.group}</span>}
                  </button>
                  {preset.tags && preset.tags.length > 0 && (
                    <div className="preset-chip-tags">
                      {preset.tags.map((tag) => (
                        <span key={`${preset.id}-${tag}`} className="preset-chip-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    className="preset-chip-remove"
                    onClick={() => handleRemovePreset(preset.id)}
                    aria-label="Xóa mốc"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
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
