'use client'
 
import { useSearchParams } from 'next/navigation'
import { useState , useEffect} from 'react';
import styles from "@/scss/SingleBook.module.scss";
import BookModel , { IBook } from '@/models/Book';


export default function SingleBook(){
    const params = useSearchParams();
    const id = params.get("id");
    const [bookData, setBookData] = useState<IBook | null>(null);
    useEffect(() => {
      fetch("/api/books", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
      })
      .then(res => res.json())
      .then(data => setBookData(data.books[0]))
      .catch(error => console.error('Error fetching book data:', error));
  }, [id]);

  if (!bookData) {
    // Якщо дані про книгу ще не завантажені, можна показати повідомлення про завантаження або індикатор завантаження
    return <div>Loading...</div>;
  }
 
    const { title, author, image, available, quantity } = bookData;
    return(
      <>
       <div className={styles.bookContainer}>
            <img className={styles.bookImage} src={image} alt="{title}" />
            <div className={styles.bookDetails}>
                <h1 className={styles.bookTitle}>{title}</h1>
                <h2 className={styles.bookAuthor}>Author: {author}</h2>
                <p className={styles.bookAvailability}>Availability: {available ? 'Available' : 'Not Available'}</p>
                <p className={styles.bookQuantity}>Quantity: {quantity}</p>
            </div>
        </div>
      </>
    )
}   