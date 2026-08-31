import express from "express";
import {
  createLoan,
  deleteLoan,
  getAllLoans,
  getLoanById,
  returnLoan,
  updateLoan,
} from "../controllers/loanController.js";

// Router ist wie ein kleiner Unter-Server nur fuer /loans.
const router = express.Router();

// Diese Datei entscheidet nur: Welche URL ruft welche Controller-Funktion auf?
router.get("/", getAllLoans);
router.get("/:id", getLoanById);
router.post("/", createLoan);
router.put("/:id/return", returnLoan);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export default router;
