import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connectDB() {
  let mongoMemoryServer = null;

  try {
    if (process.env.MONGODB_URI) {
      try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB verbunden");
        return;
      } catch (error) {
        console.warn(
          "Standard-MongoDB-URI fehlgeschlagen, verwende Fallback:",
          error.message,
        );
      }
    }

    console.log("Starte lokalen MongoDB Memory Server...");
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    await mongoose.connect(uri);
    console.log("MongoDB Memory Server verbunden");
  } catch (error) {
    console.error("MongoDB Verbindung fehlgeschlagen:", error.message);
    process.exit(1);
  }
}

export default connectDB;
