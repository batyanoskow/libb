
import connectDB from '@/lib/connectDB';
import Book from '@/models/Book';


export  async function POST(req: Request, res: Response) {
  await connectDB();
    try {
      const data = await req.json();
      const id = data.id;
      if(id === ''){
        const books = await Book.find({});
        return Response.json({books , status: 200});
       
      }
      const books = await Book.find({_id : id});
      return Response.json({books , status: 200});
    } catch (error) {
       return  Response.json({error , status: 500});
    }
  } 

