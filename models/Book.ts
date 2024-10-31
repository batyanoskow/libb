import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    image: string;
    available: boolean;
    quantity: number;
    bookedBy?: string; // New field
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, required: true },
    quantity: { type: Number, required: true },
    bookedBy: { type: String ,default : ""},
});

const BookModel: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default BookModel;

