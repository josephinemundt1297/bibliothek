import mongoose from "mongoose";
import Loan from "../models/Loan.js";

// Kleine Hilfsfunktion, damit wir Fehler mit Statuscode bauen koennen.
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

// GET /loans
// Holt alle Ausleihen aus der Datenbank.
export async function getAllLoans(req, res, next) {
  try {
    const loans = await Loan.find().sort({ borrowedAt: -1 });

    res.status(200).json({
      count: loans.length,
      data: loans,
    });
  } catch (error) {
    next(error);
  }
}

// GET /loans/:id
// Holt eine einzelne Ausleihe anhand ihrer MongoDB-ID.
export async function getLoanById(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid loan id"));
    }

    const loan = await Loan.findById(id);

    if (!loan) {
      return next(createError(404, "Loan not found"));
    }

    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
}

// POST /loans
// Erstellt eine neue Ausleihe mit den Daten aus req.body.
export async function createLoan(req, res, next) {
  try {
    const loan = await Loan.create(req.body);

    res.status(201).json(loan);
  } catch (error) {
    next(error);
  }
}

// PUT /loans/:id
// Aktualisiert eine vorhandene Ausleihe.
export async function updateLoan(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid loan id"));
    }

    const loan = await Loan.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!loan) {
      return next(createError(404, "Loan not found"));
    }

    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
}

// DELETE /loans/:id
// Loescht eine Ausleihe aus der Datenbank.
export async function deleteLoan(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid loan id"));
    }

    const loan = await Loan.findByIdAndDelete(id);

    if (!loan) {
      return next(createError(404, "Loan not found"));
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// PUT /loans/:id/return
// Markiert eine Ausleihe als zurueckgegeben.
export async function returnLoan(req, res, next) {
  try {
    const { id } = req.params;

    if (isInvalidId(id)) {
      return next(createError(400, "Invalid loan id"));
    }

    const loan = await Loan.findByIdAndUpdate(
      id,
      { isReturned: true },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!loan) {
      return next(createError(404, "Loan not found"));
    }

    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
}
