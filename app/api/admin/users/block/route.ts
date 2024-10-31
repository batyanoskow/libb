
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export  async function POST(req: Request, res: Response) {
    await connectDB();
    const id = await req.json();
    
    try {
      // Знайдіть користувача за його електронною адресою
      const user = await User.findOne({ _id : id});

      // Перевірте, чи користувач існує
      if (!user) {
        return Response.json({ error: 'Користувач не знайдений' });
      }

      // Змініть статус блокування користувача
      user.status = "ban";

      // Збережіть зміни
      await user.save();

      return Response.json({ message: 'Користувача успішно заблоковано' });
    } catch (error) {
      console.error('Помилка при блокуванні користувача:', error);
      return Response.json({ error: 'Внутрішня помилка сервера' });
    }


}
