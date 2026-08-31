import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import errorHandler from "./middlewares/errorHandler.js";
import bookRoutes from "./routes/bookRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

// Holt die Werte aus der .env Datei, z.B. PORT und MONGODB_URI.
dotenv.config();

// app ist unser Express-Server. An diese app haengen wir gleich alle Routen.
const app = express();
const PORT = process.env.PORT || 3000;

// cors erlaubt spaeter unserem React-Frontend, mit diesem Backend zu sprechen.
app.use(cors());

// Damit Express JSON aus dem Request-Body lesen kann, z.B. bei POST /books.
app.use(express.json());

// Kleine Test-Route: Damit koennen wir schnell pruefen, ob der Server lebt.
app.get("/", (req, res) => {
  res.json({
    message: "Library API is running",
  });
});

// Alles, was mit /books startet, wird an die Book-Routes weitergegeben.
app.use("/books", bookRoutes);

// Alles, was mit /loans startet, wird an die Loan-Routes weitergegeben.
app.use("/loans", loanRoutes);

// Wenn keine Route passt, bauen wir hier einen 404-Fehler.
app.use((req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

// Zentrale Fehlerstelle: Alle Fehler landen am Ende hier.
app.use(errorHandler);

async function startServer() {
  // Erst mit MongoDB verbinden, dann den Server starten.
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
}

// Startet die ganze App.
startServer();
