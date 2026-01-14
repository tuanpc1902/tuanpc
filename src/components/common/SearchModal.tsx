import { memo, useState, useEffect } from 'react';
import { Modal, Input, List, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '~alias~/components/icons/icons';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { searchItems, type SearchableItem } from '~alias~/lib/searchData';
import { getTranslation, translations } from '~alias~/lib/translations';
import './SearchModal.styles.scss';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

function SearchModal({ visible, onClose, searchValue, onSearchChange }: SearchModalProps) {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const [results, setResults] = useState<SearchableItem[]>([]);

  useEffect(() => {
    if (searchValue.trim()) {
      const searchResults = searchItems(searchValue, language);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchValue, language]);

  const handleItemClick = (item: SearchableItem) => {
    if (item.url.startsWith('http')) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.url);
    }
    onClose();
    onSearchChange('');
  };

  const t = (key: keyof typeof translations.vi) => getTranslation(language, key);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      className="search-modal"
      width={600}
      destroyOnHidden 
    >
      <div className="search-modal-content">
        <Input
          className="search-modal-input"
          placeholder={t('searchPlaceholder')}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          prefix={<SearchIcon className="search-icon" width="1.25rem" height="1.25rem" />}
          autoFocus
          size="large"
        />
        
        {results.length > 0 ? (
          <List
            className="search-results"
            dataSource={results}
            renderItem={(item) => {
              const title = language === 'vi' ? item.titleVi : item.title;
              const description = language === 'vi' ? item.descriptionVi : item.description;
              
              return (
                <List.Item
                  className="search-result-item"
                  onClick={() => handleItemClick(item)}
                >
                  <List.Item.Meta
                    avatar={item.icon ? <span className="result-icon">{item.icon}</span> : null}
                    title={<span className="result-title">{title}</span>}
                    description={<span className="result-description">{description}</span>}
                  />
                  <span className="result-type">{item.type}</span>
                </List.Item>
              );
            }}
          />
        ) : searchValue.trim() ? (
          <Empty
            description={t('noResultsFound')}
            className="search-empty"
          />
        ) : null}
      </div>
    </Modal>
  );
}

export default memo(SearchModal);
