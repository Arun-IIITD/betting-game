const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, adminSecret} = req.body;
  console.log("in register controller",name,email,password,adminSecret);
  const hash = await bcrypt.hash(password, 10);

  let role = "user";
  if (adminSecret === process.env.ADMIN_SECRET){
    role="admin";
  }

  const user = await User.create({
    name,
    email,
    password: hash,
    role
  });

  res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("in login controller", email, password);
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ 
    id: user._id,
    role: user.role
  },process.env.JWT_SECRET);

  res.json({ token, user });
};

module.exports = { register, login };