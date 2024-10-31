"use client";
import React, { useState, useEffect } from 'react';
import UserModel, { IUser } from '@/models/User';
import BookModel, { IBook } from '@/models/Book';
import "@/scss/admin.scss"
import { useRouter } from 'next/navigation';
import BookList from '@/components/BookList';

interface AddBookFormProps {
  title: string;
  author: string;
  image: string;

  quantity: number;
}
const AddBookForm: React.FC<AddBookFormProps> = ({ title, author, image,  quantity }) => {
  const [formData, setFormData] = useState<AddBookFormProps>({
    title: '',
    author: '',
    image: '',
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/books/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Book added successfully');
        // Додаткові дії після успішного додавання книжки
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className='add-book-form' onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Image:
          <input type="text" name="image" value={formData.image} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

const AdminPanel =  () => {
  
  const [activeTab, setActiveTab] = useState<'books' | 'users'>('books');
  const [content, setContent] = useState<(IUser | IBook)[]>([]);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");

  const router = useRouter();
  const fetchDataByTab = async () => {
    try {
      let responseData;
      const url = activeTab === 'books' ? "/api/admin/books" : "/api/admin/users";
      const response = await fetch(url, {
        method: "GET",
        headers : {
          'Content-Type': 'application/json'
        },
      
      });
      responseData = await response.json();
      setBooks(responseData)
      return responseData;
    } catch (error) {
      console.error('Error fetching data by tab:', error);
      return [];
    }
  };
  const handleBan = async (id:string) => {
    await fetch("/api/admin/users/block" , {
      method : "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(id)
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsTokenValid(false);
          return;
        }
  
        const response = await fetch("/api/middleware/validjwt", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          const role = data.role;
          if (role !== "admin") {
            router.push("/");
            return;
          }
  
          const responseData = await fetchDataByTab();
          setIsTokenValid(true);
          setContent(responseData);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push("/login");
      }
    };
  
    fetchData();
  }, [activeTab]);
  const filteredBooks = books.filter(book =>
   book.title?.toLowerCase().includes(query.toLowerCase())

  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };
  

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <div className="tabs">
          <button className={activeTab === 'books' ? 'active' : ''} onClick={() => setActiveTab('books')}>Книжки</button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Користувачі</button>
        </div>
      </div>
      <div className="content">
      {activeTab === 'books' && (
  <div>
    <h1>Книжки</h1>
    <AddBookForm
      title=""
      author=""
      image=""
      quantity={0}
    />
    {content && content.length > 0 ? (
      <div className="book-list">
         <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Пошук книги за назвою..."
          
            />
       <BookList books={filteredBooks}/>
      </div>
    ) : (
      <h1>Немає інформації</h1>
    )}
  </div>
)}
        {activeTab === 'users' && (
          <div>
            <h1>Користувачі</h1>
            {content && content.length > 0 ? (
                <ul>
                  {content.map((item: IUser | IBook, index: number) => (
                    <div key={index} className="user__block">
                       <li >{(item as IUser).email}</li>
                       {(item as IUser).status === "ban" ? <button disabled>Заблокований</button> :  <button onClick={() => handleBan((item as IUser)._id)}>Заблокувати</button>}
                    </div>
                   
                  ))}
                </ul>
              ) : (
                <h1>Немає інформації</h1>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;