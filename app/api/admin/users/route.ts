"use server";
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export  async function GET(req: Request, res: Response) {
  await connectDB();
  let users:any;
    try {
      users = await User.find({});
      return Response.json(users , {  status: 200});
    } catch (error) {
      return Response.json(error ,{ status: 500});
    }
  
  }


  