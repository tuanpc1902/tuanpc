import { memo, useMemo, useRef, useState } from 'react';
import { Modal, Button, Spin, Input, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { useDataContext } from '~alias~/contexts/DataContext';
import { AnalyticsEventType, logAnalyticsEvent } from '~alias~/lib/services/analyticsService';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './CVModal.styles.scss';

// Set up PDF.js worker - use local worker file from public folder
if (typeof window !== 'undefined') {
  // Use local worker file that matches react-pdf's pdfjs-dist version
  // Try .mjs first, fallback to .js if needed
  const workerPath = '/pdf.worker.min.mjs';
  pdfjs.GlobalWorkerOptions.workerSrc = workerPath;
}

interface CVModalProps {
  visible: boolean;
  onClose: () => void;
  cvUrl: string;
  cvFileName: string;
}

function CVModal({ visible, onClose, cvUrl, cvFileName }: CVModalProps) {
  const { language } = useLanguageContext();
  const { translations: contextTranslations } = useDataContext();
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageInput, setPageInput] = useState('');
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const t = (key: keyof typeof contextTranslations.vi) => {
    const translation = contextTranslations[language]?.[key] || contextTranslations.vi[key];
    return translation || '';
  };

  const normalizedQuery = useMemo(() => searchQuery.trim().toLowerCase(), [searchQuery]);
  const searchRegex = useMemo(() => {
    if (!normalizedQuery) return null;
    const escaped = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(${escaped})`, 'gi');
  }, [normalizedQuery]);

  const renderTextWithHighlight = useMemo(() => {
    if (!searchRegex) return undefined;
    return (textItem: { str: string }) => {
      const text = textItem.str;
      if (!text) return text;
      const parts = text.split(searchRegex);
      return parts.map((part, index) => {
        if (part.toLowerCase() === normalizedQuery) {
          return (
            <mark key={`${part}-${index}`} className="cv-highlight">
              {part}
            </mark>
          );
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      });
    };
  }, [normalizedQuery, searchRegex]);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    const { numPages } = pdf;
    setNumPages(numPages);
    setPdfDocument(pdf);
    setLoading(false);
  };

  const onDocumentLoadError = () => {
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = cvFileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logAnalyticsEvent(AnalyticsEventType.CV_DOWNLOAD, {
      fileName: cvFileName,
      url: cvUrl,
    });
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.6, Number((prev - 0.1).toFixed(2))));
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(2, Number((prev + 0.1).toFixed(2))));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

  const scrollToPage = (pageNumber: number) => {
    const target = pageRefs.current[pageNumber];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGoToPage = () => {
    const parsed = Number(pageInput);
    if (!Number.isFinite(parsed)) return;
    const pageNumber = Math.max(1, Math.min(numPages, parsed));
    scrollToPage(pageNumber);
  };

  const handleSearch = async () => {
    if (!pdfDocument || !searchQuery.trim()) return;
    setIsSearching(true);
    const normalizedQuery = searchQuery.trim().toLowerCase();
    let foundPage = 0;

    try {
      for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const text = textContent.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .toLowerCase();
        if (text.includes(normalizedQuery)) {
          foundPage = pageNumber;
          break;
        }
      }

      if (foundPage) {
        scrollToPage(foundPage);
      } else {
        message.info(language === 'vi' ? 'Không tìm thấy kết quả' : 'No results found');
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error(language === 'vi' ? 'Không thể tìm kiếm trong PDF' : 'Failed to search PDF');
    } finally {
      setIsSearching(false);
    }
  };

  const zoomLabel = useMemo(() => `${Math.round(scale * 100)}%`, [scale]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      className="cv-modal"
      width={900}
      destroyOnHidden
      centered
      closable={false}
      maskClosable={true}
      title={null}
    >
      <div className="cv-modal-content">
        <div className="cv-toolbar">
          <div className="cv-toolbar-group">
            <Button onClick={handleZoomOut} size="small" className="cv-toolbar-btn" aria-label={t('cvZoomOut')} title={t('cvZoomOut')}>
              -
            </Button>
            <span className="cv-zoom-label">{zoomLabel}</span>
            <Button onClick={handleZoomIn} size="small" className="cv-toolbar-btn" aria-label={t('cvZoomIn')} title={t('cvZoomIn')}>
              +
            </Button>
            <Button onClick={handleResetZoom} size="small" type="default" className="cv-toolbar-btn" aria-label={t('cvResetZoom')} title={t('cvResetZoom')}>
              1:1
            </Button>
          </div>
          <div className="cv-toolbar-group">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('cvSearch')}
              size="small"
              className="cv-search-input"
              onPressEnter={handleSearch}
            />
            <Button onClick={handleSearch} size="small" loading={isSearching} className="cv-toolbar-btn" aria-label={t('cvSearch')} title={t('cvSearch')}>
              Find
            </Button>
          </div>
          <div className="cv-toolbar-group">
            <span className="cv-page-count">
              {t('cvPage')}: {numPages || '--'}
            </span>
            <Input
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              placeholder={t('cvGoToPage')}
              size="small"
              className="cv-page-input"
              onPressEnter={handleGoToPage}
            />
            <Button onClick={handleGoToPage} size="small" className="cv-toolbar-btn" aria-label={t('cvGoToPage')} title={t('cvGoToPage')}>
              Go
            </Button>
          </div>
        </div>
        <div className="cv-pdf-container">
          {loading && (
            <div className="cv-pdf-loading">
              <Spin size="large" tip="Loading PDF..." />
              <div className="cv-pdf-skeleton">
                <div className="cv-pdf-skeleton-page" />
                <div className="cv-pdf-skeleton-page" />
              </div>
            </div>
          )}
          <Document
            file={cvUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="cv-pdf-document"
          >
            <div className="cv-pdf-pages">
              {Array.from(new Array(numPages), (_el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="cv-pdf-page-wrapper"
                  ref={(el) => {
                    pageRefs.current[index + 1] = el;
                  }}
                >
                  <Page
                    pageNumber={index + 1}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="cv-pdf-page"
                    width={Math.min(850, window.innerWidth - 100)}
                    scale={scale}
                    customTextRenderer={renderTextWithHighlight}
                  />
                </div>
              ))}
            </div>
          </Document>
        </div>
        <div className="cv-modal-footer">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className="cv-download-btn"
            size="large"
          >
            Download CV
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default memo(CVModal);
