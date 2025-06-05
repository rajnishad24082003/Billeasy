const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, default: 0.0 },
  reviews: {
    type: Map,
    of: new schema({
      rating: { type: Number, required: true },
      message: { type: String },
    }),
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
