import mongoose from 'mongoose';
const dbURI = process.env.DB_URL;

const connectDB = async () => {
  try {
    
    if (!dbURI) {
      throw new Error('DB_URL is not defined in the environment');
    }

    await mongoose.connect(dbURI).then(() =>  console.log('Connected to MongoDB'));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
