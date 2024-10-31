"use client"
import React from 'react';
import styles from '@/scss/BookList.module.scss'; // Імпорт SCSS стилів
import Link from 'next/link';
import BookModel , { IBook } from '@/models/Book';
import { useRouter } from 'next/navigation';
import { useState  } from 'react';

interface BookListProps {
  books: IBook[];
  
}

const BookList: React.FC<BookListProps>=  ({ books }) => {
  
  let token:any;
  if(typeof window !== 'undefined'){
    token = localStorage.getItem("token");
  }
  const router  = useRouter();
  let response:any;
  const [role , setRole] = useState("");

 
  const getEmail = async () => {
  
    response = await fetch("/api/middleware/validjwt", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if(response.status === 200){
      const data = await response.json();
      const { email, role } = data;
      return { email, role };
    }
  }

  const handleReserve = async (bookId: string) => {
    await fetch(`/api/books/brone`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: bookId, email: await getEmail().then(res => res?.email) })
    });
   
  };
 const getRole = async() => {
  setRole(await getEmail().then(res => res?.role));
   
 }
 if(token){
  getRole()
}
  const handleUnReserve = async(bookId : string) =>{
    await fetch(`/api/admin/books/unbrone`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: bookId})
    });
  }
  return (
    
    <div className={styles.books} >
      <div className="books__container">
      <h2>Список книг:</h2>
      <div className={styles.books__container}>
        {books.map((book: IBook, index: number) => (
          <div key={index} className={styles.books__card}>
            <img src={book.image} alt={book.title} className={styles.books__image} />
            <div className={styles.bookDs__dtails}>
              <h3>{book.title}</h3>
              <p><strong>Автор:</strong> {book.author}</p>
           
              {book.available ? (
                <button onClick={() => {if(token){ handleReserve(book._id)}}} className={styles.reserveButton}>Забронювати</button>
              ) : (
                (role === "admin") ? <button  onClick={() => {handleUnReserve(book._id)}}>Зайнято</button> : <button className={styles.reserveButtonDisabled} disabled>Зайнято</button> 
              )}
              {role === "admin" ? (<p><strong>Забронював : </strong>{book.bookedBy}</p>) : ""}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};


export default BookList;
