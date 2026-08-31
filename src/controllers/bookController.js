import mongoose from "mongoose";
import Book from "../models/Book.js";

function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function isInvalidId(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

export async function getAllBooks(req, res, next) {
  try {
    const { genre, available } = req.query;
    const filter = {};

    if (genre) {
      filter.genre = genre;
    }

    if (available === "true") {
      filter.available = true;
    }

    if (available === "false") {
      filter.available = false;
    }

    const books = await Book.find(filter).sort({ title: 1 });

    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBookById(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid book id"));
    }

    const book = await Book.findById(id);

    if (!book) {
      return next(createError(404, "Book not found"));
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

export async function createBook(req, res, next) {
  try {
    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid book id"));
    }

    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
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

export async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid book id"));
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return next(createError(404, "Book not found"));
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
