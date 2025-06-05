# 📚 Book API

A simple RESTful API for managing books and user reviews, built with **Node.js**, **Express**, **MongoDB**, and **JWT** for authentication.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v14+)
- MongoDB Atlas or local MongoDB

---

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/book-api.git
   cd book-api
   ```

2. **Create `.env` file**  
   Use the following template:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   SALT=10
   JWT_SECRET=rf3j489tu34jhduisj32
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the server**
   ```bash
   npm start          # for production
   npm run dev        # for development with nodemon
   ```

---

## ✅ API Overview

### 🔓 Public Routes

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| GET    | `/`       | Home page               |
| GET    | `/books`  | Get all books           |
| POST   | `/signup` | Register new user       |
| POST   | `/login`  | Login and get JWT token |

#### 🔐 Login Response

Returns:

```json
{ "data": "JWT token valid for 10 minutes" }
```

Use this token for protected routes.

---

### 🔐 Protected Routes

> Add the JWT token in the request headers: `Authorization: Bearer <token>`

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| POST   | `/books`             | Add a new book                         |
| GET    | `/books/:id`         | Get book by ID                         |
| POST   | `/books/:id/reviews` | Add or update your review for the book |
| DELETE | `/books/:id/reviews` | Delete your review from the book       |

#### Example Book Payload

```json
{
  "title": "Book Title",
  "publishedYear": 2025,
  "genre": "sci-fi"
}
```

#### Example Review Payload

```json
{
  "rating": 5,
  "message": "Amazing book!"
}
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
