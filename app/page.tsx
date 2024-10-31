// pages/index.tsx
"use client";
import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Header from '@/components/header';
import styles from '@/scss/SearchBar.module.scss';

const Home: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({id : ''})
        });
        if (response.ok) {
          const data = await response.json();
          setBooks(data.books);
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <div>
      <Header />
      <main className="main">
        <div className="main__container">
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Пошук книги за назвою..."
              className={styles.searchInput}
            />
          </div>
          <BookList books={filteredBooks}/>
        </div>
      </main>
    </div>
  );
};

export default Home;
