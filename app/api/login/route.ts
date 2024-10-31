import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Підставте шлях до моделі користувача
import connectDB from '@/lib/connectDB';
const bcrypt = require("bcrypt");

export  async function POST(req: Request, res: Response) {
  await connectDB();
    try {
      const data = await req.json();
      const email = data.login;
      const password = data.password;
      const user = await User.findOne({ email });
      if (!user) {
        return Response.json({ status : 401 , error: 'Неправильне ім\'я користувача або пароль' });
      }
      if(user.status === "ban"){
        return Response.json({ status : 405, error: 'Ваш аккаунт заблокований' });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return Response.json({ status: 401, error: 'Неправильне ім\'я користувача або пароль' });
      }
      const token = jwt.sign({id : user._id , email : user.email , role : user.role }, "mysecretkey", { expiresIn: '7d' });
      return Response.json({token , status : 200 });
    } catch (error) {
      console.error('Помилка при вході:', error);
      return Response.json({status : 500, error: 'Помилка сервера' });
    }
  } 

