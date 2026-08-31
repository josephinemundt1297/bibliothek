import mongoose from "mongoose";

// Das Schema ist der Bauplan fuer ein Buch in MongoDB.
// Hier steht: Welche Felder hat ein Buch und welche Regeln gelten?
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required bedeutet: Ohne Titel darf kein Buch gespeichert werden.
      required: [true, "Title is required"],
      // trim entfernt Leerzeichen am Anfang und Ende.
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
      // Wenn kein Genre mitgeschickt wird, speichert MongoDB "Unknown".
      default: "Unknown",
    },
    year: {
      type: Number,
      // Das Jahr darf nicht kleiner als 0 sein.
      min: [0, "Year cannot be negative"],
    },
    available: {
      type: Boolean,
      // Neue Buecher sind erstmal verfuegbar.
      default: true,
    },
  },
  {
    // Erstellt automatisch createdAt und updatedAt.
    timestamps: true,
  },
);

// Das Model ist unser Werkzeug fuer die books Collection:
// damit koennen wir Buecher suchen, erstellen, updaten und loeschen.
const Book = mongoose.model("Book", bookSchema);

export default Book;
