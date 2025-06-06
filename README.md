# 📚 Book API

A simple RESTful API for managing books and user reviews, built with **Node.js**, **Express**, **MongoDB**, **Bcryptjs**, and **JWT** for authentication.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v14+)
- MongoDB Atlas or local MongoDB

---

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajnishad24082003/Billeasy.git
   cd Billeasy
   ```

2. **Create `.env` file**  
   Use the following template:

   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://test:test@cluster0.s66s0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   SALT=10
   JWT_SECRET=rf3j489tu34jhduisj32
   ```

   I have kept the mongoDB URI for testing and it will be deleted after a month

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

| Method | Endpoint  | Description                                             |
| ------ | --------- | ------------------------------------------------------- |
| GET    | `/`       | Home page                                               |
| GET    | `/books`  | Get all books /books?page=2&author=raj&genre=JavaScript |
| POST   | `/signup` | Register new user                                       |
| POST   | `/login`  | Login and get JWT token                                 |

#### Example signup/login

```json
{
  "username": "xyz",
  "password": "xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

####

🔐 Login Response

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
| PUT    | `/books/:id/reviews` | Add or update your review for the book |
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

## For more Details on Schema ,You can look in models folder

## you can use {username:raj, password:123456789} for testing

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
