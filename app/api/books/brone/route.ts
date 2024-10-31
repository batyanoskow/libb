"use server"
import connectDB from '@/lib/connectDB';;
import BookModel from '@/models/Book';

export async function POST(req : Request , res : Response){
    const data = await req.json();
    
    const id = data.id;
    const email = data.email;

     try {
        await connectDB();
        const book = await BookModel.findById(id);
  
        if (!book) {
          return Response.json({ message: 'Книгу не знайдено' , status : 404 });
        }
  
        // Зміна статусу доступності книги на протилежний
        book.available = !book.available;
        book.bookedBy += email;
        await book.save();
  
        return Response.json({ message: 'Статус книги успішно оновлено' , status : 200 });
      } catch (error) {
        console.error(error);
        return Response.json({ message: 'Помилка сервера' , status: 500});
      }
}