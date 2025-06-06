const bcryptjs = require("bcryptjs");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("enter username and password");
    }
    const getuser = await User.findOne({ username });
    if (getuser) {
      throw new Error("user already exist");
    }
    const hashedpass = await bcryptjs.hash(password, Number(process.env.SALT));
    const item = new User({
      username,
      password: hashedpass,
    });
    await item.save();
    res.status(201).json({ data: "user added" });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Enter username and password");
    }

    const userdata = await User.findOne({ username });
    if (!userdata) throw new Error("User not found");

    const isloggedin = await bcryptjs.compare(password, userdata.password);
    if (!isloggedin) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: userdata._id, username: userdata.username },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.status(200).json({ data: token });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

const verifySession = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("no headers");
    }
    const token = req.headers.authorization.split(" ")[1]; //formate->"Bearer token"

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        throw new Error("session expiered");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({ data: error.message });
  }
};

module.exports = { signup, login, verifySession };
