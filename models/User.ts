import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends  Document{ 
  email: string;
  password: string;
  bookedbooks: Array<any>;
  role : string;
  status : string
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  bookedbooks: { type: Array , default : ""}, // Додайте поле bookedbooks
  role: { type: String , default: "user"}, // Додайте поле role
  status : { type: String , default: "available"}
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
