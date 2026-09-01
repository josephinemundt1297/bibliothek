import mongoose from "mongoose";
import Book from "../models/Book.js";

// Kleine Hilfsfunktion, damit wir Fehler mit Statuscode bauen koennen.
// Beispiel: 404 heisst "nicht gefunden", 400 heisst "deine Anfrage ist falsch".
function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

// MongoDB-IDs haben ein bestimmtes Format.
// Wenn die ID kompletter Quatsch ist, fragen wir die Datenbank gar nicht erst.
function isInvalidId(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

// GET /books
// Holt alle Buecher aus der Datenbank. Optional kann man nach Genre oder available filtern.
export async function getAllBooks(req, res, next) {
  try {
    // Query kommt aus der URL, z.B. /books?genre=Fantasy&available=true.
    const { genre, available } = req.query;
    const filter = {};

    // Wenn genre in der URL steht, suchen wir nur Buecher mit diesem Genre.
    if (genre) {
      filter.genre = genre;
    }

    // Query-Werte kommen als Text rein. Deshalb vergleichen wir mit "true" und "false".
    if (available === "true") {
      filter.available = true;
    }

    if (available === "false") {
      filter.available = false;
    }

    // await bedeutet: Warte, bis MongoDB geantwortet hat.
    // sort({ title: 1 }) sortiert alphabetisch nach Titel.
    const books = await Book.find(filter).sort({ title: 1 });

    // 200 bedeutet: Alles okay, hier sind die Daten.
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    // Wenn etwas schiefgeht, geben wir den Fehler an den errorHandler weiter.
    next(error);
  }
}

// GET /books/:id
// Holt ein einzelnes Buch anhand seiner MongoDB-ID.
export async function getBookById(req, res, next) {
  try {
    // params kommt aus der Route. Bei /books/123 ist id = "123".
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid book id"));
    }

    const book = await Book.findById(id);

    // Wenn die ID formal okay ist, aber kein Buch dazu existiert.
    if (!book) {
      return next(createError(404, "Book not found"));
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

// POST /books
// Erstellt ein neues Buch mit den Daten aus req.body.
export async function createBook(req, res, next) {
  try {
    // req.body ist der JSON-Body aus Postman oder spaeter aus React.
    const book = await Book.create(req.body);

    // 201 bedeutet: Neu erstellt.
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

// PUT /books/:id
// Aktualisiert ein vorhandenes Buch.
export async function updateBook(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid book id"));
    }

    const book = await Book.findByIdAndUpdate(id, req.body, {
      // new: true gibt das aktualisierte Buch zurueck, nicht die alte Version.
      new: true,
      // runValidators prueft beim Update nochmal die Regeln aus dem Schema.
      runValidators: true,
    });

    if (!book) {
      return next(createError(404, "Book not found"));
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

// DELETE /books/:id
// Loescht ein Buch aus der Datenbank.
export async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid book id"));
    }

    const book = await Book.findByIdAndDelete(id);

    // Wenn kein Buch gefunden wurde, kann auch nichts geloescht werden.
    if (!book) {
      return next(createError(404, "Book not found"));
    }

    // 204 bedeutet: Hat geklappt, aber wir schicken keinen Inhalt zurueck.
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
