# Bibliothek API

Eine einfache NoSQL Mini-API fuer eine Bibliothek. Die API wird mit Node.js, Express, MongoDB und Mongoose gebaut und verwendet eine MVC-Struktur mit Models, Routes und Controllers.

Mit der API koennen Buecher in der Datenbank erstellt, gelesen, aktualisiert und geloescht werden. Der zweite Projektbereich fuer Ausleihen (`/loans`) wird im Team separat ergaenzt.

## Team

- Josephine Mundt
- Dilek

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

## Lokaler Start

```bash
npm install
npm run dev
```

Die API laeuft standardmaessig unter:

```txt
http://localhost:3000
```

Die lokale `.env` braucht diese Werte:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/bibliothek
```

## Endpunkte

### Status pruefen

```http
GET /
```

Beispiel-Antwort:

```json
{
  "message": "Library API is running"
}
```

### Alle Buecher lesen

```http
GET /books
```

Optionale Query-Parameter:

```http
GET /books?genre=Fantasy
GET /books?available=true
```

Beispiel-Antwort:

```json
{
  "count": 1,
  "data": [
    {
      "_id": "66d4567890abcdef12345678",
      "title": "Harry Potter",
      "author": "J.K. Rowling",
      "genre": "Fantasy",
      "year": 1997,
      "available": true
    }
  ]
}
```

### Einzelnes Buch lesen

```http
GET /books/:id
```

Beispiel-Antwort:

```json
{
  "_id": "66d4567890abcdef12345678",
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "year": 1997,
  "available": true
}
```

### Neues Buch erstellen

```http
POST /books
Content-Type: application/json
```

Beispiel-Anfrage:

```json
{
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "year": 1997,
  "available": true
}
```

Beispiel-Antwort:

```json
{
  "_id": "66d4567890abcdef12345678",
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "year": 1997,
  "available": true
}
```

### Buch aktualisieren

```http
PUT /books/:id
Content-Type: application/json
```

Beispiel-Anfrage:

```json
{
  "title": "Harry Potter und der Stein der Weisen",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "year": 1997,
  "available": false
}
```

Beispiel-Antwort:

```json
{
  "_id": "66d4567890abcdef12345678",
  "title": "Harry Potter und der Stein der Weisen",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "year": 1997,
  "available": false
}
```

### Buch loeschen

```http
DELETE /books/:id
```

Erfolgreiche Antwort:

```txt
Status: 204 No Content
```

## Fehlerbeispiele

Ungueltige ID:

```json
{
  "status": 400,
  "error": "Invalid book id"
}
```

Buch nicht gefunden:

```json
{
  "status": 404,
  "error": "Book not found"
}
```
