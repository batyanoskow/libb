
import BookModel, { IBook } from '@/models/Book';


// Метод POST для додавання книги
export  async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return Response.json({ message: 'Method Not Allowed' ,status: 405 });
  }

  try {
    // Отримуємо дані книги з тіла запиту
    const { title, author, image, available, quantity } = await req.json();

    
    const newBook = await BookModel.create({ title, author, image, available, quantity });

    // Повертаємо успішну відповідь з новою книгою
    return Response.json({ message: 'Book added successfully', status: 200});
  } catch (error) {
    console.error('Error adding book:', error);
    return Response.json({ message: 'Internal Server Error' , status: 500 });
  }
}
