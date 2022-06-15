import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`Connected to DB`);
  } catch (error) {
    console.log(`DB connection error`, error.message);
  }
};

export default connectDB;
