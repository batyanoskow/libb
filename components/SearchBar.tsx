import React, { useState } from 'react';
import styles from '@/scss/SearchBar.module.scss'; // Імпорт SCSS стилів

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    onSearch(value)
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Пошук книги..."
        className={styles.searchInput} // Додайте клас для стилізації поля вводу
      />
    </div>
  );
};

export default SearchBar;
