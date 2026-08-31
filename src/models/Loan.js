import mongoose from "mongoose";

// Das Schema ist der Bauplan fuer eine Ausleihe in MongoDB.
// Hier steht: Welches Buch wurde von wem ausgeliehen und ist es schon zurueck?
const loanSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book id is required"],
    },
    borrowerName: {
      type: String,
      required: [true, "Borrower name is required"],
      trim: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Erstellt automatisch createdAt und updatedAt.
    timestamps: true,
  },
);

// Das Model ist unser Werkzeug fuer die loans Collection.
const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
