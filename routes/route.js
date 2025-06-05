const express = require("express");
const controls = require("../contollers/controls");
const auth = require("../contollers/auth");
const router = express.Router();

router.get("/", controls.homePage);
router.post("/books", auth.verifySession, controls.postBook);
router.get("/books", controls.getAllBooks);
router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.get("/books/:id", auth.verifySession, controls.getSingleBook);
router.post("/books/:id/reviews", auth.verifySession, controls.postReview);
router.delete("/books/:id/reviews", auth.verifySession, controls.deleteReview);

module.exports = router;
