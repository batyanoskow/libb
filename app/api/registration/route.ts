"use server";
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from '@/lib/connectDB';



export async function POST(req : any, res: NextApiResponse) {
  await connectDB();
  const bcrypt = require('bcrypt');
  const saltRounds = process.env.SALT;

  try {
    let { login, password } = await req.json();
    const isLyc2Email = login.includes('@lyc2.org');
    if (!isLyc2Email) {
      return Response.json({ status : 400 , error: 'Електронна адреса повинна закінчуватися на lyc2.org' });
    }
    const existingUser = await User.findOne({ email: login });
    if (existingUser) {
      return Response.json({ status : 400 ,  error: 'Користувач з таким email вже існує' });
    }
    const hashedPass = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({  email: login, password: hashedPass});
    const token = jwt.sign({id : newUser._id , email : newUser.email , role : newUser.role }, "mysecretkey", { expiresIn: '1d' });
    return Response.json({token ,  status: 200 })
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500 });
  }
}