import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/connectDB';
import Book from '@/models/Book';

export  async function GET(req: Request, res: Response) {
  await connectDB();
    try {
     const books = await Book.find({});
     return Response.json(books , {status: 200});
    } catch (error) {
       return  Response.json(error , {status: 500});
    }
  } 

