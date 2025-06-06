const Book = require("../models/bookSchema");

const homePage = (req, res) => {
  res.status(200).json({ data: "home page" });
};

const postBook = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      throw new Error("Unauthorized or invalid user");
    }

    const author = req.user.username;
    const { title, publishedYear, genre } = req.body;

    if (!title || !publishedYear || !genre) {
      throw new Error("Fill all required fields");
    }

    const item = new Book({ title, author, publishedYear, genre });
    await item.save();

    res.status(201).json({ data: "Entry added successfully" });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

//http://localhost:3000/books?page=2
const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default: page 1
    const limit = 5; // default: 5 items/page

    const skip = (page - 1) * limit;

    const items = await Book.find().skip(skip).limit(limit);

    const total = await Book.countDocuments();

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items,
    });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ data: "Book not found" });
    }
    res.status(200).json({ data: book });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

//works for update too.
const postReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, message } = req.body;
    const userId = req.user.username; // or req.user.id

    if (!rating || typeof rating !== "number") {
      throw new Error("Rating must be a number");
    }

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ data: "Book not found" });

    book.reviews.set(userId, { rating, message });

    // Recalculate average rating
    const allReviews = Array.from(book.reviews.values());
    const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
    book.rating = total / allReviews.length;

    await book.save();
    res.status(201).json({ data: "Review added/updated" });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.username;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ data: "Book not found" });

    if (!book.reviews.has(userId)) {
      return res.status(404).json({ data: "No review found for this user" });
    }

    book.reviews.delete(userId); // delete the review

    // Recalculate average rating
    const allReviews = Array.from(book.reviews.values());
    if (allReviews.length === 0) {
      book.rating = undefined;
    } else {
      const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
      book.rating = total / allReviews.length;
    }

    await book.save();
    res.status(200).json({ data: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

module.exports = {
  homePage,
  postBook,
  getAllBooks,
  getSingleBook,
  postReview,
  deleteReview,
};
