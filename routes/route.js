const express = require("express");
const controls = require("../contollers/controls");
const auth = require("../contollers/auth");
const router = express.Router();

router.get("/", controls.homePage);
router.get("/books", controls.getAllBooks);
router.post("/signup", auth.signup);
router.post("/login", auth.login);

router.post("/books", auth.verifySession, controls.postBook);
router.get("/books/:id", auth.verifySession, controls.getSingleBook);

//this paths are modified for optimization
router.post("/books/:id/reviews", auth.verifySession, controls.postReview);
router.put("/books/:id/reviews", auth.verifySession, controls.postReview);
router.delete("/books/:id/reviews", auth.verifySession, controls.deleteReview);

module.exports = router;
