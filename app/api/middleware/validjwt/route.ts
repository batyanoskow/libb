import jwt from 'jsonwebtoken';

export async function POST(req: Request, res: Response) {
    const authorizationHeader = req.headers.get('Authorization'); // Отримуємо заголовок Authorization
    let data;
    if (!authorizationHeader || typeof authorizationHeader !== 'string') {
        return Response.json({ status : 401});
    }
   
    const token = authorizationHeader.split(' ')[1]; // Розбиваємо заголовок для отримання токена

    // Перевірка токена JWT
    jwt.verify(token, "mysecretkey", (err: any, decoded: any) => {
        if (err) {
            console.error('Error verifying token:', err);
            return Response.json({status : 401 });
        } else {
            data = decoded;
            return data;
        }
    });
    return Response.json(data , { status : 200});
}
