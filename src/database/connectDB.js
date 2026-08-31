import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB verbunden");
  } catch (error) {
    console.error("MongoDB Verbindung fehlgeschlagen:", error.message);
    process.exit(1);
  }
}

export default connectDB;
