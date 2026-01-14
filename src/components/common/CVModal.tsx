import { memo, useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Document, Page, pdfjs } from 'react-pdf';
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
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
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
  };

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
        <div className="cv-pdf-container">
          {loading && (
            <div className="cv-pdf-loading">
              <Spin size="large" tip="Loading PDF..." />
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
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="cv-pdf-page"
                  width={Math.min(850, window.innerWidth - 100)}
                />
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
