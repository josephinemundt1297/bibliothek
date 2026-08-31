import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController.js";

// Router ist wie ein kleiner Unter-Server nur fuer /books.
const router = express.Router();

// Diese Datei entscheidet nur: Welche URL ruft welche Controller-Funktion auf?
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
